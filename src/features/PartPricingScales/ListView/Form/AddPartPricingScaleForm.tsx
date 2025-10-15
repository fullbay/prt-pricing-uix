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
  partPricingScaleId: string | null;
  onFormSuccess: (input: Partial<PartPricingScale>) => void;
};

export const AddPartPricingScaleForm: React.FC<
  AddPartPricingScaleFormProps
> = ({ onFormSuccess, partPricingScaleId }) => {
  const { t } = useTranslation();

  const {
    addTierFormIsInvalid,
    errorMessage,
    formData,
    formIsInvalid,
    handleAddTier,
    handleFieldChange,
    handleNewTierFieldChange,
    handleRemoveTier,
    handleSubmit,
    handleUpdateTier,
    isFetchingPartPricingScale,
    isSubmitting,
    newTierData,
    refFieldNewTierMinAmount,
    refNewTierForm,
  } = usePartPricingScaleForm(onFormSuccess, partPricingScaleId);

  const isDisabled = isSubmitting || isFetchingPartPricingScale;

  return (
    <>
      {errorMessage && (
        <div className="mx-4 p-3 border rounded-md text-destructive text-sm">
          {errorMessage}
        </div>
      )}
      <div className="flex flex-col gap-4 p-4 flex-1 overflow-y-auto">
        <form
          id={FORM_IDS.MAIN_FORM}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <fieldset className="flex flex-col gap-4" disabled={isDisabled}>
            <div>
              <FBLabel
                className="mb-2"
                dataFbTestId={"part-pricing-scale-name-label"}
                children={
                  t("partPricingScales.formLabels.name", "Title") + " *"
                }
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
                  : t(
                      "partPricingScales.formLabels.percent.margin",
                      "Margin %"
                    )}
              </div>
              <div>&nbsp;</div>
              <TierList
                tiers={formData.tiers || []}
                onUpdateTier={handleUpdateTier}
                onRemoveTier={handleRemoveTier}
              />
            </div>
          </fieldset>
        </form>

        <AddTierForm
          addTierFormIsInvalid={addTierFormIsInvalid}
          formData={formData}
          handleAddTier={handleAddTier}
          handleNewTierFieldChange={handleNewTierFieldChange}
          isDisabled={isDisabled}
          newTierData={newTierData}
          refFieldNewTierMinAmount={refFieldNewTierMinAmount}
          refNewTierForm={refNewTierForm}
        />
      </div>

      <FBSheetFooter
        className="flex flex-row items-center justify-end gap-3 p-4"
        dataFbTestId="add-part-pricing-scale-sheet-footer"
      >
        <FBSheetClose dataFbTestId="close-button-sheet" asChild>
          <FBButton dataFbTestId="close-button" variant="secondary">
            {t("common.close", "Close")}
          </FBButton>
        </FBSheetClose>

        <FBButton
          form={FORM_IDS.MAIN_FORM}
          dataFbTestId="submit-add-part-pricing-scale-form-button"
          type="submit"
          disabled={formIsInvalid || isDisabled}
        >
          {isSubmitting
            ? t("common.saving", "Saving...")
            : t("common.save", "Save")}
        </FBButton>
      </FBSheetFooter>
    </>
  );
};
