import { env } from "../../config/env";
import {
  CreatePartPricingScaleInput,
  CreatePartPricingScaleMutationVariables,
} from "../../graphql/generated/graphqlTypes";
import { useCreatePartPricingScaleMutation } from "./useCreatePartPricingScaleMutation";

export function useCreatePartPricingScale() {
  const mutation = useCreatePartPricingScaleMutation();

  const createPartPricingScale = async (input: CreatePartPricingScaleInput) => {
    const variables: CreatePartPricingScaleMutationVariables = {
      accountId: env.ACCOUNT_ID,
      input,
    };
    return await mutation.mutateAsync(variables);
  };

  return {
    createPartPricingScale,
    isAddingPartPricingScale: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}
