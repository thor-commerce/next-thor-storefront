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
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { createQueryPreloader } from "@apollo/client/react";
import { auth } from "@/lib/auth";

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

const authLink = new SetContextLink(async ({ headers }, operation) => {
  const sessionCtx = await auth.api.getSession({
    headers: await import("next/headers").then((mod) => mod.headers()),
  });

  return {
    headers: {
      ...headers,
      ...(sessionCtx?.session.token && {
        Authorization: `Bearer ${sessionCtx.session.token}`,
      }),
    },
  };
});

export const { getClient, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    dataMasking: true, // Enable data masking for better debugging
    cache: new InMemoryCache({
      possibleTypes: possibleTypes.possibleTypes,
      typePolicies: {} as TypedTypePolicies,
    }),
    link: ApolloLink.from([
      errorLink,
      authLink,
      new HttpLink({
        uri: `https://api.thorcommerce.io/${process.env.NEXT_PUBLIC_THOR_COMMERCE_ORGANIZATION}/storefront/graphql`,
      }),
    ]),
  });
});
