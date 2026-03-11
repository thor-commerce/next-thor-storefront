import type { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const thorSchema: CodegenConfig["generates"][number] = {
  schema: {
    [`https://api.thorcommerce.io/${process.env.NEXT_PUBLIC_THOR_COMMERCE_ORGANIZATION}/storefront/graphql/schema.graphql`]:
      {},
  },
  documents: ["src/**/*.{ts,tsx}", "!src/__generated__/**"],
};

const THOR_GENERATED_OUTPUT_DIR = "src/__generated__/thor" as const;

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  generates: {
    [`${THOR_GENERATED_OUTPUT_DIR}/schema.graphql`]: {
      ...thorSchema,
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
    [`${THOR_GENERATED_OUTPUT_DIR}/`]: {
      ...thorSchema,
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false,
      },
      config: {
        useTypeImports: true,
        customDirectives: {
          apolloUnmask: true,
        },
        inlineFragmentTypes: "mask",
      },
    },
    [`${THOR_GENERATED_OUTPUT_DIR}/possibleTypes.json`]: {
      ...thorSchema,
      plugins: ["fragment-matcher"],
    },
    [`${THOR_GENERATED_OUTPUT_DIR}/apollo-helpers.ts`]: {
      ...thorSchema,
      plugins: ["typescript-apollo-client-helpers"],
    },
  },
};

export default config;
