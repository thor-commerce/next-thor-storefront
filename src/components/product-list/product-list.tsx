import { PropsWithChildren } from "react";
import s from "./product-list.module.css";

type Props = {} & PropsWithChildren;

export default function ProductList({ children }: Props) {
	return <ul className={s.grid}>{children}</ul>;
}
