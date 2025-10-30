import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";

type Props = object;

type NativeAttrs = Omit<
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps,
  keyof Props
>;
export type NavigationProps = Props & NativeAttrs;

export default function Navigation({
  href,
  children,
  ...props
}: NavigationProps) {
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
