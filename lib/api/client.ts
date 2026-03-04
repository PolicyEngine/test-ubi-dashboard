// API client stubs for UBI Impact Dashboard
// TODO: Replace stubs with real Modal backend calls when available

import { fixtures } from "./fixtures";
import type {
  HouseholdRequest,
  HouseholdResponse,
  EconomyRequest,
  EconomyResponse,
  RevenueBreakdownRequest,
  RevenueBreakdownResponse,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

/**
 * Stub: Calculate household-level impacts of a UBI reform.
 * Will call POST /api/household on the Modal backend when integrated.
 */
export async function calculateHousehold(
  request: HouseholdRequest,
): Promise<HouseholdResponse> {
  // TODO: Replace with real Modal backend call:
  // const response = await axios.post(`${API_BASE_URL}/api/household`, request);
  // return response.data;
  void request;
  return fixtures.defaultHouseholdResponse;
}

/**
 * Stub: Run economy-wide microsimulation comparing baseline to UBI reform.
 * Will call POST /api/economy on the Modal backend when integrated.
 */
export async function calculateEconomy(
  request: EconomyRequest,
): Promise<EconomyResponse> {
  // TODO: Replace with real Modal backend call:
  // const response = await axios.post(`${API_BASE_URL}/api/economy`, request);
  // return response.data;
  void request;
  return fixtures.defaultEconomyResponse;
}

/**
 * Stub: Calculate revenue sources vs. UBI cost breakdown.
 * Will call POST /api/revenue-breakdown on the Modal backend when integrated.
 */
export async function calculateRevenueBreakdown(
  request: RevenueBreakdownRequest,
): Promise<RevenueBreakdownResponse> {
  // TODO: Replace with real Modal backend call:
  // const response = await axios.post(`${API_BASE_URL}/api/revenue-breakdown`, request);
  // return response.data;
  void request;
  return fixtures.defaultRevenueBreakdownResponse;
}
