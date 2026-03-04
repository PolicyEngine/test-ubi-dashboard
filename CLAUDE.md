# ubi-impact-dashboard

An interactive dashboard showing the impact of a Universal Basic Income policy
on individual households and across the income distribution. Users enter
household characteristics (income, filing status, state, number of dependents)
and see how a UBI reform affects their net income, effective tax rate, and
benefits received. The dashboard also displays economy-wide impacts including
revenue sources vs. UBI cost and distributional impact by income decile.

## Architecture

- Next.js 14 App Router with Tailwind CSS v4 and @policyengine/design-system tokens
- @policyengine/ui-kit for standard UI components (pending npm publication)
- Custom FastAPI backend on Modal wrapping policyengine-us for household-level
  and economy-wide microsimulation (3 endpoints: /api/household, /api/economy,
  /api/revenue-breakdown)
- React Query for data fetching and caching
- Recharts for custom chart rendering (via PEBarChart from ui-kit)

## Development

```bash
bun install
bun run dev
```

## Testing

```bash
bunx vitest run
```

## Build

```bash
bun run build
```

## Design standards

- Uses Tailwind CSS v4 with @policyengine/design-system tokens bridged via @theme block
- @policyengine/ui-kit for all standard UI components (add dependency when published)
- Primary teal: `bg-pe-primary-500` / `text-pe-primary-500`
- Font: Inter (via next/font/google)
- Sentence case for all headings
- Charts follow policyengine-app-v2 patterns

## Project structure

```
app/             - Next.js App Router pages and layout
lib/api/         - API client stubs, TypeScript types, and fixtures
lib/hooks/       - React Query hooks for data fetching
lib/             - Embedding utilities (hash sync, country detection)
components/      - Custom components not available in ui-kit
backend/         - Modal FastAPI backend wrapping policyengine-us
__tests__/       - Vitest test files
```

## API endpoints

All endpoints use POST and accept/return JSON.

- `/api/household` - Household-level UBI impact calculation
- `/api/economy` - Economy-wide microsimulation with decile breakdowns
- `/api/revenue-breakdown` - Revenue sources vs. UBI cost analysis

## Environment variables

- `NEXT_PUBLIC_API_BASE_URL` - Base URL for the Modal backend API
