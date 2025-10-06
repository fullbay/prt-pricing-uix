import FBInputWithStartIcon from "@components/FBInputWithStartIcon.tsx";
import { TierList } from "@features/PartsPricingScales/ListView/Form/TierList.tsx";
import { PartsPricingScale } from "@features/PartsPricingScales/ListView/List/DataGridView.tsx";
import {
  FBButton,
  FBCheckbox,
  FBIcon,
  FBInput,
  FBLabel,
  FBRadioGroup,
  FBRadioGroupItem,
  FBSheetClose,
  FBSheetFooter,
} from "@fullbay/forge";
import { usePartPricingScaleForm } from "@src/hooks/usePartPricingScaleForm.ts";
import React, { useCallback, useRef } from "react";
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
  } = usePartPricingScaleForm(addPartPricingScale);

  const refFieldNewTierMinAmount = useRef<HTMLInputElement>(null);
  const refNewTierForm = useRef<HTMLFormElement>(null);

  const onAddTier = useCallback(
    (e: React.FormEvent) => {
      handleAddTier(e, () => refFieldNewTierMinAmount.current?.focus());
      // Add zero delay to ensure the scrolling takes place
      setTimeout(() => {
        refNewTierForm.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    },
    [handleAddTier]
  );

  return (
    <>
      <div className="flex flex-col gap-4 p-4 flex-1 overflow-y-auto">
        <form
          id="add-part-pricing-scale-form"
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

          <FBRadioGroup defaultValue="markup">
            <h5>Calculate Based On:</h5>
            <div className="flex items-center gap-3">
              <FBRadioGroupItem
                value="markup"
                checked={formData.calculatedBasedOn === "markup"}
                onClick={() => {
                  handleFieldChange("calculatedBasedOn", "markup");
                }}
                id="part-pricing-scale-calculated-based-on-markup-checkbox"
              />
              <FBLabel htmlFor="part-pricing-scale-calculated-based-on-markup-checkbox">
                Markup
              </FBLabel>
            </div>
            <div className="flex items-center gap-3">
              <FBRadioGroupItem
                value="margin"
                checked={formData.calculatedBasedOn === "margin"}
                onClick={() => {
                  handleFieldChange("calculatedBasedOn", "margin");
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
              {formData.calculatedBasedOn === "markup"
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

        <form
          id="add-part-pricing-scale-tier-form"
          onSubmit={onAddTier}
          autoComplete="off"
          className="flex flex-col gap-4 border-2 rounded-lg p-4"
          ref={refNewTierForm}
        >
          <h3 className="font-bold">Add Condition:</h3>
          <div className="flex w-full gap-4">
            <div>
              <FBLabel
                className="mb-2"
                dataFbTestId={"part-pricing-scale-tier-min-amount-label"}
                children={
                  t(
                    "partsPricingScales.formLabels.minAmount",
                    "Minimum Amount"
                  ) + " *"
                }
                htmlFor="part-pricing-scale-tier-min-amount-input"
              />
              <FBInputWithStartIcon
                className="text-end"
                type="number"
                id="part-pricing-scale-tier-min-amount-input"
                dataFbTestId={"part-pricing-scale-tier-min-amount-input"}
                value={newTierData.minAmount}
                min={0}
                step={0.01}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleNewTierFieldChange("minAmount", Number(e.target.value));
                }}
                icon={
                  <FBIcon
                    iconName="dollar"
                    ariaLabel="Dollar Icon"
                    dataFbTestId={"part-pricing-scale-tier-min-amount-icon"}
                  />
                }
                ref={refFieldNewTierMinAmount}
              />
            </div>
            <div>
              <FBLabel
                className="mb-2"
                dataFbTestId={"part-pricing-scale-tier-percent-label"}
                htmlFor="part-pricing-scale-tier-percent-input"
              >
                {formData.calculatedBasedOn === "markup"
                  ? t(
                      "partsPricingScales.formLabels.percent.markup",
                      "Markup %"
                    )
                  : t(
                      "partsPricingScales.formLabels.percent.margin",
                      "Margin %"
                    )}{" "}
                *
              </FBLabel>
              <FBInputWithStartIcon
                className="text-end"
                type="number"
                id="part-pricing-scale-tier-percent-input"
                dataFbTestId={"part-pricing-scale-tier-percent-input"}
                value={newTierData.percent}
                min={0}
                step={0.01}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleNewTierFieldChange("percent", Number(e.target.value));
                }}
                icon={
                  <FBIcon
                    iconName="percent"
                    ariaLabel="Percent Icon"
                    dataFbTestId={"part-pricing-scale-tier-percent-icon"}
                  />
                }
              />
            </div>
          </div>
          <FBButton
            type="submit"
            dataFbTestId="part-pricing-scale-tier-add-button"
            disabled={addTierFormIsInvalid}
          >
            Add Condition
          </FBButton>
        </form>
      </div>

      <FBSheetFooter
        className="flex flex-row items-center justify-end gap-3 p-4"
        dataFbTestId="add-part-pricing-scale-sheet-footer"
      >
        <FBButton
          form="add-part-pricing-scale-form"
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
