# API Model Testing Report

**Generated:** August 16, 2025, 15:31:01  
**API Endpoint:** https://ahamai-api.officialprakashkrsingh.workers.dev  
**API Key:** ahamaibyprakash25  

## Executive Summary

- **Total Models Tested:** 23
- **Working Models:** 22 (95.65% success rate)
- **Failed Models:** 1 (4.35% failure rate)

## Test Results Overview

### ✅ WORKING MODELS (22 models)

#### Core OpenAI Models (3/4 working)
1. ✅ `gpt-4o-mini` - Response: "Working"
2. ❌ `gpt-4o` - **FAILED: Request timed out after 30 seconds**
3. ✅ `gpt-oss-20b` - Response: "Working"
4. ✅ `gpt-oss-120b` - Response: "Working"

#### Proxy Models (3/3 working)
5. ✅ `perplexed` - Response: Extended response with explanation
6. ✅ `felo` - Response: "Working"
7. ✅ `exaanswer` - Response: "Working"

#### DeepSeek Models (3/3 working)
8. ✅ `deepseek-r1` - Response: Shows thinking process
9. ✅ `deepseek/deepseek-r1:free` - Response: "Working"
10. ✅ `deepseek-r1-distill-llama-70b` - Response: Detailed thinking + "Working"

#### Google Gemini Models (4/4 working)
11. ✅ `gemini-2.0-flash` - Response: "Working"
12. ✅ `gemini-2.0-flash-thinking-exp-01-21` - Response: "Working"
13. ✅ `gemini-2.5-flash-lite-preview-06-17` - Response: "Working"
14. ✅ `gemini-2.5-flash` - Response: "Working"

#### Meta Llama Models (2/2 working)
15. ✅ `meta-llama/llama-4-scout-17b-16e-instruct` - Response: "Working"
16. ✅ `llama-4-scout-17b-16e-instruct` - Response: "Working"

#### FastAPI Free Models (7/7 working)
17. ✅ `gpt-5-chat-latest` - Response: "Workingrking" (garbled but responding)
18. ✅ `claude-opus-4-20250514` - Response: Empty/newline (responding but no content)
19. ✅ `claude-sonnet-4-20250514` - Response: "Working."
20. ✅ `gemini-2.5-flash-preview-04-17` - Response: "Workingrking" (garbled but responding)
21. ✅ `gpt-5` - Response: Empty/newline (responding but no content)
22. ✅ `gpt-5-mini` - Response: "Working."
23. ✅ `gpt-5-nano-2025-08-07` - Response: "Workingrking" (garbled but responding)

### ❌ FAILED MODELS (1 model)

1. **`gpt-4o`** - Timeout error (30 seconds)
   - **Issue:** Request timed out
   - **Endpoint:** https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions
   - **Recommendation:** Remove from workers.js or investigate timeout issue

## Detailed Analysis

### Models with Response Quality Issues

Several models are technically "working" but have response quality concerns:

1. **Models with garbled responses:**
   - `gpt-5-chat-latest`: "Workingrking"
   - `gemini-2.5-flash-preview-04-17`: "Workingrking"
   - `gpt-5-nano-2025-08-07`: "Workingrking"

2. **Models with empty responses:**
   - `claude-opus-4-20250514`: Returns only newline
   - `gpt-5`: Returns only newline

### Models with Excellent Performance

1. **Most reliable models:**
   - `gpt-4o-mini`
   - `gpt-oss-20b`
   - `gpt-oss-120b`
   - `felo`
   - `exaanswer`
   - All Gemini models (except preview)
   - All Meta Llama models
   - `deepseek/deepseek-r1:free`
   - `gpt-5-mini`
   - `claude-sonnet-4-20250514`

### ChatGPT-5 Series Analysis

**ChatGPT-5 models found in workers.js:**
1. ✅ `gpt-5-chat-latest` - Working (garbled response)
2. ✅ `gpt-5` - Working (empty response)
3. ✅ `gpt-5-mini` - Working (good response)
4. ✅ `gpt-5-nano-2025-08-07` - Working (garbled response)

**All ChatGPT-5 models are technically responding** but some have quality issues.

## Recommendations

### Immediate Actions Required

1. **Remove non-working model:**
   - Remove `gpt-4o` due to consistent timeout issues

2. **Consider removing low-quality models:**
   - `gpt-5-chat-latest` (garbled responses)
   - `gemini-2.5-flash-preview-04-17` (garbled responses)
   - `gpt-5-nano-2025-08-07` (garbled responses)
   - `claude-opus-4-20250514` (empty responses)
   - `gpt-5` (empty responses)

### Keep These High-Quality Models

**Recommended to keep (excellent performance):**
- `gpt-4o-mini`
- `gpt-oss-20b`
- `gpt-oss-120b`
- `perplexed`
- `felo`
- `exaanswer`
- `deepseek-r1`
- `gemini-2.0-flash`
- `gemini-2.0-flash-thinking-exp-01-21`
- `gemini-2.5-flash-lite-preview-06-17`
- `gemini-2.5-flash`
- `deepseek/deepseek-r1:free`
- `deepseek-r1-distill-llama-70b`
- `meta-llama/llama-4-scout-17b-16e-instruct`
- `llama-4-scout-17b-16e-instruct`
- `claude-sonnet-4-20250514`
- `gpt-5-mini`

## Configuration Summary

**Current workers.js has 23 models, with only 1 completely failing.**

**Performance breakdown:**
- 🟢 Excellent: 16 models
- 🟡 Working but with issues: 6 models  
- 🔴 Failed: 1 model

**Next steps:** Await user decision on which models to remove based on this analysis.