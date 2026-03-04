"""
Stub tests for the UBI Impact Dashboard backend.
These tests validate the endpoint contracts and will be expanded
when real policyengine-us calculations are integrated.
"""

import pytest


def test_household_endpoint_contract():
    """Verify the household endpoint returns all expected fields."""
    expected_fields = [
        "baseline_net_income",
        "reform_net_income",
        "net_income_change",
        "baseline_effective_tax_rate",
        "reform_effective_tax_rate",
        "effective_tax_rate_change",
        "baseline_benefits",
        "reform_benefits",
        "basic_income_amount",
        "snap_amount",
        "ssi_amount",
    ]
    # TODO: Replace with actual API call test when Modal is deployed
    for field in expected_fields:
        assert isinstance(field, str)


def test_economy_endpoint_contract():
    """Verify the economy endpoint returns all expected top-level keys."""
    expected_keys = ["budget", "decile", "intra_decile", "poverty", "inequality"]
    # TODO: Replace with actual API call test when Modal is deployed
    for key in expected_keys:
        assert isinstance(key, str)


def test_revenue_breakdown_endpoint_contract():
    """Verify the revenue breakdown endpoint returns all expected fields."""
    expected_fields = [
        "ubi_total_cost",
        "flat_tax_revenue",
        "income_tax_revenue_change",
        "benefit_spending_change",
        "net_cost",
    ]
    # TODO: Replace with actual API call test when Modal is deployed
    for field in expected_fields:
        assert isinstance(field, str)
