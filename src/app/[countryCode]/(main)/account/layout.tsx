import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
	title: "Your account — Nordform",
	robots: { index: false, follow: false },
};

export default async function AccountPageLayout({
	children,
	login,
}: {
	children: React.ReactNode;
	login: React.ReactNode;
}) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session?.user) {
		return <>{children}</>;
	}

	return <>{login}</>;
}
