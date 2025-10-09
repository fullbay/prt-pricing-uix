import { useMutation, useQueryClient } from "@tanstack/react-query";

import { env } from "../../config/env";
import {
  DeletePartPricingScaleDocument,
  DeletePartPricingScaleMutation,
  DeletePartPricingScaleMutationVariables,
} from "../../graphql/generated/graphqlTypes";
import { graphqlClient } from "../../lib/graphql-client";

export function useDeletePartPricingScaleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (pricingScaleId: string) => {
      const variables: DeletePartPricingScaleMutationVariables = {
        accountId: env.ACCOUNT_ID,
        pricingScaleId,
      };
      const data = await graphqlClient.request<DeletePartPricingScaleMutation>(
        DeletePartPricingScaleDocument,
        variables
      );
      return data.deletePartPricingScale;
    },
    onSuccess: (_, pricingScaleId) => {
      // Invalidate both the list and the specific item
      queryClient.invalidateQueries({
        queryKey: ["partPricingScales", "list"],
      });
      queryClient.invalidateQueries({
        queryKey: ["partPricingScales", "get", pricingScaleId],
      });
    },
  });
}
