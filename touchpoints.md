# AI Touchpoints – ShopLite

This document defines the two AI-powered user experiences selected for implementation this sprint.

---

## 1. FAQ Assistant

###  Problem
Users frequently abandon support flows due to hard-to-navigate static FAQ sections. This touchpoint provides contextual, AI-generated answers from `FAQ.md`.

###  Happy Path Flow
1. User opens "Help" and starts typing a question.
2. The typed question is sent to an AI endpoint.
3. The endpoint passes the question + parsed `FAQ.md` content to the model.
4. The model returns a single-sentence answer.
5. The answer is shown in the UI with a “Was this helpful?” option.
6. If the model cannot answer confidently, show fallback options (live support).
7. If user says "not helpful", offer to escalate to a support rep.
8. System logs the interaction (excluding raw completion text).
9. Daily metrics are collected on: Match confidence, Escalation rate, Resolution rate
10. Model is periodically retrained with user feedback.

###  Guardrails
- Inputs strictly limited to `FAQ.md`
- Output max 300 characters
- Answers include a link to full FAQ article
- No policy fabrication (evals used)

###  Human-in-the-loop
- If confidence < threshold → escalate to human
- “Talk to someone” always visible

###  PII Considerations
- Strip emails/order numbers/names from logs & prompts

###  Metrics
- Deflection rate, latency, escalation rate

---

## 2. Smart Search Suggestions

###  Problem
Users often type incomplete or ambiguous queries and abandon search. AI-enhanced suggestions can increase relevance and product discovery.

###  Happy Path Flow
1. User starts typing in search bar.
2. After 2 characters, input is sent to AI.
3. AI uses product metadata to generate suggestions.
4. Model returns 3 ranked phrases.
5. UI displays suggestions.
6. User clicks → regular search triggered.

###  Guardrails
- Inputs: ≤10 tokens, only product metadata
- Latency: ≤300ms
- Outputs: 3 plain strings max

###  Metrics
- Typeahead CTR
- Search-to-cart conversion
- Avg latency (p95)

###  PII Considerations
- No logging of user queries unless anonymized
