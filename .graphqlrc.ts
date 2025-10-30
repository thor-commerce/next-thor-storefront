import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  schema: "src/__generated__/thor/schema.graphql",
  documents: ["**/*.{ts,tsx}", "!src/__generated__/**"],
};

export default config;
