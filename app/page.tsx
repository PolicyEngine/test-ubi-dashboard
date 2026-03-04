"use client";

import { useState } from "react";

type FilingStatus =
  | "SINGLE"
  | "JOINT"
  | "HEAD_OF_HOUSEHOLD"
  | "SEPARATE"
  | "SURVIVING_SPOUSE";

/** Input state shape for the dashboard */
interface DashboardInputs {
  employment_income: number;
  filing_status: FilingStatus;
  state_code: string;
  num_dependents: number;
  ubi_amount: number;
  flat_tax_rate: number;
  tab: "household" | "economy";
}

/** Default input values */
const DEFAULT_INPUTS: DashboardInputs = {
  employment_income: 50000,
  filing_status: "SINGLE",
  state_code: "CA",
  num_dependents: 0,
  ubi_amount: 6000,
  flat_tax_rate: 0,
  tab: "household",
};

type UpdateInputFn = <K extends keyof DashboardInputs>(
  key: K,
  value: DashboardInputs[K],
) => void;

export default function Home() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);

  const updateInput: UpdateInputFn = (key, value) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <main className="min-h-screen bg-pe-bg-primary">
      {/* Header */}
      <header className="bg-pe-primary-700 text-white px-pe-lg py-pe-xl">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">
            Universal Basic Income impact dashboard
          </h1>
          <p className="text-lg mt-pe-sm opacity-90">
            Explore how a UBI policy affects households and the economy
          </p>
        </div>
      </header>

      {/* Tab navigation */}
      <nav className="border-b border-pe-border-light bg-white">
        <div className="max-w-7xl mx-auto flex gap-pe-md px-pe-lg">
          <button
            className={`py-pe-md px-pe-lg text-sm font-medium border-b-2 transition-colors ${
              inputs.tab === "household"
                ? "border-pe-primary-500 text-pe-primary-600"
                : "border-transparent text-pe-text-secondary hover:text-pe-text-primary"
            }`}
            onClick={() => updateInput("tab", "household")}
          >
            Your household
          </button>
          <button
            className={`py-pe-md px-pe-lg text-sm font-medium border-b-2 transition-colors ${
              inputs.tab === "economy"
                ? "border-pe-primary-500 text-pe-primary-600"
                : "border-transparent text-pe-text-secondary hover:text-pe-text-primary"
            }`}
            onClick={() => updateInput("tab", "economy")}
          >
            Economy-wide impact
          </button>
        </div>
      </nav>

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-pe-lg py-pe-xl">
        {inputs.tab === "household" ? (
          <HouseholdTab inputs={inputs} updateInput={updateInput} />
        ) : (
          <EconomyTab inputs={inputs} updateInput={updateInput} />
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-pe-border-light py-pe-lg px-pe-lg text-center text-sm text-pe-text-secondary">
        <p>
          Built by{" "}
          <a
            href="https://policyengine.org"
            className="text-pe-primary-600 hover:underline"
          >
            PolicyEngine
          </a>{" "}
          using the Enhanced CPS and PolicyEngine US microsimulation model.
        </p>
      </footer>
    </main>
  );
}

/** Household tab: inputs + metric cards */
function HouseholdTab({
  inputs,
  updateInput,
}: {
  inputs: DashboardInputs;
  updateInput: UpdateInputFn;
}) {
  return (
    <div className="space-y-pe-xl">
      {/* Input panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-pe-lg">
        {/* Household characteristics */}
        <div className="bg-white rounded-pe-lg border border-pe-border-light p-pe-lg">
          <h2 className="text-lg font-semibold text-pe-text-primary mb-pe-md">
            Household characteristics
          </h2>
          <div className="space-y-pe-md">
            <InputField
              label="Employment income"
              value={`$${inputs.employment_income.toLocaleString()}`}
            >
              <input
                type="range"
                min={0}
                max={500000}
                step={1000}
                value={inputs.employment_income}
                onChange={(e) =>
                  updateInput("employment_income", Number(e.target.value))
                }
                className="w-full"
              />
            </InputField>

            <InputField label="Filing status">
              <select
                value={inputs.filing_status}
                onChange={(e) => updateInput("filing_status", e.target.value as FilingStatus)}
                className="w-full border border-pe-border-light rounded-pe-sm px-pe-sm py-pe-xs"
              >
                <option value="SINGLE">Single</option>
                <option value="JOINT">Married filing jointly</option>
                <option value="HEAD_OF_HOUSEHOLD">Head of household</option>
                <option value="SEPARATE">Married filing separately</option>
                <option value="SURVIVING_SPOUSE">Surviving spouse</option>
              </select>
            </InputField>

            <InputField label="State">
              <select
                value={inputs.state_code}
                onChange={(e) => updateInput("state_code", e.target.value)}
                className="w-full border border-pe-border-light rounded-pe-sm px-pe-sm py-pe-xs"
              >
                <option value="CA">California</option>
                <option value="TX">Texas</option>
                <option value="NY">New York</option>
                <option value="FL">Florida</option>
                {/* TODO: Add all 50 states + DC */}
              </select>
            </InputField>

            <InputField label="Number of dependents">
              <select
                value={inputs.num_dependents}
                onChange={(e) =>
                  updateInput("num_dependents", Number(e.target.value))
                }
                className="w-full border border-pe-border-light rounded-pe-sm px-pe-sm py-pe-xs"
              >
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n === 5 ? "5+" : n}
                  </option>
                ))}
              </select>
            </InputField>
          </div>
        </div>

        {/* Policy parameters */}
        <div className="bg-white rounded-pe-lg border border-pe-border-light p-pe-lg">
          <h2 className="text-lg font-semibold text-pe-text-primary mb-pe-md">
            Policy parameters
          </h2>
          <div className="space-y-pe-md">
            <InputField
              label="UBI amount per person (annual)"
              value={`$${inputs.ubi_amount.toLocaleString()}`}
            >
              <input
                type="range"
                min={0}
                max={24000}
                step={500}
                value={inputs.ubi_amount}
                onChange={(e) =>
                  updateInput("ubi_amount", Number(e.target.value))
                }
                className="w-full"
              />
            </InputField>

            <InputField
              label="Flat income tax rate"
              value={`${(inputs.flat_tax_rate * 100).toFixed(0)}%`}
            >
              <input
                type="range"
                min={0}
                max={0.5}
                step={0.01}
                value={inputs.flat_tax_rate}
                onChange={(e) =>
                  updateInput("flat_tax_rate", Number(e.target.value))
                }
                className="w-full"
              />
            </InputField>
          </div>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-pe-lg">
        <MetricCard
          label="Net income change"
          value="--"
          description="Change in household net income under the UBI reform"
        />
        <MetricCard
          label="Effective tax rate change"
          value="--"
          description="Change in effective tax rate in percentage points"
        />
        <MetricCard
          label="Total benefits received"
          value="--"
          description="Total benefits including UBI payment"
        />
      </div>
    </div>
  );
}

/** Economy tab: policy inputs + chart + table */
function EconomyTab({
  inputs,
  updateInput,
}: {
  inputs: DashboardInputs;
  updateInput: UpdateInputFn;
}) {
  return (
    <div className="space-y-pe-xl">
      {/* Policy parameters (reused) */}
      <div className="bg-white rounded-pe-lg border border-pe-border-light p-pe-lg max-w-md">
        <h2 className="text-lg font-semibold text-pe-text-primary mb-pe-md">
          Policy parameters
        </h2>
        <div className="space-y-pe-md">
          <InputField
            label="UBI amount per person (annual)"
            value={`$${inputs.ubi_amount.toLocaleString()}`}
          >
            <input
              type="range"
              min={0}
              max={24000}
              step={500}
              value={inputs.ubi_amount}
              onChange={(e) =>
                updateInput("ubi_amount", Number(e.target.value))
              }
              className="w-full"
            />
          </InputField>

          <InputField
            label="Flat income tax rate"
            value={`${(inputs.flat_tax_rate * 100).toFixed(0)}%`}
          >
            <input
              type="range"
              min={0}
              max={0.5}
              step={0.01}
              value={inputs.flat_tax_rate}
              onChange={(e) =>
                updateInput("flat_tax_rate", Number(e.target.value))
              }
              className="w-full"
            />
          </InputField>
        </div>
      </div>

      {/* Revenue vs. cost chart placeholder */}
      <div className="bg-white rounded-pe-lg border border-pe-border-light p-pe-lg">
        <h2 className="text-lg font-semibold text-pe-text-primary mb-pe-md">
          Revenue sources vs. UBI cost
        </h2>
        <div className="h-[400px] flex items-center justify-center text-pe-text-secondary">
          {/* TODO: Implement PEBarChart with revenue breakdown data */}
          <p>Chart will be rendered here</p>
        </div>
      </div>

      {/* Distributional impact table placeholder */}
      <div className="bg-white rounded-pe-lg border border-pe-border-light p-pe-lg">
        <h2 className="text-lg font-semibold text-pe-text-primary mb-pe-md">
          Distributional impact by income decile
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-pe-border-light">
                <th className="text-left py-pe-sm px-pe-sm font-medium text-pe-text-secondary">
                  Income decile
                </th>
                <th className="text-right py-pe-sm px-pe-sm font-medium text-pe-text-secondary">
                  Average change
                </th>
                <th className="text-right py-pe-sm px-pe-sm font-medium text-pe-text-secondary">
                  Relative change
                </th>
                <th className="text-right py-pe-sm px-pe-sm font-medium text-pe-text-secondary">
                  Better off
                </th>
                <th className="text-right py-pe-sm px-pe-sm font-medium text-pe-text-secondary">
                  Worse off
                </th>
              </tr>
            </thead>
            <tbody>
              {/* TODO: Populate with economy API data */}
              {Array.from({ length: 10 }, (_, i) => (
                <tr
                  key={i}
                  className="border-b border-pe-border-light last:border-0"
                >
                  <td className="py-pe-sm px-pe-sm text-pe-text-primary">
                    Decile {i + 1}
                  </td>
                  <td className="py-pe-sm px-pe-sm text-right text-pe-text-secondary">
                    --
                  </td>
                  <td className="py-pe-sm px-pe-sm text-right text-pe-text-secondary">
                    --
                  </td>
                  <td className="py-pe-sm px-pe-sm text-right text-pe-text-secondary">
                    --
                  </td>
                  <td className="py-pe-sm px-pe-sm text-right text-pe-text-secondary">
                    --
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/** Reusable input field wrapper */
function InputField({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-pe-xs">
        <label className="text-sm font-medium text-pe-text-primary">
          {label}
        </label>
        {value && (
          <span className="text-sm font-semibold text-pe-primary-600">
            {value}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

/** Placeholder metric card */
function MetricCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-pe-lg border border-pe-border-light p-pe-lg">
      <p className="text-sm text-pe-text-secondary">{label}</p>
      <p className="text-2xl font-bold text-pe-text-primary mt-pe-xs">
        {value}
      </p>
      <p className="text-xs text-pe-text-secondary mt-pe-xs">{description}</p>
    </div>
  );
}
