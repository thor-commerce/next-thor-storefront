"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import s from "./product-list.module.css";

export default function ProductPagination({
	pageInfo,
}: {
	pageInfo: { hasNextPage: boolean; endCursor?: string | null };
}) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const hasNextPage = pageInfo.hasNextPage && pageInfo.endCursor;
	if (!searchParams.has("after") && !hasNextPage) return null;
	const href = (cursor?: string | null) => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("after");
		if (cursor) params.set("after", cursor);
		return `${pathname}${params.size ? `?${params}` : ""}`;
	};
	return (
		<nav className={s.pagination} aria-label="Product pages">
			{searchParams.has("after") && <Link href={href()}>First page</Link>}
			{hasNextPage && <Link href={href(pageInfo.endCursor)}>Next page</Link>}
		</nav>
	);
}
