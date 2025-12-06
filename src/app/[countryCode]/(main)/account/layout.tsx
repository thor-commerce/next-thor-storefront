import { authClient } from "@/lib/auth-client";

export default async function AccountPageLayout({
  login,
}: LayoutProps<"/[countryCode]/account">) {
  const { data } = await authClient.getSession();
  console.log(data)
  return <div>{login}</div>;
}
