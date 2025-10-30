import { GraphQLCodegenDataMasking } from "@apollo/client/masking";
declare module "@apollo/client" {
  export const gql: never;
  export type TypeOverrides = GraphQLCodegenDataMasking.TypeOverrides;
}
