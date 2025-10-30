import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";
import possibleTypes from "@/__generated__/thor/possibleTypes.json";
import { TypedTypePolicies } from "@/__generated__/thor/apollo-helpers";
import { ApolloLink, disableFragmentWarnings, HttpLink } from "@apollo/client";

disableFragmentWarnings();

export const { getClient, PreloadQuery } = registerApolloClient(() => {
  // const session = await auth();

  return new ApolloClient({
    dataMasking: true, // Enable data masking for better debugging
    cache: new InMemoryCache({
      possibleTypes: possibleTypes.possibleTypes,
      typePolicies: {} as TypedTypePolicies,
    }),
    link: ApolloLink.from([
      new HttpLink({
        uri: `https://api.thorcommerce.io/${process.env.THOR_COMMERCE_ORGANIZATION}/storefront/graphql`,
        // you can disable result caching here if you want to
        // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
        // fetchOptions: { cache: "no-store" },
      }),
    ]),
  });
});
