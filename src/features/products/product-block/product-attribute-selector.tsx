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
  const renderAsColorText = shouldRenderAsColorText(group);
  const selectedOption = group.options.find((option) => option.checked);

  return (
    <div key={group.groupName}>
      <fieldset>
        <legend className={s.legend}>
          <span>{group.groupName}</span>
          {selectedOption?.value ? (
            <span className={s.selectedValue}>{selectedOption.value}</span>
          ) : null}
        </legend>
        <div
          className={clsx(s.optionsContainer, {
            [s.textOptionsContainer]:
              group.type === ProductAttributeType.Text && !renderAsColorText,
            [s.colorTextOptionsContainer]:
              group.type === ProductAttributeType.Text && renderAsColorText,
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
              <div
                key={optionId}
                className={clsx(s.textOption, {
                  [s.colorTextOption]: renderAsColorText,
                })}
              >
                <input
                  hidden
                  aria-hidden
                  type="radio"
                  id={optionId}
                  name={group.groupName}
                  value={option.value}
                  aria-label={String(option.value)}
                  checked={option.checked}
                  disabled={option.disabled}
                  className={s.textOptionInput}
                  onChange={() => {}}
                />
                <label htmlFor={optionId}>
                  {renderAsColorText && (
                    <span
                      className={s.colorDot}
                      style={
                        {
                          "--color": getColorValue(String(option.value)),
                        } as CSSProperties
                      }
                    />
                  )}
                  <div
                    className={clsx(s.value, {
                      [s.colorValue]: renderAsColorText,
                    })}
                  >
                    {option.value}
                  </div>
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
  const isImageSwatch = Boolean(option.src);

  return (
    <div
      className={clsx(s.swatchOption, {
        [s.imageSwatchOption]: isImageSwatch,
        [s.colorSwatchOption]: !isImageSwatch,
      })}
    >
      <input
        disabled={option.disabled}
        id={option.id}
        name={option.name}
        type="radio"
        value={option.value}
        aria-label={String(option.value)}
        checked={option.checked}
        onChange={() => {}}
        hidden
        className={s.swatchInput}
      />
      <label
        htmlFor={option.id}
        className={clsx(s.swatchLabel, {
          [s.imageSwatchLabel]: isImageSwatch,
          [s.colorSwatchLabel]: !isImageSwatch,
        })}
      >
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

function shouldRenderAsColorText(group: AttributeGroup) {
  return (
    group.type === ProductAttributeType.Text &&
    /color|colour/i.test(group.groupName)
  );
}

function getColorValue(value: string) {
  const normalized = value.trim().toLowerCase();

  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(normalized)) {
    return normalized;
  }

  const colorMap: Record<string, string> = {
    black: "#111827",
    midnight: "#0f172a",
    "midnight black": "#111827",
    white: "#f8fafc",
    ivory: "#f8f3e8",
    cream: "#f4ead8",
    beige: "#d6c2a1",
    tan: "#b8926a",
    brown: "#6b4f3a",
    chestnut: "#7b4b33",
    bronze: "#8a623a",
    gold: "#c7a449",
    silver: "#b8c0cc",
    gray: "#94a3b8",
    grey: "#94a3b8",
    charcoal: "#364152",
    blue: "#4b7bec",
    navy: "#233876",
    green: "#3f8f5f",
    olive: "#6b7b3d",
    red: "#c84b4b",
    burgundy: "#7c2d3a",
    pink: "#d48ca6",
    rose: "#d6a0ad",
    purple: "#7e5bef",
    lavender: "#b8a4e3",
    orange: "#d9822b",
    yellow: "#d4b044",
    nude: "#cfac8b",
  };

  if (colorMap[normalized]) {
    return colorMap[normalized];
  }

  const mappedEntry = Object.entries(colorMap).find(([key]) =>
    normalized.includes(key),
  );

  return mappedEntry?.[1] ?? "#cbd5e1";
}
