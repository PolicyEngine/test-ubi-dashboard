"""
UBI Impact Dashboard - Modal backend stub.

This FastAPI application (deployed on Modal) wraps policyengine-us to provide
three endpoints:
  - POST /api/household    -- Household-level UBI impact calculation
  - POST /api/economy      -- Economy-wide microsimulation
  - POST /api/revenue-breakdown -- Revenue sources vs. UBI cost

TODO: Implement real calculations using policyengine-us Simulation class.
"""

import modal

app = modal.App("ubi-impact-dashboard")

image = modal.Image.debian_slim(python_version="3.11").pip_install(
    "fastapi",
    "pydantic",
    # TODO: Uncomment when ready to run real simulations
    # "policyengine-us",
)


@app.function(image=image, timeout=300)
@modal.asgi_app()
def web_app():
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel

    api = FastAPI(title="UBI Impact Dashboard API")

    api.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # -----------------------------------------------------------------------
    # Request / Response models
    # -----------------------------------------------------------------------

    class HouseholdRequest(BaseModel):
        employment_income: float
        filing_status: str
        state_code: str
        num_dependents: int
        ubi_amount: float
        flat_tax_rate: float = 0

    class HouseholdResponse(BaseModel):
        baseline_net_income: float
        reform_net_income: float
        net_income_change: float
        baseline_effective_tax_rate: float
        reform_effective_tax_rate: float
        effective_tax_rate_change: float
        baseline_benefits: float
        reform_benefits: float
        basic_income_amount: float
        snap_amount: float
        ssi_amount: float

    class EconomyRequest(BaseModel):
        ubi_amount: float
        flat_tax_rate: float = 0

    class EconomyResponse(BaseModel):
        budget: dict
        decile: dict
        intra_decile: dict
        poverty: dict
        inequality: dict

    class RevenueBreakdownRequest(BaseModel):
        ubi_amount: float
        flat_tax_rate: float = 0

    class RevenueBreakdownResponse(BaseModel):
        ubi_total_cost: float
        flat_tax_revenue: float
        income_tax_revenue_change: float
        benefit_spending_change: float
        net_cost: float

    # -----------------------------------------------------------------------
    # Endpoints (stubs)
    # -----------------------------------------------------------------------

    @api.post("/api/household", response_model=HouseholdResponse)
    def calculate_household(req: HouseholdRequest):
        """Calculate household-level UBI impacts."""
        # TODO: Implement using policyengine-us Simulation
        return HouseholdResponse(
            baseline_net_income=42500,
            reform_net_income=48500,
            net_income_change=6000,
            baseline_effective_tax_rate=0.15,
            reform_effective_tax_rate=0.15,
            effective_tax_rate_change=0,
            baseline_benefits=0,
            reform_benefits=req.ubi_amount,
            basic_income_amount=req.ubi_amount,
            snap_amount=0,
            ssi_amount=0,
        )

    @api.post("/api/economy", response_model=EconomyResponse)
    def calculate_economy(req: EconomyRequest):
        """Run economy-wide microsimulation."""
        # TODO: Implement using policyengine-us Simulation with scope=macro
        return EconomyResponse(
            budget={
                "budgetary_impact": -800_000_000_000,
                "tax_revenue_impact": 1_200_000_000_000,
                "benefit_spending_impact": -100_000_000_000,
            },
            decile={
                "relative": [0.35, 0.25, 0.18, 0.12, 0.08, 0.04, 0.01, -0.02, -0.05, -0.1],
                "average": [3500, 3200, 2800, 2200, 1600, 800, 200, -500, -1500, -4000],
            },
            intra_decile={
                "pct_better_off": [0.95, 0.9, 0.85, 0.78, 0.7, 0.6, 0.52, 0.4, 0.3, 0.15],
                "pct_worse_off": [0.02, 0.05, 0.08, 0.12, 0.18, 0.25, 0.35, 0.45, 0.55, 0.7],
                "pct_unchanged": [0.03, 0.05, 0.07, 0.1, 0.12, 0.15, 0.13, 0.15, 0.15, 0.15],
            },
            poverty={
                "baseline_rate": 0.115,
                "reform_rate": 0.085,
                "change": -0.03,
            },
            inequality={
                "baseline_gini": 0.41,
                "reform_gini": 0.38,
                "change": -0.03,
            },
        )

    @api.post("/api/revenue-breakdown", response_model=RevenueBreakdownResponse)
    def calculate_revenue_breakdown(req: RevenueBreakdownRequest):
        """Calculate revenue sources vs. UBI cost."""
        # TODO: Implement using policyengine-us Simulation
        return RevenueBreakdownResponse(
            ubi_total_cost=1_980_000_000_000,
            flat_tax_revenue=1_200_000_000_000,
            income_tax_revenue_change=-50_000_000_000,
            benefit_spending_change=-100_000_000_000,
            net_cost=730_000_000_000,
        )

    return api
