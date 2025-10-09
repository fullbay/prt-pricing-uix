import { useMutation, useQueryClient } from "@tanstack/react-query";

import { env } from "../../config/env";
import {
  UpdatePartPricingScaleDocument,
  UpdatePartPricingScaleMutation,
  UpdatePartPricingScaleMutationVariables,
} from "../../graphql/generated/graphqlTypes";
import { graphqlClient } from "../../lib/graphql-client";

export function useUpdatePartPricingScaleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      pricingScaleId,
      input,
    }: {
      pricingScaleId: string;
      input: UpdatePartPricingScaleMutationVariables["input"];
    }) => {
      const variables: UpdatePartPricingScaleMutationVariables = {
        accountId: env.ACCOUNT_ID,
        pricingScaleId,
        input,
      };
      const data = await graphqlClient.request<UpdatePartPricingScaleMutation>(
        UpdatePartPricingScaleDocument,
        variables
      );
      return data.updatePartPricingScale;
    },
    onSuccess: (data) => {
      // Invalidate both the list and the specific item
      queryClient.invalidateQueries({
        queryKey: ["partPricingScales", "list"],
      });
      queryClient.invalidateQueries({
        queryKey: ["partPricingScales", "get", data.pricingScaleId],
      });
    },
  });
}
