# Screenshot and Stock Data Features

## Overview

The API now includes two powerful new capabilities that work with ALL chat models:

1. **Website Screenshot Capture** - Take screenshots of any website on demand
2. **Real-Time Stock Data** - Fetch live market data for any stock ticker

Both features work automatically - the AI detects when they're needed and provides the information seamlessly.

## 📸 Screenshot Capability

### How It Works
- Uses WordPress mshots API (free, no authentication required)
- Automatically detects when users want to see a website
- Provides direct screenshot URLs that can be viewed in browser

### Automatic Detection
The system detects screenshot requests when users say:
- "Show me [website]"
- "Take a screenshot of [URL]"
- "What does [website] look like?"
- "Preview [URL]"
- "Capture [website]"

### Example Requests

```json
{
  "model": "gpt-4o-mini",
  "messages": [
    {
      "role": "user",
      "content": "Show me what google.com looks like"
    }
  ]
}
```

**AI Response:**
```
I'll capture a screenshot of google.com for you.

Here's the current view of the website:
https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.google.com?w=1280&h=960

This screenshot shows the Google homepage with its iconic search bar...
```

### Screenshot URL Format
```
https://s.wordpress.com/mshots/v1/[encoded-url]?w=1280&h=960
```
- URLs are automatically encoded
- Default size: 1280x960 pixels
- Works with any publicly accessible website

## 📈 Stock Market Data

### How It Works
- Uses Yahoo Finance API (free, no authentication required)
- Fetches real-time market data
- Automatically detects stock ticker symbols and company names

### Automatic Detection
The system detects stock requests when users mention:
- Ticker symbols (AAPL, GOOGL, TSLA, etc.)
- "Stock price of [company]"
- "What's [ticker] trading at?"
- Company names with stock-related keywords

### Data Provided
- Current price and currency
- Change amount and percentage
- Previous close
- Day's high and low
- 52-week range
- Trading volume
- Exchange information
- Last update time

### Example Requests

```json
{
  "model": "gemini-2.0-flash",
  "messages": [
    {
      "role": "user",
      "content": "What's the current price of AAPL?"
    }
  ]
}
```

**AI Response:**
```
Based on real-time market data, here's the current information for Apple Inc. (AAPL):

📊 **Apple Inc. (AAPL)**
- Current Price: $227.76 USD
- Change: +$2.86 (+1.27%)
- Previous Close: $224.90
- Day Range: $225.41 - $229.09
- 52 Week Range: $169.21 - $260.10
- Volume: 39,102,853
- Exchange: NasdaqGS
- Last Updated: Friday, August 22, 2025, 4:00 PM EDT

The stock is currently trading up 1.27% from yesterday's close...
```

### Supported Companies
The system recognizes common company names and maps them to tickers:
- Apple → AAPL
- Google → GOOGL
- Microsoft → MSFT
- Tesla → TSLA
- Meta/Facebook → META
- Amazon → AMZN
- And many more...

## 🔄 Combined Features

These features work seamlessly with existing capabilities:

### Example: Stock + Web Search
```
User: "What's happening with Tesla stock today?"
System: Fetches real-time TSLA data AND performs web search for news
```

### Example: Screenshot + Analysis
```
User: "Show me CNN.com and tell me the top stories"
System: Provides screenshot URL AND analyzes the content
```

## Technical Implementation

### Detection Functions
- `needsScreenshot()` - Detects screenshot requests
- `needsStockData()` - Detects stock data requests
- `generateScreenshotUrl()` - Creates WordPress mshots URLs
- `fetchStockData()` - Retrieves Yahoo Finance data

### Integration Points
1. Requests are analyzed before processing
2. Data is fetched in parallel with other operations
3. Information is injected into system prompts
4. Models are aware of these capabilities

## API Compatibility

These features work with:
- All 22 chat models in the system
- Streaming and non-streaming responses
- Web search integration
- Follow-up questions
- Multi-turn conversations

## Best Practices

1. **Let it work automatically** - Detection is accurate
2. **Combine with questions** - "Show me Apple's website and tell me about their latest products"
3. **Use follow-ups** - After getting stock data, ask for analysis
4. **Multiple requests** - Can handle multiple stocks or screenshots in one conversation

## Limitations

### Screenshot Limitations
- Only works with publicly accessible websites
- Cannot capture login-protected pages
- May have slight delay for first-time captures
- Maximum resolution: 1280x960

### Stock Data Limitations
- US market stocks work best
- Some international stocks may not be available
- Data has slight delay (usually < 1 minute)
- Historical data limited to current day

## No Configuration Required

Both features work out of the box:
- No API keys needed
- No additional setup
- Automatic detection
- Free to use

The AI models are fully aware of these capabilities and will use them proactively when appropriate!