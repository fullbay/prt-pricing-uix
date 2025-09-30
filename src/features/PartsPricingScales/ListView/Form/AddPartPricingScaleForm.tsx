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
      minAmount: 1,
      percent: 30,
    },
    {
      minAmount: 10,
      percent: 50,
    },
    {
      minAmount: 11,
      percent: 40,
    },
    {
      minAmount: 0,
      percent: 0,
    },
  ],
};

export const AddPartPricingScaleForm: React.FC<
  AddPartPricingScaleFormProps
> = ({ onSuccess, addPartPricingScale }) => {
  const { t } = useTranslation();

  const [formData, setFormData] =
    useState<Partial<PartsPricingScale>>(defaultFormData);
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
          conditionText = `$${tier.minAmount} to $${nextTier.minAmount - 0.01}`;
        }

        return (
          <>
            <div className="col-span-3 content-center">{conditionText}</div>
            <div className="col-span-2">
              <FBInputWithStartIcon
                className="text-end"
                type="number"
                dataFbTestId={"part-pricing-scale-tier-percent-" + index}
                value={tier.percent}
                min={0}
                step={0.01}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const newTiers = [...formData.tiers!];
                  newTiers[index].percent = Number(e.target.value);
                  setFormData((prev) => ({ ...prev, tiers: newTiers }));
                }}
                icon={
                  <FBIcon
                    iconName="percent"
                    ariaLabel="Percent Icon"
                    dataFbTestId={"part-pricing-scale-tier-percent-icon-" + index}
                  />
                }
              />
            </div>
            <div>
              {index !== 0 &&
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
                  <FBIcon ariaLabel="Remove Tier" dataFbTestId={"part-pricing-scale-tier-remove-icon-" + index} iconName="delete" />
                </FBButton>
              }
            </div>
          </>
        );
      });
  }, [formData.tiers]);

  const handleInputChange = (field: string, fieldValue: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: fieldValue }));
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
      addPartPricingScale(input);
      onSuccess?.();
    } catch (error) {
      console.error("Failed to create Part Pricing Scale:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formIsInvalid = !formData.name;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col gap-4 p-4 flex-1 overflow-y-auto"
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
            onClick={() => handleInputChange("isDefault", !formData.isDefault)}
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

        <div className="grid grid-cols-6 gap-2 border-t-2 mt-2 pt-4">
          <div className="col-span-3 font-bold">
            {t("partsPricingScales.formLabels.condition", "Condition:")}
          </div>
          <div className="col-span-2 font-bold">
            {formData.calculatedBasedOn === "markup"
              ? t("partsPricingScales.formLabels.percent.markup", "Markup %:")
              : t("partsPricingScales.formLabels.percent.margin", "Margin %:")}
          </div>
          <div>&nbsp;</div>
          {tiersList}
        </div>
      </form>

      <FBSheetFooter
        className="flex flex-row items-center justify-end gap-3 p-4"
        dataFbTestId="add-part-pricing-scale-sheet-footer"
      >
        <FBButton
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
