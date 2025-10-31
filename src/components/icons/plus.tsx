import React, { type PropsWithChildren } from "react";

interface Props {
  width?: string;
  height?: string;
}
type NativeAttrs = Omit<React.HTMLAttributes<SVGSVGElement>, keyof Props>;

export type PlusIconProps = Props & NativeAttrs;

const PlusIcon = React.forwardRef<
  SVGSVGElement,
  PropsWithChildren<PlusIconProps>
>(({ className, width, height, ...props }, ref) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={width || "12"}
      height={height || "12"}
      ref={ref}
      className={className}
      {...props}
    >
      <path
        fill="currentColor"
        d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"
      ></path>
    </svg>
  );
});

PlusIcon.displayName = "PlusIcon";
export default PlusIcon;
