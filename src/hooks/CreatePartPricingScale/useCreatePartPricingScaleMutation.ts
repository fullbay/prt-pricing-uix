import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  CreatePartPricingScaleDocument,
  CreatePartPricingScaleMutation,
  CreatePartPricingScaleMutationVariables,
} from "../../graphql/generated/graphqlTypes";
import { graphqlClient } from "../../lib/graphql-client";

async function createPartPricingScale(
  variables: CreatePartPricingScaleMutationVariables
): Promise<CreatePartPricingScaleMutation["createPartPricingScale"]> {
  const data = await graphqlClient.request<CreatePartPricingScaleMutation>(
    CreatePartPricingScaleDocument,
    variables
  );
  return data.createPartPricingScale;
}

export function useCreatePartPricingScaleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: CreatePartPricingScaleMutationVariables) => {
      return createPartPricingScale(variables);
    },
    onSuccess: (createdScale) => {
      // Invalidate and refetch the list of pricing scales
      queryClient.invalidateQueries({
        queryKey: ["partPricingScales", "list"],
      });

      if (createdScale.isDefault) {
        // Only invalidate OTHER scales (exclude newly created one)
        queryClient.invalidateQueries({
          queryKey: ["partPricingScales", "get"],
          predicate: (query) => {
            const queryId = query.queryKey[2];
            return queryId !== createdScale.pricingScaleId;
          },
        });
      }
    },
  });
}
