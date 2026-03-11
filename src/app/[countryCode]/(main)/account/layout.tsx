import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { connection } from "next/server";

export default async function AccountPageLayout({
  children,
  login,
}: {
  children: React.ReactNode;
  login: React.ReactNode;
}) {
  await connection();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    return <>{children}</>;
  }

  return <>{login}</>;
}
