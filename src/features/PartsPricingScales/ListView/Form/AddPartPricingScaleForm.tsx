import { AddTierForm } from "@features/PartsPricingScales/ListView/Form/AddTierForm.tsx";
import { TierList } from "@features/PartsPricingScales/ListView/Form/TierList.tsx";
import {
  FBButton,
  FBCheckbox,
  FBInput,
  FBLabel,
  FBRadioGroup,
  FBRadioGroupItem,
  FBSheetClose,
  FBSheetFooter,
} from "@fullbay/forge";
import {
  CALCULATION_TYPES,
  FORM_IDS,
} from "@src/constants/partPricingScales.ts";
import { usePartPricingScaleForm } from "@src/hooks/usePartPricingScaleForm.ts";
import { PartsPricingScale } from "@src/types/partsPricingScales.ts";
import React from "react";
import { useTranslation } from "react-i18next";

type AddPartPricingScaleFormProps = {
  onSuccess?: () => void;
  addPartPricingScale: (input: Partial<PartsPricingScale>) => void;
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
              children={t("partsPricingScales.formLabels.name", "Title") + " *"}
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
            {t("partsPricingScales.formLabels.isDefault", "Is Default")}
          </FBLabel>

          <FBRadioGroup defaultValue={CALCULATION_TYPES.MARKUP}>
            <h5>Calculate Based On:</h5>
            <div className="flex items-center gap-3">
              <FBRadioGroupItem
                value={CALCULATION_TYPES.MARKUP}
                checked={
                  formData.calculatedBasedOn === CALCULATION_TYPES.MARKUP
                }
                onClick={() => {
                  handleFieldChange(
                    "calculatedBasedOn",
                    CALCULATION_TYPES.MARKUP
                  );
                }}
                id="part-pricing-scale-calculated-based-on-markup-checkbox"
              />
              <FBLabel htmlFor="part-pricing-scale-calculated-based-on-markup-checkbox">
                Markup
              </FBLabel>
            </div>
            <div className="flex items-center gap-3">
              <FBRadioGroupItem
                value={CALCULATION_TYPES.MARGIN}
                checked={
                  formData.calculatedBasedOn === CALCULATION_TYPES.MARGIN
                }
                onClick={() => {
                  handleFieldChange(
                    "calculatedBasedOn",
                    CALCULATION_TYPES.MARGIN
                  );
                }}
                id="part-pricing-scale-calculated-based-on-margin-checkbox"
              />
              <FBLabel htmlFor="part-pricing-scale-calculated-based-on-margin-checkbox">
                Margin
              </FBLabel>
            </div>
          </FBRadioGroup>

          <div className="grid grid-cols-6 gap-2 mt-2 py-2 border-2 rounded-lg">
            <div className="col-span-3 font-bold ps-4">
              {t("partsPricingScales.formLabels.condition", "Condition")}
            </div>
            <div className="col-span-2 font-bold text-end">
              {formData.calculatedBasedOn === CALCULATION_TYPES.MARKUP
                ? t("partsPricingScales.formLabels.percent.markup", "Markup %")
                : t("partsPricingScales.formLabels.percent.margin", "Margin %")}
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
            ? t("partsPricingScales.formLabels.submitting", "Submitting")
            : t("partsPricingScales.formLabels.submit", "Submit")}
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
