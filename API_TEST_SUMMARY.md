# 📊 API Model Test Report

**API Endpoint**: `https://ahamai-api.officialprakashkrsingh.workers.dev`  
**API Key**: `ahamaibyprakash25`  
**Test Date**: August 23, 2025  
**Test Time**: 03:04 AM IST

## 🎯 Test Summary

| Metric | Value |
|--------|-------|
| **Total Models Tested** | 19 |
| **Working Models** | 16 ✅ |
| **Failed Models** | 3 ❌ |
| **Success Rate** | 84.2% 📈 |
| **All Support Streaming** | Yes ✅ |

## ✅ Working Models (Sorted by Speed)

### ⚡ Lightning Fast (<1s)
1. **qwen-3-coder-480b** - 645ms 🥇
   - Coding specialized model
   - Excellent performance
   
2. **llama-4-scout-17b-16e-instruct** - 744ms 🥈
   - Meta's fast inference model
   - Great for general chat

### 🚀 Fast Models (1-2s)
3. **default** - 1,394ms 🏆
   - Speed-optimized with automatic fallback
   - Recommended for best performance
   
4. **gemini-2.0-flash** - 1,403ms
   - Google's latest fast model
   
5. **gemini-2.5-flash** - 1,543ms
   - Updated Gemini with better capabilities
   
6. **gemini-2.5-flash-lite-preview-06-17** - 1,713ms
   - Lightweight preview version

### 💪 Standard Models (2-5s)
7. **glm-4.5-air** - 2,068ms
   - GLM lightweight model
   
8. **deepseek-r1-distill-llama-70b** - 2,397ms
   - Reasoning-enhanced model
   
9. **exaanswer** - 2,553ms
   - Web search enhanced
   
10. **felo** - 2,747ms
    - Search capabilities
    
11. **glm-4.5** - 4,605ms
    - Full GLM model

### 🐢 Slower Models (>5s)
12. **gemini-2.5-flash-preview-04-17** - 6,401ms
13. **gemini-2.0-flash-thinking-exp-01-21** - 6,501ms
14. **v0-1.5-md** - 6,685ms
15. **v0-1.0-md** - 6,812ms
16. **perplexed** - 24,285ms (Slowest but has web search)

## ❌ Failed Models

| Model | Error | Reason |
|-------|-------|--------|
| **gemini-2.5-flash-lite** | HTTP 503 | Quota exceeded (429 Too Many Requests) |
| **meta-llama/llama-4-scout-17b-16e-instruct** | HTTP 503 | Bad Gateway (502) from upstream |
| **v0-1.5-lg** | Response Error | Returns null content |

## 🌟 Special Features

### 🔍 Web Search Models
- **perplexed** ✅ (Working but slow)
- **felo** ✅ (Fast search)
- **exaanswer** ✅ (Balanced speed)

### 🎯 Speed-Optimized
- **default** - Automatically selects fastest model
- **qwen-3-coder-480b** - Fastest overall
- **llama-4-scout-17b-16e-instruct** - Consistent speed

### 🧠 Reasoning Models
- **deepseek-r1-distill-llama-70b** ✅
- **glm-4.5** ✅
- **glm-4.5-air** ✅

### 🎨 Vercel v0 Models
- **v0-1.0-md** ✅
- **v0-1.5-md** ✅
- **v0-1.5-lg** ❌ (Returns null content)

## 📈 Performance Analysis

### Response Time Distribution
```
< 1s:   ██ (2 models)
1-2s:   ████ (4 models)
2-5s:   █████ (5 models)
5-10s:  ████ (4 models)
> 10s:  █ (1 model)
```

### Model Categories Performance
- **Fastest Category**: Qwen & Llama models (645-744ms)
- **Most Reliable**: Gemini models (5/6 working)
- **Best Overall**: Default model (auto-selection)

## 🔧 Integration Features

### ✅ All Working Models Support:
- ✅ OpenAI-compatible API format
- ✅ Streaming responses (SSE)
- ✅ System prompts
- ✅ Temperature control
- ✅ Max tokens limit
- ✅ JSON responses

### 🚀 Enhanced Capabilities:
- 🔍 **Intelligent Web Search** - Auto-detects when needed
- 📸 **Screenshot Generation** - WordPress mshots integration
- 💹 **Real-time Stock Data** - Yahoo Finance integration
- 🕐 **IST Timezone** - All timestamps in Indian Standard Time
- 🎨 **Markdown Formatting** - Rich responses with emojis

## 💡 Recommendations

### For Best Performance:
1. **Use "default" model** - Automatic speed optimization
2. **Fallback options**: qwen-3-coder-480b → llama-4-scout-17b-16e-instruct
3. **Avoid**: perplexed (unless web search needed)

### For Specific Needs:
- **Coding**: qwen-3-coder-480b
- **Web Search**: exaanswer or felo
- **Reasoning**: deepseek-r1-distill-llama-70b
- **General Chat**: gemini-2.0-flash or default

## 📝 Notes

1. **v0-1.5-lg Issue**: Returns null content, needs investigation
2. **Quota Limits**: gemini-2.5-flash-lite hitting rate limits
3. **Gateway Issues**: meta-llama/llama-4-scout-17b-16e-instruct path having upstream issues
4. **Best Practice**: Use the "default" model for automatic failover

## 🔄 Test Command

```bash
curl https://ahamai-api.officialprakashkrsingh.workers.dev/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ahamaibyprakash25" \
  -d '{
    "model": "default",
    "messages": [{"role": "user", "content": "Hello!"}],
    "stream": false
  }'
```

---
*Report generated on Friday, August 23, 2025, 03:04 AM IST*