import Navigation from "@/components/navigation/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import NavbarProfileDropdown from "./navbar-profile-dropdown";
import s from "./navbar-profile.module.css";
import { UserIcon } from "lucide-react";

export default async function NavbarProfile() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	const user = session?.user;

	if (!user)
		return (
			<Navigation href="/account" className={s.navLink}>
				<UserIcon strokeWidth={1.5} />
			</Navigation>
		);

	return <NavbarProfileDropdown email={user.email || ""} />;
}
