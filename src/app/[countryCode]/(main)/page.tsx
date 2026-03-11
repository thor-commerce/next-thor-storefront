import { HomePageQuery, HomePageQueryVariables } from "@/__generated__/thor/graphql";
import Homepage from "@/features/home/homepage";
import { HOME_PAGE_QUERY } from "@/features/home/queries";
import { getClient } from "@/lib/thor/apollo-client";
import { getCountryByCountryCode } from "@/utils/countries";
import { notFound } from "next/navigation";

export default async function HomePage({ params }: PageProps<"/[countryCode]">) {
	const { countryCode } = await params;
  const country = getCountryByCountryCode(countryCode);

  const { data } = await getClient().query<HomePageQuery, HomePageQueryVariables>({
    query: HOME_PAGE_QUERY,
    variables: {
      currency: country.currencies[0],
      storeId: country.store,
    },
  });

  if (!data) {
    return notFound();
  }

	return <Homepage data={data} />;
}
