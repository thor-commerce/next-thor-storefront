import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Navigation from "@/components/navigation/navigation";
import TopBarAnimator from "./top-bar-animator";
import headerStyles from "../../navbar.module.css";
import s from "./top-bar.module.css";

export async function TopBar() {
	const session = await auth.api.getSession({ headers: await headers() });
	return (
		<TopBarAnimator>
			<aside className={s.topBar} data-top-bar aria-label="Store information">
				<div className={`${headerStyles.container} ${s.content}`}>
					<p className={s.brand}>
						A Next.js reference project for <a href="https://thorcommerce.io">Thor Commerce</a>.
					</p>
					<Navigation href="/account">{session?.user ? `Hi, ${session.user.name}` : "Sign in"}</Navigation>
				</div>
			</aside>
		</TopBarAnimator>
	);
}
