import DataGridView from "@features/PartPricingScales/ListView/List/DataGridView.tsx";
import { useListPartPricingScales } from "@src/hooks/PartPricingScales/useListPartPricingScales";

const ListView = () => {
  const { partPricingScales, loading } = useListPartPricingScales();

  if (loading) {
    return <div>Loading...</div>;
  }

  return <DataGridView partPricingScales={partPricingScales} />;
};

export default ListView;
