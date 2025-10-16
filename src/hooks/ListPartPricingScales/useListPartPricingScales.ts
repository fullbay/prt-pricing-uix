import { PricingState } from "../../graphql/generated/graphqlTypes";
import { useListPartPricingScalesQuery } from "./useListPartPricingScalesQuery";

// Updated to match ui-orig pattern - no accountId parameter needed
export const useListPartPricingScales = (
  limit?: number,
  cursor?: string,
  state?: PricingState
) => {
  const { data, isFetching, isLoading, error, refetch } = useListPartPricingScalesQuery(
    limit,
    cursor,
    state
  );

  return {
    partPricingScales: data || [],
    fetching: isFetching,
    loading: isLoading,
    error,
    refetch,
  };
};
