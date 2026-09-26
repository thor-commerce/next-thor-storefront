"use client";

import Navigation from "@/components/navigation/navigation";
import s from "@/features/search/search.module.css";

export default function SearchError({ retry }: { retry: () => void }) {
	return (
		<div className={`${s.status} ${s.error}`} role="alert">
			<h1>Search is temporarily unavailable</h1>
			<p>Please try again in a moment.</p>
			<button type="button" className={s.retry} onClick={retry}>
				Try again
			</button>
			<Navigation href="/search">Start a new search</Navigation>
		</div>
	);
}
