# Changelog

## [Fixed] - 2025-07-23

### Fixed Issues
- ❌ **API Error (400): Model 'chatgpt-4o' is not supported** - RESOLVED
- ❌ **Removed TypeGPT API key** - RESOLVED
- ✅ **Updated endpoint to use supported Claude 3.5 Sonnet model** - COMPLETED

### Changes Made

#### 1. Model Configuration Updates
- **Removed**: `chatgpt-4o` model (unsupported by endpoint)
- **Added**: `claude-3-5-sonnet-ashlynn` model using Claude 3.5 Sonnet via Ashlynn AI
- **Updated**: Model routing to use correct endpoint URL with supported model parameter

#### 2. Security Improvements
- **Removed**: TypeGPT API key (`sk-opTjonVDepkc7g95FeoxJcfRvsGOvhh4JJUZSi1iHC4RSCBR`)
- **Maintained**: Primary API key for authentication

#### 3. Code Changes
**File: `workers.js`**
```diff
- const Typegpt_API_KEY = "sk-opTjonVDepkc7g95FeoxJcfRvsGOvhh4JJUZSi1iHC4RSCBR";
- "chatgpt-4o": "ashlynn/chatgpt-4o"
+ "claude-3-5-sonnet-ashlynn": "ashlynn/claude-3-5-sonnet"

- "ashlynn/chatgpt-4o": "https://ai.ashlynn.workers.dev/ask"
+ "ashlynn/claude-3-5-sonnet": "https://ai.ashlynn.workers.dev/ask"

- model=ChatGPT-4o
+ model=Claude+3.5+Sonnet
```

**File: `README.md`**
```diff
- `chatgpt-4o` - ChatGPT-4o (via Ashlynn AI)
+ `claude-3-5-sonnet-ashlynn` - Claude 3.5 Sonnet (via Ashlynn AI)

- "model": "chatgpt-4o"
+ "model": "claude-3-5-sonnet-ashlynn"
```

#### 4. Endpoint Verification
- ✅ **Confirmed**: `https://ai.ashlynn.workers.dev/ask` supports `Claude 3.5 Sonnet` model
- ✅ **Tested**: API responds correctly with model parameter `Claude+3.5+Sonnet`
- ✅ **Verified**: OpenAI-compatible response format conversion works properly

### How to Use Updated Model

Replace your API calls from:
```json
{
  "model": "chatgpt-4o",
  "messages": [...]
}
```

To:
```json
{
  "model": "claude-3-5-sonnet-ashlynn",
  "messages": [...]
}
```

### Test Results
- **Endpoint Status**: ✅ Working
- **Model Support**: ✅ Claude 3.5 Sonnet confirmed supported
- **Response Format**: ✅ Proper OpenAI-compatible JSON structure
- **Authentication**: ✅ API key validation working

All issues have been resolved. The API now uses a supported model (Claude 3.5 Sonnet) and the TypeGPT API key has been removed for security.