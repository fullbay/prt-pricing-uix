import ListView from "@features/PartsPricingScales/ListView/List/ListView.tsx";
import { useTranslation } from "react-i18next";

export default function PartsPricingScales() {
  const { t } = useTranslation();

  return (
    <div data-fb-test-id="partsPricingScales">
      <h2>{t("partsPricingScales.title", "Parts Pricing Scales")}</h2>
      <ListView />
    </div>
  );
}
