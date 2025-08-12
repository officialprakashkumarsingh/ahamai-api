# OpenAI Compatible API Worker

This Cloudflare Worker provides an OpenAI-compatible API that supports multiple AI models including Claude models and Moonshot AI Kimi-K2.

## Features

- **Chat Completions**: Support for multiple AI models with streaming capabilities
- **Image Generation**: AI-powered image generation using Pollinations API
- **Screenshot Capability**: AI models can generate screenshot URLs using WordPress mshots API
- **Model Management**: List available chat and image models
- **Authentication**: Secure API key-based authentication
- **OpenAI Compatible**: Works with any OpenAI-compatible client library


## Supported Models

### Chat Models
- `gpt-4o` - GPT-4 Optimized
- `gpt-4o-mini` - GPT-4 Optimized Mini
- `perplexed` - Perplexed AI Model
- `felo` - Felo AI Model
- `gpt-oss-20b` - GPT OSS 20B Parameters
- `gpt-oss-120b` - GPT OSS 120B Parameters
- `deepseek-r1` - DeepSeek R1 Model

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
    "model": "gpt-4o",
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

## Testing Chat Models

You can test any of the supported chat models with this example:

```bash
curl -X POST https://your-worker-domain/v1/chat/completions \
  -H "Authorization: Bearer ahamaibyprakash25" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-r1",
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
- ✅ Multiple AI model providers
- ✅ Authentication and authorization
