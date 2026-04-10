n8nTradeBot

n8nTradeBot is an automated trading bot built using n8n workflow automation and a user-friendly frontend dashboard. It helps you schedule, monitor, and execute crypto trades using n8n workflows with real-time data and alerts.

🚀 Features

✔ Configurable n8n workflows for trading strategies
✔ Connect to crypto exchange APIs (e.g., Binance, Bybit)
✔ Schedule bots and monitor trading actions
✔ Frontend UI for configuration and status
✔ Alerts via email/Telegram/Webhooks

🧠 Architecture
+-------------------------+
|       Frontend UI       |
| (React / Next.js / Vue) |
+-----------+-------------+
            |
            v
+-------------------------+
|      n8n Workflows      |
|  (Trading & Automation) |
+-----------+-------------+
            |
            v
+-------------------------+
|   Exchange API Clients  |
| (Binance, Bybit, etc.)  |
+-------------------------+

🛠 Installation
Prerequisites

Node.js (v16+)

n8n installed globally or via Docker

API keys for trading exchanges

Clone
git clone https://github.com/sumit5213/n8nTradeBot.git
cd n8nTradeBot

🖥 Backend (n8n Workflows)
Using Docker
docker-compose up -d

Or using npx
npx n8n

Import workflows from the /workflows folder in n8n.

Frontend
cd frontend
npm install
npm run dev

Visit http://localhost:3000 to access the dashboard.

⚙️ Configuration

Copy the example environment variables:

.env.example ➜ .env 

Provide the following:

API_KEY=your_api_key
API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:3000

🧪 Usage

Open the frontend UI

Configure your exchange credentials

Create or select a trading strategy

Run the bot and monitor logs

🧩 Supported Exchanges

Binance

Bybit
(Add others if available)

📝 Contributing

Contributions are welcome!
Please open issues and submit pull requests.
