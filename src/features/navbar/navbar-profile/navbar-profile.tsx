import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import s from "./navbar-profile.module.css";
import Navigation from "@/components/navigation/navigation";
import NavbarProfileDropdown from "./navbar-profile-dropdown";

export const dynamic = "force-dynamic";

export default async function NavbarProfile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user)
    return (
      <Navigation href="/account" className={s.navLink}>
        Sign in
      </Navigation>
    );

  return <NavbarProfileDropdown email={user.email || ""} />;
}
