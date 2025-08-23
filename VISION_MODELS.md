# 🖼️ Vision-Capable Models

## Overview
These models support image/vision input along with text, allowing multimodal interactions.

## ✅ Vision-Enabled Models (11 Total)

### 🌟 Google Gemini Models (5)
All Gemini models support vision capabilities:

| Model | Speed | Best For |
|-------|-------|----------|
| `gemini-2.0-flash` | 1.4s | Fast vision tasks |
| `gemini-2.0-flash-thinking-exp-01-21` | 6.5s | Reasoning with images |
| `gemini-2.5-flash-lite-preview-06-17` | 1.7s | Lightweight vision |
| `gemini-2.5-flash` | 1.5s | Balanced performance |
| `gemini-2.5-flash-preview-04-17` | 6.4s | Latest features |

### 🎨 Vercel v0 Models (2)
Optimized for UI/UX and code generation with images:

| Model | Speed | Best For |
|-------|-------|----------|
| `v0-1.0-md` | 6.8s | UI component generation |
| `v0-1.5-md` | 6.7s | Enhanced UI/code vision |

### 🧠 GLM Models (2)
Chinese AI models with vision support:

| Model | Speed | Best For |
|-------|-------|----------|
| `glm-4.5` | 4.6s | General vision tasks |
| `glm-4.5-air` | 2.1s | Fast vision processing |

### 💻 Qwen Coder (1)
Specialized for code with vision:

| Model | Speed | Best For |
|-------|-------|----------|
| `qwen-3-coder-480b` | 645ms | Code analysis with images |

### 🔍 DeepSeek (1)
Reasoning with vision capabilities:

| Model | Speed | Best For |
|-------|-------|----------|
| `deepseek-r1-distill-llama-70b` | 2.4s | Visual reasoning |

## 📸 Image Input Format

### OpenAI Format (Recommended)
```json
{
  "model": "gemini-2.0-flash",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "What's in this image?"
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "data:image/jpeg;base64,..."
          }
        }
      ]
    }
  ]
}
```

### Supported Image Formats
- **JPEG** (.jpg, .jpeg)
- **PNG** (.png)
- **WebP** (.webp)
- **GIF** (.gif) - static only
- **Base64** encoded images
- **URLs** (public accessible)

## 🚀 Usage Examples

### 1. Image Analysis
```bash
curl https://ahamai-api.officialprakashkrsingh.workers.dev/v1/chat/completions \
  -H "Authorization: Bearer ahamaibyprakash25" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-2.5-flash",
    "messages": [{
      "role": "user",
      "content": [
        {"type": "text", "text": "Describe this image"},
        {"type": "image_url", "image_url": {"url": "https://example.com/image.jpg"}}
      ]
    }]
  }'
```

### 2. UI Component Generation (v0 models)
```bash
curl https://ahamai-api.officialprakashkrsingh.workers.dev/v1/chat/completions \
  -H "Authorization: Bearer ahamaibyprakash25" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "v0-1.5-md",
    "messages": [{
      "role": "user",
      "content": [
        {"type": "text", "text": "Create React component based on this design"},
        {"type": "image_url", "image_url": {"url": "data:image/png;base64,..."}}
      ]
    }]
  }'
```

### 3. Code Analysis with Screenshots
```bash
curl https://ahamai-api.officialprakashkrsingh.workers.dev/v1/chat/completions \
  -H "Authorization: Bearer ahamaibyprakash25" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen-3-coder-480b",
    "messages": [{
      "role": "user",
      "content": [
        {"type": "text", "text": "Debug this error screenshot"},
        {"type": "image_url", "image_url": {"url": "data:image/png;base64,..."}}
      ]
    }]
  }'
```

## 📊 Performance Comparison

### Speed Ranking (Vision Tasks)
1. **qwen-3-coder-480b** - 645ms ⚡
2. **gemini-2.0-flash** - 1.4s 🚀
3. **gemini-2.5-flash** - 1.5s 🚀
4. **gemini-2.5-flash-lite-preview-06-17** - 1.7s
5. **glm-4.5-air** - 2.1s
6. **deepseek-r1-distill-llama-70b** - 2.4s
7. **glm-4.5** - 4.6s
8. **gemini-2.5-flash-preview-04-17** - 6.4s
9. **gemini-2.0-flash-thinking-exp-01-21** - 6.5s
10. **v0-1.5-md** - 6.7s
11. **v0-1.0-md** - 6.8s

### Best Models by Use Case

| Use Case | Recommended Model | Why |
|----------|------------------|-----|
| **Fast Image Analysis** | `qwen-3-coder-480b` | Fastest response (645ms) |
| **General Vision** | `gemini-2.0-flash` | Good balance of speed & quality |
| **UI/UX Design** | `v0-1.5-md` | Specialized for interfaces |
| **Code Screenshots** | `qwen-3-coder-480b` | Code-optimized vision |
| **Complex Reasoning** | `deepseek-r1-distill-llama-70b` | Best for visual logic |
| **Chinese Content** | `glm-4.5` | Optimized for Chinese |

## 🔧 Technical Details

### Vision Model Configuration
```javascript
const visionModels = {
  "model-name": {
    id: "model-name",
    name: "Display Name",
    provider: "provider",
    supportsImages: true,
    capabilities: ["text", "image", "code"]
  }
}
```

### Capabilities
- **text**: Standard text generation
- **image**: Image understanding/analysis
- **code**: Code generation from images
- **reasoning**: Complex visual reasoning

## 📝 Notes

1. **Image Size Limits**: Most models support up to 20MB images
2. **Multiple Images**: Supported by sending multiple image_url objects
3. **Base64 vs URL**: Base64 is more reliable but increases payload size
4. **Streaming**: All vision models support streaming responses
5. **Cost**: Vision requests may consume more tokens than text-only

## 🚨 Important

- Always validate image format before sending
- Compress large images to improve performance
- Use appropriate model based on task complexity
- Consider caching for repeated image analysis

---
*Last Updated: August 23, 2025*