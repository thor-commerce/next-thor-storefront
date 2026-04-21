import clsx from "clsx";
import React, { type ComponentProps, type ElementType, type Ref, forwardRef } from "react";
import s from "./icon-button.module.css";

export type PolyMorphicOnClickEvent<T extends ElementType> = ComponentProps<T>["onClick"];

interface Props<T extends ElementType = ElementType> {
	as?: T;
	icon?: React.ReactNode;
	onClick?: PolyMorphicOnClickEvent<T>;
	disabled?: boolean;
	className?: string;
	"aria-label"?: string;
}

export type IconButtonProps<T extends ElementType = ElementType> = Props<T> &
	Omit<ComponentProps<T>, keyof Props>;

const IconButtonComponent: <T extends ElementType = "button">(
	props: IconButtonProps<T>,
	// eslint-disable-next-line react/display-name
) => React.ReactNode | null = forwardRef(
	<T extends ElementType>(
		{ as, icon, disabled, className, ...props }: IconButtonProps,
		ref: Ref<T | null>,
	) => {
		const Component = as || "button";

		return (
			<Component
				className={clsx(s.button, className)}
				{...props}
				ref={ref}
				aria-disabled={disabled}
				disabled={disabled}
			>
				{icon}
			</Component>
		);
	},
);

const IconButton = IconButtonComponent;
export default IconButton;
