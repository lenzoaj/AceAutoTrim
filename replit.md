# Ace Automotive Trimming

A marketing website for Ace Automotive Trimming, Anthony Lenzo's WA-based automotive upholstery and trimming business — showcases services and past projects, and lets prospective customers send enquiries that are emailed directly to the business.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm --filter @workspace/ace-auto-trim run dev` — run the website frontend
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- Required env: `RESEND_API_KEY` — used to send enquiry form emails via Resend

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- Validation: Zod (`zod/v4`)
- API codegen: Orval (from OpenAPI spec)
- Frontend: React + Vite, Tailwind, shadcn/ui, react-hook-form
- Email: Resend (transactional email for the enquiry form)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/ace-auto-trim` — the public website (hero, services, projects showcase, about, enquiry form)
- `artifacts/api-server/src/routes/enquiries.ts` — POST `/enquiries` route, sends enquiry emails via Resend to admin@aceautotrim.com.au
- `lib/api-spec/openapi.yaml` — source-of-truth API contract (health check + enquiries endpoint)
- No database is used — this app has no persistence needs beyond sending enquiry emails

## Architecture decisions

- No DB: the only backend need is emailing enquiry submissions, so the API server sends via Resend directly rather than persisting to a database.
- Real business photos (CV8 Monaro, VY SS, VE SS, VE HSV Seats) are imported via the `@assets` alias from `attached_assets/`.

## Product

- Hero/branding with the Ace Automotive Trimming logo
- Services section: Seat Repairs, Headlinings, Tonneau Covers, Steering Wheel Recovers, Leather Retrims, Classic Car Resto Seat Work, General Trimming & Carpets
- Projects showcase featuring real customer vehicles
- About section on Anthony Lenzo (qualified tradesman, business established 2021)
- Enquiry form — submissions are emailed directly to admin@aceautotrim.com.au
- Contact info: Unit 3/47 Dellamarta Road, Wangara WA; phone 0434 313 810; @aceautotrim; Licensed Repairer WA RB 13098

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Image assets with uppercase extensions (`.JPG`) need a custom `vite-env.d.ts` declaring those modules — Vite's built-in types only cover lowercase extensions. See `artifacts/ace-auto-trim/src/vite-env.d.ts`.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
