# LiveDrop Public API

All endpoints are protected via JWT Authentication.

---

##  Follower Endpoints

- **POST** `/creators/:id/follow`  
  → Follow a creator

- **DELETE** `/creators/:id/follow`  
  → Unfollow a creator

- **GET** `/creators/:id/followers?page=1&limit=20`  
  → List followers of a creator (paginated)

- **GET** `/users/:id/follows`  
  → List creators followed by a user

---

##  Product & Drop Endpoints

- **GET** `/products?query=&page=&limit=`  
  → Search products (Elasticsearch-backed)

- **GET** `/drops/:id`  
  → View details of a specific drop

- **GET** `/drops?status=live`  
  → List live drops

---

##  Order Endpoints

- **POST** `/orders`  
  → Place an order  
   Requires: `drop_id`, `quantity`, `idempotency_key`

- **GET** `/orders/:id`  
  → Retrieve order status

- **GET** `/stock/:drop_id`  
  → Check real-time stock status

---

##  Notifications

- Real-time events sent via WebSocket:
  - Drop started
  - Low stock
  - Sold out
  - Order confirmed
