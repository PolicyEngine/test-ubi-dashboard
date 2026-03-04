import type {
  HouseholdResponse,
  EconomyResponse,
  RevenueBreakdownResponse,
} from "./types";

/**
 * Stub fixture data for development and testing.
 * These values are representative but not from real calculations.
 * They will be replaced when the custom Modal backend is integrated.
 */
export const fixtures = {
  /** Default response for /api/household (single, $50k, $6k UBI, no flat tax) */
  defaultHouseholdResponse: {
    baseline_net_income: 42500,
    reform_net_income: 48500,
    net_income_change: 6000,
    baseline_effective_tax_rate: 0.15,
    reform_effective_tax_rate: 0.15,
    effective_tax_rate_change: 0,
    baseline_benefits: 0,
    reform_benefits: 6000,
    basic_income_amount: 6000,
    snap_amount: 0,
    ssi_amount: 0,
  } satisfies HouseholdResponse,

  /** Default response for /api/economy ($6k UBI, 10% flat tax) */
  defaultEconomyResponse: {
    budget: {
      budgetary_impact: -800_000_000_000,
      tax_revenue_impact: 1_200_000_000_000,
      benefit_spending_impact: -100_000_000_000,
    },
    decile: {
      relative: [0.35, 0.25, 0.18, 0.12, 0.08, 0.04, 0.01, -0.02, -0.05, -0.1],
      average: [
        3500, 3200, 2800, 2200, 1600, 800, 200, -500, -1500, -4000,
      ],
    },
    intra_decile: {
      pct_better_off: [0.95, 0.9, 0.85, 0.78, 0.7, 0.6, 0.52, 0.4, 0.3, 0.15],
      pct_worse_off: [0.02, 0.05, 0.08, 0.12, 0.18, 0.25, 0.35, 0.45, 0.55, 0.7],
      pct_unchanged: [0.03, 0.05, 0.07, 0.1, 0.12, 0.15, 0.13, 0.15, 0.15, 0.15],
    },
    poverty: {
      baseline_rate: 0.115,
      reform_rate: 0.085,
      change: -0.03,
    },
    inequality: {
      baseline_gini: 0.41,
      reform_gini: 0.38,
      change: -0.03,
    },
  } satisfies EconomyResponse,

  /** Default response for /api/revenue-breakdown ($6k UBI, 10% flat tax) */
  defaultRevenueBreakdownResponse: {
    ubi_total_cost: 1_980_000_000_000,
    flat_tax_revenue: 1_200_000_000_000,
    income_tax_revenue_change: -50_000_000_000,
    benefit_spending_change: -100_000_000_000,
    net_cost: 730_000_000_000,
  } satisfies RevenueBreakdownResponse,
};
