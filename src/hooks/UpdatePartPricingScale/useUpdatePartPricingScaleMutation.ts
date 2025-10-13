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
    onSuccess: () => {
      // Invalidate and refetch the list of pricing scales
      queryClient.invalidateQueries({
        queryKey: ["partPricingScales", "list"],
      });
      queryClient.invalidateQueries({
        queryKey: ["partPricingScales", "get"],
      });
    },
  });
}
