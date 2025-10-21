# LiveDrop – Charbel Chalouhy

A real-time flash-sale platform where creators host limited-inventory product drops.

##  Architecture Diagram

![LiveDrop Architecture](architecture_diagram.png)

**https://excalidraw.com/#json=Flmay_WPVbFKep44DYcMz,VM02tfdSKEy_xXfh9ljAYg**  
(Also included as `LiveDrop-CharbelChalouhy`)

##  Key Features

- Real-time drop notifications (WebSocket/Kafka)
- No overselling: atomic stock handling via Redis
- Follower system built for "celebrity" scale
- Search, pagination, and low-latency APIs
- Fully idempotent and secure order system

##  Project Structure

```
livedrop-CharbelChalouhy/
├── README.md
├── architecture_diagram.png
├── architecture.excalidraw
├── api/
│   └── public_api.md
├── models/
│   └── schema.sql
├── docs/
│   └── tradeoffs.md
```

##  Public API

See [`api/public_api.md`](api/public_api.md)

##  Data Models

See [`models/schema.sql`](models/schema.sql)

##  Design Tradeoffs

See [`docs/tradeoffs.md`](docs/tradeoffs.md)

---

## Assignment 3: ShopLite RAG Assistant

This section contains the **RAG (Retrieval-Augmented Generation)** assistant built for ShopLite — enabling intelligent FAQ and product support search from markdown files.

**Author:** Charbel Chalouhy  
Week 3 Assignment — AI-First Initiative

###  Project Files

```
shoplite-rag-assistant/
├── docs/prompting/
│   ├── knowledge-base.md
│   ├── ground-truth-qa.md
│   ├── assistant-prompts.yml
│   └── evals.md
├── notebooks/
│   └── llm-deployment.ipynb
└── src/
    └── chat-interface.py
```

###  Run Instructions

```bash
pip install faiss-cpu sentence-transformers flask transformers pyyaml
python src/chat-interface.py
```

---

## Assignment 4: LiveDrop Storefront (Frontend)

This is the final assignment — implementing a fully functional, AI-powered storefront for LiveDrop using **Next.js**, with optional OpenAI integration for AI-powered product discovery.

### Features

- Built with **Next.js 14 (App Router)**
- Fully styled with **Tailwind CSS**
- Local dev server with `.env.example` included
- AI assistant-ready structure
- Uses Vercel AI SDK + OpenAI if desired

### Folder Structure

```
Assignment-4/
└── apps/
    └── storefront/
        ├── app/
        ├── components/
        ├── public/
        ├── styles/
        ├── .env.example
        ├── package.json
        ├── tsconfig.json
        ├── tailwind.config.ts
        └── README.md
```

###  Running the Storefront Locally

1. Go to the directory:
   ```bash
   cd Assignment-4/apps/storefront
   ```

2. Copy the environment config:
   ```bash
   cp .env.example .env
   ```

3. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

4. Start the dev server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. Open your browser at:
   ```
   http://localhost:3000
   ```

---
## Assignment 5: ShopLite API & Admin Dashboard

A complete **Node/Express + MongoDB** API with a **React (Vite)** admin dashboard.  
Includes analytics, performance snapshot, **Server-Sent Events (SSE)** for live order status, sample data seeding, and an optional LLM “assistant” endpoint.

### Tech Stack
- **Backend:** Node 18+, Express, MongoDB Atlas, `cors`, `helmet`, `morgan`, `dotenv`
- **Frontend:** Vite, React, TypeScript
- **Streaming:** Server-Sent Events (SSE)

### Folder Structure
```
assignment5_final/
└── apps/
    ├── api/                 # Express API + MongoDB + SSE
    │   ├── src/
    │   │   ├── assistant/engine.js
    │   │   ├── routes/{customers,products,orders,analytics,dashboard}.js
    │   │   ├── sse/order-status.js
    │   │   ├── db.js
    │   │   └── server.js
    │   ├── seed/seed.js
    │   ├── package.json
    │   └── .env.example
    │
    └── storefront/          # Vite + React admin dashboard
        ├── src/App.tsx
        ├── vite.config.ts
        ├── package.json
        └── .env.example
```

### Prerequisites
- Node.js ≥ 18 and npm  
- A **MongoDB Atlas** cluster + database user  
- Connection string, e.g.:
  ```
  mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/?retryWrites=true&w=majority
  ```

### Setup

#### 1) API — configure, seed, run
```bash
cd assignment5_final/apps/api
cp .env.example .env
```

Edit `.env`:
```ini
PORT=8080
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/?retryWrites=true&w=majority
DB_NAME=week5
LLM_BASE_URL=https://your-ngrok-subdomain.ngrok-free.app   # optional for /api/assistant
```

Install + seed + start:
```bash
npm install
npm run seed
npm run start   # -> [API] listening on :8080
```

Health check:
```
http://localhost:8080/api/health
```

#### 2) Frontend — point to API and run
```bash
cd ../storefront
cp .env.example .env.local
```

`.env.local`:
```
VITE_API=http://localhost:8080
```

Run:
```bash
npm install
npm run dev
```
Open **http://localhost:5173**.

### Key Endpoints

- **Health**  
  `GET /api/health` → `{ ok: true, ts: "..." }`

- **Analytics (dashboard cards)**  
  `GET /api/analytics/dashboard-metrics`  
  Returns `totalRevenue`, `totalOrders`, `avgOrderValue`, `ordersByStatus`.

- **Performance snapshot**  
  `GET /api/dashboard/performance`

- **Customers / Products**  
  `GET /api/customers?email=demo@example.com`  
  `GET /api/products`

- **Orders (CRUD + SSE)**  
  `POST /api/orders` — create  
  `GET /api/orders/:id` — read  
  `GET /api/orders/:id/stream` — **SSE** stream of status updates  
  *(UI has an input box to paste an order `_id` and watch the stream live.)*

- **Assistant (optional)**  
  `POST /api/assistant` with `{ "text": "..." }` (requires `LLM_BASE_URL`)

### Quick Usage (PowerShell)

Create an order and stream it:

```powershell
# get a known customer
$customerId = (Invoke-RestMethod "http://localhost:8080/api/customers?email=demo@example.com")._id

# create order (no escaping issues thanks to here-string)
$json = @"
{
  "customerId": "$customerId",
  "items": [
    { "name": "Test", "price": 19.99, "quantity": 1 }
  ]
}
"@
$result = Invoke-RestMethod -Method Post -Uri "http://localhost:8080/api/orders" -ContentType "application/json" -Body $json
$result  # copy the _id

# stream status (in any shell)
# curl --no-buffer http://localhost:8080/api/orders/<ID>/stream
```

### Troubleshooting
- **SSE ends immediately** → the order already reached `DELIVERED`. Create a fresh order.  
- **UI cannot fetch** → check `VITE_API=http://localhost:8080` and restart `npm run dev`.  
- **MongoDB connection fails** → verify Atlas credentials/IP allowlist and `MONGODB_URI`.


