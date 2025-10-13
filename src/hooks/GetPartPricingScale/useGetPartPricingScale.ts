import { useGetPartPricingScaleQuery } from "@src/hooks/GetPartPricingScale/useGetPartPricingScaleQuery.ts";

export const useGetPartPricingScale = (
  pricingScaleId: string | null
) => {
  const { data, isFetching, error, refetch } = useGetPartPricingScaleQuery(
    pricingScaleId || ""
  );

  return {
    partPricingScale: data || null,
    fetching: isFetching,
    error,
    refetch,
  };
};
