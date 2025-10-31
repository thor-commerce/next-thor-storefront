"use client";
import Link, { LinkProps } from "next/link";
import { useParams } from "next/navigation";
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
  const { countryCode } = useParams<{ countryCode: string }>();
  return (
    <Link href={`/${countryCode}${href}`} {...props}>
      {children}
    </Link>
  );
}
