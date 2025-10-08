import { FBLabel, FBRadioGroupItem } from "@fullbay/forge";
import { CALCULATION_TYPES } from "@src/constants/partPricingScales.ts";
import { PartsPricingScale } from "@src/types/partsPricingScales.ts";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

type CalculationTypeRadioSelectorProps = {
  formData: Partial<PartsPricingScale>;
  handleFieldChange: (field: keyof PartsPricingScale, value: string) => void;
};

export const CalculationTypeRadioSelector: React.FC<CalculationTypeRadioSelectorProps> =
  React.memo(({ formData, handleFieldChange }) => {
    const { t } = useTranslation();

    const onCalculatedBasedOnClick = useCallback(
      (e: React.MouseEvent) => {
        const target = e.target as HTMLInputElement;
        handleFieldChange("calculatedBasedOn", target.value);
      },
      [handleFieldChange]
    );

    return Object.entries(CALCULATION_TYPES).map(([index, type]) => {
      return (
        <div className="flex items-center gap-3" key={index}>
          <FBRadioGroupItem
            value={type}
            checked={formData.calculatedBasedOn === type}
            onClick={onCalculatedBasedOnClick}
            id={`part-pricing-scale-calculated-based-on-${type}-checkbox`}
          />
          <FBLabel
            htmlFor={`part-pricing-scale-calculated-based-on-${type}-checkbox`}
          >
            {t(`partsPricingScales.${type}`)}
          </FBLabel>
        </div>
      );
    });
  });
