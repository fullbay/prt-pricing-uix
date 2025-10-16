import { FBLabel, FBRadioGroupItem } from "@fullbay/forge";
import {
  PART_PRICING_STATE,
  PART_PRICING_STATE_DISPLAY,
} from "@src/constants/partPricingScales.ts";
import { PricingScale } from "@src/graphql/generated/graphqlTypes.ts";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

const PART_PRICING_STATE_ENTRIES = Object.entries(PART_PRICING_STATE);

type StateRadioSelectorProps = {
  formData: Partial<PricingScale>;
  handleFieldChange: (field: keyof PricingScale, value: string) => void;
};

export const StateRadioSelector: React.FC<StateRadioSelectorProps> = React.memo(
  ({ formData, handleFieldChange }) => {
    const { t } = useTranslation();

    const onStateClick = useCallback(
      (e: React.MouseEvent<HTMLInputElement>) => {
        handleFieldChange("state", e.currentTarget.value);
      },
      [handleFieldChange]
    );

    return PART_PRICING_STATE_ENTRIES.map(([key, state]) => {
      // Not displaying an option to select "Deleted" for now
      if (state === PART_PRICING_STATE.DELETED) {
        return null;
      }

      return (
        <div className="flex items-center gap-3" key={key}>
          <FBRadioGroupItem
            value={state}
            checked={formData.state === state}
            onClick={onStateClick}
            id={`part-pricing-scale-state-${state}-checkbox`}
          />
          <FBLabel htmlFor={`part-pricing-scale-state-${state}-checkbox`}>
            {t(
              `partPricingScales.statusValues.${state}`,
              PART_PRICING_STATE_DISPLAY[
                state as keyof typeof PART_PRICING_STATE_DISPLAY
              ]
            )}
          </FBLabel>
        </div>
      );
    });
  }
);

StateRadioSelector.displayName = "StateRadioSelector";
