import { TierListItem } from "@features/PartsPricingScales/ListView/Form/TierListItem.tsx";
import { PartsPricingScaleTier } from "@features/PartsPricingScales/ListView/List/DataGridView.tsx";
import React, { useMemo } from "react";

type TiersListProps = {
  tiers: PartsPricingScaleTier[];
  onUpdateTier: (index: number, percent: number) => void;
  onRemoveTier: (index: number) => void;
};

const calculateConditionText = (
  currentTier: PartsPricingScaleTier,
  nextTier?: PartsPricingScaleTier
): string => {
  let conditionText;

  if (!nextTier) {
    conditionText = `$${currentTier.minAmount} or greater`;
  } else {
    const minAmount = currentTier.minAmount;
    const maxAmount = nextTier.minAmount - 0.01;

    if (minAmount === maxAmount) {
      conditionText = `$${minAmount}`;
    } else {
      conditionText = `$${minAmount} to $${maxAmount}`;
    }
  }
  return conditionText;
};

export const TierList: React.FC<TiersListProps> = React.memo(
  ({ tiers, onUpdateTier, onRemoveTier }) => {
    const sortedTiers = useMemo(() => {
      return [...tiers].sort(
        (a, b) => Number(a.minAmount) - Number(b.minAmount)
      );
    }, [tiers]);

    return (
      <>
        {sortedTiers.map((tier, index, arr: PartsPricingScaleTier[]) => {
          return (
            <TierListItem
              key={tier.minAmount}
              tier={tier}
              index={index}
              isFirst={!index}
              conditionText={calculateConditionText(tier, arr[index + 1])}
              onPercentChange={(minAmount, percent) =>
                onUpdateTier(minAmount, percent)
              }
              onRemove={(minAmount) => onRemoveTier(minAmount)}
            />
          );
        })}
      </>
    );
  }
);
