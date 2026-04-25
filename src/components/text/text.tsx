import clsx from "clsx";
import React, { ComponentPropsWithoutRef, ElementType, forwardRef, Ref } from "react";
import classes from "./text.module.css";
import { ResponsiveProp, generateResponsiveClasses, isResponsiveProp } from "@/utils/responsive-props";

type TextSize = "body-1" | "body-2" | "body-3" | "heading-1" | "heading-2" | "heading-3" | "heading-4";
type TextWeight = "normal" | "medium" | "semibold";

type TextProps<T extends ElementType = "span"> = {
	as?: T;
	size?: ResponsiveProp<TextSize>;
	muted?: boolean;
	weight?: ResponsiveProp<TextWeight>;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "size" | "weight">;

type TextComponent = <T extends ElementType = "span">(
	props: TextProps<T> & { ref?: Ref<HTMLElement> },
) => React.ReactElement | null;

const TextInner = forwardRef(function Text<T extends ElementType = "span">(
	{ as, className, muted = false, size, weight = "normal", ...rest }: TextProps<T>,
	ref: Ref<HTMLElement>,
) {
	const Component = (as || "span") as ElementType;

	const isSizeResponsive = isResponsiveProp(size);
	const isWeightResponsive = isResponsiveProp(weight);

	const sizeClassName = isSizeResponsive ? generateResponsiveClasses(size, "size", classes) : "";
	const weightClassName = isWeightResponsive ? generateResponsiveClasses(weight, "weight", classes) : "";

	const dataSize = !isSizeResponsive ? size : undefined;
	const dataWeight = !isWeightResponsive ? weight : undefined;

	return (
		<Component
			className={clsx(className, classes.text, sizeClassName, weightClassName, muted && classes.muted)}
			data-size={dataSize}
			data-weight={dataWeight}
			{...rest}
			ref={ref}
		/>
	);
}) as unknown as TextComponent & { displayName: string };

TextInner.displayName = "Text";
const Text: TextComponent & { displayName: string } = TextInner;

export type TextComponentProps<T extends ElementType = "span"> = TextProps<T>;
export default Text;
