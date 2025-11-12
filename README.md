# EncryptingBlend
EncryptingBlend is a privacy-preserving payment gateway that fuses **x402 HTTP-native payments** with **Solana privacy infrastructure** such as **Elusiv**, **Light Protocol**, and **Confidential Balances**. 

## Features

- `402 Payment Required` with dynamic pricing
- Private payments via **Elusiv shielded pool**
- Gateway breaks on-chain linkability
- Signed ZK-compatible receipts
- Works with USDC (SPL) or any token
- Merchant never sees payer wallet

---

## Tech Stack

| Layer       | Tech |
|-------------|------|
| Protocol    | [x402](https://docs.cdp.coinbase.com/x402/docs/welcome) |
| Chain       | Solana |
| Privacy     | [Elusiv](https://elusiv.io) |
| Backend     | Node.js + TypeScript |
| Monitoring  | Solana Web3.js + WebSocket |

---

## Quick Start

```bash
cp .env.example .env
# Fill in: PRIVATE_KEY, ELUSIV_SEED, RPC_URL

npm install
npm run dev
