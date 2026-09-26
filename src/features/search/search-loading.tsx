import Spinner from "@/components/spinner/spinner";
import s from "./search.module.css";

export default function SearchLoading() {
	return (
		<div className={s.status} role="status">
			<Spinner size="small" /> Searching products…
		</div>
	);
}
