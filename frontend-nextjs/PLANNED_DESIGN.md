
# BlockPages Frontend (Next.js) — Enhanced Design & Future Advancements

## 1. Project Purpose & Vision

BlockPages is a global Web3 wallet directory and assistance platform. It enables users to search, analyze, and interact with blockchain wallets, flag suspicious activity, rate trusted wallets, and leverage AI-powered analytics. The platform is designed for extensibility, security, and professional user experience.

---

## 2. Core Features (Current & Planned)

### Authentication & Wallet Login
- **Email/Password Authentication** (JWT, protected routes)
- **MetaMask Login** (Ethereum provider)
- **Planned: Multi-Wallet Login**
  - **Coinbase Wallet** (via WalletLink/WalletConnect)
  - **WalletConnect** (supporting mobile wallets like Trust Wallet, Rainbow, etc.)
  - **Custom EVM Wallets** (via private key or hardware wallet integration)
  - **Social Login** (Google, Twitter, for non-blockchain users)

### Wallet Analytics & Directory
- **Region-Based Directory** (search/filter by continent, country, city)
- **Wallet Info Scraping** (balance, tx count, last tx, flagged/rated status)
- **Advanced Analytics** (charts, trends, flagged/rated history)
- **Planned: Multi-Chain Support**
  - Ethereum, BSC, Polygon, Solana, and more
  - Cross-chain wallet search and analytics

### On-Chain Actions
- **Flag Wallets** (on-chain and off-chain)
- **Rate Wallets** (on-chain and off-chain)
- **Planned: On-Chain Messaging**
  - Send encrypted messages to wallet owners
  - Notification system for flagged/rated wallets

### AI & Assistance
- **AI-Powered Wallet Analysis** (risk scoring, transaction pattern detection)
- **FAQ & 411 Assistance** (AI/FAQ backend for instant answers)
- **Planned: AI Transaction Monitoring**
  - Real-time risk alerts
  - Automated flagging based on suspicious patterns

### Admin Tools
- **Directory Management** (CRUD for wallets)
- **FAQ Management**
- **Analytics Dashboard** (charts, filters, export)
- **Planned: Admin Moderation**
  - Approve/reject flagged wallets
  - Manage user roles and permissions

### Donations & Social Impact
- **GivingBlock Integration** (donate to verified charities)
- **Planned: On-Chain Donation Tracking**
  - Show donation history per wallet
  - Leaderboards for top donors

---

## 3. UI/UX & Accessibility

- **Material UI + Tailwind** for modern, responsive design
- **Persistent Navbar** with Info button, wallet connect, and drawer for mobile
- **Global Snackbar/Toast** for feedback
- **Accessibility**: ARIA labels, keyboard navigation, color contrast
- **Planned: Dark Mode & Custom Themes**
- **Planned: User Profiles & Avatars**

---

## 4. Folder Structure (Enhanced)

```
frontend-nextjs/
  app/
    [feature]/page.jsx|tsx      # Feature pages (login, register, account, search, admin, etc.)
    layout.tsx                  # Global layout (Navbar, AuthProvider)
    middleware.js               # Route protection
    api/                        # API routes (auth, session, wallet, etc.)
  components/
    [Component].jsx|tsx         # Reusable UI and logic components
    WalletProvider.jsx|tsx      # Multi-wallet provider logic
    WalletConnectButton.jsx|tsx # Unified wallet connect button
  context/
    AuthContext.tsx             # Authentication context
    WalletContext.tsx           # Multi-wallet context
  lib/
    [utility].js|ts             # Utility functions, DB logic
  models/
    [Model].js|ts               # Data models
  public/                       # Static assets
  services/
    [service].js|ts             # API, blockchain, contract, donation, AI services
    walletProviders/            # Coinbase, WalletConnect, etc.
  smart-contracts/              # Hardhat contracts, tests
  utils/                        # DB and blockchain utilities
  styles/                       # Global and component styles
  __tests__/                    # Unit and integration tests
```

---

## 5. Key Components & Pages (Enhanced)

- **WalletProvider**: Handles multiple wallet connections (MetaMask, Coinbase, WalletConnect, etc.)
- **WalletConnectButton**: Unified button for all wallet providers
- **Account**: User info, wallet connect, analytics, flags, donations, multi-chain balances
- **Search/WalletSearch**: Search wallets, show analytics, on-chain actions, multi-chain support
- **Admin Dashboard**: Analytics, directory, FAQ, moderation tools
- **GlobalSnackbar/Toast**: User feedback
- **MetaMaskConnect, CoinbaseConnect, WalletConnectComponent**: Individual wallet logic
- **WalletAnalytics/AdvancedAnalytics**: Charts, tables, insights, cross-chain data
- **AIAnalyzer**: AI-powered wallet analysis, risk scoring
- **DonationLeaderboard**: Top donors, donation history

---

## 6. State Management

- **React Context**: Auth state, wallet state, global snackbar
- **Local State**: Page/component-specific state
- **API Calls**: Fetch, mutate, and cache data from backend and blockchain
- **Planned: Redux or Zustand for complex state**

---

## 7. Security & Best Practices

- **Protected Routes**: Middleware, AuthGuard, cookie/session validation
- **Input Validation**: Forms, wallet addresses, contract interactions
- **Error Handling**: Try/catch, user feedback, logging
- **Environment Variables**: API keys, secrets in `.env.local`
- **Planned: 2FA for admin users**

---

## 8. Extensibility & Scalability

- Modular components and services
- Easy to add new wallet providers, analytics, admin tools, or blockchain integrations
- Clear separation of concerns (UI, logic, data, contracts)
- Pluggable wallet provider architecture

---

## 9. Deployment & CI/CD

- **Vercel**: Production deployment, preview builds
- **Linting/Type Checking**: ESLint, TypeScript
- **Testing**: Unit and integration tests in `__tests__`
- **Planned: GitHub Actions for CI/CD**

---

## 10. Future Enhancements

- **Multi-Wallet Login**: Add Coinbase, WalletConnect, and hardware wallet support
- **Multi-Chain Analytics**: Ethereum, BSC, Polygon, Solana, etc.
- **On-Chain Messaging & Notifications**
- **AI Transaction Monitoring & Automated Flagging**
- **User Profiles, Avatars, and Social Features**
- **Mobile App (React Native)**
- **Organization/Charity Profiles**
- **Advanced Admin Moderation**
- **Real-Time Alerts (WebSockets)**
- **Dark Mode & Custom Themes**
- **2FA and Enhanced Security**

---

## Implementation Steps for Advancements

1. **Add Multi-Wallet Login**
   - Create `WalletProvider` and context for managing multiple wallet connections.
   - Integrate Coinbase Wallet (via WalletLink/WalletConnect).
   - Integrate WalletConnect for mobile wallets.
   - Update UI to allow users to choose their wallet provider.

2. **Enable Multi-Chain Support**
   - Refactor analytics and wallet components to accept chain/network as a parameter.
   - Update backend and smart contracts for cross-chain queries.
   - Add UI for selecting blockchain network.

3. **Enhance AI & Analytics**
   - Integrate real-time AI transaction monitoring.
   - Add risk scoring and automated flagging.
   - Visualize analytics across chains.

4. **Expand Admin Tools**
   - Add moderation queue for flagged wallets.
   - Implement user role management and permissions.
   - Add export/import features for analytics.

5. **Improve Security**
   - Add 2FA for admin users.
   - Harden input validation and error handling.
   - Audit smart contracts and backend APIs.

6. **Boost User Experience**
   - Add dark mode and custom themes.
   - Enable user profiles and avatars.
   - Add real-time notifications and messaging.

---

This enhanced design is tailored to your current codebase and project goals. It is ready for implementation and future growth. For questions or suggestions, contact the project maintainer.
