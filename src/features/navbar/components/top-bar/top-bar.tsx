import s from "./top-bar.module.css";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import TopBarAnimator from "./top-bar-animator";
import Text from "@/components/text/text";
import { UserIcon } from "lucide-react";
import Navigation from "@/components/navigation/navigation";
import clsx from "clsx";

export async function TopBar() {
	const session = await auth.api.getSession({ headers: await headers() });

	return (
		<TopBarAnimator>
			<aside className={s.topBar} data-top-bar>
				<div className={s.content}>
					<div></div>
					<div className={s.center}>
						{/* {globalSettings?.calloutLink && (
							<TextLink as={Navigation} href={globalSettings.calloutLink.url} variant="body-xs">
								{globalSettings.calloutLink.name}
							</TextLink>
						)} */}
					</div>
					<div className={s.right}>
						<>
							{session?.user ? (
								<Text
									className={clsx(s.link, s.loginLink)}
									as={Navigation}
									href="/account"
									size={"body-3"}
									weight={"semibold"}
								>
									Hi, {session?.user.name}
									<UserIcon size={16} />
								</Text>
							) : (
								<Text
									className={clsx(s.link, s.loginLink)}
									as={Navigation}
									href="/account"
									size={"body-3"}
									weight={"semibold"}
								>
									Login
								</Text>
							)}

							{/* <span className={s.separator}></span> */}
							{/* <Text size="xs">
								<CountryButton countryCodeOnly={true} />
							</Text> */}
						</>
					</div>
				</div>
			</aside>
		</TopBarAnimator>
	);
}
