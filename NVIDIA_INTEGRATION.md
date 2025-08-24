# NVIDIA API Integration

## Overview
Successfully integrated NVIDIA's GPT-OSS-120B model into the workers.js proxy. This model is accessible through NVIDIA's OpenAI-compatible API endpoint.

## Integration Details

### Model Configuration
- **External Model Name**: `nvidia-gpt-oss-120b`
- **Internal Model ID**: `openai/gpt-oss-120b`
- **Provider**: NVIDIA (via integrate.api.nvidia.com)
- **API Endpoint**: `https://integrate.api.nvidia.com/v1`
- **Model Type**: Large Language Model (120B parameters)
- **Compatibility**: OpenAI API compatible

### API Configuration
- **API Key**: `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`
- **Authentication**: Bearer token in Authorization header
- **Endpoint**: `/v1/chat/completions`

## Changes Made

### 1. Model Registration (exposedToInternalMap)
Added the NVIDIA model to the exposed model list:
```javascript
"nvidia-gpt-oss-120b": "openai/gpt-oss-120b"
```

### 2. Route Configuration (modelRoutes)
Added the NVIDIA API endpoint:
```javascript
"openai/gpt-oss-120b": "https://integrate.api.nvidia.com/v1/chat/completions"
```

### 3. Authentication Setup
Added API key configuration for NVIDIA requests:
```javascript
} else if (modelRoutes[internalModel].includes('integrate.api.nvidia.com')) {
  // For NVIDIA API - OpenAI compatible endpoint
  headers["Authorization"] = "Bearer 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";
}
```

## Usage

### API Request Example
```bash
curl -X POST http://your-worker-url/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ahamaibyprakash25" \
  -d '{
    "model": "nvidia-gpt-oss-120b",
    "messages": [
      {"role": "user", "content": "Hello, NVIDIA model!"}
    ],
    "stream": false
  }'
```

### Testing
A test script has been created at `test_nvidia.js` to verify the integration:
1. Start the worker: `wrangler dev`
2. Run the test: `node test_nvidia.js`

## Features
- ✅ Streaming support (OpenAI compatible)
- ✅ Standard chat completions
- ✅ Full integration with existing proxy infrastructure
- ✅ Maintains compatibility with all other existing models

## Notes
- The model is now available alongside all other existing models
- No existing models were removed or modified
- The integration follows the same pattern as other OpenAI-compatible endpoints
- The model can be accessed using the name `nvidia-gpt-oss-120b` in API requests