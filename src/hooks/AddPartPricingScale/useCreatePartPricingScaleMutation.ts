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

export function useCreatePartPricingScale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: CreatePartPricingScaleMutationVariables) => {
      return createPartPricingScale(variables);
    },
    onSuccess: () => {
      // Invalidate and refetch the list of pricing scales
      queryClient.invalidateQueries({
        queryKey: ["partPricingScales", "list"],
      });
    },
  });
}
