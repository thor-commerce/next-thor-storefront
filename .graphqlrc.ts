import type { IGraphQLConfig } from "graphql-config";
import { loadEnvConfig } from "@next/env";
import { CodegenConfig } from "@graphql-codegen/cli";
loadEnvConfig(process.cwd());


export default {
  projects: {
    default: {
      schema: "https://api.thorcommerce.io/storefront/graphql",
      documents: "src/lib/thorcommerce/storefront/**/*.graphql",
      extensions: {
        codegen: {
          overwrite: true,
          config: {
            strict: true,
            useTypeImports: true,
            skipTypename: true,
            scalars: {
              Long: "number",
            }
          },
          hooks: { afterOneFileWrite: ["prettier --write"] },
          generates: {
            "src/lib/thorcommerce/storefront/generated/types.generated.ts": {
              config: {
                documentMode: "string",
              },
              plugins: ["typescript", "typescript-operations", "typed-document-node"],
            },
          }
        } satisfies CodegenConfig
      }
    }
  }
} satisfies IGraphQLConfig;
