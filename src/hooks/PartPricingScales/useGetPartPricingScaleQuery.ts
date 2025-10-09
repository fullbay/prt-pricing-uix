import { useQuery } from "@tanstack/react-query";

import { env } from "../../config/env";
import {
  GetPartPricingScaleDocument,
  GetPartPricingScaleQuery,
  GetPartPricingScaleQueryVariables,
} from "../../graphql/generated/graphqlTypes";
import { graphqlClient } from "../../lib/graphql-client";

export function useGetPartPricingScaleQuery(pricingScaleId: string) {
  return useQuery({
    queryKey: ["partPricingScales", "get", pricingScaleId],
    queryFn: async () => {
      const variables: GetPartPricingScaleQueryVariables = {
        accountId: env.ACCOUNT_ID,
        pricingScaleId,
      };
      const data = await graphqlClient.request<GetPartPricingScaleQuery>(
        GetPartPricingScaleDocument,
        variables
      );
      return data.getPartPricingScale;
    },
    enabled: !!pricingScaleId,
  });
}
