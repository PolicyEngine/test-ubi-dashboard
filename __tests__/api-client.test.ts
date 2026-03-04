import { describe, it, expect } from "vitest";
import {
  calculateHousehold,
  calculateEconomy,
  calculateRevenueBreakdown,
} from "@/lib/api/client";
import { fixtures } from "@/lib/api/fixtures";

describe("API client stubs", () => {
  it("calculateHousehold returns fixture data", async () => {
    const result = await calculateHousehold({
      employment_income: 50000,
      filing_status: "SINGLE",
      state_code: "CA",
      num_dependents: 0,
      ubi_amount: 6000,
      flat_tax_rate: 0,
    });
    expect(result).toEqual(fixtures.defaultHouseholdResponse);
    expect(result.net_income_change).toBe(6000);
    expect(result.basic_income_amount).toBe(6000);
  });

  it("calculateEconomy returns fixture data", async () => {
    const result = await calculateEconomy({
      ubi_amount: 6000,
      flat_tax_rate: 0.1,
    });
    expect(result).toEqual(fixtures.defaultEconomyResponse);
    expect(result.decile.relative).toHaveLength(10);
    expect(result.decile.average).toHaveLength(10);
    expect(result.budget).toHaveProperty("budgetary_impact");
  });

  it("calculateRevenueBreakdown returns fixture data", async () => {
    const result = await calculateRevenueBreakdown({
      ubi_amount: 6000,
      flat_tax_rate: 0.1,
    });
    expect(result).toEqual(fixtures.defaultRevenueBreakdownResponse);
    expect(result.ubi_total_cost).toBeGreaterThan(0);
    expect(result.flat_tax_revenue).toBeGreaterThan(0);
  });
});
