import Homepage from "@/features/home/homepage";
import { getHomePageData } from "@/lib/thorcommerce/storefront";
import { notFound } from "next/navigation";

export default async function HomePage({}: PageProps<"/[countryCode]">) {
	const data = await getHomePageData();

	if (!data) {
		return notFound();
	}

	return <Homepage data={data} />;
}
