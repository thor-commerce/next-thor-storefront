"use client";

import { useState, useRef, useEffect } from "react";
import Navigation from "@/components/navigation/navigation";
import NavbarSignOutButton from "./navbar-sign-out";
import s from "./navbar-profile.module.css";

type NavbarProfileDropdownProps = {
  email: string;
};

export default function NavbarProfileDropdown({
  email,
}: NavbarProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  return (
    <div className={s.profileContainer} ref={dropdownRef}>
      <div className={s.avatar} onClick={() => setIsOpen(!isOpen)}>
        {email?.charAt(0).toUpperCase() || "U"}
      </div>
      {isOpen && (
        <div className={s.dropdown}>
          <div className={s.dropdownContent}>
            <div className={s.userInfo}>
              <span className={s.userEmail}>{email}</span>
            </div>
            <Navigation href="/account" className={s.dropdownLink}>
              My Account
            </Navigation>
            <NavbarSignOutButton />
          </div>
        </div>
      )}
    </div>
  );
}
