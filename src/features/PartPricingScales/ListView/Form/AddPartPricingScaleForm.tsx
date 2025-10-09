import { AddTierForm } from "@features/PartPricingScales/ListView/Form/AddTierForm.tsx";
import { CalculationTypeRadioSelector } from "@features/PartPricingScales/ListView/Form/CalculationTypeRadioSelector.tsx";
import { TierList } from "@features/PartPricingScales/ListView/Form/TierList.tsx";
import {
  FBButton,
  FBCheckbox,
  FBInput,
  FBLabel,
  FBRadioGroup,
  FBSheetClose,
  FBSheetFooter,
} from "@fullbay/forge";
import {
  CALCULATION_TYPES,
  FORM_IDS,
} from "@src/constants/partPricingScales.ts";
import { usePartPricingScaleForm } from "@src/hooks/usePartPricingScaleForm.ts";
import { PartPricingScale } from "@src/types/partPricingScales.ts";
import React from "react";
import { useTranslation } from "react-i18next";

type AddPartPricingScaleFormProps = {
  onSuccess?: () => void;
  addPartPricingScale: (input: Partial<PartPricingScale>) => void;
};

export const AddPartPricingScaleForm: React.FC<
  AddPartPricingScaleFormProps
> = ({ addPartPricingScale }) => {
  const { t } = useTranslation();

  const {
    addTierFormIsInvalid,
    formData,
    formIsInvalid,
    handleAddTier,
    handleFieldChange,
    handleNewTierFieldChange,
    handleRemoveTier,
    handleSubmit,
    handleUpdateTier,
    isSubmitting,
    newTierData,
    refFieldNewTierMinAmount,
    refNewTierForm,
  } = usePartPricingScaleForm(addPartPricingScale);

  return (
    <>
      <div className="flex flex-col gap-4 p-4 flex-1 overflow-y-auto">
        <form
          id={FORM_IDS.MAIN_FORM}
          onSubmit={handleSubmit}
          autoComplete="off"
          className="flex flex-col gap-4"
        >
          <div>
            <FBLabel
              className="mb-2"
              dataFbTestId={"part-pricing-scale-name-label"}
              children={t("partPricingScales.formLabels.name", "Title") + " *"}
              htmlFor="part-pricing-scale-name-input"
            />
            <FBInput
              id="part-pricing-scale-name-input"
              dataFbTestId="part-pricing-scale-name-input"
              value={formData.name || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleFieldChange("name", e.target.value);
              }}
              required
            />
          </div>

          <FBLabel dataFbTestId={"part-pricing-scale-is-default-label"}>
            <FBCheckbox
              dataFbTestId="part-pricing-scale-is-default-checkbox"
              onClick={() =>
                handleFieldChange("isDefault", !formData.isDefault)
              }
              checked={formData.isDefault}
            />
            {t("partPricingScales.formLabels.isDefault", "Is Default")}
          </FBLabel>

          <FBRadioGroup defaultValue={CALCULATION_TYPES.MARKUP}>
            <h5>
              {t(
                "partPricingScales.formLabels.calculateBasedOn",
                "Calculate Based On"
              )}
              :
            </h5>
            <CalculationTypeRadioSelector
              formData={formData}
              handleFieldChange={handleFieldChange}
            />
          </FBRadioGroup>

          <div className="grid grid-cols-6 gap-2 mt-2 py-2 border-2 rounded-lg">
            <div className="col-span-3 font-bold ps-4">
              {t("partPricingScales.formLabels.condition", "Condition")}
            </div>
            <div className="col-span-2 font-bold text-end">
              {formData.calculatedBasedOn === CALCULATION_TYPES.MARKUP
                ? t("partPricingScales.formLabels.percent.markup", "Markup %")
                : t("partPricingScales.formLabels.percent.margin", "Margin %")}
            </div>
            <div>&nbsp;</div>
            <TierList
              tiers={formData.tiers || []}
              onUpdateTier={handleUpdateTier}
              onRemoveTier={handleRemoveTier}
            />
          </div>
        </form>

        <AddTierForm
          addTierFormIsInvalid={addTierFormIsInvalid}
          formData={formData}
          handleAddTier={handleAddTier}
          handleNewTierFieldChange={handleNewTierFieldChange}
          newTierData={newTierData}
          refFieldNewTierMinAmount={refFieldNewTierMinAmount}
          refNewTierForm={refNewTierForm}
        />
      </div>

      <FBSheetFooter
        className="flex flex-row items-center justify-end gap-3 p-4"
        dataFbTestId="add-part-pricing-scale-sheet-footer"
      >
        <FBButton
          form={FORM_IDS.MAIN_FORM}
          dataFbTestId="submit-add-part-pricing-scale-form-button"
          type="submit"
          disabled={formIsInvalid}
        >
          {isSubmitting
            ? t("common.saving", "Saving...")
            : t("common.save", "Save")}
        </FBButton>

        <FBSheetClose dataFbTestId="close-button-sheet" asChild>
          <FBButton dataFbTestId="close-button" variant="secondary">
            {t("common.close")}
          </FBButton>
        </FBSheetClose>
      </FBSheetFooter>
    </>
  );
};
