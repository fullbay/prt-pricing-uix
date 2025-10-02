import FBInputWithStartIcon from "@components/FBInputWithStartIcon.tsx";
import {
  NewPartsPricingScale,
  PartsPricingScale,
  PartsPricingScaleTier,
} from "@features/PartsPricingScales/ListView/List/DataGridView.tsx";
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
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type AddPartPricingScaleFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
  addPartPricingScale: (input: NewPartsPricingScale) => void;
};

const defaultFormData: Partial<PartsPricingScale> = {
  name: "",
  isDefault: false,
  calculatedBasedOn: "markup",
  tiers: [
    {
      minAmount: 0,
      percent: 0,
    },
  ],
};

const defaultNewTearData: PartsPricingScaleTier = {
  minAmount: 0,
  percent: 0,
};

export const AddPartPricingScaleForm: React.FC<
  AddPartPricingScaleFormProps
> = ({ onSuccess, addPartPricingScale }) => {
  const { t } = useTranslation();

  const [formData, setFormData] =
    useState<Partial<PartsPricingScale>>(defaultFormData);
  const [newTierData, setNewTierData] =
    useState<PartsPricingScaleTier>(defaultNewTearData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tiersList = useMemo(() => {
    return formData.tiers
      ?.sort((a, b) => Number(a.minAmount) - Number(b.minAmount))
      .map((tier, index, tiers: PartsPricingScaleTier[]) => {
        let conditionText;

        if (index + 1 >= tiers.length) {
          conditionText = `$${tier.minAmount} or greater`;
        } else {
          const nextTier = tiers[index + 1];
          const minAmount = tier.minAmount;
          const maxAmount = nextTier.minAmount - 0.01;

          if (minAmount === maxAmount) {
            conditionText = `$${minAmount}`;
          } else {
            conditionText = `$${minAmount} to $${maxAmount}`;
          }
        }

        return (
          <>
            <hr className="col-span-6" />
            <div className="col-span-3 content-center ps-4">
              {conditionText}
            </div>
            <div className="col-span-2">
              <FBInputWithStartIcon
                className="text-end"
                type="number"
                id={"part-pricing-scale-tier-percent-" + index}
                dataFbTestId={"part-pricing-scale-tier-percent-" + index}
                value={tier.percent}
                min={0}
                step={0.01}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const newTiers = [...formData.tiers!];
                  newTiers[index].percent = Number(e.target.value);
                  setFormData((prev) => ({ ...prev, tiers: newTiers }));
                }}
                icon={
                  <FBIcon
                    iconName="percent"
                    ariaLabel="Percent Icon"
                    dataFbTestId={
                      "part-pricing-scale-tier-percent-icon-" + index
                    }
                  />
                }
              />
            </div>
            <div>
              {index !== 0 && (
                <FBButton
                  type="button"
                  dataFbTestId={"part-pricing-scale-tier-remove-" + index}
                  variant="ghost"
                  onClick={() => {
                    const newTiers = [...formData.tiers!];
                    newTiers.splice(index, 1);
                    setFormData((prev) => ({ ...prev, tiers: newTiers }));
                  }}
                >
                  <FBIcon
                    ariaLabel="Remove Tier"
                    dataFbTestId={
                      "part-pricing-scale-tier-remove-icon-" + index
                    }
                    iconName="delete"
                  />
                </FBButton>
              )}
            </div>
          </>
        );
      });
  }, [formData.tiers]);

  const handleInputChange = (field: string, fieldValue: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: fieldValue }));
  };

  const handleAddTier = (e: React.FormEvent) => {
    e.preventDefault();

    if (addTierFormIsInvalid) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      tiers: [...prev.tiers!, newTierData],
    }));
    setNewTierData(defaultNewTearData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formIsInvalid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const input: NewPartsPricingScale = {
        name: formData.name!,
        isDefault: formData.isDefault!,
        calculatedBasedOn: formData.calculatedBasedOn!,
        tiers: formData.tiers!,
      };
      console.log(input);
      addPartPricingScale(input);
      onSuccess?.();
    } catch (error) {
      console.error("Failed to create Part Pricing Scale:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formIsInvalid =
    !formData.name || !formData.tiers || !formData.tiers.length;
  const addTierFormIsInvalid = useMemo(() => {
    return (
      newTierData.minAmount <= 0 ||
      newTierData.percent < 0 ||
      !!formData.tiers?.find((tier) => tier.minAmount === newTierData.minAmount)
    );
  }, [formData.tiers, newTierData.minAmount, newTierData.percent]);

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
                handleInputChange("name", e.target.value);
              }}
              required
            />
          </div>

          <FBLabel dataFbTestId={"part-pricing-scale-is-default-label"}>
            <FBCheckbox
              dataFbTestId="part-pricing-scale-is-default-checkbox"
              onClick={() =>
                handleInputChange("isDefault", !formData.isDefault)
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
                  handleInputChange("calculatedBasedOn", "markup");
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
                  handleInputChange("calculatedBasedOn", "margin");
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
            {tiersList}
          </div>
        </form>

        <form
          id="add-part-pricing-scale-tier-form"
          onSubmit={handleAddTier}
          autoComplete="off"
          className="flex flex-col gap-4 border-2 rounded-lg p-4"
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
                onChange={(e) => {
                  setNewTierData((prev) => ({
                    ...prev,
                    minAmount: Number(e.target.value),
                  }));
                }}
                icon={
                  <FBIcon
                    iconName="dollar"
                    ariaLabel="Dollar Icon"
                    dataFbTestId={"part-pricing-scale-tier-min-amount-icon"}
                  />
                }
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
                onChange={(e) => {
                  setNewTierData((prev) => ({
                    ...prev,
                    percent: Number(e.target.value),
                  }));
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
