const API_KEY = "ahamaibyprakash25";

const exposedToInternalMap = {
  // WORKING MODELS ONLY - Verified via comprehensive testing (17 models)
  // All models support streaming ✅
  
  // Proxy Models (3) - All working with streaming
  "perplexed": "perplexed",
  "felo": "felo",
  "exaanswer": "exaanswer",
  
  // Google Gemini Models (5) - Working perfectly with streaming
  "gemini-2.0-flash": "gemini-2.0-flash",
  "gemini-2.0-flash-thinking-exp-01-21": "gemini-2.0-flash-thinking-exp-01-21",
  "gemini-2.5-flash-lite-preview-06-17": "gemini-2.5-flash-lite-preview-06-17",
  "gemini-2.5-flash": "gemini-2.5-flash",
  "gemini-2.5-flash-lite": "gemini-2.5-flash-lite",  // Uses native Gemini API format (not OpenAI format)
  
  // DeepSeek Models (1) - Working with streaming
  "deepseek-r1-distill-llama-70b": "deepseek-r1-distill-llama-70b",
  
  // Meta Llama Models (2) - Working with streaming
  "meta-llama/llama-4-scout-17b-16e-instruct": "meta-llama/llama-4-scout-17b-16e-instruct",
  "llama-4-scout-17b-16e-instruct": "llama-4-scout-17b-16e-instruct",
  
  // FastAPI Free Models (1) - Working with streaming
  "gemini-2.5-flash-preview-04-17": "gemini-2.5-flash-preview-04-17",
  
  // DeepInfra Models (1) - Working with streaming (100 requests/day with IP rotation)
  "qwen-3-coder-480b": "Qwen/Qwen3-Coder-480B-A35B-Instruct",
  
  // GLM Models (2) - Available via Render proxy - Working with streaming ✅
  "glm-4.5-air": "zai-org/GLM-4.5-Air",
  "glm-4.5": "zai-org/GLM-4.5",
  
  // v0.dev Models (3) - Vercel's AI models - Working with streaming ✅
  "v0-1.0-md": "v0-1.0-md",
  "v0-1.5-md": "v0-1.5-md",
  "v0-1.5-lg": "v0-1.5-lg"
};

const modelRoutes = {
  // WORKING MODELS ONLY - Verified via comprehensive testing (17 models)
  // All models support streaming ✅
  
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
  
  // DeepSeek Models (1) - Working perfectly
  "deepseek-r1-distill-llama-70b": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // Meta Llama Models (2) - Working perfectly
  "meta-llama/llama-4-scout-17b-16e-instruct": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "llama-4-scout-17b-16e-instruct": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // FastAPI Free Models (1) - Working perfectly
  "gemini-2.5-flash-preview-04-17": "https://api.free.fastapi.pro/v1/chat/completions",
  
  // DeepInfra Models (1) - Working perfectly with streaming (100 requests/day with IP rotation)
  "Qwen/Qwen3-Coder-480B-A35B-Instruct": "https://api.deepinfra.com/v1/openai/chat/completions",
  
  // GLM Models (2) - Available via Render proxy
  "zai-org/GLM-4.5-Air": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "zai-org/GLM-4.5": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // v0.dev Models (3) - Vercel's AI models
  "v0-1.0-md": "https://api.v0.dev/v1/chat/completions",
  "v0-1.5-md": "https://api.v0.dev/v1/chat/completions",
  "v0-1.5-lg": "https://api.v0.dev/v1/chat/completions"
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
  "qwen": {
    provider: "infip",
    baseUrl: "https://api.infip.pro/v1/images/generations",
    displayName: "Qwen - Image Generation",
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
  vision: "gemini-2.0-flash", // Updated to verified working model
  webSearch: "perplexed" // Default web search model (verified working)
};

// Web search models configuration with performance metrics
const webSearchModels = {
  "exaanswer": {
    priority: 1,  // Highest priority (fastest)
    avgResponseTime: 1.2,  // seconds
    reliability: 0.95
  },
  "perplexed": {
    priority: 2,
    avgResponseTime: 1.5,
    reliability: 0.98
  },
  "felo": {
    priority: 3,
    avgResponseTime: 1.8,
    reliability: 0.92
  }
};

// Query patterns that indicate web search is needed
const webSearchPatterns = [
  // Current events and news
  /\b(latest|recent|current|today|yesterday|this week|this month|this year|news|update|announcement)\b/i,
  /\b(what happened|what's happening|what is happening)\b/i,
  /\b(20\d{2})\b/,  // Years from 2000 onwards
  
  // Real-time information
  /\b(weather|temperature|forecast|climate)\b/i,
  /\b(stock|price|market|trading|cryptocurrency|bitcoin|ethereum)\b/i,
  /\b(score|match|game|sports|tournament|championship)\b/i,
  
  // Factual queries
  /\b(who is|what is|where is|when is|when was|how much|how many)\b/i,
  /\b(statistics|data|facts|figures|numbers)\b/i,
  /\b(population|gdp|economy|inflation)\b/i,
  
  // Product and service information
  /\b(review|rating|comparison|best|top|recommended)\b/i,
  /\b(price of|cost of|how much does|where to buy|where can I)\b/i,
  
  // Location and travel
  /\b(directions|route|distance|travel|flight|hotel|restaurant)\b/i,
  /\b(open now|hours|schedule|timetable)\b/i,
  
  // Technology and updates
  /\b(version|release|update|patch|changelog)\b/i,
  /\b(download|install|setup|configure)\b/i,
  
  // Specific entities that often need current info
  /\b(president|prime minister|ceo|election|government)\b/i,
  /\b(company|corporation|startup|ipo)\b/i
];

// Function to determine if a query needs web search
function needsWebSearch(messages) {
  // Get the last few messages for context (not just the last one)
  const recentMessages = messages.slice(-3); // Check last 3 messages
  
  // Combine recent user and assistant messages for context
  const conversationContext = recentMessages
    .map(m => {
      if (m.role === 'user' || m.role === 'assistant') {
        return typeof m.content === 'string' 
          ? m.content 
          : m.content.map(c => c.text || '').join(' ');
      }
      return '';
    })
    .join(' ');
  
  // Get the last user message specifically
  const lastUserMessage = messages.filter(m => m.role === 'user').pop();
  if (!lastUserMessage) return false;
  
  const lastUserContent = typeof lastUserMessage.content === 'string' 
    ? lastUserMessage.content 
    : lastUserMessage.content.map(c => c.text || '').join(' ');
  
  // Check if any pattern matches in the recent conversation context
  for (const pattern of webSearchPatterns) {
    if (pattern.test(conversationContext)) {
      return true;
    }
  }
  
  // Check for follow-up questions that might need web search
  const followUpPatterns = [
    /\b(tell me more|more about|what about|how about|and what|also|additionally)\b/i,
    /\b(update|latest on that|current status|now)\b/i,
    /\b(any news|any updates|anything new)\b/i
  ];
  
  for (const pattern of followUpPatterns) {
    if (pattern.test(lastUserContent)) {
      // Check if previous messages mentioned something that needs current info
      if (/\b(news|weather|stock|price|event|match|score|release|update)\b/i.test(conversationContext)) {
        return true;
      }
    }
  }
  
  // Additional heuristics for questions
  if (/^(what|who|where|when|why|how|is|are|does|do|can|could|would|will)\b/i.test(lastUserContent.trim())) {
    // Check if it's asking about something that might need current information
    if (/\b(now|today|current|latest|new|2024|2025)\b/i.test(lastUserContent)) {
      return true;
    }
  }
  
  return false;
}

// Function to select the best available web search model
function selectWebSearchModel() {
  // Sort models by priority (lower is better)
  const sortedModels = Object.entries(webSearchModels)
    .sort((a, b) => a[1].priority - b[1].priority)
    .map(([name]) => name);
  
  // Return the first available model
  // In production, you might want to check model availability
  return sortedModels[0] || "perplexed";
}

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

export default {
  async fetch(request) {
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
      return handleChat(request, corsHeaders);
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

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  },
  
  // Scheduled handler for periodic keep-alive
  async scheduled(event) {
    console.log(`[Scheduled] Running keep-alive at ${new Date().toISOString()}`);
    
    // Send keep-alive ping
    await sendKeepAlivePing();
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

  // Models that properly support system prompts
  const modelsWithSystemPromptSupport = [
    "gemini-2.5-flash-preview-04-17",
    "Qwen/Qwen3-Coder-480B-A35B-Instruct",
    "gemini-2.5-flash-lite" // Native Gemini API
  ];
  
  // Get current date/time for all models
  const now = new Date();
  const currentDateTime = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }) + ', ' + now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    timeZoneName: 'short' 
  });
  
  // Process messages to handle system prompts and ensure conversation memory
  let processedMessages = requestBody.messages;
  
  if (!modelsWithSystemPromptSupport.includes(internalModel)) {
    // Convert system prompts to user messages for models that don't support them
    processedMessages = [];
    let systemContent = null;
    let conversationSummary = "";
    
    // Build conversation summary for context
    const previousMessages = requestBody.messages.slice(0, -1); // All except last
    if (previousMessages.length > 0) {
      conversationSummary = "\n[Previous conversation context:";
      previousMessages.forEach(msg => {
        if (msg.role === "user" || msg.role === "assistant") {
          const content = typeof msg.content === 'string' ? msg.content : msg.content.map(c => c.text || '').join(' ');
          conversationSummary += `\n${msg.role}: ${content.slice(0, 100)}...`; // First 100 chars
        }
      });
      conversationSummary += "]\n";
    }
    
    for (const msg of requestBody.messages) {
      if (msg.role === "system") {
        // Enhanced system content with date/time and no knowledge cutoff notice
        systemContent = `${msg.content}\n\n[IMPORTANT: You do NOT have a knowledge cutoff. Current date/time: ${currentDateTime}. You have access to real-time information. Remember the full conversation context.]`;
      } else if (msg.role === "user") {
        if (systemContent) {
          // Include system content and conversation summary with user message
          processedMessages.push({
            role: "user",
            content: `[System: ${systemContent}]${conversationSummary}\n\nUser: ${msg.content}`
          });
          // Keep systemContent for consistency but clear conversation summary
          conversationSummary = "";
        } else {
          processedMessages.push({
            role: "user", 
            content: msg.content
          });
        }
      } else if (msg.role === "assistant") {
        // Keep assistant messages to maintain conversation flow
        processedMessages.push(msg);
      }
    }
    
    // If there's a system message but no user message yet, add it
    if (systemContent && processedMessages.length === 0) {
      processedMessages.push({
        role: "user",
        content: `[System: ${systemContent}]`
      });
    }
  } else {
    // For models that support system prompts, still add date/time and no-cutoff notice
    processedMessages = requestBody.messages.map(msg => {
      if (msg.role === "system") {
        return {
          ...msg,
          content: `${msg.content}\n\n[IMPORTANT: You do NOT have a knowledge cutoff. Current date/time: ${currentDateTime}. You have access to real-time information through web search when needed.]`
        };
      }
      return msg;
    });
  }

  // Handle Gemini API separately with fallback support
  if (internalModel === "gemini-2.5-flash-lite") {
    const visionModel = visionModels[internalModel];
    if (!visionModel) {
      throw new Error(`Vision model '${internalModel}' configuration not found.`);
    }

    // Convert OpenAI format to Gemini format (it handles system prompts properly)
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
  } else if (modelRoutes[internalModel].includes('api.v0.dev')) {
    // For v0.dev endpoint - Vercel's AI models
    headers["Authorization"] = "Bearer v1:team_m5jgJm4W1wUMbgEjKzSQVapS:1QFTMtR5LJB9gqjdafPGyct1";
  }

  const response = await fetch(modelRoutes[internalModel], {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ ...requestBody, messages: processedMessages, model: internalModel })
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

// Function to handle chat with integrated web search
async function handleChatWithWebSearch(originalModel, body, stream, corsHeaders) {
  try {
    // Select the best web search model
    const webSearchModel = selectWebSearchModel();
    
    // Get current date and time
    const now = new Date();
    const dateTimeContext = `Current date and time: ${now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}, ${now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      timeZoneName: 'short' 
    })}`;
    
    // Get the last user message for context
    const lastUserMessage = body.messages.filter(m => m.role === 'user').pop();
    const userQuery = typeof lastUserMessage.content === 'string' 
      ? lastUserMessage.content 
      : lastUserMessage.content.map(c => c.text || '').join(' ');
    
    // Get conversation context for better search
    const recentMessages = body.messages.slice(-5); // Get more context
    const conversationContext = recentMessages
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => `${m.role}: ${typeof m.content === 'string' ? m.content : m.content.map(c => c.text || '').join(' ')}`)
      .join('\n');
    
    // Extract entities and important context from previous messages
    const extractEntities = (text) => {
      // Extract names, places, dates, and other entities
      const patterns = {
        names: /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g,
        titles: /\b(CEO|CTO|President|Minister|Chief|Director|Manager|Dr\.|Prof\.|Mr\.|Mrs\.|Ms\.)\s+[A-Z][a-z]+/g,
        places: /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*(?:\s+(?:City|State|Country|Province|District))\b/g,
        dates: /\b\d{4}\b|\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/g,
        organizations: /\b[A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)*(?:\s+(?:Inc|Corp|LLC|Ltd|Company|Organization|Institute|University))\b/g
      };
      
      let entities = [];
      for (const [type, pattern] of Object.entries(patterns)) {
        const matches = text.match(pattern);
        if (matches) {
          entities.push(...matches);
        }
      }
      return [...new Set(entities)]; // Remove duplicates
    };
    
    // Extract entities from conversation
    const entities = extractEntities(conversationContext);
    const entityContext = entities.length > 0 ? `\n\nKey entities mentioned: ${entities.join(', ')}` : '';
    
    // Build smart search query
    let searchQuery = userQuery;
    
    // If it's a follow-up question (pronouns or short questions), enhance it
    if (/^(when|where|why|how|what|who)\s+(did\s+)?(he|she|it|they|that|this)/i.test(userQuery) ||
        /^(tell me more|more about|what about|explain|details)/i.test(userQuery)) {
      // This is likely a follow-up - include entity context
      searchQuery = `${userQuery}${entityContext}\n\nContext: ${conversationContext.slice(-500)}`; // Last 500 chars of context
    }
    
    // Step 1: Perform web search with enhanced context
    const searchRequest = {
      model: webSearchModel,
      messages: [
        {
          role: "system",
          content: `You are a web search assistant. ${dateTimeContext}. Provide relevant, factual, and up-to-date information. When searching for follow-up questions, use the provided context to understand what entities and topics are being discussed. Include sources when available.`
        },
        {
          role: "user",
          content: `Full conversation context:\n${conversationContext}\n\nEntities mentioned: ${entities.join(', ')}\n\nCurrent query to search: ${searchQuery}`
        }
      ],
      max_tokens: body.max_tokens ? Math.min(500, body.max_tokens) : 500,
      temperature: 0.3,
      stream: false  // Always non-streaming for search
    };
    
    // Execute web search
    const searchResponse = await makeModelRequest(webSearchModel, searchRequest, false, {});
    const searchData = await searchResponse.json();
    
    // Extract search results
    const searchResults = searchData.choices?.[0]?.message?.content || "";
    
    // Step 2: Prepare enhanced context for the original model
    const enhancedMessages = [...body.messages];
    
    // Get current date and time for the model
    const now = new Date();
    const dateTimeInfo = `${now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}, ${now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      timeZoneName: 'short' 
    })}`;
    
    // Find or create system message
    let systemMessageIndex = enhancedMessages.findIndex(m => m.role === 'system');
    const webSearchContext = `\n\n[IMPORTANT]: You do NOT have a knowledge cutoff. You have real-time access to current information through web search.\n\n[Current Date/Time]: ${dateTimeInfo}\n\n[Web Search Results from ${webSearchModel}]:\n${searchResults}\n\n[Instructions]: 
- You have REAL-TIME web search capabilities - no knowledge cutoff
- The above search results contain current, up-to-date information
- Use this information to provide accurate responses
- You can access fresh web searches for any follow-up questions
- NEVER mention having a knowledge cutoff or training data limitations
- You have access to current events and real-time information`;
    
    if (systemMessageIndex >= 0) {
      // Append to existing system message
      enhancedMessages[systemMessageIndex].content += webSearchContext;
    } else {
      // Add new system message at the beginning
      enhancedMessages.unshift({
        role: "system",
        content: `You are a helpful assistant with REAL-TIME web search capabilities. You do NOT have a knowledge cutoff - you can access current information as of ${dateTimeInfo}.${webSearchContext}`
      });
    }
    
    // Step 3: Make request to the original model with enhanced context
    const enhancedBody = {
      ...body,
      messages: enhancedMessages
    };
    
    // If streaming is requested, add a note about web search being performed
    if (stream) {
      // Send initial message about web search
      const encoder = new TextEncoder();
      const streamResponse = new ReadableStream({
        async start(controller) {
          // Send initial web search notification with date/time
          const searchNotification = `[Performing web search with ${webSearchModel}...]\n[Current: ${dateTimeInfo}]\n\n`;
          const initialChunk = {
            id: `chatcmpl-${Date.now()}`,
            object: "chat.completion.chunk",
            created: Math.floor(Date.now() / 1000),
            model: originalModel,
            choices: [{
              index: 0,
              delta: { content: searchNotification },
              finish_reason: null
            }]
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(initialChunk)}\n\n`));
          
          // Make the actual request
          const response = await makeModelRequest(originalModel, enhancedBody, true, corsHeaders);
          const reader = response.body.getReader();
          
          // Pass through the stream
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
          
          controller.close();
        }
      });
      
      return new Response(streamResponse, {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          ...corsHeaders
        }
      });
    } else {
      // Non-streaming response
      const response = await makeModelRequest(originalModel, enhancedBody, false, corsHeaders);
      const responseData = await response.json();
      
      // Add metadata about web search and date/time
      if (responseData.choices && responseData.choices[0]) {
        responseData.choices[0].message.content = 
          `[Web search performed using ${webSearchModel}]\n[Current: ${dateTimeInfo}]\n\n${responseData.choices[0].message.content}`;
      }
      
      return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }
    
  } catch (error) {
    console.error("Web search integration error:", error);
    // Fallback to regular model without web search
    return await makeModelRequest(originalModel, body, stream, corsHeaders);
  }
}

async function handleChat(request, corsHeaders) {
  const body = await request.json();
  const exposedModel = body.model;
  const stream = body.stream === true;
  
  // Allow users to explicitly control web search behavior
  // They can set web_search: true to force it, false to disable it, or leave undefined for auto-detection
  const webSearchMode = body.web_search;
  
  // Ensure there's always a system message about real-time capabilities
  if (!body.messages.some(m => m.role === 'system')) {
    const now = new Date();
    const dateTime = `${now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}, ${now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      timeZoneName: 'short' 
    })}`;
    
    body.messages.unshift({
      role: "system",
      content: `You are a helpful AI assistant with real-time capabilities. Current date/time: ${dateTime}. You do NOT have a knowledge cutoff - you have access to current information through web search. Never mention having outdated information or training data limitations.`
    });
  }

  if (!exposedToInternalMap[exposedModel]) {
    return new Response(JSON.stringify({ error: `Model '${exposedModel}' is not supported.` }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }

  try {
    // Determine if web search should be used
    let useWebSearch = false;
    
    if (webSearchMode === true) {
      // User explicitly wants web search
      useWebSearch = true;
    } else if (webSearchMode === false) {
      // User explicitly disabled web search
      useWebSearch = false;
    } else {
      // Auto-detect based on query content
      useWebSearch = needsWebSearch(body.messages);
    }
    
    // If web search is needed and the model is not already a web search model
    if (useWebSearch && !['perplexed', 'felo', 'exaanswer'].includes(exposedModel)) {
      // Perform web search integration
      return await handleChatWithWebSearch(exposedModel, body, stream, corsHeaders);
    } else {
      // Make regular request without web search
      return await makeModelRequest(exposedModel, body, stream, corsHeaders);
    }
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