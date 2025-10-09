import { FBLabel, FBRadioGroupItem } from "@fullbay/forge";
import {
  CALCULATION_TYPES,
  CALCULATION_TYPES_DISPLAY,
} from "@src/constants/partPricingScales.ts";
import { PartsPricingScale } from "@src/types/partsPricingScales.ts";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

const CALCULATION_TYPE_ENTRIES = Object.entries(CALCULATION_TYPES);

type CalculationTypeRadioSelectorProps = {
  formData: Partial<PartsPricingScale>;
  handleFieldChange: (field: keyof PartsPricingScale, value: string) => void;
};

export const CalculationTypeRadioSelector: React.FC<CalculationTypeRadioSelectorProps> =
  React.memo(({ formData, handleFieldChange }) => {
    const { t } = useTranslation();

    const onCalculatedBasedOnClick = useCallback(
      (e: React.MouseEvent<HTMLInputElement>) => {
          handleFieldChange("calculatedBasedOn", e.currentTarget.value);
      },
      [handleFieldChange]
    );

    return CALCULATION_TYPE_ENTRIES.map(([key, type]) => {
      return (
        <div className="flex items-center gap-3" key={key}>
          <FBRadioGroupItem
            value={type}
            checked={formData.calculatedBasedOn === type}
            onClick={onCalculatedBasedOnClick}
            id={`part-pricing-scale-calculated-based-on-${type}-checkbox`}
          />
          <FBLabel
            htmlFor={`part-pricing-scale-calculated-based-on-${type}-checkbox`}
          >
            {t(`partsPricingScales.${type}`, CALCULATION_TYPES_DISPLAY[type as keyof typeof CALCULATION_TYPES_DISPLAY])}
          </FBLabel>
        </div>
      );
    });
  });

CalculationTypeRadioSelector.displayName = "CalculationTypeRadioSelector";
