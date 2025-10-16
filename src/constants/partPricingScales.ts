import { PricingState } from "@src/graphql/generated/graphqlTypes.ts";

export const CALCULATION_TYPES = {
  MARKUP: "markup",
  MARGIN: "margin",
};

export const CALCULATION_TYPES_DISPLAY = {
  [CALCULATION_TYPES.MARKUP]: "Markup",
  [CALCULATION_TYPES.MARGIN]: "Margin",
};

export const FORM_IDS = {
  MAIN_FORM: "add-part-pricing-scale-form",
  TIER_FORM: "add-part-pricing-scale-tier-form",
};

export const PART_PRICING_STATE = {
  ACTIVE: "active",
  ARCHIVED: "archived",
  DELETED: "deleted",
} as const satisfies Record<string, PricingState>;

export const PART_PRICING_STATE_DISPLAY = {
  [PART_PRICING_STATE.ACTIVE]: "Active",
  [PART_PRICING_STATE.ARCHIVED]: "Archived",
  [PART_PRICING_STATE.DELETED]: "Deleted",
};
