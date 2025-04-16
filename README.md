
# 💡 BlockPages — The Global Web3 Wallet Directory

BlockPages is a decentralized application designed to act as a **modern wallet directory** — offering wallet ratings, fraud flagging, and AI-backed transaction monitoring across multiple blockchain networks like **Ethereum, BSC, and Polygon**.

This platform helps users flag suspicious wallets, rate trusted wallets, and improves transparency in blockchain ecosystems by combining AI transaction analysis with smart contract enforcement.

---

## ⚙️ **Project Status**

| Status           | Progress  |
|------------------|-----------|
| 🚧 In Development | ~70% Complete |

**Smart Contract Deployment:** ✅  
**Backend Server Running:** ✅  
**Backend ↔ Smart Contract Integration:** 🔥 *Pending Final Wiring*  
**Frontend UI:** 70% functional  
**AI Transaction Scraper:** Early stage  
**Notification System:** Planned  
**Admin Dashboard:** Planned  

---

## 🗂 **Project Structure**

```plaintext
BlockPages/
├── backend/                      # Backend Server (Node.js, Express, Moralis)
│   ├── controllers/              # API Controllers
│   │   ├── walletController.js
│   │   ├── userController.js
│   │   ├── aiController.js
│   ├── models/                   # MongoDB Schemas
│   │   ├── User.js
│   │   ├── Wallet.js
│   │   ├── Transaction.js
│   ├── routes/                   # Express Routes
│   │   ├── walletRoutes.js
│   │   ├── userRoutes.js
│   │   ├── aiRoutes.js
│   ├── services/                 # Business Logic
│   │   ├── moralisService.js
│   │   ├── aiService.js
│   │   ├── contractService.js
│   ├── utils/                    # Helpers
│   │   ├── db.js
│   │   ├── responseHelper.js
│   ├── server.js                 # Express App Starter
│   └── .env                      # Environment Variables
│
├── frontend/                     # Frontend (React.js + Tailwind CSS)
│   ├── src/
│   │   ├── components/
│   │   │   ├── WalletChecker.jsx
│   │   │   ├── FlaggedWallets.jsx
│   │   │   ├── Navbar.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── moralisService.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── WalletSearch.jsx
│   │   │   ├── Flagged.jsx
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles.css
│   └── .env
│
├── smart-contracts/              # Solidity Smart Contracts
│   ├── contracts/
│   │   ├── BlockPages.sol
│   ├── scripts/
│   │   ├── deploy.js
│   │   ├── interact.js
│   ├── hardhat.config.js
│   └── package.json
```

---

## 🚀 **Getting Started**

### 🧑‍💻 Clone the Repository

```bash
git clone https://github.com/LegionofMany/blockpages.git
cd blockpages
```

---

### 💻 Smart Contract Setup

```bash
cd smart-contracts
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network your-network
```

> Replace `your-network` with: `sepolia`, `bscTestnet`, `polygonMumbai` etc.

---

### 🖥️ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
MORALIS_API_KEY=your_moralis_api_key
PRIVATE_KEY=your_wallet_private_key
CONTRACT_ADDRESS=deployed_contract_address
```

Run the server:

```bash
node server.js
```

---

### 🌐 Frontend Setup

```bash
cd frontend
npm install
npm start
```

> Make sure your backend server is running before launching the frontend.

---

## 💡 **How to Apply the Project for Completion**

1️⃣ **Backend ↔ Smart Contract Integration**  
> Implement API routes to directly invoke deployed smart contract functions using `ethers.js`.  
Files to modify:  
- `/services/contractService.js`  
- `/controllers/walletController.js`  

2️⃣ **AI Transaction Scraping**  
> Train and integrate a Python-based AI model for transaction pattern detection. Connect the output to flag wallets automatically.

3️⃣ **Notification System (Real-Time Alerts)**  
> Implement Socket.IO or WebSockets for real-time wallet flagging updates.

4️⃣ **Admin Dashboard**  
> Create new React components to manage flagged wallets and display risk reports.

5️⃣ **Deployment**  
> Deploy Backend on DigitalOcean / AWS.  
> Deploy Frontend on Vercel or Netlify.

---

## 🤝 **Contributing**

1. Fork this repo  
2. Create a feature branch (`git checkout -b feature/YourFeatureName`)  
3. Push to your branch (`git push origin feature/YourFeatureName`)  
4. Open a pull request!  

**Collaboration opportunities:**  
- AI model building 🧠  
- Blockchain contract audits 🔍  
- Frontend design 🎨  

---

## 📜 License  

This project will be licensed under the MIT License.  
See `LICENSE.md` (coming soon!) for full terms.

---

## 📣 **Disclaimer**

This project is under development — not production-ready. Use at your own risk until officially audited and released.
