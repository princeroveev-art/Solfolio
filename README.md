# Solfolio 🌐

> AI-powered Web3 identity and on-chain portfolio platform for Solana

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Solana](https://img.shields.io/badge/Solana-Mainnet-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan)

## ✨ Features

- **Wallet Connection** — Connect any Solana wallet (Phantom, Backpack, Solflare)
- **Token Portfolio** — Real-time SOL + SPL token balances with USD values
- **NFT Gallery** — View your NFT collection with metadata
- **Activity Feed** — Recent transaction history with Solscan links
- **Grind Score** — AI-computed reputation metric from on-chain behavior
- **Animated UI** — Futuristic Web3 aesthetic with canvas particle system
- **Mobile Responsive** — Full mobile + desktop layout

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Copy env template and add your RPC URL
cp .env.local.example .env.local

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
solfolio/
├── app/
│   ├── layout.tsx          # Root layout with wallet providers
│   ├── page.tsx            # Homepage / landing
│   ├── globals.css         # Global styles + Tailwind
│   └── dashboard/
│       └── page.tsx        # Dashboard page
├── components/
│   ├── layout/
│   │   ├── AnimatedBackground.tsx  # Canvas particle system
│   │   └── Navbar.tsx             # Navigation header
│   ├── wallet/
│   │   ├── WalletProviders.tsx    # Solana wallet context
│   │   └── WalletButton.tsx       # Custom connect button
│   └── portfolio/
│       ├── HeroSection.tsx        # Landing hero with typewriter
│       ├── FeatureGrid.tsx        # Feature cards + stats bar
│       ├── DashboardContent.tsx   # Main dashboard orchestrator
│       ├── TokenList.tsx          # Token holdings table
│       ├── GrindScoreCard.tsx     # Reputation score with gauge
│       ├── NFTGrid.tsx            # NFT collection grid
│       └── ActivityFeed.tsx       # Recent transactions
├── lib/
│   ├── solana.ts           # RPC helpers, balance fetching
│   ├── grindScore.ts       # Grind score calculator
│   └── utils.ts            # Misc utilities
└── vercel.json             # Vercel deployment config
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_RPC_URL` | Solana RPC endpoint | Recommended |
| `NEXT_PUBLIC_HELIUS_API_KEY` | Helius API for NFT data | Optional |
| `NEXT_PUBLIC_BIRDEYE_API_KEY` | Birdeye for live prices | Optional |

## 🌐 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deploys.

## 🛣️ Roadmap

- [ ] Live token price feed via Jupiter API
- [ ] NFT metadata via Helius API
- [ ] AI wallet summarizer (Claude API)
- [ ] Reputation analysis agent
- [ ] Portfolio insight recommendations
- [ ] Share your Solfolio profile
- [ ] Shareable NFT/stats cards

## 🤝 Built For

Superteam Earn — Ideas → Prompt → Prod grant program.
Built on Solana. Powered by AI.

## 📄 License

MIT
