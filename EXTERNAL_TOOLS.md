# External Tools Implementation

## Overview

This implementation adds powerful external tools functionality to the AHAM AI API, allowing AI models to automatically use external tools when needed without requiring keyword-based triggers. The tools run in parallel to ensure API responsiveness.

## Features Implemented

### 1. Web Scraping Tool
- **API Endpoint**: `https://scrap.ytansh038.workers.dev/?url=`
- **Purpose**: Extracts content from websites for AI analysis
- **Automatic Detection**: Triggers when users ask for content, information, or analysis of websites
- **Timeout**: 10 seconds to prevent API slowdown

### 2. Screenshot Tool  
- **API Endpoint**: `https://s.wordpress.com/mshots/v1/`
- **Purpose**: Captures visual screenshots of websites
- **Flutter Compatibility**: Screenshots are embedded in markdown format for Flutter display
- **Auto-detection**: Triggers when users want to see, preview, or visually inspect websites
- **Smart Fallback**: Automatically provides screenshots when URLs are mentioned but no specific tool is requested

### 3. Intelligent URL Handling
- **Protocol Addition**: Automatically adds `https://` to bare domains
- **URL Extraction**: Uses multiple regex patterns to find URLs in natural language
- **Normalization**: Cleans and standardizes URLs for consistent processing
- **Multi-URL Support**: Handles up to 3 URLs per request to prevent overload

## Technical Implementation

### Core Functions

#### Tool Detection
```javascript
needsWebScraping(messages)    // Detects when web content extraction is needed
needsScreenshot(messages)     // Detects when visual screenshots are needed
```

#### URL Processing
```javascript
normalizeUrl(url)            // Standardizes URLs (adds protocol, etc.)
extractUrls(messages)        // Finds all URLs in user messages
```

#### Tool Execution
```javascript
scrapeWebsite(url)           // Fetches website content via scraping API
generateScreenshotUrl(url)   // Creates screenshot URLs for display
processExternalTools(messages) // Main orchestrator function
```

### Integration with Chat API

The external tools are integrated into the `handleChat` function with these key features:

1. **Parallel Execution**: Tools run simultaneously with model preparation to prevent delays
2. **Timeout Protection**: 5-second timeout ensures API responsiveness
3. **Context Injection**: Tool results are added to the conversation context
4. **Error Handling**: Graceful fallback if tools fail

### Detection Patterns

#### Web Scraping Triggers
- "scrape", "fetch", "get content", "browse", "visit site"
- "what's on website", "content of site", "information from URL"
- "analyze website", "check site", "look at page"
- "want to know about content", "get information"

#### Screenshot Triggers  
- "screenshot", "capture", "show looks like", "preview"
- "take picture", "visual", "appearance of"
- "show me", "display website", "see what looks"
- Auto-trigger when URLs are present but no specific tool requested

## Usage Examples

### Example 1: Automatic Web Scraping
```json
{
  "model": "qwen-235b",
  "messages": [
    {
      "role": "user",
      "content": "Get the content from example.com and analyze it"
    }
  ]
}
```

**Result**: AI automatically scrapes example.com and provides analysis

### Example 2: Screenshot Generation
```json
{
  "model": "auto", 
  "messages": [
    {
      "role": "user",
      "content": "Show me what google.com looks like"
    }
  ]
}
```

**Result**: AI provides screenshot with Flutter markdown embed

### Example 3: Multiple Tools
```json
{
  "model": "gpt-4o-mini",
  "messages": [
    {
      "role": "user", 
      "content": "Compare github.com and gitlab.com - show me both sites and get their content"
    }
  ]
}
```

**Result**: AI uses both scraping and screenshots for comprehensive comparison

## Performance Considerations

### Parallel Execution
- Tools execute in parallel with model requests
- Maximum 8-second timeout for scraping
- 5-second overall timeout for external tools processing
- Graceful degradation if tools fail

### Rate Limiting Protection
- Maximum 3 URLs processed per request
- Content limited to 8000 characters to prevent token overflow
- Timeout mechanisms prevent hanging requests

### Error Handling
- Tools continue execution even if some fail
- API remains responsive regardless of external tool status
- Comprehensive error logging for debugging

## AI Model Awareness

The AI models are made aware of external tools through:

1. **Context Injection**: Tool results are added to conversation context
2. **Capability Description**: Models understand they have access to real-time web data
3. **Usage Guidelines**: Clear instructions on how to reference and use tool data
4. **Markdown Support**: Screenshot URLs formatted for proper display

## Flutter Integration

Screenshots are provided in Flutter-compatible markdown format:
```markdown
![Screenshot of example.com](https://s.wordpress.com/mshots/v1/https%3A%2F%2Fexample.com?w=1280&h=960)
```

## API Compatibility

External tools work with:
- All 22+ chat models in the system
- Streaming and non-streaming responses  
- Auto model selection
- Vision and text models
- Multi-turn conversations

## Configuration

No additional configuration required:
- ✅ No API keys needed
- ✅ No setup required
- ✅ Works out of the box
- ✅ Automatic detection
- ✅ Free to use

The external tools functionality enhances the AI's capabilities while maintaining API performance and reliability.