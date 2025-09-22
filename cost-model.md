# Cost & Latency Model – ShopLite AI Touchpoints

This document outlines token usage, cost per interaction, and estimated daily cost for the two selected AI features.

---

## 1. FAQ Assistant

- Input tokens: 150  
- Output tokens: 150  
- Model: GPT-4o-mini

### Cost per call:
- Input: 150 / 1000 × $0.0005 = $0.000075
- Output: 150 / 1000 × $0.0015 = $0.000225
- Total = $0.0003

### Latency:
- Cached: ~300ms
- Uncached: ~1200ms

### Usage:
- 1,000 calls/day
- 30% cache hit → 700 uncached
- Daily cost = 700 × $0.0003 = $0.21

---

## 2. Smart Search Suggestions

- Input: 30  
- Output: 20  
- Model: GPT-4o-mini

### Cost per call:
- Input: 30 / 1000 × $0.0005 = $0.000015
- Output: 20 / 1000 × $0.0015 = $0.00003
- Total = $0.000045

### Latency:
- Cached: ~100ms
- Uncached: ~300ms

### Usage:
- 5,000 calls/day
- 70% cache hit → 1,500 uncached
- Daily cost = 1,500 × $0.000045 = $0.0675

---

## Summary

| Feature                   | Daily Cost |
|---------------------------|------------|
| FAQ Assistant             | $0.21      |
| Smart Search Suggestions  | $0.07      |
| **Total**                 | **$0.28**  |