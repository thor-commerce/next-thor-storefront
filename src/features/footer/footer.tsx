import Navigation from "@/components/navigation/navigation";
import { CodeXml } from "lucide-react";
import { Suspense } from "react";
import MarketSelector from "./market-selector";
import s from "./footer.module.css";

export default function Footer() {
	return (
		<footer className={s.footer}>
			<div className={s.content}>
				<div>
					<Navigation href="/" className={s.wordmark}>
						NORDFORM
					</Navigation>
					<p className={s.tagline}>Everyday, in your own way.</p>
				</div>
				<nav aria-label="Footer navigation" className={s.links}>
					<Navigation href="/account">Your account</Navigation>
					<a
						href="https://github.com/thor-commerce/next-thor-storefront"
						target="_blank"
						rel="noopener noreferrer"
					>
						<CodeXml size={18} aria-hidden="true" /> View on GitHub
						<span className={s.srOnly}> (opens in a new tab)</span>
					</a>
				</nav>
				<Suspense>
					<MarketSelector />
				</Suspense>
			</div>
		</footer>
	);
}
