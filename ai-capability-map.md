# AI Capability Map – ShopLite

This document explores candidate AI capabilities for the ShopLite platform and selects two to move forward for implementation and cost modeling.

---

| Capability                | Intent / Outcome                          | Inputs This Sprint      | Risk (1–5) | p95 Latency (ms) | Cost (est. per call) | Fallback Mechanism         | Selected |
|---------------------------|-------------------------------------------|--------------------------|------------|------------------|-----------------------|-----------------------------|----------|
| 🧠 FAQ Assistant          | Answer customer support questions         | `FAQ.md`                | 2          | 1200             | $0.01                | Show full FAQ section       | ✅       |
| 🔍 Smart Search Suggestions | Suggest products based on partial input   | Product metadata (SKUs) | 2          | 300              | $0.002               | Fallback to static typeahead | ✅       |
| 🧾 Product Description Optimizer | Generate SEO-rich descriptions for SKUs | Product names/specs     | 4          | N/A              | $0.01                | Manual copy                 | ❌       |
| 🔁 Return Policy Bot       | Explain return options                    | Returns policy text     | 3          | 1200             | $0.008               | Link to returns page        | ❌       |

---

### ✅ Selection Rationale

We chose the **FAQ Assistant** and **Smart Search Suggestions** because:

- They use content **already available** in this sprint (`FAQ.md`, product data).
- Both are **low-risk** to launch and measure impact.
- They target clear KPIs:
  - 🎧 FAQ Assistant → reduces support contact rate
  - 🛒 Smart Suggestions → improves product discoverability and search-to-cart conversion

---