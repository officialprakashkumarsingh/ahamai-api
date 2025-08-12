# AHAMAI API Models Test Report

**API URL:** https://ahamai-api.officialprakashkrsingh.workers.dev  
**API Key:** ahamaibyprakash25  
**Test Date:** January 10, 2025  
**Total Models Tested:** 17

## Test Summary

- ✅ **Working Models:** 5/17 (29.4%)
- ❌ **Non-Working Models:** 12/17 (70.6%)

---

## ✅ Working Models (5)

These models successfully responded to test requests:

| Model | Status | Test Response |
|-------|--------|---------------|
| **gpt-4o** | ✅ Working | Successfully returns chat completions |
| **gpt-4o-mini** | ✅ Working | Successfully returns chat completions |
| **perplexed** | ✅ Working | Successfully returns chat completions (verbose responses) |
| **felo** | ✅ Working | Successfully returns chat completions |
| **deepseek-r1** | ✅ Working | Successfully returns chat completions |

---

## ❌ Non-Working Models (12)

These models failed to respond properly:

| Model | Error Type | Error Message |
|-------|------------|---------------|
| **gpt-4.1-nano** | 502 Bad Gateway | Model request failed with status 502 |
| **gpt-4.1-mini** | 502 Bad Gateway | Model request failed with status 502 |
| **deepseek-chat** | 502 Bad Gateway | Model request failed with status 502 |
| **deepseek-reasoner** | 502 Bad Gateway | Model request failed with status 502 |
| **claude-3.5-haiku** | 502 Bad Gateway | Model request failed with status 502 |
| **gemini-2.0-flash** | 502 Bad Gateway | Model request failed with status 502 |
| **gemini-2.5-flash-proxy** | 502 Bad Gateway | Model request failed with status 502 |
| **grok-3-mini** | 502 Bad Gateway | Model request failed with status 502 |
| **claude-sonnet-4** | 401 Unauthorized | Model request failed with status 401 |
| **claude-opus-4** | 401 Unauthorized | Model request failed with status 401 |
| **grok-4** | 401 Unauthorized | Model request failed with status 401 |
| **kimi-k2-instruct** | 401 Unauthorized | Model request failed with status 401 |

---

## Error Analysis

### 502 Bad Gateway (8 models)
These models are likely experiencing server-side issues or are temporarily unavailable:
- gpt-4.1-nano
- gpt-4.1-mini
- deepseek-chat
- deepseek-reasoner
- claude-3.5-haiku
- gemini-2.0-flash
- gemini-2.5-flash-proxy
- grok-3-mini

### 401 Unauthorized (4 models)
These models require additional authentication or are not accessible with the current API key:
- claude-sonnet-4
- claude-opus-4
- grok-4
- kimi-k2-instruct

---

## Test Commands Used

Example curl command for testing each model:

```bash
curl -s -X POST "https://ahamai-api.officialprakashkrsingh.workers.dev/v1/chat/completions" \
  -H "Authorization: Bearer ahamaibyprakash25" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "MODEL_NAME",
    "messages": [{"role": "user", "content": "Say OK"}],
    "max_tokens": 10
  }'
```

---

## Recommendations

1. **Use Working Models:** Stick to the 5 working models for production use:
   - gpt-4o
   - gpt-4o-mini
   - perplexed
   - felo
   - deepseek-r1

2. **Monitor 502 Errors:** The models returning 502 errors may become available later. Consider retesting periodically.

3. **Check Authentication:** For 401 errors, verify if additional API keys or permissions are needed for:
   - Claude models (claude-sonnet-4, claude-opus-4)
   - Grok models (grok-4)
   - Kimi model (kimi-k2-instruct)

4. **API Stability:** 70% failure rate suggests the API service may have stability issues or many models are in beta/development.

---

## Quick Reference - Working Models Only

```javascript
const WORKING_MODELS = [
  "gpt-4o",
  "gpt-4o-mini",
  "perplexed",
  "felo",
  "deepseek-r1"
];
```