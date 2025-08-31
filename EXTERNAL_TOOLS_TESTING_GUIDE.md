# External Tools Testing Guide

## Overview
The external tools functionality has been fixed to properly execute function calls instead of returning raw JSON data.

## Key Fixes Applied

### 1. Variable Assignment Issue
- **Problem**: `tools` was declared as `const` but being modified later
- **Fix**: Changed to `let` and used proper array assignment

### 2. Tool Choice Configuration
- **Problem**: Tool choice wasn't properly configured for function calling
- **Fix**: Always set `tool_choice` to 'auto' to enable function calling

### 3. System Prompt Enhancement
- **Problem**: AI models weren't being instructed to use tools
- **Fix**: Enhanced system prompt to emphasize "MUST use" language

### 4. Variable Naming Conflicts
- **Problem**: Naming conflict between local `tools` variable and external tools result
- **Fix**: Renamed external tools result to `externalToolsData`

### 5. Fallback Handling
- **Problem**: Some models don't support function calling and would fail
- **Fix**: Added automatic retry without tools if function calling fails

### 6. Enhanced Debugging
- **Added**: Comprehensive logging to trace tool execution flow

## Testing the Fixes

### Test 1: Web Scraping
```bash
curl -X POST https://your-worker-url/chat \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen-235b",
    "messages": [
      {
        "role": "user",
        "content": "Please scrape the content from example.com and tell me what you find"
      }
    ]
  }'
```

**Expected**: The AI should call the `web_scrape` function and provide actual content from example.com instead of raw JSON.

### Test 2: Screenshot
```bash
curl -X POST https://your-worker-url/chat \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen-235b",
    "messages": [
      {
        "role": "user",
        "content": "Show me what google.com looks like"
      }
    ]
  }'
```

**Expected**: The AI should call the `take_screenshot` function and provide a screenshot embed.

### Test 3: Mixed Tools
```bash
curl -X POST https://your-worker-url/chat \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen-235b",
    "messages": [
      {
        "role": "user",
        "content": "Compare github.com and gitlab.com - show me both sites and get their content"
      }
    ]
  }'
```

**Expected**: The AI should use both web scraping and screenshot tools.

## Debugging

If tools still aren't working, check the console logs for:

1. `"Added built-in tools:"` - Confirms tools are being added
2. `"Tools configured in payload:"` - Confirms tools are sent to model
3. `"Found X tool calls to execute"` - Confirms model is making tool calls
4. `"Executing tool:"` - Confirms tools are being executed

## Common Issues and Solutions

### Issue: "Still getting raw JSON instead of tool execution"
- **Check**: Console logs for tool detection messages
- **Solution**: Verify the model supports function calling, fallback should handle non-supporting models

### Issue: "Tools not being detected"
- **Check**: Message patterns in `needsWebScraping` and `needsScreenshot` functions
- **Solution**: Use explicit keywords like "scrape", "get content", "screenshot", "show me"

### Issue: "External tools timeout"
- **Check**: External tool URLs are accessible
- **Solution**: External tools have 8-second timeout, after which they gracefully fail

## Verification Checklist

- [ ] AI models receive tools in payload (check logs)
- [ ] AI models make function calls instead of describing what they would do
- [ ] Tool execution returns actual data (scraped content, screenshot URLs)
- [ ] Fallback works for models that don't support function calling
- [ ] External tools processing doesn't slow down API response
- [ ] Error handling works gracefully when tools fail

The external tools should now properly execute and provide enhanced AI responses with real-time web data.