 
import clsx from "clsx";
import React, {
  type ComponentProps,
  type ElementType,
  type Ref,
  forwardRef,
} from "react";
import s from "./button.module.css";

export type PolyMorphicOnClickEvent<T extends ElementType> =
  ComponentProps<T>["onClick"];

interface Props<T extends ElementType = ElementType> {
  as?: T;
  variant?: "primary" | "secondary";
  onClick?: PolyMorphicOnClickEvent<T>;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  block?: boolean;
  trailingIcon?: React.ReactNode;
}

export type ButtonProps<T extends ElementType = ElementType> = Props<T> &
  Omit<ComponentProps<T>, keyof Props>;

const ButtonComponent: <T extends ElementType = "button">(
  props: ButtonProps<T>
// eslint-disable-next-line react/display-name
) => React.ReactNode | null = forwardRef(
  <T extends ElementType>(
    {
      as,
      children,
      loading,
      icon,
      variant = "primary",
      disabled,
      trailingIcon,
      block = false,
      size = "md",
      className,
      ...props
    }: ButtonProps,
    ref: Ref<T | null>
  ) => {
    const Component = as || "button";

    const rootClassName = clsx(
      s.button,
      {
        ["primary"]: variant === s.primary,
        ["secondary"]: variant === s.secondary,
        ["disabled"]: disabled,
        ["loading"]: loading,
        ["xl"]: size === "xl",
        ["lg"]: size === "lg",
        ["md"]: size === "md",
        ["sm"]: size === "sm",
      },
      className
    );

    return (
      <Component
        className={rootClassName}
        {...props}
        ref={ref}
        data-variant={variant}
        data-block={block}
        data-loading={loading}
        aria-disabled={disabled || loading}
        disabled={disabled || loading}

      >
        {loading && (
          <div className={s.spinnerButton}>
            <div className={s.spinner}>
              <span className={s.spinnerSpan}>Loading...</span>
            </div>
          </div>
        )}
        {icon && <span className={s.icon}>{icon}</span>}
        <span className={s.label}>{children}</span>
        {trailingIcon && (
          <span className={s.trailingIcon}>
            {trailingIcon}
          </span>
        )}
      </Component>
    );
  }
);

const Button = ButtonComponent;
export default Button;
