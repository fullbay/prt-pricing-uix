import { useMutation, useQueryClient } from "@tanstack/react-query";

import { env } from "../../config/env";
import {
  CreatePartPricingScaleDocument,
  CreatePartPricingScaleMutation,
  CreatePartPricingScaleMutationVariables,
} from "../../graphql/generated/graphqlTypes";
import { graphqlClient } from "../../lib/graphql-client";

export function useCreatePartPricingScaleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      input: CreatePartPricingScaleMutationVariables["input"]
    ) => {
      const variables: CreatePartPricingScaleMutationVariables = {
        accountId: env.ACCOUNT_ID,
        input,
      };
      const data = await graphqlClient.request<CreatePartPricingScaleMutation>(
        CreatePartPricingScaleDocument,
        variables
      );
      return data.createPartPricingScale;
    },
    onSuccess: () => {
      // Invalidate and refetch the list of pricing scales
      queryClient.invalidateQueries({
        queryKey: ["partPricingScales", "list"],
      });
    },
  });
}
