# Solfolio — Agentic Engineering Grant Submission

## Project Overview
- **Repo:** https://github.com/princeroveev-art/Solfolio
- **Drive:** https://drive.google.com/drive/folders/1u5oa-iilxXNVD9i8iqVXtAjSc77zBJAV?usp=drive_link
- **Track:** Agentic Engineering on Solana
- **Stack:** Next.js, TypeScript, Solana Web3.js, Wallet Adapter, Helius RPC

## What is Solfolio?
Solfolio is an AI-powered Solana portfolio tracker that goes beyond simple balance display. It features an autonomous agentic engine that analyzes on-chain wallet state, detects risk, scores portfolio health, and generates prioritized action recommendations — all in real time.

## Agentic Features Built

### 1. Autonomous Agent Engine (`lib/agentEngine.ts`)
- Portfolio normalization and asset classification
- Concentration risk detection across token holdings
- Volatility-weighted risk scoring per asset
- Overall portfolio health scoring (0–100)
- Prioritized autonomous action list generation
- On-chain task queue for executable next steps

### 2. Agent Ops Panel UI (`components/portfolio/AgentOpsPanel.tsx`)
- Real-time visualization of risk and health scores
- Detected risks displayed with severity levels
- Actionable recommendation cards
- Executable on-chain task queue integrated into dashboard

### 3. On-Chain Interaction Hardening (`lib/solana.ts`)
- All RPC methods accept explicit `activeConnection` argument
- Wallet adapter connection used directly — no silent fallbacks
- Proper error handling and env-based RPC configuration via Helius

### 4. Grind Score Reputation System
- Scores wallets based on SOL balance, token diversity, and transaction activity
- Tiered ranking system (Solana Newbie → Grind God)
- Displayed prominently in dashboard for social/identity layer

## Why This is Grant-Worthy
- Demonstrates a concrete **agentic decisioning loop** over live on-chain state
- Produces actionable outputs that map directly to transaction automations
- Uses deterministic, inspectable reasoning suitable for trust-sensitive Web3
- Professional SaaS-grade UI — production-ready, not a prototype
- Built entirely using agentic engineering workflows (Codex + Claude)
- Upgraded existing project rather than rebuilding from scratch

## Roadmap / Next Extensions
- Wire action queue to transaction builder/simulator endpoints
- Add alert delivery via Telegram/Discord bot for high-risk thresholds
- Add historical snapshots and agent memory over time
- Integrate Jupiter API for live token prices
- Add multi-wallet comparison and portfolio benchmarking

## Builder
- **GitHub:** https://github.com/princeroveev-art
- **X:** https://x.com/prv04_