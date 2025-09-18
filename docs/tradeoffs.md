# LiveDrop Design Tradeoffs

---

##  Redis for Stock Locking

- Atomic operations via Lua scripting
- Prevents overselling with high concurrency
- Avoids database locking overhead

---

##  Kafka for Notifications

- Drop events are published to Kafka
- WebSocket and Notification services consume from Kafka
- Enables real-time fan-out without bottlenecks

---

##  PostgreSQL for Core Relational Data

- Used for orders, drops, users, follows
- Enforces consistency with foreign keys
- Scales vertically and horizontally with partitioning

---

##  Elasticsearch for Search

- Fast fuzzy/full-text search
- Async indexing from PostgreSQL
- Avoids loading DB for queries

---

##  Idempotent Orders

- `idempotency_key` prevents duplicate orders
- Safe retries if user or network fails

---

##  WebSocket Gateway

- Instant client updates (drop starts, stock alerts)
- Connects millions of users using a pub/sub model

---

##  Why Not Use Only DB?

- Redis offloads hot paths (stock)
- Kafka enables loose coupling
- WebSocket scales real-time better than polling

---

##  Monitoring & Observability

- Prometheus for metrics (QPS, latency, stock hits)
- Grafana dashboards
- Centralized logs and alerting
