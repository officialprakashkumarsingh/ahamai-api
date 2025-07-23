# Changelog

## [Updated] - 2025-01-15

### Major Model Configuration Update
- ❌ **Removed Claude models from V1.s1.sdk.li endpoint** - COMPLETED
- ✅ **Added multiple free AI models from various providers** - COMPLETED
- ✅ **Implemented duplicate model handling with suffixes** - COMPLETED
- ✅ **Renamed claude-sonnet-4-rproxy to claude-sonnet-4** - COMPLETED

### Changes Made

#### 1. Removed Models from V1.s1.sdk.li
- **Removed**: `claude-3-5-sonnet` (from anthropic/claude-3-5-sonnet)
- **Removed**: `claude-3-7-sonnet` (from anthropic/claude-3-7-sonnet)
- **Removed**: `claude-sonnet-4` (from anthropic/claude-sonnet-4)

#### 2. Added New Free Models via DeepInfra
- **Added**: `grok-3-beta` - xAI Grok 3 Beta (free)
- **Added**: `grok-3-mini-beta` - xAI Grok 3 Mini Beta (free)
- **Added**: `phi-4` - Microsoft Phi-4 (free)
- **Added**: `gemini-2.5-flash` - Google Gemini 2.5 Flash (free)
- **Added**: `qwen-3-235b` - Qwen 3 235B (free)
- **Added**: `deepseek-r1` - DeepSeek R1 (free)
- **Added**: `llama-3.3-70b` - Meta Llama 3.3 70B (free)
- **Added**: `llama-4-scout` - Meta Llama 4 Scout (free)
- **Added**: `llama-4-maverick` - Meta Llama 4 Maverick (free)

#### 3. Added Duplicate Models via AI/ML API
- **Added**: `grok-3-beta-2nd` - xAI Grok 3 Beta (via AI/ML API)
- **Added**: `grok-3-mini-beta-2nd` - xAI Grok 3 Mini Beta (via AI/ML API)

#### 4. Model Naming Updates
- **Renamed**: `claude-sonnet-4-rproxy` → `claude-sonnet-4` (removed rproxy suffix)

#### 5. Code Changes
**File: `workers.js`**
```diff
// Removed from exposedToInternalMap
- "claude-3-5-sonnet": "anthropic/claude-3-5-sonnet"
- "claude-3-7-sonnet": "anthropic/claude-3-7-sonnet"
- "claude-sonnet-4": "anthropic/claude-sonnet-4"
- "claude-sonnet-4-rproxy": "rproxy/claude-sonnet-4"

// Added to exposedToInternalMap
+ "claude-sonnet-4": "rproxy/claude-sonnet-4"
+ "grok-3-beta": "grok-3-beta-free"
+ "grok-3-mini-beta": "grok-3-mini-beta-free"
+ "grok-3-beta-2nd": "aimlapi/grok-3-beta"
+ "grok-3-mini-beta-2nd": "aimlapi/grok-3-mini-beta"
+ "phi-4": "phi-4-free"
+ "gemini-2.5-flash": "gemini-2.5-flash-free"
+ "qwen-3-235b": "qwen-3-235b-free"
+ "deepseek-r1": "deepseek-r1-free"
+ "llama-3.3-70b": "llama-3.3-70b-free"
+ "llama-4-scout": "llama-4-scout-free"
+ "llama-4-maverick": "llama-4-maverick-free"

// Removed from modelRoutes
- "anthropic/claude-3-5-sonnet": "http://V1.s1.sdk.li/v1/chat/completions"
- "anthropic/claude-3-7-sonnet": "http://V1.s1.sdk.li/v1/chat/completions"
- "anthropic/claude-sonnet-4": "http://V1.s1.sdk.li/v1/chat/completions"

// Added to modelRoutes
+ "grok-3-beta-free": "https://api.deepinfra.com/v1/openai/chat/completions"
+ "grok-3-mini-beta-free": "https://api.deepinfra.com/v1/openai/chat/completions"
+ "aimlapi/grok-3-beta": "https://api.aimlapi.com/v1/chat/completions"
+ "aimlapi/grok-3-mini-beta": "https://api.aimlapi.com/v1/chat/completions"
+ "phi-4-free": "https://api.deepinfra.com/v1/openai/chat/completions"
+ "gemini-2.5-flash-free": "https://api.deepinfra.com/v1/openai/chat/completions"
+ "qwen-3-235b-free": "https://api.deepinfra.com/v1/openai/chat/completions"
+ "deepseek-r1-free": "https://api.deepinfra.com/v1/openai/chat/completions"
+ "llama-3.3-70b-free": "https://api.deepinfra.com/v1/openai/chat/completions"
+ "llama-4-scout-free": "https://api.deepinfra.com/v1/openai/chat/completions"
+ "llama-4-maverick-free": "https://api.deepinfra.com/v1/openai/chat/completions"
```

### Model Access
- **Free Models**: No API key required for DeepInfra endpoints
- **AI/ML API Models**: Require API key (currently placeholder)
- **Duplicate Handling**: Same models available from multiple providers with -2nd suffix

### Available Model Providers
1. **DeepInfra**: Free tier models (no key required)
2. **AI/ML API**: Premium models (requires key)
3. **Ashlynn AI**: Claude 3.5 Sonnet
4. **rproxy**: Claude Sonnet 4 & Opus 4
5. **a7-at41rv.vercel.app**: Kimi-K2, DeepSeek models, Llama models

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