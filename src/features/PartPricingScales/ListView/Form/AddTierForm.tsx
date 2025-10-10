import FBInputWithStartIcon from "@components/FBInputWithStartIcon.tsx";
import { FBButton, FBIcon, FBLabel } from "@fullbay/forge";
import {
  CALCULATION_TYPES,
  FORM_IDS,
} from "@src/constants/partPricingScales.ts";
import {
  PartPricingScale,
  PartPricingScaleTier,
} from "@src/types/partPricingScales.ts";
import React from "react";
import { useTranslation } from "react-i18next";

type AddTierFormProps = {
  addTierFormIsInvalid: boolean;
  formData: Partial<PartPricingScale>;
  handleAddTier: (e: React.FormEvent<HTMLFormElement>) => void;
  handleNewTierFieldChange: (field: string, value: number) => void;
  newTierData: PartPricingScaleTier;
  refFieldNewTierMinAmount: React.RefObject<HTMLInputElement | null>;
  refNewTierForm: React.RefObject<HTMLFormElement | null>;
};

export const AddTierForm: React.FC<AddTierFormProps> = ({
  addTierFormIsInvalid,
  formData,
  handleAddTier,
  handleNewTierFieldChange,
  newTierData,
  refFieldNewTierMinAmount,
  refNewTierForm,
}) => {
  const { t } = useTranslation();

  return (
    <form
      id={FORM_IDS.TIER_FORM}
      onSubmit={handleAddTier}
      autoComplete="off"
      className="flex flex-col gap-4 border-2 rounded-lg p-4"
      ref={refNewTierForm}
    >
      <h3 className="font-bold">
        {t("partPricingScales.formLabels.addCondition", "Add Condition")}:
      </h3>
      <div className="flex w-full gap-4">
        <div>
          <FBLabel
            className="mb-2 whitespace-nowrap"
            dataFbTestId={"part-pricing-scale-tier-min-amount-label"}
            htmlFor="part-pricing-scale-tier-min-amount-input"
          >
            {t("partPricingScales.formLabels.minAmount", "Minimum Amount") +
              " *"}
          </FBLabel>
          <FBInputWithStartIcon
            className="text-end"
            type="number"
            id="part-pricing-scale-tier-min-amount-input"
            dataFbTestId={"part-pricing-scale-tier-min-amount-input"}
            value={newTierData.minAmount}
            min={0}
            step={0.01}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleNewTierFieldChange("minAmount", Number(e.target.value));
            }}
            icon={
              <FBIcon
                iconName="dollar"
                ariaLabel="Dollar Icon"
                dataFbTestId={"part-pricing-scale-tier-min-amount-icon"}
              />
            }
            ref={refFieldNewTierMinAmount}
          />
        </div>
        <div>
          <FBLabel
            className="mb-2 whitespace-nowrap"
            dataFbTestId={"part-pricing-scale-tier-percent-label"}
            htmlFor="part-pricing-scale-tier-percent-input"
          >
            {formData.calculatedBasedOn === CALCULATION_TYPES.MARKUP
              ? t("partPricingScales.formLabels.percent.markup", "Markup %")
              : t(
                  "partPricingScales.formLabels.percent.margin",
                  "Margin %"
                )}{" "}
            *
          </FBLabel>
          <FBInputWithStartIcon
            className="text-end"
            type="number"
            id="part-pricing-scale-tier-percent-input"
            dataFbTestId={"part-pricing-scale-tier-percent-input"}
            value={newTierData.percent}
            min={0}
            step={0.01}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleNewTierFieldChange("percent", Number(e.target.value));
            }}
            icon={
              <FBIcon
                iconName="percent"
                ariaLabel="Percent Icon"
                dataFbTestId={"part-pricing-scale-tier-percent-icon"}
              />
            }
          />
        </div>
      </div>
      <FBButton
        type="submit"
        dataFbTestId="part-pricing-scale-tier-add-button"
        disabled={addTierFormIsInvalid}
      >
        {t("partPricingScales.formLabels.addCondition", "Add Condition")}
      </FBButton>
    </form>
  );
};
