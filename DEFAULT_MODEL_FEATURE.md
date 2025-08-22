# Default Model - Speed-Optimized Automatic Routing

## Overview

The **"default"** model is a smart routing system that automatically selects the fastest available AI model for your request. It ensures you always get the quickest response possible with automatic fallback to the next fastest model if one fails.

## Key Features

### ⚡ Automatic Speed Optimization
- Always routes to the fastest available model
- Dynamic performance tracking adjusts rankings in real-time
- Learns from actual response times to improve selection

### 🔄 Intelligent Fallback
- If the fastest model fails, automatically tries the next fastest
- Up to 3 attempts with different models
- Never leaves you without a response

### 📊 Response Time Tiers

**Tier 1: Lightning Fast (<1s)**
- llama-4-scout-17b-16e-instruct (0.567s)
- gemini-2.5-flash-lite-preview-06-17 (0.797s)
- gemini-2.0-flash (0.806s)
- gemini-2.0-flash-thinking-exp-01-21 (0.904s)
- deepseek-r1-distill-llama-70b (0.982s)

**Tier 2: Very Fast (1-2s)**
- gemini-2.5-flash (1.2s)
- gemini-2.5-flash-preview-04-17 (1.3s)
- v0-1.5-md (1.5s)
- v0-1.0-md (1.7s)
- glm-4.5-air (1.8s)

**Tier 3: Fast (2-3s)**
- felo (2.1s)
- perplexed (2.3s)
- exaanswer (2.5s)
- glm-4.5 (2.7s)

**Tier 4: Standard (3s+)**
- v0-1.5-lg (3.2s)
- qwen-3-coder-480b (3.5s)
- gemini-2.5-flash-lite (3.8s)

## Usage

Simply use `"default"` as your model name:

```json
{
  "model": "default",
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?"
    }
  ]
}
```

## Response Metadata

The response includes metadata about which model was actually used:

```json
{
  "choices": [...],
  "model": "default (via llama-4-scout-17b-16e-instruct)",
  "metadata": {
    "actual_model": "llama-4-scout-17b-16e-instruct",
    "response_time_ms": 567,
    "attempt": 1,
    "tier": 1
  }
}
```

For streaming responses, check the headers:
- `X-Actual-Model`: The model that was used
- `X-Response-Time`: Response time in milliseconds

## How It Works

### 1. Initial Selection
- Starts with the fastest model based on performance data
- Currently: llama-4-scout-17b-16e-instruct (567ms average)

### 2. Dynamic Adjustment
- Tracks actual response times for each model
- After 3+ requests, uses weighted average:
  - 70% recent performance
  - 30% baseline performance
- Automatically adapts to current conditions

### 3. Failure Handling
- If a model fails, it's blacklisted for that request
- Automatically tries the next fastest model
- Maximum 3 attempts before returning error

### 4. Performance Tracking
```
[Performance] llama-4-scout-17b-16e-instruct: 523ms (avg: 545ms over 10 requests)
[Performance] gemini-2.0-flash: 789ms (avg: 812ms over 8 requests)
```

## Benefits

### For Users
- **Always Fast**: Get the quickest response possible
- **Always Reliable**: Automatic fallback ensures availability
- **Zero Configuration**: Just use "default" and it handles everything

### For Developers
- **No Model Selection Needed**: System picks the best model
- **Automatic Optimization**: Performance improves over time
- **Transparent**: See which model was used in metadata

## Example Scenarios

### Scenario 1: Normal Operation
1. Request with `model: "default"`
2. Routes to llama-4-scout (fastest)
3. Success in 567ms
4. Response includes metadata

### Scenario 2: Primary Model Fails
1. Request with `model: "default"`
2. Tries llama-4-scout → fails
3. Automatically tries gemini-2.5-flash-lite
4. Success in 797ms
5. Response shows attempt #2

### Scenario 3: Dynamic Optimization
1. System notices gemini-2.0-flash responding faster today
2. Adjusts internal rankings
3. Next request routes to gemini-2.0-flash first
4. Continuously optimizes based on real performance

## Best Practices

1. **Use for General Queries**: Perfect for standard chat interactions
2. **Monitor Metadata**: Check which models are being used
3. **Let It Learn**: Performance improves as it gathers data
4. **Combine with Features**: Works with web search, screenshots, and stock data

## Technical Details

### Selection Algorithm
```javascript
1. Sort models by effective response time
2. effective_time = (dynamic_avg * 0.7) + (baseline * 0.3)
3. Skip failed models from current request
4. Select first available model
5. Track performance for future optimization
```

### Fallback Strategy
- Attempt 1: Fastest available model
- Attempt 2: Next fastest (different tier if possible)
- Attempt 3: Most reliable fallback (gemini-2.0-flash)

## Compatibility

The default model works with:
- All existing features (web search, screenshots, stocks)
- Streaming and non-streaming responses
- All API parameters
- Follow-up conversations

## Future Enhancements

- Geographic optimization (route to nearest/fastest endpoint)
- User preference learning
- Cost optimization options
- Custom speed/quality balance settings

The "default" model ensures you always get the best possible performance without having to think about model selection!