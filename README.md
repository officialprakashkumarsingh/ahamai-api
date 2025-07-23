# OpenAI Compatible API Worker

This Cloudflare Worker provides an OpenAI-compatible API that supports multiple AI models including Claude models and Moonshot AI Kimi-K2.

## Features

- **Chat Completions**: Support for multiple AI models with streaming capabilities
- **Image Generation**: AI-powered image generation using Pollinations API
- **Model Management**: List available chat and image models
- **Authentication**: Secure API key-based authentication
- **OpenAI Compatible**: Works with any OpenAI-compatible client library

## Supported Models

### Chat Models
- `claude-3-5-sonnet-ashlynn` - Claude 3.5 Sonnet (via Ashlynn AI)
- `claude-sonnet-4` - Claude Sonnet 4 (via rproxy)
- `claude-opus-4` - Claude Opus 4 (via rproxy)
- `grok-3-beta` - xAI Grok 3 Beta (free via DeepInfra)
- `grok-3-mini-beta` - xAI Grok 3 Mini Beta (free via DeepInfra)
- `grok-3-beta-2nd` - xAI Grok 3 Beta (via AI/ML API)
- `grok-3-mini-beta-2nd` - xAI Grok 3 Mini Beta (via AI/ML API)
- `phi-4` - Microsoft Phi-4 (free via DeepInfra)
- `gemini-2.5-flash` - Google Gemini 2.5 Flash (free via DeepInfra)
- `qwen-3-235b` - Qwen 3 235B (free via DeepInfra)
- `deepseek-r1` - DeepSeek R1 (free via DeepInfra)
- `llama-3.3-70b` - Meta Llama 3.3 70B (free via DeepInfra)
- `llama-4-scout` - Meta Llama 4 Scout (free via DeepInfra)
- `llama-4-maverick` - Meta Llama 4 Maverick (free via DeepInfra)
- `Kimi-K2` - Moonshot AI Kimi-K2
- `DeepSeek-R1-Think` - DeepSeek R1 Think
- `DeepSeek-R1-0528-Think` - DeepSeek R1 0528 Think
- `DeepSeek-V3` - DeepSeek V3
- `Llama4-Maverick-17B-lnstruct` - Llama 4 Maverick 17B Instruct
- `Llama4-Scout-17B-16E-lnstruct` - Llama 4 Scout 17B 16E Instruct

### Image Models
- `flux` - High Quality Image Generation
- `turbo` - Fast Image Generation

## API Endpoints

### Chat Completions
```
POST /v1/chat/completions
```

Example request:
```bash
curl -X POST https://your-worker-domain/v1/chat/completions \
  -H "Authorization: Bearer ahamaibyprakash25" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "grok-3-beta",
    "messages": [
      {"role": "user", "content": "Hello, how are you?"}
    ],
    "stream": false
  }'
```

### Image Generation
```
POST /v1/images/generations
```

Example request:
```bash
curl -X POST https://your-worker-domain/v1/images/generations \
  -H "Authorization: Bearer ahamaibyprakash25" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "flux",
    "prompt": "A beautiful sunset over mountains",
    "width": 1024,
    "height": 1024
  }'
```

### List Models
```
GET /v1/models              # All models (chat + image)
GET /v1/chat/models         # Chat models only
GET /v1/images/models       # Image models only
```

## Authentication

All requests require an Authorization header:
```
Authorization: Bearer ahamaibyprakash25
```

## Configuration

- **API_KEY**: Worker authentication key (`ahamaibyprakash25`)
- **Model Routes**: Configure endpoints for different AI providers
- **Image Models**: Configure image generation providers and settings

## Deployment

1. Copy the workers.js code from this repository
2. Create a new Cloudflare Worker
3. Replace the default code with the provided code
4. Deploy the worker
5. Configure your custom domain (optional)

## Testing the Claude 3.5 Sonnet (Ashlynn) Model

You can test the Claude 3.5 Sonnet model via Ashlynn AI with this example:

```bash
curl -X POST https://your-worker-domain/v1/chat/completions \
  -H "Authorization: Bearer ahamaibyprakash25" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-3-5-sonnet-ashlynn",
    "messages": [
      {"role": "user", "content": "Explain quantum computing in simple terms"}
    ]
  }'
```

## Security Notes

- API keys should be kept secure and not exposed in public repositories
- In production, consider using Cloudflare environment variables for API keys
- Implement rate limiting for production usage
- Monitor API usage and costs

## Support

This worker supports:
- ✅ OpenAI-compatible chat completions
- ✅ Streaming responses
- ✅ Image generation
- ✅ Model listing
- ✅ Multiple AI providers
- ✅ Ashlynn AI integration
- ✅ Authentication and authorization
