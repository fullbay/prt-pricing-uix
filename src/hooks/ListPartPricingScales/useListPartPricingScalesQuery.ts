import { useQuery } from "@tanstack/react-query";

import { env } from "../../config/env";
import {
  ListPartPricingScalesDocument,
  ListPartPricingScalesQuery,
  ListPartPricingScalesQueryVariables,
  PricingState,
} from "../../graphql/generated/graphqlTypes";
import { graphqlClient } from "../../lib/graphql-client";

export function useListPartPricingScalesQuery(
  limit?: number,
  cursor?: string,
  state?: PricingState
) {
  return useQuery({
    queryKey: ["partPricingScales", "list", limit, cursor, state],
    queryFn: async () => {
      const variables: ListPartPricingScalesQueryVariables = {
        accountId: env.ACCOUNT_ID,
        limit,
        cursor,
        state,
      };
      const data = await graphqlClient.request<ListPartPricingScalesQuery>(
        ListPartPricingScalesDocument,
        variables
      );
      return data.listPartPricingScales;
    },
    enabled: true, // Always enabled since we have accountId from env
  });
}
