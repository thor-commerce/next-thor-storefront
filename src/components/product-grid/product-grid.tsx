import { PropsWithChildren } from "react";
import s from "./product-grid.module.css";
import { SkeletonBox } from "../skeleton-box/skeleton-box";
type Props = {} & PropsWithChildren;

export default function ProductGrid({ children }: Props) {
  return <ul className={s.grid}>{children}</ul>;
}

export function ProductGridSkeleton() {
  return (
    <ul className={s.grid}>
      {[...Array(15)].map((_, index) => (
        <li className={s.tile} key={index}>
        <div className={s.linkWrapper}>
          <div className={s.imageWrapper}>
            <SkeletonBox width={"100%"} height="100%" />
          </div>
          <div className={s.productInfo}>
            <SkeletonBox width={"80%"} height="20px" />
          </div>
          <div className={s.productPriceInfo}>
            <SkeletonBox width={"60%"} height="20px" />
          </div>
        </div>
      </li>
      ))}
    </ul>
  );
}
