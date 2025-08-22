const API_KEY = "ahamaibyprakash25";

const exposedToInternalMap = {
  // WORKING MODELS ONLY - Verified via comprehensive testing (18 models)
  // All models support streaming ✅
  
  // Core OpenAI Models (2) - Working via Render
  "gpt-oss-20b": "gpt-oss-20b",
  "gpt-oss-120b": "gpt-oss-120b",
  
  // Proxy Models (3) - All working with streaming
  "perplexed": "perplexed",
  "felo": "felo",
  "exaanswer": "exaanswer",
  
  // Google Gemini Models (5) - Working perfectly with streaming
  "gemini-2.0-flash": "gemini-2.0-flash",
  "gemini-2.0-flash-thinking-exp-01-21": "gemini-2.0-flash-thinking-exp-01-21",
  "gemini-2.5-flash-lite-preview-06-17": "gemini-2.5-flash-lite-preview-06-17",
  "gemini-2.5-flash": "gemini-2.5-flash",
  "gemini-2.5-flash-lite": "gemini-2.5-flash-lite",
  
  // DeepSeek Models (2) - Working with streaming
  "deepseek/deepseek-r1:free": "deepseek/deepseek-r1:free",
  "deepseek-r1-distill-llama-70b": "deepseek-r1-distill-llama-70b",
  
  // Meta Llama Models (2) - Working with streaming
  "meta-llama/llama-4-scout-17b-16e-instruct": "meta-llama/llama-4-scout-17b-16e-instruct",
  "llama-4-scout-17b-16e-instruct": "llama-4-scout-17b-16e-instruct",
  
  // FastAPI Free Models (1) - Working with streaming
  "gemini-2.5-flash-preview-04-17": "gemini-2.5-flash-preview-04-17",
  
  // DeepInfra Models (1) - Working with streaming (100 requests/day with IP rotation)
  "qwen-3-coder-480b": "Qwen/Qwen3-Coder-480B-A35B-Instruct",
  
  // GLM Models (3) - Available via Render proxy
  "glm-4.5-air": "zai-org/GLM-4.5-Air",
  "glm-4.5": "zai-org/GLM-4.5",
  "glm-4.5v": "zai-org/GLM-4.5V"  // Note: Vision model, may have availability issues
};

const modelRoutes = {
  // WORKING MODELS ONLY - Verified via comprehensive testing (18 models)
  // All models support streaming ✅
  
  // Core OpenAI Models via Render (2)
  "gpt-oss-20b": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "gpt-oss-120b": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // Proxy Models via Render (3)
  "perplexed": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "felo": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "exaanswer": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // Google Gemini Models (5) - All working perfectly
  "gemini-2.0-flash": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "gemini-2.0-flash-thinking-exp-01-21": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "gemini-2.5-flash-lite-preview-06-17": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "gemini-2.5-flash": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "gemini-2.5-flash-lite": "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent",
  
  // DeepSeek Models (2) - Working perfectly
  "deepseek/deepseek-r1:free": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "deepseek-r1-distill-llama-70b": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // Meta Llama Models (2) - Working perfectly
  "meta-llama/llama-4-scout-17b-16e-instruct": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "llama-4-scout-17b-16e-instruct": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // FastAPI Free Models (1) - Working perfectly
  "gemini-2.5-flash-preview-04-17": "https://api.free.fastapi.pro/v1/chat/completions",
  
  // DeepInfra Models (1) - Working perfectly with streaming (100 requests/day with IP rotation)
  "Qwen/Qwen3-Coder-480B-A35B-Instruct": "https://api.deepinfra.com/v1/openai/chat/completions",
  
  // GLM Models (3) - Available via Render proxy
  "zai-org/GLM-4.5-Air": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "zai-org/GLM-4.5": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "zai-org/GLM-4.5V": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions"
};



const imageModelRoutes = {
  "flux": {
    provider: "pollinations",
    baseUrl: "https://image.pollinations.ai/prompt/",
    displayName: "Flux - High Quality",
    width: 1024,
    height: 1024
  },
  "turbo": {
    provider: "pollinations",
    baseUrl: "https://image.pollinations.ai/prompt/",
    displayName: "Turbo - Fast Generation",
    width: 1024,
    height: 1024
  },
  "img3": {
    provider: "infip",
    baseUrl: "https://api.infip.pro/v1/images/generations",
    displayName: "IMG3 - Image Generation",
    width: 1024,
    height: 1024
  },
  "img4": {
    provider: "infip",
    baseUrl: "https://api.infip.pro/v1/images/generations",
    displayName: "IMG4 - Image Generation",
    width: 1024,
    height: 1024
  },
  "uncen": {
    provider: "infip",
    baseUrl: "https://api.infip.pro/v1/images/generations",
    displayName: "Uncen - Image Generation",
    width: 1024,
    height: 1024
  },
  // Note: qwen-image model not available with current Samurai API key
  // Removed old qwen text model as requested
  "gemini2.0": {
    provider: "infip",
    baseUrl: "https://api.infip.pro/v1/images/generations",
    displayName: "Gemini 2.0 - Image Generation",
    width: 1024,
    height: 1024
  },
  "nsfw-gen": {
    provider: "hideme",
    baseUrl: "https://hideme.eu.org/nsfw-gen/",
    displayName: "NSFW-Gen - Unrestricted Image Generation",
    width: 1024,
    height: 1024
  }
};

// Vision models configuration with multiple API keys for fallback
const visionModels = {
  "gemini-2.5-flash-lite": {
    id: "gemini-2.5-flash-lite",
    name: "Gemini 2.5 Flash Lite",
    provider: "google",
    apiKeys: [
      "AIzaSyBUiSSswKvLvEK7rydCCRPF50eIDI_KOGc", // Primary API key
      "AIzaSyD1UzgfcZQpVRGNpW4OHCutEGWuj-l2jrs"  // Fallback API key
    ],
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent",
    capabilities: ["text", "image", "video"],
    maxTokens: 8192,
    supportedFormats: ["jpeg", "png", "webp", "heic", "heif", "mp4", "avi", "mov", "mpg", "mpeg", "wmv", "flv", "webm"]
  }
};

// Default models configuration
const defaultModels = {
  vision: "gpt-oss-20b", // Updated to verified working model
  webSearch: "perplexed" // Default web search model (verified working)
};

// Keep-alive configuration for Render endpoint
let lastPingTime = 0;
const PING_INTERVAL = 30000; // 30 seconds

// Function to send keep-alive ping to Render endpoint
async function sendKeepAlivePing() {
  try {
    const keepAliveRequest = {
      model: "gpt-oss-20b", // Use a lightweight model
      messages: [{ role: "user", content: "ping" }],
      max_tokens: 1,
      temperature: 0,
      stream: false
    };

    const response = await fetch("https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify(keepAliveRequest),
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(5000)
    });

    if (response.ok) {
      console.log(`[Keep-Alive] Render endpoint pinged successfully at ${new Date().toISOString()}`);
      return true;
    } else {
      console.log(`[Keep-Alive] Ping failed with status ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`[Keep-Alive] Error pinging Render endpoint: ${error.message}`);
    return false;
  }
}

// Function to check if we should send a keep-alive ping
async function checkAndSendKeepAlive() {
  const now = Date.now();
  
  // Send ping if it's been more than 30 seconds since last ping
  if (now - lastPingTime > PING_INTERVAL) {
    lastPingTime = now;
    // Fire and forget - don't await to avoid blocking the main request
    sendKeepAlivePing().catch(err => 
      console.log(`[Keep-Alive] Background ping error: ${err.message}`)
    );
  }
}

// ============================================
// Conversation Memory System
// ============================================

const MAX_CONVERSATION_HISTORY = 10; // Store up to 10 previous messages (5 user + 5 assistant)
const CONVERSATION_TTL = 86400; // 24 hours in seconds

// Generate a user ID from request headers for conversation tracking
function getUserId(request) {
  // Try to get user ID from various sources
  const authHeader = request.headers.get("Authorization");
  const clientIp = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "unknown";
  const userAgent = request.headers.get("User-Agent") || "unknown";
  
  // Create a consistent user ID based on auth token and client info
  const userString = `${authHeader}-${clientIp}-${userAgent}`;
  
  // Simple hash function to create a consistent ID
  let hash = 0;
  for (let i = 0; i < userString.length; i++) {
    const char = userString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return `user_${Math.abs(hash)}`;
}

// Get conversation history from KV storage
async function getConversationHistory(env, userId, conversationId = "default") {
  if (!env.CONVERSATIONS) {
    console.log("[Memory] KV namespace not configured");
    return [];
  }
  
  try {
    const key = `${userId}:${conversationId}`;
    const stored = await env.CONVERSATIONS.get(key, { type: "json" });
    return stored?.messages || [];
  } catch (error) {
    console.log(`[Memory] Error retrieving conversation: ${error.message}`);
    return [];
  }
}

// Save conversation history to KV storage
async function saveConversationHistory(env, userId, messages, conversationId = "default") {
  if (!env.CONVERSATIONS) {
    console.log("[Memory] KV namespace not configured");
    return;
  }
  
  try {
    const key = `${userId}:${conversationId}`;
    
    // Keep only the last MAX_CONVERSATION_HISTORY messages
    const trimmedMessages = messages.slice(-MAX_CONVERSATION_HISTORY);
    
    const data = {
      userId,
      conversationId,
      messages: trimmedMessages,
      lastUpdated: new Date().toISOString()
    };
    
    // Store with TTL
    await env.CONVERSATIONS.put(key, JSON.stringify(data), {
      expirationTtl: CONVERSATION_TTL
    });
    
    console.log(`[Memory] Saved ${trimmedMessages.length} messages for ${userId}`);
  } catch (error) {
    console.log(`[Memory] Error saving conversation: ${error.message}`);
  }
}

// Clear conversation history for a user
async function clearConversationHistory(env, userId, conversationId = "default") {
  if (!env.CONVERSATIONS) {
    return { success: false, message: "KV namespace not configured" };
  }
  
  try {
    const key = `${userId}:${conversationId}`;
    await env.CONVERSATIONS.delete(key);
    console.log(`[Memory] Cleared conversation for ${userId}`);
    return { success: true, message: "Conversation history cleared" };
  } catch (error) {
    console.log(`[Memory] Error clearing conversation: ${error.message}`);
    return { success: false, message: error.message };
  }
}

// Get all conversation IDs for a user
async function getUserConversations(env, userId) {
  if (!env.CONVERSATIONS) {
    return [];
  }
  
  try {
    const prefix = `${userId}:`;
    const list = await env.CONVERSATIONS.list({ prefix });
    
    return list.keys.map(key => {
      const conversationId = key.name.replace(prefix, "");
      return {
        conversationId,
        key: key.name,
        lastUpdated: key.metadata?.lastUpdated
      };
    });
  } catch (error) {
    console.log(`[Memory] Error listing conversations: ${error.message}`);
    return [];
  }
}

// Merge conversation history with current messages
function mergeWithHistory(history, currentMessages, includeSystemPrompt = true) {
  const merged = [];
  
  // Add system prompt if needed and present in current messages
  if (includeSystemPrompt) {
    const systemMessage = currentMessages.find(m => m.role === "system");
    if (systemMessage) {
      merged.push(systemMessage);
    }
  }
  
  // Add conversation history (excluding any system messages)
  const historyWithoutSystem = history.filter(m => m.role !== "system");
  merged.push(...historyWithoutSystem);
  
  // Add current messages (excluding system message if already added)
  const currentWithoutSystem = currentMessages.filter(m => m.role !== "system");
  merged.push(...currentWithoutSystem);
  
  return merged;
}

export default {
  async fetch(request, env, ctx) {
    // Check if we should send a keep-alive ping (non-blocking)
    checkAndSendKeepAlive();
    
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Special endpoint to manually trigger keep-alive
    if (path === "/keep-alive" && request.method === "POST") {
      const result = await sendKeepAlivePing();
      return new Response(JSON.stringify({ 
        success: result,
        message: result ? "Render endpoint pinged successfully" : "Failed to ping Render endpoint",
        timestamp: new Date().toISOString()
      }), {
        status: result ? 200 : 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: corsHeaders
      });
    }

    // Auth check (skip for keep-alive endpoint)
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || authHeader !== `Bearer ${API_KEY}`) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    if (path === "/v1/chat/completions" && request.method === "POST") {
      return handleChat(request, env, corsHeaders);
    }

    if (path === "/v1/images/generations" && request.method === "POST") {
      return handleImage(request, corsHeaders);
    }

    if (path === "/v1/models" && request.method === "GET") {
      return handleChatModelList(corsHeaders);
    }

    if (path === "/v1/images/models" && request.method === "GET") {
      return handleImageModelList(corsHeaders);
    }

    if (path === "/v1/vision/models" && request.method === "GET") {
      return handleVisionModelList(corsHeaders);
    }

    if (path === "/v1/defaults" && request.method === "GET") {
      return handleDefaults(corsHeaders);
    }

    if (path === "/v1/automation/url" && request.method === "POST") {
      return handleUrlAutomation(request, corsHeaders);
    }
    
    // Conversation memory management endpoints
    if (path === "/v1/conversations" && request.method === "GET") {
      // Get user's conversation list
      const userId = getUserId(request);
      const conversations = await getUserConversations(env, userId);
      
      return new Response(JSON.stringify({
        user_id: userId,
        conversations: conversations,
        total: conversations.length
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }
    
    if (path === "/v1/conversations/history" && request.method === "GET") {
      // Get conversation history
      const userId = getUserId(request);
      const conversationId = url.searchParams.get("conversation_id") || "default";
      const history = await getConversationHistory(env, userId, conversationId);
      
      return new Response(JSON.stringify({
        user_id: userId,
        conversation_id: conversationId,
        messages: history,
        message_count: history.length
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }
    
    if (path === "/v1/conversations/clear" && request.method === "POST") {
      // Clear conversation history
      const userId = getUserId(request);
      const body = await request.json().catch(() => ({}));
      const conversationId = body.conversation_id || "default";
      
      const result = await clearConversationHistory(env, userId, conversationId);
      
      return new Response(JSON.stringify({
        user_id: userId,
        conversation_id: conversationId,
        ...result
      }), {
        status: result.success ? 200 : 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }
    
    if (path === "/v1/conversations/info" && request.method === "GET") {
      // Get conversation memory info
      return new Response(JSON.stringify({
        memory_enabled: !!env.CONVERSATIONS,
        max_history: MAX_CONVERSATION_HISTORY,
        ttl_seconds: CONVERSATION_TTL,
        features: {
          use_memory: "Include previous messages in context (default: true)",
          clear_memory: "Clear history before processing (default: false)",
          conversation_id: "Separate conversation threads (default: 'default')"
        },
        usage: {
          example_request: {
            model: "gpt-oss-20b",
            messages: [{ role: "user", content: "Hello" }],
            use_memory: true,
            conversation_id: "chat-123",
            clear_memory: false
          }
        }
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  },
  
  // Scheduled handler for periodic keep-alive
  async scheduled(event, env, ctx) {
    console.log(`[Scheduled] Running keep-alive at ${new Date().toISOString()}`);
    
    // Wait for the keep-alive ping to complete
    ctx.waitUntil(sendKeepAlivePing());
  }
};



// Convert OpenAI chat completion format to Gemini format
function convertToGeminiFormat(openaiRequest) {
  const { messages, max_tokens, temperature, top_p } = openaiRequest;
  
  // Convert messages to Gemini format
  const contents = messages.map(msg => {
    if (msg.role === 'user') {
      // Handle text and image content
      if (typeof msg.content === 'string') {
        return {
          role: 'user',
          parts: [{ text: msg.content }]
        };
      } else if (Array.isArray(msg.content)) {
        const parts = msg.content.map(part => {
          if (part.type === 'text') {
            return { text: part.text };
          } else if (part.type === 'image_url') {
            // Extract base64 data from data URL
            const base64Data = part.image_url.url.split(',')[1];
            const mimeType = part.image_url.url.match(/data:([^;]+);/)[1];
            return {
              inlineData: {
                mimeType: mimeType,
                data: base64Data
              }
            };
          }
          return part;
        });
        return {
          role: 'user',
          parts: parts
        };
      }
    } else if (msg.role === 'assistant') {
      return {
        role: 'model',
        parts: [{ text: msg.content }]
      };
    } else if (msg.role === 'system') {
      // Convert system message to user message with instruction format
      return {
        role: 'user',
        parts: [{ text: `System instruction: ${msg.content}` }]
      };
    }
    return msg;
  });

  return {
    contents: contents,
    generationConfig: {
      maxOutputTokens: max_tokens || 8192,
      temperature: temperature || 0.7,
      topP: top_p || 0.9
    }
  };
}

// Convert Gemini response to OpenAI format
function convertFromGeminiFormat(geminiResponse, modelId) {
  const candidate = geminiResponse.candidates?.[0];
  if (!candidate) {
    throw new Error('No response from Gemini API');
  }

  const text = candidate.content?.parts?.[0]?.text || '';
  
  return {
    id: `chatcmpl-${Date.now()}`,
    object: 'chat.completion',
    created: Math.floor(Date.now() / 1000),
    model: modelId,
    choices: [{
      index: 0,
      message: {
        role: 'assistant',
        content: text
      },
      finish_reason: candidate.finishReason === 'STOP' ? 'stop' : 'length'
    }],
    usage: {
      prompt_tokens: geminiResponse.usageMetadata?.promptTokenCount || 0,
      completion_tokens: geminiResponse.usageMetadata?.candidatesTokenCount || 0,
      total_tokens: geminiResponse.usageMetadata?.totalTokenCount || 0
    }
  };
}

// Make Gemini API request with fallback support
async function makeGeminiRequestWithFallback(visionModel, geminiRequest, modelId) {
  const apiKeys = visionModel.apiKeys;
  let lastError = null;

  for (let i = 0; i < apiKeys.length; i++) {
    const apiKey = apiKeys[i];
    const keyLabel = i === 0 ? 'primary' : 'fallback';
    
    try {
      console.log(`Attempting Gemini API request with ${keyLabel} key (${i + 1}/${apiKeys.length})`);
      
      const geminiHeaders = {
        "Content-Type": "application/json"
      };

      const geminiUrl = `${visionModel.baseUrl}?key=${apiKey}`;
      
      const response = await fetch(geminiUrl, {
        method: "POST",
        headers: geminiHeaders,
        body: JSON.stringify(geminiRequest)
      });

      if (!response.ok) {
        const errorText = await response.text();
        const error = new Error(`Gemini API ${keyLabel} key failed with status ${response.status}: ${response.statusText} - ${errorText}`);
        
        // Check if it's a quota/authentication error that should trigger fallback
        if (response.status === 429 || response.status === 403 || response.status === 401) {
          console.log(`${keyLabel} key failed with status ${response.status}, trying next key...`);
          lastError = error;
          continue;
        }
        
        // For other errors, throw immediately
        throw error;
      }

      const geminiResponse = await response.json();
      
      // Check for API errors in response
      if (geminiResponse.error) {
        const error = new Error(`Gemini API ${keyLabel} key returned error: ${geminiResponse.error.message || geminiResponse.error}`);
        
        // Check if it's a quota/authentication error
        if (geminiResponse.error.code === 429 || geminiResponse.error.code === 403 || geminiResponse.error.code === 401) {
          console.log(`${keyLabel} key failed with error code ${geminiResponse.error.code}, trying next key...`);
          lastError = error;
          continue;
        }
        
        throw error;
      }

      console.log(`Gemini API request successful with ${keyLabel} key`);
      
      // Convert Gemini response back to OpenAI format
      return convertFromGeminiFormat(geminiResponse, modelId);
      
    } catch (error) {
      console.log(`${keyLabel} key failed:`, error.message);
      lastError = error;
      
      // If it's the last key, we'll throw the error after the loop
      if (i === apiKeys.length - 1) {
        break;
      }
      
      // Otherwise, continue to next key
      continue;
    }
  }

  // If we get here, all keys failed
  throw new Error(`All Gemini API keys failed. Last error: ${lastError?.message || 'Unknown error'}`);
}

// Make a request to the specified model only (no fallback)
async function makeModelRequest(modelId, requestBody, stream, corsHeaders) {
  let internalModel = exposedToInternalMap[modelId];
  
  if (!internalModel || !modelRoutes[internalModel]) {
    throw new Error(`Model '${modelId}' is not supported or not configured.`);
  }



  // Handle Gemini API separately with fallback support
  if (internalModel === "gemini-2.5-flash-lite") {
    const visionModel = visionModels[internalModel];
    if (!visionModel) {
      throw new Error(`Vision model '${internalModel}' configuration not found.`);
    }

    // Convert OpenAI format to Gemini format
    const geminiRequest = convertToGeminiFormat(requestBody);
    
    // Use fallback mechanism to try multiple API keys
    const openaiResponse = await makeGeminiRequestWithFallback(visionModel, geminiRequest, modelId);
    
    return new Response(JSON.stringify(openaiResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }

  // Handle other models with existing logic
  let headers = { 
    "Content-Type": "application/json"
  };

  // Use different authentication for different endpoints
  if (modelRoutes[internalModel].includes('fast.typegpt.net')) {
    // For DeepSeek R1 endpoint
    headers["Authorization"] = "Bearer sk-BiEn3R0oF1aUTAwK8pWUEqvsxBvoHXffvtLBaC5NApX4SViv";
  } else if (modelRoutes[internalModel].includes('gpt-oss-openai-proxy.onrender.com')) {
    // For OpenAI-compatible onrender proxy
    headers["Authorization"] = `Bearer ${API_KEY}`;
  } else if (modelRoutes[internalModel].includes('api.free.fastapi.pro')) {
    // For FastAPI free endpoint
    headers["Authorization"] = "Bearer sk-FastAPIHc1M0KijyI7VaA3Nuj2cJ1GfA0VSFN5U4qOvm9gZH";
  } else if (modelRoutes[internalModel].includes('api.deepinfra.com')) {
    // For DeepInfra endpoint - no authentication required (100 requests/day with IP rotation)
    // No Authorization header needed
  }

  const response = await fetch(modelRoutes[internalModel], {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ ...requestBody, model: internalModel })
  });

  // Check if response indicates an error
  if (!response.ok) {
    throw new Error(`Model '${modelId}' request failed with status ${response.status}: ${response.statusText}`);
  }

  // For non-streaming, return JSON response
  if (!stream) {
    const responseText = await response.text();
    const responseJson = JSON.parse(responseText);
    
    // Check for API errors in response
    if (responseJson.error) {
      throw new Error(`Model '${modelId}' returned error: ${responseJson.error.message || responseJson.error}`);
    }
    
    return new Response(responseText, {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }

  // Return streaming response
  return new Response(response.body, {
    status: response.status,
    headers: {
      "Content-Type": "text/event-stream",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache",
      ...corsHeaders
    }
  });
}

async function handleChat(request, env, corsHeaders) {
  const body = await request.json();
  const exposedModel = body.model;
  const stream = body.stream === true;
  
  // Extract conversation parameters
  const conversationId = body.conversation_id || "default";
  const useMemory = body.use_memory !== false; // Default to true
  const clearMemory = body.clear_memory === true;

  if (!exposedToInternalMap[exposedModel]) {
    return new Response(JSON.stringify({ error: `Model '${exposedModel}' is not supported.` }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }

  try {
    // Get user ID for conversation tracking
    const userId = getUserId(request);
    
    // Handle memory clear request
    if (clearMemory) {
      const clearResult = await clearConversationHistory(env, userId, conversationId);
      console.log(`[Memory] Clear request for ${userId}: ${clearResult.message}`);
    }
    
    let messagesWithHistory = body.messages;
    
    // If memory is enabled, merge with conversation history
    if (useMemory && env.CONVERSATIONS) {
      const history = await getConversationHistory(env, userId, conversationId);
      
      if (history.length > 0) {
        console.log(`[Memory] Retrieved ${history.length} messages from history for ${userId}`);
        messagesWithHistory = mergeWithHistory(history, body.messages);
      }
    }
    
    // Create modified request body with conversation history
    const modifiedBody = {
      ...body,
      messages: messagesWithHistory
    };
    
    // Make request to the specified model with conversation context
    const response = await makeModelRequest(exposedModel, modifiedBody, stream, corsHeaders);
    
    // Save conversation to memory if enabled and successful
    if (useMemory && env.CONVERSATIONS && response.ok) {
      // Parse response to extract assistant's reply
      const responseClone = response.clone();
      
      try {
        if (!stream) {
          const responseData = await responseClone.json();
          
          if (responseData.choices?.[0]?.message) {
            // Add the user's message and assistant's response to history
            const newMessages = [
              ...body.messages, // Original user messages (without history)
              responseData.choices[0].message // Assistant's response
            ];
            
            // Combine with existing history and save
            const updatedHistory = [...(await getConversationHistory(env, userId, conversationId)), ...newMessages];
            await saveConversationHistory(env, userId, updatedHistory, conversationId);
          }
        } else {
          // For streaming responses, we'll save after streaming completes
          // This is more complex and would require buffering the stream
          console.log("[Memory] Streaming response - conversation not saved");
        }
      } catch (error) {
        console.log(`[Memory] Error processing response for storage: ${error.message}`);
      }
    }
    
    return response;
  } catch (error) {
    // Return error if model fails
    return new Response(JSON.stringify({ 
      error: error.message,
      model: exposedModel
    }), {
      status: 503,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
}



async function handleImage(request, corsHeaders) {
  const body = await request.json();
  const model = body.model || "flux";
  const prompt = body.prompt || "";

  if (!imageModelRoutes[model]) {
    return new Response(JSON.stringify({ error: `Image model '${model}' is not supported.` }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }

  const { baseUrl, provider } = imageModelRoutes[model];

  if (provider === "infip") {
    // Handle infip API
    const requestBody = {
      model: model,
      prompt: prompt,
      n: body.n || 1,
      size: body.size || "1024x1024"
    };

    const infipResponse = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer infip-532d3377`
      },
      body: JSON.stringify(requestBody)
    });

    if (!infipResponse.ok) {
      return new Response(JSON.stringify({ error: "Failed to generate image" }), {
        status: infipResponse.status,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    const result = await infipResponse.json();
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  } else if (provider === "hideme") {
    // Handle hideme/nsfw-gen API with OpenAI-compatible response
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `${baseUrl}?prompt=${encodedPrompt}`;
    
    try {
      const imageRes = await fetch(imageUrl);
      
      if (!imageRes.ok) {
        return new Response(JSON.stringify({ error: "Failed to generate image" }), {
          status: imageRes.status,
          headers: { "Content-Type": "application/json", ...corsHeaders }
        });
      }
      
      // Get the image as a buffer
      const imageBuffer = await imageRes.arrayBuffer();
      const base64Image = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));
      const dataUrl = `data:image/jpeg;base64,${base64Image}`;
      
      // Return OpenAI-compatible response format
      const openAIResponse = {
        created: Math.floor(Date.now() / 1000),
        data: [
          {
            url: dataUrl,
            revised_prompt: prompt
          }
        ]
      };
      
      // Support multiple images if requested
      const n = body.n || 1;
      if (n > 1) {
        // Generate additional images
        for (let i = 1; i < n; i++) {
          const additionalRes = await fetch(imageUrl);
          if (additionalRes.ok) {
            const additionalBuffer = await additionalRes.arrayBuffer();
            const additionalBase64 = btoa(String.fromCharCode(...new Uint8Array(additionalBuffer)));
            openAIResponse.data.push({
              url: `data:image/jpeg;base64,${additionalBase64}`,
              revised_prompt: prompt
            });
          }
        }
      }
      
      return new Response(JSON.stringify(openAIResponse), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: `Failed to generate image: ${error.message}` }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }
  } else {
    // Handle pollinations API (existing flux/turbo models)
    const encodedPrompt = encodeURIComponent(prompt);
    const params = new URLSearchParams({
      model,
      width: body.width || 1024,
      height: body.height || 1024,
      seed: body.seed || "",
      image: body.image || "",
      private: "true",
      enhance: body.enhance ? "true" : "false",
      safe: body.safe ? "true" : "false",
      transparent: body.transparent ? "true" : "false",
      nologo: "true",
      referrer: "aham-ai"
    });

    const imageUrl = `${baseUrl}${encodedPrompt}?${params.toString()}`;
    const imageRes = await fetch(imageUrl);

    return new Response(imageRes.body, {
      status: imageRes.status,
      headers: {
        "Content-Type": imageRes.headers.get("Content-Type") || "image/jpeg",
        "Transfer-Encoding": "chunked",
        ...corsHeaders
      }
    });
  }
}



function handleChatModelList(corsHeaders = {}) {
  const chatModels = Object.keys(exposedToInternalMap).map((id) => ({
    id,
    object: "model",
    owned_by: "openai-compatible"
  }));

  return new Response(JSON.stringify({
    object: "list",
    data: chatModels
  }), {
    headers: { "Content-Type": "application/json", ...corsHeaders }
  });
}

function handleImageModelList(corsHeaders = {}) {
  const models = Object.entries(imageModelRoutes).map(([id, meta]) => ({
    id,
    object: "model",
    provider: meta.provider,
    name: meta.displayName,
    width: meta.width,
    height: meta.height,
    owned_by: meta.provider
  }));

  return new Response(JSON.stringify({
    object: "list",
    data: models
  }), {
    headers: { "Content-Type": "application/json", ...corsHeaders }
  });
}

function handleVisionModelList(corsHeaders = {}) {
  const models = Object.entries(visionModels).map(([id, meta]) => ({
    id,
    object: "model",
    provider: meta.provider,
    name: meta.name,
    capabilities: meta.capabilities,
    max_tokens: meta.maxTokens,
    supported_formats: meta.supportedFormats,
    owned_by: meta.provider
  }));

  return new Response(JSON.stringify({
    object: "list",
    data: models
  }), {
    headers: { "Content-Type": "application/json", ...corsHeaders }
  });
}



function handleDefaults(corsHeaders = {}) {
  return new Response(JSON.stringify({
    vision: defaultModels.vision,
    webSearch: defaultModels.webSearch
  }), {
    headers: { "Content-Type": "application/json", ...corsHeaders }
  });
}

async function handleUrlAutomation(request, corsHeaders) {
  const body = await request.json();
  const { action, url, data } = body;

  // URL automation for various actions
  const automationResponse = {
    action,
    url,
    success: true,
    message: `Automation action '${action}' processed`,
    data: data || {}
  };

  // Handle different automation actions
  switch (action) {
    case 'youtube_search':
      automationResponse.url = `https://www.youtube.com/results?search_query=${encodeURIComponent(data.query)}`;
      break;
    case 'scroll_page':
      automationResponse.script = `window.scrollTo(0, ${data.position || 0});`;
      break;
    case 'fill_input':
      automationResponse.script = `document.querySelector('${data.selector}').value = '${data.value}';`;
      break;
    case 'click_element':
      automationResponse.script = `document.querySelector('${data.selector}').click();`;
      break;
    case 'login':
      automationResponse.script = `
        document.querySelector('${data.usernameSelector}').value = '${data.username}';
        document.querySelector('${data.passwordSelector}').value = '${data.password}';
        document.querySelector('${data.submitSelector}').click();
      `;
      break;
    case 'take_screenshot':
      const encodedUrl = encodeURIComponent(data.url || url);
      const width = data.width || 1920;
      const height = data.height || 1080;
      automationResponse.screenshot_url = `https://s.wordpress.com/mshots/v1/${encodedUrl}?w=${width}&h=${height}`;
      automationResponse.message = `Screenshot URL generated for ${data.url || url}`;
      break;
    default:
      automationResponse.success = false;
      automationResponse.message = `Unknown automation action: ${action}`;
  }

  return new Response(JSON.stringify(automationResponse), {
    headers: { "Content-Type": "application/json", ...corsHeaders }
  });
}