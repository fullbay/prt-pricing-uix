import DataGridView from "@features/PartsPricingScales/ListView/List/DataGridView.tsx";
import { CALCULATION_TYPES } from "@src/constants/partPricingScales.ts";
import { PartsPricingScale } from "@src/types/partsPricingScales.ts";
import { useEffect, useState } from "react";
// import { useListParts } from "@src/hooks/ListParts/useListParts";

const ListView = () => {
  // // accountId is now taken from env inside the hook
  // const { parts, loading, refetch } = useListParts();
  //
  // if (loading) {
  //   return <Loading message={t("partsPricingScales.loading")} />;
  // }

  const [partPricingScales, setPartPricingScales] = useState<
    PartsPricingScale[]
  >([]);

  const refreshData = () => {
    // refetch();
  };

  useEffect(() => {
    setPartPricingScales([
      {
        pricingScaleId: "1234567890-1",
        name: "Pricing Scale 1",
        isDefault: false,
        tiers: [
          {
            minAmount: 0,
            percent: 50,
          },
        ],
        calculatedBasedOn: CALCULATION_TYPES.MARKUP,
      },
      {
        pricingScaleId: "1234567890-3",
        name: "Pricing Scale 3",
        isDefault: false,
        tiers: [
          {
            minAmount: 0,
            percent: 50,
          },
        ],
        calculatedBasedOn: CALCULATION_TYPES.MARGIN,
      },
      {
        pricingScaleId: "1234567890-2",
        name: "Pricing Scale 2",
        isDefault: true,
        tiers: [
          {
            minAmount: 0,
            percent: 50,
          },
        ],
        calculatedBasedOn: CALCULATION_TYPES.MARKUP,
      },
    ]);
  }, []);

  return (
    <DataGridView
      partPricingScales={partPricingScales}
      refreshData={refreshData}
    />
  );
};

export default ListView;
