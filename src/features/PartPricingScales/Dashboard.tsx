import ListView from "@features/PartPricingScales/ListView/List/ListView.tsx";
import { useTranslation } from "react-i18next";

export default function PartPricingScales() {
  const { t } = useTranslation();

  return (
    <div data-fb-test-id="partPricingScales">
      <h2>{t("partPricingScales.title", "Part Pricing Scales")}</h2>
      <ListView />
    </div>
  );
}
