import { CALCULATION_TYPES } from "@src/constants/partPricingScales.ts";
import {
  CalculationMethod,
  CreatePartPricingScaleInput,
  PricingScale,
  PricingTierInput,
} from "@src/graphql/generated/graphqlTypes";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";

const defaultFormData: Partial<CreatePartPricingScaleInput> = {
  name: "",
  isDefault: false,
  calculatedBasedOn: CALCULATION_TYPES.MARKUP as CalculationMethod,
  state: "active",
  tiers: [
    {
      minAmount: 0,
      percent: 0,
    },
  ],
};

const defaultNewTierData: PricingTierInput = {
  minAmount: 0,
  percent: 0,
};

export function usePartPricingScaleForm(
  createMutation: UseMutationResult<PricingScale, Error, CreatePartPricingScaleInput>,
  onSuccess?: () => void
) {
  const [formData, setFormData] =
    useState<Partial<CreatePartPricingScaleInput>>(defaultFormData);
  const [newTierData, setNewTierData] =
    useState<PricingTierInput>(defaultNewTierData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const refFieldNewTierMinAmount = useRef<HTMLInputElement>(null);
  const refNewTierForm = useRef<HTMLFormElement>(null);

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

      // Add zero delay to ensure the scrolling takes place
      setTimeout(() => {
        refNewTierForm.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
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
        const input: CreatePartPricingScaleInput = {
          name: formData.name!,
          isDefault: formData.isDefault!,
          calculatedBasedOn: formData.calculatedBasedOn!,
          state: formData.state || "active",
          tiers: formData.tiers!,
        };
        await createMutation.mutateAsync(input);

        // Reset form after successful submission
        setFormData(defaultFormData);
        setNewTierData(defaultNewTierData);

        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        console.error("Failed to create Part Pricing Scale:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, formIsInvalid, createMutation, onSuccess]
  );

  return {
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
  };
}
