import {
  CALCULATION_TYPES,
  PART_PRICING_STATE,
} from "@src/constants/partPricingScales.ts";
import {
  CreatePartPricingScaleInput,
  UpdatePartPricingScaleInput,
} from "@src/graphql/generated/graphqlTypes.ts";
import { useCreatePartPricingScale } from "@src/hooks/CreatePartPricingScale/useCreatePartPricingScale.ts";
import { useGetPartPricingScaleQuery } from "@src/hooks/GetPartPricingScale/useGetPartPricingScaleQuery.ts";
import { useUpdatePartPricingScale } from "@src/hooks/UpdatePartPricingScale/useUpdatePartPricingScale.ts";
import {
  PartPricingScale,
  PartPricingScaleTier,
} from "@src/types/partPricingScales.ts";
import { getErrorMessage } from "@src/utils/errorUtils.ts";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const defaultFormData: Partial<PartPricingScale> = {
  name: "",
  isDefault: false,
  calculatedBasedOn: CALCULATION_TYPES.MARKUP,
  tiers: [
    {
      minAmount: 0,
      percent: 0,
    },
  ],
};

const defaultNewTierData: PartPricingScaleTier = {
  minAmount: 0,
  percent: 0,
};

export function usePartPricingScaleForm(
  onSubmit: (data: Partial<PartPricingScale>) => void,
  partPricingScaleId: string | null
) {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] =
    useState<Partial<PartPricingScale>>(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTierData, setNewTierData] =
    useState<PartPricingScaleTier>(defaultNewTierData);

  const { createPartPricingScale } = useCreatePartPricingScale();
  const { data: partPricingScale, isFetching: isFetchingPartPricingScale } =
    useGetPartPricingScaleQuery(partPricingScaleId);
  const { updatePartPricingScale } = useUpdatePartPricingScale();

  const refFieldNewTierMinAmount = useRef<HTMLInputElement>(null);
  const refLoadedPartPricingScaleId = useRef<string | null>(null);
  const refNewTierForm = useRef<HTMLFormElement>(null);

  // Update form data when pricing scale is loaded
  useEffect(() => {
    if (
      partPricingScale &&
      partPricingScaleId &&
      refLoadedPartPricingScaleId.current !== partPricingScaleId
    ) {
      setFormData(partPricingScale);
      refLoadedPartPricingScaleId.current = partPricingScaleId;
    } else if (
      !partPricingScaleId &&
      refLoadedPartPricingScaleId.current !== null
    ) {
      setFormData(defaultFormData);
      refLoadedPartPricingScaleId.current = null;
    }
  }, [partPricingScale, partPricingScaleId]);

  const addTierFormIsInvalid = useMemo(() => {
    return (
      newTierData.minAmount <= 0 ||
      newTierData.percent < 0 ||
      !!formData.tiers?.find((tier) => tier.minAmount === newTierData.minAmount)
    );
  }, [formData.tiers, newTierData]);

  const formIsInvalid = useMemo(
    () => !formData.name || !formData.tiers?.length,
    [formData.name, formData.tiers]
  );

  const handleAddTier = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (addTierFormIsInvalid) {
        return;
      }

      setFormData((prev) => ({
        ...prev,
        tiers: [...(prev.tiers || []), newTierData],
      }));

      // Reset tier form
      setNewTierData(defaultNewTierData);

      refFieldNewTierMinAmount.current?.focus();

      // Wrap scroll animation to make sure it is called after the DOM is updated.
      requestAnimationFrame(() => {
        refNewTierForm.current?.scrollIntoView({ behavior: "smooth" });
      });
    },
    [addTierFormIsInvalid, newTierData]
  );

  const handleFieldChange = useCallback(
    (field: string, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleNewTierFieldChange = useCallback(
    (field: string, value: number) => {
      setNewTierData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleUpdateTier = useCallback((minAmount: number, percent: number) => {
    setFormData((prev) => ({
      ...prev,
      tiers: prev.tiers!.map((tier) => {
        if (tier.minAmount === minAmount) {
          return { ...tier, percent };
        }
        return tier;
      }),
    }));
  }, []);

  const handleRemoveTier = useCallback((minAmount: number) => {
    setFormData((prev) => ({
      ...prev,
      tiers: prev.tiers!.filter((tier) => tier.minAmount !== minAmount),
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (formIsInvalid) {
        return;
      }

      setIsSubmitting(true);

      try {
        const input: CreatePartPricingScaleInput | UpdatePartPricingScaleInput =
          {
            name: formData.name!,
            isDefault: formData.isDefault!,
            calculatedBasedOn:
              formData.calculatedBasedOn! as CreatePartPricingScaleInput["calculatedBasedOn"],
            state: PART_PRICING_STATE.ACTIVE,
            tiers: formData.tiers!,
          };

        if (partPricingScaleId) {
          await updatePartPricingScale(partPricingScaleId, input);
        } else {
          await createPartPricingScale(input);
        }

        setErrorMessage(""); // Clear any previous errors
        onSubmit(input);
      } catch (error) {
        console.error("Failed to save Part Pricing Scale:", error);
        setErrorMessage(
          getErrorMessage(error, "Failed to save Part Pricing Scale")
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      createPartPricingScale,
      formData,
      formIsInvalid,
      onSubmit,
      partPricingScaleId,
      updatePartPricingScale,
    ]
  );

  return {
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
  };
}
