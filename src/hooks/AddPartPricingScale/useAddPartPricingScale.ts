import { env } from "../../config/env";
import {
  CreatePartPricingScaleInput,
  CreatePartPricingScaleMutationVariables,
} from "../../graphql/generated/graphqlTypes";
import { useCreatePartPricingScale } from "./useCreatePartPricingScaleMutation";

export function useAddPartPricingScale() {
  const mutation = useCreatePartPricingScale();

  const addPartPricingScale = async (input: CreatePartPricingScaleInput) => {
    const variables: CreatePartPricingScaleMutationVariables = {
      accountId: env.ACCOUNT_ID,
      input,
    };
    return await mutation.mutateAsync(variables);
  };

  return {
    addPartPricingScale,
    isAddingPartPricingScale: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}
