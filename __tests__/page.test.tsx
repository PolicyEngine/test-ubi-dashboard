import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@/app/page";

// Mock next/font/google to avoid font loading in tests
vi.mock("next/font/google", () => ({
  Inter: () => ({ className: "inter-mock" }),
}));

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}

describe("Home page", () => {
  it("renders the dashboard title", () => {
    renderWithProviders(<Home />);
    expect(
      screen.getByText("Universal Basic Income impact dashboard"),
    ).toBeInTheDocument();
  });

  it("renders both tab buttons", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("Your household")).toBeInTheDocument();
    expect(screen.getByText("Economy-wide impact")).toBeInTheDocument();
  });

  it("renders the household tab by default", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("Household characteristics")).toBeInTheDocument();
    expect(screen.getByText("Policy parameters")).toBeInTheDocument();
  });

  it("renders metric cards", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("Net income change")).toBeInTheDocument();
    expect(screen.getByText("Effective tax rate change")).toBeInTheDocument();
    expect(screen.getByText("Total benefits received")).toBeInTheDocument();
  });

  it("renders the footer with PolicyEngine link", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("PolicyEngine")).toBeInTheDocument();
  });
});
