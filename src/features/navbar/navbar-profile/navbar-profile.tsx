import Navigation from "@/components/navigation/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import NavbarProfileDropdown from "./navbar-profile-dropdown";
import s from "./navbar-profile.module.css";



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
