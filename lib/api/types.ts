/** Filing status options for US tax returns */
export type FilingStatus =
  | "SINGLE"
  | "JOINT"
  | "HEAD_OF_HOUSEHOLD"
  | "SEPARATE"
  | "SURVIVING_SPOUSE";

// ---------------------------------------------------------------------------
// /api/household
// ---------------------------------------------------------------------------

export interface HouseholdRequest {
  employment_income: number;
  filing_status: FilingStatus;
  state_code: string;
  num_dependents: number;
  ubi_amount: number;
  flat_tax_rate: number;
}

export interface HouseholdResponse {
  baseline_net_income: number;
  reform_net_income: number;
  net_income_change: number;
  baseline_effective_tax_rate: number;
  reform_effective_tax_rate: number;
  effective_tax_rate_change: number;
  baseline_benefits: number;
  reform_benefits: number;
  basic_income_amount: number;
  snap_amount: number;
  ssi_amount: number;
}

// ---------------------------------------------------------------------------
// /api/economy
// ---------------------------------------------------------------------------

export interface EconomyRequest {
  ubi_amount: number;
  flat_tax_rate: number;
}

export interface BudgetImpact {
  budgetary_impact: number;
  tax_revenue_impact: number;
  benefit_spending_impact: number;
}

export interface DecileImpact {
  /** Relative change per decile (list of 10 floats) */
  relative: number[];
  /** Average absolute change per decile (list of 10 floats) */
  average: number[];
}

export interface IntraDecileImpact {
  pct_better_off: number[];
  pct_worse_off: number[];
  pct_unchanged: number[];
}

export interface PovertyImpact {
  baseline_rate: number;
  reform_rate: number;
  change: number;
}

export interface InequalityImpact {
  baseline_gini: number;
  reform_gini: number;
  change: number;
}

export interface EconomyResponse {
  budget: BudgetImpact;
  decile: DecileImpact;
  intra_decile: IntraDecileImpact;
  poverty: PovertyImpact;
  inequality: InequalityImpact;
}

// ---------------------------------------------------------------------------
// /api/revenue-breakdown
// ---------------------------------------------------------------------------

export interface RevenueBreakdownRequest {
  ubi_amount: number;
  flat_tax_rate: number;
}

export interface RevenueBreakdownResponse {
  ubi_total_cost: number;
  flat_tax_revenue: number;
  income_tax_revenue_change: number;
  benefit_spending_change: number;
  net_cost: number;
}
