import type { IGraphQLConfig } from "graphql-config";
import THOR_GENERATED_OUTPUT_DIR from "./codegen";

const config: IGraphQLConfig = {
  schema: `${THOR_GENERATED_OUTPUT_DIR}/schema.graphql`,
  documents: ["**/*.{ts,tsx}", "!src/__generated__/**"],
};

export default config;
