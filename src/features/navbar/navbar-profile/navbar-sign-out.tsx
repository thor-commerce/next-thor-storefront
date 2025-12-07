"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

type NavbarSignOutButtonProps = object;

const NavbarSignOutButton: FC<NavbarSignOutButtonProps> = ({}) => {
  const router = useRouter();

  async function logout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess() {
          router.push("/"); 
          router.refresh(); 
        },
      },
    });
  }

  return <button onClick={logout}>Sign out</button>;
};

export default NavbarSignOutButton;
