import FBInputWithStartIcon from "@components/FBInputWithStartIcon.tsx";
import { FBButton, FBIcon } from "@fullbay/forge";
import { PartPricingScaleTier } from "@src/types/partPricingScales.ts";
import React from "react";
import { useCallback } from "react";

type TierListItemProps = {
  tier: PartPricingScaleTier;
  index: number;
  isFirst: boolean;
  conditionText: string;
  onPercentChange: (minAmount: number, percent: number) => void;
  onRemove: (minAmount: number) => void;
};

export const TierListItem: React.FC<TierListItemProps> = React.memo(
  ({ tier, index, isFirst, conditionText, onPercentChange, onRemove }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onPercentChange(tier.minAmount, Number(e.target.value));
      },
      [tier.minAmount, onPercentChange]
    );

    const handleRemove = useCallback(() => {
      onRemove(tier.minAmount);
    }, [tier.minAmount, onRemove]);

    return (
      <React.Fragment key={tier.minAmount}>
        <hr className="col-span-6" />
        <div className="col-span-3 content-center ps-4">{conditionText}</div>
        <div className="col-span-2">
          <FBInputWithStartIcon
            className="text-end"
            type="number"
            id={`part-pricing-scale-tier-percent-${index}`}
            dataFbTestId={`part-pricing-scale-tier-percent-${index}`}
            value={tier.percent}
            min={0}
            step={0.01}
            required
            onChange={handleChange}
            icon={
              <FBIcon
                iconName="percent"
                ariaLabel="Percent Icon"
                dataFbTestId={`part-pricing-scale-tier-percent-icon-${index}`}
              />
            }
          />
        </div>
        <div>
          {!isFirst && (
            <FBButton
              type="button"
              dataFbTestId={`part-pricing-scale-tier-remove-${index}`}
              variant="ghost"
              onClick={handleRemove}
            >
              <FBIcon
                ariaLabel="Remove Tier"
                dataFbTestId={`part-pricing-scale-tier-remove-icon-${index}`}
                iconName="trash-can"
              />
            </FBButton>
          )}
        </div>
      </React.Fragment>
    );
  }
);

TierListItem.displayName = "TierListItem";
