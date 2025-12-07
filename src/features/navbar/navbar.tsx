import Navigation from "@/components/navigation/navigation";
import s from "./navbar.module.css";
import NavbarCart from "./navbar-cart/navbar-cart";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import NavbarProfile from "./navbar-profile/navbar-profile";

export default async function Navbar() {
  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <div className={s.left}>
          <div className={s.logo}>
            <Navigation href="/">
              <strong style={{ fontWeight: 600 }}>Thor</strong>
              Store
            </Navigation>
          </div>
          <nav className={s.nav}>
            <Navigation href="/products" className={s.navLink}>
              All products
            </Navigation>
          </nav>
        </div>
        <div className={s.right}>
          <Suspense>
            <NavbarProfile />
            <NavbarCart />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
