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


