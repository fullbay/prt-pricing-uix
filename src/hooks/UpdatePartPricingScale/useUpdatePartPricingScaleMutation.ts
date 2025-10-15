import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UpdatePartPricingScaleDocument,
  UpdatePartPricingScaleMutation,
  UpdatePartPricingScaleMutationVariables,
} from "../../graphql/generated/graphqlTypes";
import { graphqlClient } from "../../lib/graphql-client";

async function updatePartPricingScale(
  variables: UpdatePartPricingScaleMutationVariables
): Promise<UpdatePartPricingScaleMutation["updatePartPricingScale"]> {
  const data = await graphqlClient.request<UpdatePartPricingScaleMutation>(
    UpdatePartPricingScaleDocument,
    variables
  );
  return data.updatePartPricingScale;
}

export function useUpdatePartPricingScaleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: UpdatePartPricingScaleMutationVariables) => {
      return updatePartPricingScale(variables);
    },
    onSuccess: (_updatedScale, variables) => {
      // Invalidate and refetch the list of pricing scales
      queryClient.invalidateQueries({
        queryKey: ["partPricingScales", "list"],
      });
      // Check if isDefault was modified in the input
      if (variables.input.isDefault !== undefined) {
        // isDefault was changed - invalidate ALL get queries
        // (we don't know which scale was previously default)
        queryClient.invalidateQueries({
          queryKey: ["partPricingScales", "get"],
        });
      } else {
        // Only non-isDefault fields changed - just invalidate this specific item
        queryClient.invalidateQueries({
          queryKey: ["partPricingScales", "get", variables.pricingScaleId],
        });
      }
    },
  });
}
