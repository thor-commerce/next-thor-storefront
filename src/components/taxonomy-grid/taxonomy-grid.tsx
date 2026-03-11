"use client";

import Navigation from "@/components/navigation/navigation";
import { SkeletonBox } from "@/components/skeleton-box/skeleton-box";
import s from "./taxonomy-grid.module.css";

export type TaxonomyGridItem = {
  id: string;
  href: string;
  title: string;
  meta: string;
};

type Props = {
  items: TaxonomyGridItem[];
};

export default function TaxonomyGrid({ items }: Props) {
  return (
    <ul className={s.grid}>
      {items.map((item) => (
        <li key={item.id} className={s.card}>
          <Navigation href={item.href} className={s.link}>
            <h2 className={s.title}>{item.title}</h2>
            <div>
              <div className={s.meta}>{item.meta}</div>
            </div>
          </Navigation>
        </li>
      ))}
    </ul>
  );
}

export function TaxonomyGridSkeleton() {
  return (
    <ul className={s.grid}>
      {[...Array(6)].map((_, index) => (
        <li key={index} className={s.card}>
          <div className={s.link}>
            <div>
              <SkeletonBox width="5rem" height="0.875rem" />
              <div style={{ marginTop: "0.75rem" }}>
                <SkeletonBox width="70%" height="2rem" />
              </div>
            </div>
            <div>
              <SkeletonBox width="60%" height="1rem" />
              <div style={{ marginTop: "0.75rem" }}>
                <SkeletonBox width="5.5rem" height="1rem" />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
