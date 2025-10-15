import { AddPartPricingScaleForm } from "@features/PartPricingScales/ListView/Form/AddPartPricingScaleForm.tsx";
import {
  FBSheet,
  FBSheetContent,
  FBSheetHeader,
  FBSheetTitle,
} from "@fullbay/forge";
import React from "react";

type AddPartPricingScaleSheetProps = {
  onOpenChange: (open: boolean) => void;
  open?: boolean;
  partPricingScaleId: string | null;
  refreshData: () => void;
  title: string;
};

export const AddPartPricingScaleSheet: React.FC<
  AddPartPricingScaleSheetProps
> = ({ onOpenChange, open, partPricingScaleId, refreshData, title }) => {
  const handleSuccess = () => {
    refreshData();
    onOpenChange(false);
  };

  return (
    <FBSheet
      dataFbTestId="add-part-pricing-scale-slideout"
      open={open}
      onOpenChange={onOpenChange}
    >
      <FBSheetContent
        dataFbTestId="add-part-pricing-scale-sheet-content"
        side="right"
        className="flex flex-col gap-0"
      >
        <FBSheetHeader
          dataFbTestId="add-part-pricing-scale-sheet-header"
          className="p-4"
        >
          <FBSheetTitle dataFbTestId="add-part-pricing-scale-sheet-title">
            {title}
          </FBSheetTitle>
        </FBSheetHeader>

        <AddPartPricingScaleForm
          partPricingScaleId={partPricingScaleId}
          onFormSuccess={handleSuccess}
        />
      </FBSheetContent>
    </FBSheet>
  );
};
