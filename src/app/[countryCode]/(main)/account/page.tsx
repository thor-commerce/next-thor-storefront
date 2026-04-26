import { notFound } from "next/navigation";

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
