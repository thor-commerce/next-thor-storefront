import { ReactNode } from "react";
import { SkeletonBox } from "../skeleton-box/skeleton-box";
import s from "./product-grid.module.css";

type Props = {
  heading: string;
  meta?: string;
  actions?: ReactNode;
};

export default function ProductGridHeader({
  heading,
  meta,
  actions,
}: Props) {
  return (
    <header className={s.header}>
      <div className={s.headerInner}>
        <div className={s.headerCopy}>
          <h1 className={s.heading}>{heading}</h1>
          {meta && <p className={s.meta}>{meta}</p>}
        </div>
        {actions && <div className={s.headerActions}>{actions}</div>}
      </div>
    </header>
  );
}

export function ProductGridHeaderSkeleton() {
  return (
    <header className={s.header}>
      <div className={s.headerInner}>
        <div className={s.headerCopy}>
          <SkeletonBox width="14rem" height="2rem" />
          <div className={s.metaSkeleton}>
            <SkeletonBox width="6rem" height="1rem" />
          </div>
        </div>
        <div className={s.headerActions}>
          <SkeletonBox width="100%" height="3rem" />
        </div>
      </div>
    </header>
  );
}
