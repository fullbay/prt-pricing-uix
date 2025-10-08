import { TierListItem } from "@features/PartsPricingScales/ListView/Form/TierListItem.tsx";
import { PartsPricingScaleTier } from "@src/types/partsPricingScales.ts";
import { formatNumberForDisplay, subtractNumbers } from "@src/utils/numbers.ts";
import { TFunction } from "i18next";
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

type TiersListProps = {
  tiers: PartsPricingScaleTier[];
  onUpdateTier: (index: number, percent: number) => void;
  onRemoveTier: (index: number) => void;
};

const calculateConditionText = (
  t: TFunction<"translation", undefined>,
  currentTier: PartsPricingScaleTier,
  nextTier?: PartsPricingScaleTier,
): string => {
  let conditionText;

  if (!nextTier) {
    conditionText = `$${formatNumberForDisplay({ value: currentTier.minAmount })} ` + t("partsPricingScales.formLabels.orGreater", "or greater");
  } else {
    const minAmount = formatNumberForDisplay({ value: currentTier.minAmount });
    const maxAmount = formatNumberForDisplay({
      value: subtractNumbers(nextTier.minAmount, 0.01),
    });

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
    const { t } = useTranslation();

    const sortedTiers = useMemo(() => {
      return [...tiers].sort((a, b) => a.minAmount - b.minAmount);
    }, [tiers]);

    const handlePercentChange = useCallback(
      (minAmount: number, value: number) => {
        onUpdateTier(minAmount, value);
      },
      [onUpdateTier]
    );

    const handleRemove = useCallback(
      (minAmount: number) => {
        onRemoveTier(minAmount);
      },
      [onRemoveTier]
    );

    return (
      <>
        {sortedTiers.map((tier, index, arr: PartsPricingScaleTier[]) => {
          return (
            <TierListItem
              key={tier.minAmount}
              tier={tier}
              index={index}
              isFirst={!index}
              conditionText={calculateConditionText(t, tier, arr[index + 1])}
              onPercentChange={handlePercentChange}
              onRemove={handleRemove}
            />
          );
        })}
      </>
    );
  }
);
