import { CALCULATION_TYPES } from "@src/constants/partPricingScales.ts";

export type CalculationType = typeof CALCULATION_TYPES[keyof typeof CALCULATION_TYPES];

export type PartsPricingScaleTier = {
  minAmount: number;
  percent: number;
};

export type PartsPricingScale = {
  pricingScaleId: string;
  name: string;
  calculatedBasedOn: CalculationType;
  isDefault: boolean;
  tiers: PartsPricingScaleTier[];
};
