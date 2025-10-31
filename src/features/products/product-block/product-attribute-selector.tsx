import { useRouter } from "next/navigation";
import { ProductDetailProduct, ProductDetailProductVariant } from "../types";
import {
  AttributeGroup,
  generateAttributeGroups,
  getVariantFromSelectedOptions,
  OptionType,
} from "../helpers";
import { CSSProperties, FormEvent, useCallback } from "react";
import s from "./product-attribute-selector.module.css";
import ThorImage from "@/components/thor-image/thor-image";
import { ProductAttributeType } from "@/__generated__/thor/graphql";
import clsx from "clsx";

type Props = {
  product: ProductDetailProduct;
  selectedVariant: ProductDetailProductVariant;
};
export default function ProductAttributesSelector({
  product,
  selectedVariant,
}: Props) {
  const router = useRouter();
  const attributeGroups = generateAttributeGroups(
    product,
    selectedVariant.id ?? ""
  );

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);
    return params.toString();
  }, []);

  const handleFormChanges = (e: FormEvent<HTMLFormElement>) => {
    const checkedOptions: HTMLInputElement[] = Array.from(
      e.currentTarget.querySelectorAll("input:checked")
    );
    const variant = getVariantFromSelectedOptions(product, checkedOptions);
    if (variant) {
      router.replace(`?${createQueryString("variant", variant.id)}`, {
        scroll: false,
      });
    }
  };

  return (
    <form onChange={handleFormChanges} className={s.attributeSelectorForm}>
      {attributeGroups.map((group) => {
        return <AttributeGroupRender group={group} key={group.groupName} />;
      })}
    </form>
  );
}

function AttributeGroupRender({ group }: { group: AttributeGroup }) {
  return (
    <div key={group.groupName}>
      <fieldset>
        <legend className={s.legend}>{group.groupName}</legend>
        <div
          className={clsx(s.optionsContainer, {
            [s.textOptionsContainer]: group.type === ProductAttributeType.Text,
            [s.swatchOptionsContainer]:
              group.type === ProductAttributeType.Swatch,
          })}
        >
          {group.options.map((option) => {
            const optionId = `attribute-${group.groupName}-${option.value}`;

            if (group.type === ProductAttributeType.Swatch) {
              return <SwatchOption key={optionId} option={option} />;
            }

            return (
              <div key={optionId} className={clsx(s.textOption)}>
                <input
                  hidden
                  aria-hidden
                  type="radio"
                  id={optionId}
                  name={group.groupName}
                  value={option.value}
                  checked={option.checked}
                  disabled={option.disabled}
                  className={s.textOptionInput}
                  onChange={() => {}}
                />
                <label htmlFor={optionId}>
                  <div className={s.value}>{option.value}</div>
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

function SwatchOption({ option }: { option: OptionType }) {
  return (
    <div className={s.swatchOption}>
      <input
        disabled={option.disabled}
        id={option.id}
        name={option.name}
        type="radio"
        value={option.value}
        checked={option.checked}
        onChange={() => {}}
        hidden
        className={s.swatchInput}
      />
      <label htmlFor={option.id} className={s.swatchLabel}>
        {option.src ? (
          <ThorImage
            className={s.swatchMedia}
            src={option?.src ?? ""}
            alt={option.label || ""}
            sizes="128px"
            fill
          />
        ) : (
          <span
            className={s.swatchColor}
            style={{ "--color": option.color || "#FFFFFF" } as CSSProperties}
          />
        )}
      </label>
    </div>
  );
}
