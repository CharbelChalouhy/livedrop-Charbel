-- USERS
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- CREATORS
CREATE TABLE creators (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  display_name TEXT NOT NULL
);

-- FOLLOWS
CREATE TABLE follows (
  follower_id UUID REFERENCES users(id),
  creator_id UUID REFERENCES creators(id),
  PRIMARY KEY (follower_id, creator_id)
);

-- PRODUCTS
CREATE TABLE products (
  id UUID PRIMARY KEY,
  creator_id UUID REFERENCES creators(id),
  name TEXT,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- DROPS
CREATE TABLE drops (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  total_stock INTEGER,
  low_stock_threshold INTEGER,
  status TEXT
);

-- ORDERS
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  drop_id UUID REFERENCES drops(id),
  quantity INTEGER,
  idempotency_key TEXT UNIQUE,
  status TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);


