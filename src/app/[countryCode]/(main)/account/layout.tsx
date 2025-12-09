import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AccountPageLayout({
  login,
}: {
  login: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    return (
      <div>
        Your account dashboard
        <div>{session.user.name}</div>
      </div>
    );
  }

  return <div>{login}</div>;
}
