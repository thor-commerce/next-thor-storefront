import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";
import possibleTypes from "@/__generated__/thor/possibleTypes.json";
import { TypedTypePolicies } from "@/__generated__/thor/apollo-helpers";
import {
  ApolloLink,
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
  disableFragmentWarnings,
  HttpLink,
} from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";

disableFragmentWarnings();

const errorLink = new ErrorLink(({ error, operation }) => {
  // Apollo Client v4: Check if it's a CombinedGraphQLErrors (contains GraphQL errors from server)
  if (CombinedGraphQLErrors.is(error)) {
    // Log the full combined error structure
    console.error(
      "[GraphQL error]:",
      JSON.stringify(
        {
          message: error.message,
          errors: error.errors,
          data: error.data,
          operationName: operation.operationName,
        },
        null,
        2
      )
    );
  }
  // Check if it's a CombinedProtocolErrors (protocol-level issues)
  else if (CombinedProtocolErrors.is(error)) {
    // Log the full protocol error structure
    console.error(
      "[Protocol error]:",
      JSON.stringify(
        {
          message: error.message,
          errors: error.errors,
          operationName: operation.operationName,
        },
        null,
        2
      )
    );
  }
  // Handle other network/general errors
  else {
    console.error(
      "[Network error]:",
      JSON.stringify(
        {
          error: error,
          message: error?.message,
          operationName: operation.operationName,
        },
        null,
        2
      )
    );
  }
});

export const { getClient, PreloadQuery } = registerApolloClient(() => {
  // const session = await auth();

  return new ApolloClient({
    dataMasking: true, // Enable data masking for better debugging
    cache: new InMemoryCache({
      possibleTypes: possibleTypes.possibleTypes,
      typePolicies: {} as TypedTypePolicies,
    }),
    link: ApolloLink.from([
      errorLink,
      new HttpLink({
        uri: `https://api.thorcommerce.io/${process.env.THOR_COMMERCE_ORGANIZATION}/storefront/graphql`,
        // you can disable result caching here if you want to
        // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
        // fetchOptions: { cache: "no-store" },
      }),
    ]),
  });
});
