import { env } from "../../config/env";
import {
  UpdatePartPricingScaleInput,
  UpdatePartPricingScaleMutationVariables,
} from "../../graphql/generated/graphqlTypes";
import { useUpdatePartPricingScaleMutation } from "./useUpdatePartPricingScaleMutation.ts";

export function useUpdatePartPricingScale() {
  const mutation = useUpdatePartPricingScaleMutation();

  const updatePartPricingScale = async (
    pricingScaleId: string,
    input: UpdatePartPricingScaleInput
  ) => {
    const variables: UpdatePartPricingScaleMutationVariables = {
      accountId: env.ACCOUNT_ID,
      pricingScaleId,
      input,
    };
    return await mutation.mutateAsync(variables);
  };

  return {
    updatePartPricingScale,
    isUpdatingPartPricingScale: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}
