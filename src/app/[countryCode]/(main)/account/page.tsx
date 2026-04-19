import { AccountDashboardQuery } from "@/__generated__/thor/graphql";
import AccountDashboard from "@/features/account/dashboard";
import { ACCOUNT_DASHBOARD_QUERY } from "@/features/account/queries";
import { getClient } from "@/lib/thorcommerce/apollo-client";
import { notFound } from "next/navigation";
import { connection } from "next/server";

export default async function AccountPage() {
	return notFound();

	// const { data } = await getClient().query<AccountDashboardQuery>({
	// 	query: ACCOUNT_DASHBOARD_QUERY,
	// });

	// if (!data?.customer) {
	// 	return notFound();
	// }

	// return <AccountDashboard customer={data.customer} />;
}
