import React, { type PropsWithChildren } from "react";

type Props = object
type NativeAttrs = Omit<React.HTMLAttributes<SVGSVGElement>, keyof Props>;

export type SubtractIconProps = Props & NativeAttrs;

const SubtractIcon = React.forwardRef<
  SVGSVGElement,
  PropsWithChildren<SubtractIconProps>
>(({ className, ...props }, ref) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width="12"
      height="12"
      ref={ref}
      className={className}
      {...props}
    >
      <path fill="currentColor" d="M2 7.75A.75.75 0 0 1 2.75 7h10a.75.75 0 0 1 0 1.5h-10A.75.75 0 0 1 2 7.75Z"></path>
    </svg>
  );
});

SubtractIcon.displayName = "SubtractIcon";
export default SubtractIcon;
