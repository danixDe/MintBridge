# Solana Token Minting DApp

This project is a decentralized application (dApp) that allows users to mint, manage, and transfer SPL tokens on the Solana Devnet. It showcases full-stack Web3 development using modern frontend technologies and blockchain integration.

---
Live : https://mint-bridge.vercel.app/
## Tech Stack

- **Next.js** – Full-stack React framework for server-side rendering and static site generation.
- **TailwindCSS** – Utility-first CSS for rapidly building custom designs.
- **Solana Web3.js** – JavaScript API to interact with the Solana blockchain.
- **@solana/spl-token** – Token program client library for SPL token operations.
- **@wallet-ui/react** – React-based wallet integration to connect and interact with Solana wallets.
- **TypeScript** – Strong typing for better code quality and developer experience.

---

## What is Solana Devnet?

Solana Devnet is a publicly available test network that mimics the behavior of the Solana Mainnet. It allows developers to:

- Experiment with token creation and transfers.
- Airdrop test SOL for development without financial risk.
- Simulate real transactions and validate dApp functionality.

---

## Features

- Connect to a Solana wallet using a simple UI.
- Create a new SPL token with mint authority.
- Mint tokens into the associated token account.
- Check token supply and balances.
- Transfer tokens to any valid wallet address on Devnet.

---

## How to Use the App

1. **Connect Wallet**  
   Click the "Connect Wallet" button and choose a supported wallet (e.g., Phantom).

2. **Create Token**  
   Automatically airdrops test SOL to your temporary wallet and mints a new SPL token.

3. **Mint Token**  
   Mints a fixed amount of tokens to the wallet’s associated token account.

4. **Check Balance**  
   Displays total token supply and your wallet's token balance.

5. **Send Token**  
   Sends a portion of the minted tokens to your connected wallet address.

---

## Setup Instructions

Clone and run the project locally:

```bash
git clone https://github.com/danixDe/MintBridge.git
cd MintBridge
npm install
npm run dev
```

**Requirements:**
- Node.js (v18+ recommended)
- Phantom Wallet or compatible Solana wallet
- Internet access (to connect to Solana Devnet)

---

## Learning Outcomes

- Build real dApps on the Solana blockchain.
- Understand token minting, associated token accounts, and Devnet workflows.
- Learn secure wallet integration in React-based frontends.
- Apply full-stack principles using Next.js and TypeScript.

---

## License

Licensed under the MIT License. Feel free to fork, clone, and contribute.

---

## Contact

Developed by [Aravind Bollapragada].  
For questions, feedback, or collaborations, reach out via [LinkedIn](https://linkedin.com/in/arvix17) or open a GitHub issue.

