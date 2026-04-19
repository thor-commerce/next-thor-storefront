import { ReactNode } from "react";
import s from "./product-list.module.css";

type Props = {
	heading: string;
	meta?: string;
	actions?: ReactNode;
};

export default function ProductGridHeader({ heading, meta, actions }: Props) {
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
