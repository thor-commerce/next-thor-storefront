import { PropsWithChildren } from "react";
import s from "./product-grid.module.css";
type Props = {} & PropsWithChildren;

export default function ProductGrid({ children }: Props) {
  return <ul className={s.grid}>{children}</ul>;
}
