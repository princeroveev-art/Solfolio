# Solfolio Production Audit & Remediation Plan (May 22, 2026)

## Methodology
This audit reviewed the full repository including app routes, UI components, wallet integrations, Solana RPC access, analytics logic, and project configuration. Findings are grouped by architecture, frontend, backend, performance, security, scalability, and UI/UX.

## Pre-Implementation Production-Grade Remediation Plan
This is the recommended sequence **before** feature expansion.

### Phase 0 (Week 0-1): Stabilize correctness and trust
1. Replace hardcoded market prices with a trusted price service (with timestamp + source shown in UI).
2. Add typed portfolio domain models (`WalletSnapshot`, `AssetQuote`, `PortfolioMetrics`, `AgentReportV1`).
3. Introduce centralized error policy for RPC calls (timeouts, retries with jitter, fallback RPC endpoint strategy).
4. Add explicit "mock/live" data labels and prevent mock data from appearing production-real in NFT and agent sections.

### Phase 1 (Week 1-3): Refactor architecture boundaries
1. Split current dashboard flow into:
   - data access layer (`services/solanaClient`)
   - domain analytics layer (`domain/analytics`)
   - presentation layer (`components/*`)
2. Move risk/health scoring from client-only execution to a server-side endpoint for integrity and observability.
3. Add API contract versioning for analytics outputs (e.g., `riskModelVersion: "1.0.0"`).

### Phase 2 (Week 3-6): Production UX and performance hardening
1. Introduce query caching/dedup (SWR or React Query).
2. Add pagination/virtualization strategy for large token and transaction lists.
3. Complete accessibility baseline (keyboard flow, aria semantics, contrast and focus states).
4. Remove inline mouse-event styling patterns in favor of CSS classes for maintainability.

### Phase 3 (Week 6-10): Scale and operations
1. Add telemetry (latency, error rate, RPC saturation, client render timing).
2. Add centralized metadata resolution for token/NFT enrichment and caching.
3. Add feature flags and staged rollout controls for scoring model changes.
4. Add CI quality gates (lint/test/typecheck/build) with non-interactive config.

---

## Executive Summary
- The project is a solid MVP with clear feature intent, but production risk is concentrated in **data correctness**, **client-side trust boundaries**, and **operational resilience**.
- Biggest immediate issue: financial analytics rely on hardcoded prices and static token metadata, which can create materially inaccurate portfolio/risk outputs.
- Architectural complexity is concentrated in a single dashboard component that mixes fetching, computation, and rendering.
- There is currently no true backend application layer; this limits integrity, observability, and scalability for "agentic" capabilities.

---

## 1) Architecture Findings

### A1. Dashboard component is overloaded (high coupling)
`components/portfolio/DashboardContent.tsx` combines connection state, RPC fetching, data transformation, scoring logic, and UI rendering.

**Risk:** testability and change-safety degrade as product complexity grows.

**Fix:** extract `usePortfolioData`, `usePortfolioMetrics`, and `useAgentReport` with small presentational components.

### A2. Domain logic and policy constants are embedded in UI path
`lib/agentEngine.ts` and `lib/grindScore.ts` hardcode scoring policies/weights without external config, governance, or audit versioning.

**Risk:** silent behavior drift across releases and weak explainability.

**Fix:** move policies to versioned config objects and expose model/version in output.

### A3. Static asset enrichment strategy does not scale
Known token metadata is maintained in a static in-component map.

**Risk:** unknown tokens degrade UX and analytics accuracy.

**Fix:** metadata resolver service with cache and trusted provider fallback.

---

## 2) Frontend Findings

### F1. Styling architecture is inconsistent
Many components mix Tailwind classes with large inline style objects and inline DOM mutation handlers (`onMouseEnter`/`onMouseLeave`).

**Risk:** maintainability, theme consistency, and performance tuning become harder.

**Fix:** consolidate styling into reusable classes/design tokens; remove runtime style mutation patterns.

### F2. Accessibility baseline is incomplete
Icon-only controls and status indicators often lack explicit accessible labels/announcements; skeleton/loading regions are not consistently screen-reader-friendly.

**Risk:** poor accessibility compliance and weaker keyboard/screen-reader usability.

**Fix:** add semantic labels, `aria-live` for async states, and complete keyboard focus audit.

### F3. Mock/live boundary is ambiguous
`NFTGrid` uses mock data but appears integrated with live wallet context.

**Risk:** user trust and product credibility risk in production demos.

**Fix:** gate mock panels by environment/feature flag and add explicit non-production badge/empty-state messaging.

---

## 3) Backend Findings

> Current state: effectively no backend business layer (frontend-only app with RPC access from client context).

### B1. Missing server-side trust boundary for analytics
Agent report generation is fully client-side.

**Risk:** outputs can be tampered with and are not authoritative for automation.

**Fix:** create server route to compute and return signed/versioned analytics payloads.

### B2. No backend aggregation/cache for expensive/common reads
Each client session independently hits RPC for balances and transactions.

**Risk:** unnecessary cost and uneven response quality under load.

**Fix:** introduce server cache for derived snapshots with short TTLs.

### B3. No backend contract surface for future integrations
No stable API for portfolio/analytics retrieval.

**Risk:** future mobile, partner, or automation integrations require rework.

**Fix:** define minimal `/api/portfolio` and `/api/analytics` contracts with typed schemas.

---

## 4) Performance Findings

### P1. No request cache/dedup strategy
Data fetches occur in effect-driven flow without SWR/query abstraction.

**Risk:** repeated calls and avoidable latency.

### P2. Render path allocates many objects per pass
Large inline object literals and local icon components increase render work in frequently updated views.

**Risk:** reduced smoothness on lower-end devices.

### P3. Growth path for lists is unbounded
Transaction and token displays are currently small but lack pagination/virtualization plan.

**Risk:** performance degradation for high-activity wallets.

---

## 5) Security Findings

### S1. Data integrity risk from hardcoded pricing
SOL and token pricing values are hardcoded in the client.

**Risk:** incorrect financial decisions and reputational risk.

### S2. RPC endpoint trust is externally configurable client-side
`NEXT_PUBLIC_RPC_URL` allows runtime path to depend on exposed public env configuration.

**Risk:** misconfiguration or hostile endpoint could poison reads.

### S3. Limited failure isolation
RPC errors bubble to generic UI error state; no structured fallback mode.

**Risk:** cascading UX failures and poor incident handling.

### S4. Wallet auto-connect default without explicit user risk messaging
Wallet provider uses auto-connect behavior.

**Risk:** user surprise and unclear consent around reconnection behavior.

---

## 6) Scalability Findings

### SC1. Compute is client-bound
Portfolio analytics compute scales with user browser capabilities.

**Risk:** inconsistent output latency and no centralized SLO control.

### SC2. Observability is missing
No explicit instrumentation for fetch latency, error classes, or scoring pipeline behavior.

**Risk:** blind operations as traffic increases.

### SC3. CI gate maturity is incomplete
Lint is not non-interactively configured (`next lint` prompts setup).

**Risk:** unreliable quality gates in automated pipelines.

---

## 7) UI/UX Findings

### U1. Information density can overwhelm first-time users
Dashboard shows many panels without progressive onboarding.

**Fix:** introduce onboarding state and prioritize one key insight + one action.

### U2. Error/recovery UX is minimal
Current failure banner lacks targeted remediation steps.

**Fix:** differentiate RPC outage vs wallet permission vs rate-limit with actionable next steps.

### U3. Consistency gaps in visual behavior
Hover effects depend on JS event handlers in multiple cards.

**Fix:** shift to CSS-driven interactions for consistency and lower cognitive variance.

---

## 8) Risk Register (Top 10)
1. Stale/hardcoded market data.
2. Client-only analytics trust boundary.
3. Overloaded dashboard orchestration component.
4. No request dedup/caching strategy.
5. Missing backend API contracts.
6. Limited RPC resilience patterns.
7. Accessibility compliance gaps.
8. Unbounded list growth strategy.
9. Missing observability and SLO telemetry.
10. Non-interactive CI lint gate not ready.

---

## 9) Concrete Engineering Backlog (Production-Ready)

### Critical (P0)
- [ ] Integrate live pricing provider and add quote provenance UI.
- [ ] Extract dashboard data/analytics hooks and unit-test policy math.
- [ ] Implement resilient RPC client wrapper with timeout/retry/backoff.
- [ ] Configure ESLint non-interactively and enforce in CI.

### High (P1)
- [ ] Add server analytics endpoint with versioned payloads.
- [ ] Add query caching layer (SWR/React Query).
- [ ] Add accessibility fixes (aria, focus, keyboard navigation).
- [ ] Replace JS hover mutation with CSS classes.

### Medium (P2)
- [ ] Add pagination/virtualization for token and activity feeds.
- [ ] Introduce token/NFT metadata service with cache.
- [ ] Add telemetry dashboards + alert thresholds.
- [ ] Add feature flags for scoring model rollout.

---

## 10) Exit Criteria for "Production-Grade"
- Portfolio values are backed by live, timestamped quotes from trusted sources.
- Agent analytics are versioned, reproducible, and computed in a controlled backend boundary.
- Core views pass accessibility checks and keyboard navigation standards.
- RPC failures degrade gracefully with explicit user guidance.
- CI reliably runs lint/typecheck/build/tests in non-interactive mode.
- Observability provides latency/error metrics for wallet fetch and analytics generation paths.
