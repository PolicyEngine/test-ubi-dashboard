# Universal Basic Income impact dashboard

An interactive dashboard showing the impact of a Universal Basic Income (UBI)
policy on individual households and across the income distribution.

Users enter household characteristics (income, filing status, state, number of
dependents) and UBI policy parameters (amount per person, flat tax rate), then
see personalized impacts on net income, effective tax rates, and benefits.
The economy tab shows distributional impacts by income decile and a revenue
vs. cost breakdown.

## Getting started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

```bash
bunx vitest run
```

## Build

```bash
bun run build
```

## Tech stack

- [Next.js](https://nextjs.org/) 14 (App Router) with TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4 with PolicyEngine design tokens
- [@policyengine/ui-kit](https://github.com/PolicyEngine/ui-kit) for UI components
- [React Query](https://tanstack.com/query) for data fetching
- [Vitest](https://vitest.dev/) for testing
- [Modal](https://modal.com/) for backend deployment (FastAPI + policyengine-us)

## License

MIT
