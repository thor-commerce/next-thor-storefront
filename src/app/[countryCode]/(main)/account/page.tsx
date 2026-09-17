import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { storefrontFetch } from "@/lib/thorcommerce/storefront";
import { AccountDashboardDocument } from "@/lib/thorcommerce/storefront/generated/types.generated";
import AccountPage from "@/features/account/account-page/account-page";

export default async function Account({
	searchParams,
}: {
	searchParams: Promise<{ after?: string | string[] }>;
}) {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session?.user) return null;
	const params = await searchParams;
	const after = typeof params.after === "string" ? params.after : undefined;
	const { customer } = await storefrontFetch({ query: AccountDashboardDocument, variables: { after } });
	if (!customer) throw new Error("Unable to load the signed-in customer account.");
	return <AccountPage customer={customer} hasCursor={Boolean(after)} />;
}
