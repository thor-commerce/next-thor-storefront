import clsx from "clsx";
import s from "./spinner.module.css";
const sizeMap = {
  small: "16px",
  medium: "32px",
  large: "64px",
};
type SpinnerProps = {
  /** Sets the width and height of the spinner. */
  size?: keyof typeof sizeMap;
  className?: string;
  style?: React.CSSProperties;
} & React.HTMLAttributes<SVGElement>;

export default function Spinner({
  size: sizeKey = "medium",
  "aria-label": ariaLabel,
  className,
  style,
  ...props
}: SpinnerProps) {
  const size = sizeMap[sizeKey];
  return (
    <span className={s.box}>
      <svg
        height={size}
        width={size}
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
        aria-label={ariaLabel ?? undefined}
        className={clsx(className, s.spinnerAnimation)}
        style={style}
        {...props}
      >
        <circle
          cx="8"
          cy="8"
          r="7"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M15 8a7.002 7.002 0 00-7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}
