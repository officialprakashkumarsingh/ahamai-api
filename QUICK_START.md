# Quick Start Guide

## 🚀 Recommended: Use the "default" Model

For the best experience, always use the **"default"** model:

```json
{
  "model": "default",
  "messages": [
    {
      "role": "user", 
      "content": "Your message here"
    }
  ]
}
```

## Why Use "default"?

✅ **Always Fastest** - Automatically routes to the quickest responding model  
✅ **Always Available** - Intelligent fallback if primary model fails  
✅ **Self-Optimizing** - Learns and improves routing over time  
✅ **Zero Configuration** - No need to choose between 22+ models  

## Available Models

1. **"default"** - 🏆 RECOMMENDED (Fastest with automatic fallback)
2. "llama-4-scout-17b-16e-instruct" - Lightning fast (567ms)
3. "gemini-2.0-flash" - Very reliable (806ms)
4. "v0-1.5-md" - Balanced performance
5. "perplexed" - Web search enhanced
6. "felo" - Web search capable
7. "exaanswer" - Web search optimized
8. Plus 15+ more specialized models...

## Features Available with ALL Models

- ✅ Real-time web search (automatic when needed)
- ✅ Website screenshots (automatic when discussing sites)
- ✅ Live stock data (automatic when mentioning companies)
- ✅ No knowledge cutoff (always current information)
- ✅ Streaming support
- ✅ Follow-up conversation memory

## Example Request

```bash
curl -X POST https://your-api-url/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "default",
    "messages": [
      {
        "role": "user",
        "content": "What is Apple stock price and show me their website"
      }
    ],
    "stream": false
  }'
```

The AI will automatically:
1. Use the fastest available model
2. Fetch real-time AAPL stock data
3. Provide a screenshot of apple.com
4. Include current information with no knowledge cutoff

## Model Selection Priority

When you use `"default"`, it tries models in this order (based on speed):

**Tier 1 (Lightning Fast <1s):**
1. llama-4-scout-17b-16e-instruct (567ms)
2. gemini-2.5-flash-lite-preview (797ms)
3. gemini-2.0-flash (806ms)

**Tier 2 (Very Fast 1-2s):**
4. gemini-2.5-flash
5. v0-1.5-md
6. glm-4.5-air

If a faster model fails, it automatically tries the next one!

## Just Use "default" - It's That Simple! 🎯