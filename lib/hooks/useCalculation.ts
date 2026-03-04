"use client";

import { useQuery } from "@tanstack/react-query";
import {
  calculateHousehold,
  calculateEconomy,
  calculateRevenueBreakdown,
} from "@/lib/api/client";
import type {
  HouseholdRequest,
  EconomyRequest,
  RevenueBreakdownRequest,
} from "@/lib/api/types";

/**
 * Hook for household-level UBI impact calculations.
 * Automatically refetches when inputs change.
 */
export function useHouseholdCalculation(request: HouseholdRequest) {
  return useQuery({
    queryKey: ["household", request],
    queryFn: () => calculateHousehold(request),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook for economy-wide UBI impact calculations.
 * These are expensive, so staleTime is set higher.
 */
export function useEconomyCalculation(request: EconomyRequest) {
  return useQuery({
    queryKey: ["economy", request],
    queryFn: () => calculateEconomy(request),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook for revenue breakdown calculations.
 */
export function useRevenueBreakdown(request: RevenueBreakdownRequest) {
  return useQuery({
    queryKey: ["revenue-breakdown", request],
    queryFn: () => calculateRevenueBreakdown(request),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
