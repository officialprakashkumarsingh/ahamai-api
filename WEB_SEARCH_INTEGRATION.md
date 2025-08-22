# Intelligent Web Search Integration

## Overview

The API now includes **automatic intelligent web search** capabilities for all chat models. When the system detects that a query requires current or real-time information, it automatically performs a web search and enriches the response with up-to-date data.

## Key Features

### 🤖 Automatic Detection
- **No keywords required** - The system intelligently detects when web search is needed
- Works with **ALL chat models** (gpt-4o, gemini, v0, llama, etc.)
- Seamlessly integrates search results into responses

### ⚡ Fast Search Models
The system automatically selects the fastest available search model:
1. **exaanswer** (1.2s avg) - Highest priority
2. **perplexed** (1.5s avg) - Most reliable
3. **felo** (1.8s avg) - Fallback option

### 🎯 Smart Query Analysis
Automatically detects queries about:
- Current events and news
- Weather and climate
- Stock prices and markets
- Sports scores and events
- Product reviews and prices
- Recent technology updates
- Government and politics
- Company information
- And much more...

## Usage

### Automatic Mode (Default)
Simply send your query as usual - the system will automatically detect if web search is needed:

```json
{
  "model": "gpt-4o-mini",
  "messages": [
    {
      "role": "user",
      "content": "What are today's top news headlines?"
    }
  ]
}
```

### Manual Control
You can explicitly control web search behavior using the `web_search` parameter:

#### Force Web Search
```json
{
  "model": "gemini-2.0-flash",
  "messages": [
    {
      "role": "user",
      "content": "Tell me about Paris"
    }
  ],
  "web_search": true  // Forces web search even for general queries
}
```

#### Disable Web Search
```json
{
  "model": "v0-1.5-lg",
  "messages": [
    {
      "role": "user",
      "content": "What's happening in tech today?"
    }
  ],
  "web_search": false  // Disables web search even for current events
}
```

## Query Patterns Detected

The system automatically detects these patterns:

### 1. Temporal Queries
- "latest", "recent", "current", "today", "yesterday"
- "this week", "this month", "this year"
- Year references (2024, 2025, etc.)

### 2. Real-time Information
- Weather and forecasts
- Stock prices and markets
- Sports scores and matches
- News and updates

### 3. Factual Queries
- "Who is...", "What is...", "Where is..."
- Statistics and data
- Population, GDP, economy

### 4. Product & Services
- Reviews and ratings
- Prices and availability
- Where to buy/find

### 5. Location & Travel
- Directions and routes
- Business hours
- Flight and hotel info

## Response Format

### With Web Search
When web search is performed, responses include:
```
[Web search performed using exaanswer]

[Your enhanced response with current information...]
```

### Streaming Responses
For streaming requests, you'll see:
```
[Performing web search...]

[Followed by the enhanced response...]
```

## Examples

### Example 1: Current Events
**Request:**
```json
{
  "model": "gpt-4o",
  "messages": [
    {"role": "user", "content": "What happened in the stock market today?"}
  ]
}
```
**Result:** Automatically performs web search and provides current market data.

### Example 2: General Knowledge (No Search)
**Request:**
```json
{
  "model": "gemini-2.0-flash",
  "messages": [
    {"role": "user", "content": "What is the capital of France?"}
  ]
}
```
**Result:** Answers directly without web search (not needed for static facts).

### Example 3: Forced Search
**Request:**
```json
{
  "model": "v0-1.5-md",
  "messages": [
    {"role": "user", "content": "Explain quantum computing"}
  ],
  "web_search": true
}
```
**Result:** Performs web search to get latest developments in quantum computing.

## Technical Details

### How It Works
1. **Query Analysis**: Incoming messages are analyzed for patterns indicating need for current information
2. **Search Execution**: If needed, the fastest available search model is used
3. **Context Enhancement**: Search results are intelligently merged with the original query
4. **Response Generation**: The chosen model generates a response using both its knowledge and search results

### Performance
- Search adds ~1-2 seconds to response time
- Parallel processing minimizes latency
- Fallback to regular response if search fails
- No impact on queries that don't need search

### Compatibility
- Works with all chat models
- Supports both streaming and non-streaming
- Compatible with existing API parameters
- Backward compatible - no breaking changes

## Testing

Use the included test script to verify functionality:
```bash
node test_web_search.js
```

This will test:
- Automatic detection
- Manual control
- Different model types
- Various query patterns

## Best Practices

1. **Let it work automatically** - The detection is quite accurate
2. **Use manual control sparingly** - Only when you need specific behavior
3. **Streaming recommended** - For better user experience with search
4. **Combine with system prompts** - For specialized search behavior

## Limitations

- Search adds 1-2 seconds to response time
- Search results limited to 500 tokens to maintain context
- Web search models (perplexed, felo, exaanswer) don't search themselves
- Rate limits apply to search models

## API Compatibility

This feature is fully compatible with the OpenAI API format and works with:
- OpenAI SDK
- LangChain
- Any OpenAI-compatible client
- Direct HTTP requests

No changes needed to existing integrations!