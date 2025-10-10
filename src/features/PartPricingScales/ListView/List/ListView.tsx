import Loading from "@components/Loading.tsx";
import DataGridView from "@features/PartPricingScales/ListView/List/DataGridView.tsx";
import { useListPartPricingScales } from "@src/hooks/ListPartPricingScales/useListPartPricingScales";
import { useTranslation } from "react-i18next";

const ListView = () => {
  const { t } = useTranslation();

  // accountId is now taken from env inside the hook
  const { partPricingScales, loading, refetch } = useListPartPricingScales();

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loading message={t("partPricingScales.loading")} />
      </div>
    );
  }

  return (
    <DataGridView partPricingScales={partPricingScales} refreshData={refetch} />
  );
};

export default ListView;
