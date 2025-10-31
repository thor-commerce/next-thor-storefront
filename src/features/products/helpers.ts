import { mapEdgesToItems } from "@/utils/maps";
import { ProductDetailProduct, ProductDetailProductVariant } from "./types";
import {
  ProductAttributeType,
  SwatchAttributeValue,
} from "@/__generated__/thor/graphql";

type TreeNode = {
  name: string;
  type: "Group" | "Option";
  children?: TreeNode[];
  parent: TreeNode | null;
};

export type AttributeGroup = {
  type: ProductAttributeType;
  groupName: string;
  options: OptionType[] | [];
};

export type OptionType = {
  id: string;
  name: string;
  value: string | number | readonly string[];
  label?: string | null;
  checked?: boolean;
  src?: string | null;
  color?: string | null;
  disabled?: boolean;
};

export const getAvailableOptions = (
  variant: ProductDetailProductVariant,
  root: TreeNode
): Map<string, string[]> => {
  const selectedOptions = variant.selectedAttributes.map(
    (selectedAttribute) => ({
      name: selectedAttribute.name,
      value: selectedAttribute.value,
    })
  );

  const availableOptionsPerLevel = new Map<string, string[]>();

  let currentGroup = root;

  selectedOptions.forEach((selectedOption) => {
    const group = dfsFind(currentGroup, selectedOption.name!);

    if (group) {
      // Store all children of the found group as available options
      availableOptionsPerLevel.set(
        selectedOption.name!,
        group.children!.map((child) => child.name)
      );

      // Set the currentGroup to the child that matches the attribute.value
      const optionGroup = group?.children?.find(
        (child) => child.name === selectedOption.value
      );
      // If optionGroup exists, continue from there, otherwise restart from root
      currentGroup = optionGroup ? optionGroup : root; // Reset to root if the path breaks
    }
  });
  return availableOptionsPerLevel;
};

function dfsFind(node: TreeNode, name: string): TreeNode | null {
  if (node.name === name) {
    return node;
  }
  if (node.children) {
    for (const child of node.children) {
      const found = dfsFind(child, name);
      if (found) {
        return found;
      }
    }
  }
  return null;
}
const printTree = (node: TreeNode, indent: string = ""): void => {
  node.children?.forEach((child) => printTree(child, indent + "  "));
};

const getAttributeTree = (product: ProductDetailProduct): TreeNode | null => {
  const root: TreeNode = {
    name: "root",
    type: "Group",
    children: [],
    parent: null,
  };

  if (!product.variants) return root;
  let position = root;

  const variants = mapEdgesToItems(product.variants);

  variants.forEach((variant) => {
    position = root;
    variant.selectedAttributes.forEach((attributeCompacted) => {
      const nodeName = attributeCompacted.name!;
      const valueName = attributeCompacted.value ?? "";

      const groupNode = findOrCreateChild(position, nodeName, "Group");
      const optionNode = findOrCreateChild(groupNode, valueName, "Option");
      position = optionNode;
    });
  });

  mergeDuplicateNodes(root);
  return root.children && root.children.length > 0 ? root.children[0] : null;
};

function findOrCreateChild(
  parent: TreeNode,
  name: string,
  type: "Group" | "Option"
): TreeNode {
  let child = parent.children?.find(
    (child) => child.name === name && child.type === type
  );
  if (!child) {
    child = {
      name: name,
      type: type,
      children: [],
      parent: parent,
    };
    parent.children?.push(child);
  }
  return child;
}

function mergeDuplicateNodes(root: TreeNode): void {
  const queue: TreeNode[] = [root];
  while (queue.length > 0) {
    const node = queue.shift()!;
    if (node.children && node.children.length > 1) {
      const uniqueChildren = mergeChildrenByName(node.children);
      node.children = uniqueChildren;
    }
    if (node.children) queue.push(...node.children);
  }
}

function mergeChildrenByName(children: TreeNode[]): TreeNode[] {
  const unique: { [key: string]: TreeNode } = {};
  children.forEach((child) => {
    if (!unique[child.name]) {
      unique[child.name] = child;
    } else {
      unique[child.name].children?.push(...child.children!);
      child.children?.forEach((c) => (c.parent = unique[child.name]));
    }
  });
  return Object.values(unique);
}

export const generateAttributeGroups = (
  product: ProductDetailProduct,
  id: string
): AttributeGroup[] => {
  const root: TreeNode | null = getAttributeTree(product);
  if (!root) return [];

  // printTree(root)

  const groupCategories = product.attributeAssignments;
  const variants = mapEdgesToItems(product.variants);
  const selectedVariant = variants?.find((variant) => variant.id === id);

  if (!selectedVariant) return [];

  const availableOptionsPerLevel = getAvailableOptions(selectedVariant, root);

  const attributeGroups: AttributeGroup[] | [] =
    groupCategories?.map((group) => {
      return {
        type: group.attribute.type,
        options: [],
        groupName: group.name ?? "",
      };
    }) ?? [];

  attributeGroups.forEach((group) => {
    const optionsSet = collectGroupOptions(root, group.groupName);
    group.options = Array.from(optionsSet)
      //sort by the value position in the product attributes
      .sort((a, b) => {
        const selectedAttribute = product.attributeAssignments.find(
          (attr) => attr.name === group.groupName
        );

        const options = mapEdgesToItems(selectedAttribute?.values);

        const aIndex = options.findIndex((x) => x.value == a) ?? 0;
        const bIndex = options.findIndex((x) => x.value == b) ?? 0;
        return aIndex - bIndex;
      })
      .flatMap(
        (option) =>
          createOption(
            product,
            selectedVariant,
            group,
            option,
            availableOptionsPerLevel,
            group.type
          ) ?? []
      );
  });

  // Ignore the last attribute if its name is "Market Compliance" and it has only one option
  if (
    attributeGroups.length > 0 &&
    attributeGroups[attributeGroups.length - 1].groupName ===
      "Market Compliance" &&
    attributeGroups[attributeGroups.length - 1].options.length === 1
  ) {
    attributeGroups.pop(); // Remove the last group
  }

  return attributeGroups;
};

function createOption(
  product: ProductDetailProduct,
  variant: ProductDetailProductVariant,
  group: AttributeGroup,
  option: string,
  availableOptionsPerLevel: Map<string, string[]>,
  optionType: ProductAttributeType
): OptionType | null {
  const assignedAttribute = product.attributeAssignments.find(
    (attr) => attr.name === group.groupName
  );
  if (!assignedAttribute || !assignedAttribute.values) return null;

  const value = mapEdgesToItems(assignedAttribute.values).find(
    (x) => x.value === option
  );

  const isDisabled = !availableOptionsPerLevel
    .get(group.groupName)
    ?.includes(option);
  const isChecked = variant.selectedAttributes.some(
    (va) => va.value === option && va.name === group.groupName
  );

  return {
    id: `${group.groupName}-${option}`,
    name: group.groupName,
    value: option,
    label: value?.value,
    checked: isChecked,
    disabled: isDisabled,
    src:
      optionType === ProductAttributeType.Swatch
        ? (value as SwatchAttributeValue).media?.src
        : null,
    color:
      optionType === ProductAttributeType.Swatch
        ? (value as SwatchAttributeValue)?.color ?? null
        : null,
  };
}

function collectGroupOptions(root: TreeNode, groupName: string): Set<string> {
  const options = new Set<string>();
  bfsTraverse(root, (node) => {
    if (node.type === "Group" && node.name === groupName) {
      node.children?.forEach((child) => {
        if (child.type === "Option") {
          options.add(child.name);
        }
      });
    }
  });
  return options;
}

function bfsTraverse(root: TreeNode, callback: (node: TreeNode) => void): void {
  const queue: TreeNode[] = [root]; // Initialize the queue with the root node

  while (queue.length > 0) {
    const current = queue.shift()!; // Get the first node in the queue

    callback(current); // Execute the callback function on the current node

    // Enqueue all children of the current node
    current.children?.forEach((child) => {
      queue.push(child);
    });
  }
}

export const getVariantFromSelectedOptions = (
  product: ProductDetailProduct,
  selectedOptions: HTMLInputElement[]
): ProductDetailProductVariant => {
  const variants = mapEdgesToItems(product.variants);
  const validVariant = variants?.find((variant) =>
    variant.selectedAttributes.every((attr) =>
      selectedOptions.find(
        (option) => option.name == attr.name && option.value == attr.value
      )
    )
  );
  if (validVariant) return validVariant;

  const sortedSwatches = selectedOptions
    .sort((a, b) => {
      const aIndex = product.attributeAssignments.findIndex(
        (x) => x.name == a.name
      );
      const bIndex = product.attributeAssignments.findIndex(
        (x) => x.name == b.name
      );
      return aIndex - bIndex;
    })
    .map((x) => ({ groupName: x.name, attributeValue: x.value }));

  const variantScores = variants?.map((variant) => {
    let score = 0;
    for (let i = 0; i < sortedSwatches.length; i++) {
      const { groupName, attributeValue } = sortedSwatches[i];
      const matching = variant.selectedAttributes.find(
        (attr) => attr.name == groupName && attr.value == attributeValue
      );

      if (matching) {
        const diff = sortedSwatches.length - i;
        score += Math.pow(diff, 5);
      }
    }
    return { variant, score };
  });

  const bestVariant = variantScores!.sort((a, b) => b.score - a.score)[0]
    .variant;
  return bestVariant;
};
