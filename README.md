# 💡 BlockPages 411 — The Global Web3 Wallet Directory & Assistance dApp

BlockPages 411 is a professional, global "411 for web3" wallet directory and assistance platform. It features region-based wallet search, fraud flagging, wallet rating, AI-powered wallet info scraping, user authentication, admin tools, analytics dashboard with visualizations, and notifications—all with modern UI and robust backend/frontend integration.

---

## 🚀 Key Features

- **Region-Based Directory:** Search and filter wallets by continent, country, state, or city.
- **Wallet Flagging & Rating:** Users can flag suspicious wallets and rate trusted ones (on-chain and off-chain).
- **AI-Powered Wallet Info:** Scrapes wallet data (balance, tx count, last tx) from block explorers (Etherscan) and displays it in the directory.
- **User Authentication:** Secure JWT-based login/register, user roles (user/admin), and protected routes.
- **Admin Tools:**
  - Directory management (add/edit/search wallets)
  - FAQ management (add/edit/delete FAQs)
  - Analytics dashboard with charts, filters, and export options
- **411 Assistance:** FAQ and live question form, with AI/FAQ backend for instant answers.
- **Analytics & Visualization:**
  - Logs user actions (directory search, phone lookup, wallet flag/rate, 411 questions)
  - Admin dashboard with event type charts, user distribution, time series, top flagged/rated wallets, and CSV/JSON export
- **Notifications:** Toast notifications for user actions and errors.
- **Modern UI/UX:** Built with React, Material UI, and Tailwind CSS for a beautiful, accessible experience.
- **411 Branding:** Consistent "BlockPages 411" branding throughout the app.

---

## 🗂 Project Structure

```plaintext
BlockPages/
├── backend/         # Node.js, Express, MongoDB, Moralis, AI, API
├── frontend/        # React, Material UI, Tailwind, Analytics, 411 UI
├── smart-contracts/ # Solidity, Hardhat, On-chain wallet logic
```

---

## 🚀 **Getting Started**

### 🧑‍💻 Clone the Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/blockpages.git
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

## 📊 Analytics Dashboard (Admin)
- Visualizes user actions: directory search, phone lookup, wallet flag/rate, 411 questions
- Interactive filters (event type, date range)
- Event type distribution (bar chart)
- User distribution (pie chart)
- Events over time (line chart)
- Top flagged and rated wallets
- Export analytics as CSV or JSON

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

---

# For more, see in-app documentation and admin dashboard.
