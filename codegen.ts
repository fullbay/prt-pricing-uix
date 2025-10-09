import type { CodegenConfig } from "@graphql-codegen/cli";

import { config } from "dotenv";

// Load environment variables
config();

const codegenConfig: CodegenConfig = {
  overwrite: true,
  schema: "../prt-aps/terraform/schema.graphql",
  documents: ["src/graphql/**/*.graphql", "src/graphql/**/*.gql"],
  generates: {
    "src/graphql/generated/graphqlTypes.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        skipTypename: true,
        enumsAsTypes: true,
        scalars: {
          AWSJSON: "string",
        },
        avoidOptionals: {
          field: true,
          inputValue: false,
        },
        withHooks: false,
      },
    },
  },
};

export default codegenConfig;
