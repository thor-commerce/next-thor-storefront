"use client";
import Link, { LinkProps } from "next/link";
import { useParams } from "next/navigation";
import { AnchorHTMLAttributes, Suspense } from "react";

type Props = object;

type NativeAttrs = Omit<
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps,
  keyof Props
>;
export type NavigationProps = Props & NativeAttrs;

export function InternalNavigation({
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

export default function Navigation({ ...props }: NavigationProps) {
  return (
    <Suspense>
      <InternalNavigation {...props} />
    </Suspense>
  );
}
