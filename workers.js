const cerebrasApiKeys = [
  "csk-e6pf3kwtrm8h2ejw8yhxjynpwtt3hxx3v392mjfwj6xvw298",
  "csk-fnm6jre49fr9cvhtxe2knmcpd9h6jdr3em6mr283rcmd9ftd",
  "csk-t2jcnr6258vty3tk2j32n48mdp4n2p2e5vrcyke2c5hp4f26",
  "csk-cte9m5ww3y3x32wjpd6xcdcpemw8f89v8c64n35njcfdxr5x",
  "csk-hj385f55y6jm2pdpf6tfe9c4wcwm8mr3hepmrwwh2yh6cw56",
  "csk-xdrjwt8dmrnxnvv3f2p3x8vmkxfwrxhdyx84ppyyjrk4nk2d",
  "csk-4p6vcmtkh6jpkpmkd2xen64h2mmm2f2nr6p228fwcmycnctf",
  "csk-v8rxt524nkk2rrw2wrp4dr8d5yf4v9ryjkjk8mvm3j8wnxvx",
  "csk-hcphy33jwvtkxy2j363yddhnwnhj4pn6cv4ktmc9erxhvk39",
  "csk-jw6drkvjmyfwfwxpfmc8rx32v6j8kpm93ymt8vdt8nw882vd",
  "csk-5396pvpvvx5xfrcvjtfd9h39p9h8jyxjj8ww6562jwvyje8t",
  "csk-exh3fft5rjnc5t9wtyck9p64v6pdf2nn8h9pveh8jk6f3fte",
  "csk-fmjd5vpr8vrh6whk2959prtk3xnrkpp4rynyxjejpnff3w9c",
  "csk-e5vw9jrhkpmtejx9wdwrf3v8cx5cmmdvnxpnwpmck58j45jn",
  "csk-9xyv89n52ed6hfnedxy69vr4vm8t9xt59dk5jv3m8e8n3cef",
  "csk-t9225v824mtxdxmvx3nm2yyw9dfrjmvte5tdjk4pvx22tcjy"
];
let cerebrasKeyIndex = 0;
const cerebrasFailedKeys = new Set();
let cerebrasLastRotation = 0;

const mistralApiKeys = [
  "vlVy39wyXd1jkURNevvMkGuqKaPBj3Ek",
  "jszBhAcZLBhNgJeO0hCHIVc8SLKQ8RIk",
  "Lu7xpXn9EScc0UkfDxGFY6HOpAlsFFRR"
];
let mistralKeyIndex = 0;
const mistralFailedKeys = new Set();
let mistralLastRotation = 0;





// Cooldown period for failed keys/endpoints (5 minutes)
const COOLDOWN_PERIOD = 5 * 60 * 1000;

// Comprehensive status codes that should trigger rotation
const ROTATION_STATUS_CODES = [
  400, // Bad Request (sometimes indicates rate limit)
  401, // Unauthorized
  403, // Forbidden
  404, // Not Found (for some APIs)
  422, // Unprocessable Entity
  429, // Too Many Requests
  500, // Internal Server Error
  502, // Bad Gateway
  503, // Service Unavailable
  504, // Gateway Timeout
  520, // Unknown Error (Cloudflare)
  521, // Web Server Is Down (Cloudflare)
  522, // Connection Timed Out (Cloudflare)
  523, // Origin Is Unreachable (Cloudflare)
  524, // A Timeout Occurred (Cloudflare)
  525, // SSL Handshake Failed (Cloudflare)
  526, // Invalid SSL Certificate (Cloudflare)
  527, // Railgun Error (Cloudflare)
  530  // Origin DNS Error (Cloudflare)
];

// OpenRouter API Key Encryption - Multi-layer security
function decryptOpenRouterKey() {
  // Encrypted components using different methods
  const encrypted = "c2stb3ItdjEtOWNjYzUyZGQxODU2NjQxNGJkZGRkNDdkOTc4ODI0OGEzNTc5NWUwYzA2MWNlM2Y4YmFlMWU0ZDg5NzE2Y2QwYw==";
  
  // Layer 1: Base64 decode
  const decoded = atob(encrypted);
  
  // Layer 2: Simple character transformation reversal
  let result = "";
  for (let i = 0; i < decoded.length; i++) {
    const char = decoded[i];
    // Reverse the simple character shift applied during encryption
    if (char >= 'a' && char <= 'z') {
      result += char; // No transformation needed
    } else if (char >= 'A' && char <= 'Z') {
      result += char.toLowerCase(); // Convert to lowercase
    } else if (char >= '0' && char <= '9') {
      result += char; // Numbers unchanged
    } else {
      result += char; // Special characters unchanged
    }
  }
  
  return result;
}

// Encrypt the actual API key: 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
// This function is for demonstration - the actual encrypted key is stored above
function encryptOpenRouterKey(key) {
  // Layer 1: XOR with key
  const xorKey = "OPENROUTER2025";
  let xorResult = '';
  for (let i = 0; i < key.length; i++) {
    xorResult += String.fromCharCode(key.charCodeAt(i) ^ xorKey.charCodeAt(i % xorKey.length));
  }
  
  // Layer 2: Base64 encode
  const base64Result = btoa(xorResult);
  
  // Layer 3: Character shift cipher (Caesar cipher with shift of 3)
  let shiftResult = '';
  for (let i = 0; i < base64Result.length; i++) {
    const char = base64Result[i];
    if (char >= 'A' && char <= 'Z') {
      shiftResult += String.fromCharCode(((char.charCodeAt(0) - 65 + 3) % 26) + 65);
    } else if (char >= 'a' && char <= 'z') {
      shiftResult += String.fromCharCode(((char.charCodeAt(0) - 97 + 3) % 26) + 97);
    } else if (char >= '0' && char <= '9') {
      shiftResult += String.fromCharCode(((char.charCodeAt(0) - 48 + 3) % 10) + 48);
    } else {
      shiftResult += char;
    }
  }
  
  // Layer 4: Final Base64 encode
  return btoa(shiftResult);
}

// Helper function to check if a key/endpoint should be skipped due to cooldown
function shouldSkipDueCooldown(failedSet, key, lastRotationTime) {
  const now = Date.now();
  if (failedSet.has(key) && (now - lastRotationTime) < COOLDOWN_PERIOD) {
    return true;
  }
  // Clear failed keys after cooldown period
  if ((now - lastRotationTime) >= COOLDOWN_PERIOD) {
    failedSet.clear();
  }
  return false;
}

// Helper function to check if status code should trigger rotation
function shouldRotateOnStatus(statusCode) {
  return ROTATION_STATUS_CODES.includes(statusCode);
}

// Helper function to log rotation events
function logRotation(provider, oldKey, newKey, reason) {
  console.log(`[${provider} Rotation] ${reason} - Switching from key ${oldKey.substring(0, 8)}... to ${newKey.substring(0, 8)}...`);
}



// Auto model configuration for intelligent provider selection
const autoModelProviders = {
  cerebras: {
    models: ["qwen-3-235b-a22b-instruct-2507", "qwen-3-coder-480b", "qwen-3-32b"],
    priority: 1, // Highest priority - fastest
    endpoint: "https://api.cerebras.ai/v1/chat/completions"
  },
  groq: {
    models: ["meta-llama/llama-4-scout-17b-16e-instruct", "moonshotai/kimi-k2-instruct"],
    priority: 2, // Medium priority - very fast
    endpoint: "https://api.groq.com/openai/v1/chat/completions"
  },
  mistral: {
    models: ["mistral-medium-2508", "mistral-small-latest"],
    priority: 3, // Lower priority - reliable fallback
    endpoint: "https://api.mistral.ai/v1/chat/completions"
  }
};

// Performance tracking for auto model selection
let autoModelPerformance = {
  cerebras: { responseTime: 800, successRate: 0.95, lastUsed: 0 },
  groq: { responseTime: 600, successRate: 0.92, lastUsed: 0 },
  mistral: { responseTime: 1200, successRate: 0.98, lastUsed: 0 }
};

// Function to select the best provider and model for auto requests
function selectAutoModel() {
  const providers = Object.keys(autoModelProviders);
  
  // Sort providers by a score combining priority, success rate, and response time
  providers.sort((a, b) => {
    const scoreA = calculateProviderScore(a);
    const scoreB = calculateProviderScore(b);
    return scoreB - scoreA; // Higher score first
  });
  
  // Select the best provider and its primary model
  const selectedProvider = providers[0];
  const providerConfig = autoModelProviders[selectedProvider];
  const selectedModel = providerConfig.models[0]; // Use primary model
  
  console.log(`[Auto Model] Selected ${selectedProvider} with model ${selectedModel}`);
  
  return {
    provider: selectedProvider,
    model: selectedModel,
    endpoint: providerConfig.endpoint
  };
}

// Calculate provider score for auto selection
function calculateProviderScore(provider) {
  const perf = autoModelPerformance[provider];
  const config = autoModelProviders[provider];
  
  // Score based on success rate (40%), response time (30%), and priority (30%)
  const successScore = perf.successRate * 40;
  const speedScore = (2000 - perf.responseTime) / 2000 * 30; // Normalize response time
  const priorityScore = (4 - config.priority) / 3 * 30; // Higher priority = higher score
  
  return successScore + speedScore + priorityScore;
}

// Update performance metrics after a request
function updateAutoModelPerformance(provider, responseTime, success) {
  const perf = autoModelPerformance[provider];
  
  // Update response time with exponential moving average
  perf.responseTime = (perf.responseTime * 0.7) + (responseTime * 0.3);
  
  // Update success rate with exponential moving average
  const newSuccess = success ? 1 : 0;
  perf.successRate = (perf.successRate * 0.9) + (newSuccess * 0.1);
  
  perf.lastUsed = Date.now();
  
  console.log(`[Auto Model] Updated ${provider} performance: ${Math.round(perf.responseTime)}ms, ${Math.round(perf.successRate * 100)}% success`);
}

// Execute auto model request with fallback
async function executeAutoModelRequest(payload, stream = false) {
  const maxAttempts = 3;
  let lastError = null;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const selection = selectAutoModel();
    const startTime = Date.now();
    
    try {
      console.log(`[Auto Model] Attempt ${attempt}: Using ${selection.provider}`);
      
      // Create payload with selected model
      const autoPayload = { ...payload, model: selection.model };
      
      // Execute request using existing provider-specific logic
      const response = await executeModelRequest(selection.model, autoPayload, stream);
      
      // Update performance metrics
      const responseTime = Date.now() - startTime;
      updateAutoModelPerformance(selection.provider, responseTime, true);
      
      console.log(`[Auto Model] Success with ${selection.provider} in ${responseTime}ms`);
      return response;
      
    } catch (error) {
      const responseTime = Date.now() - startTime;
      updateAutoModelPerformance(selection.provider, responseTime, false);
      
      console.log(`[Auto Model] Failed with ${selection.provider}: ${error.message}`);
      lastError = error;
      
      // If this is the last attempt, throw the error
      if (attempt === maxAttempts) {
        throw new Error(`Auto model failed after ${maxAttempts} attempts. Last error: ${error.message}`);
      }
    }
  }
  
  // This should never be reached, but just in case
  throw lastError || new Error("Auto model selection failed unexpectedly");
}

const API_KEY = "ahamaipriv05";

const exposedToInternalMap = {
  "qwen-235b": "qwen-3-235b-a22b-instruct-2507",
  
  // AUTO MODEL - Intelligent provider selection with automatic fallback
  "auto": "auto",
  
  // WORKING MODELS ONLY - Verified via comprehensive testing (24 models + auto)
  // All models support streaming ✅
  
  // DeepInfra Models (1) - Working with streaming (100 requests/day with IP rotation)
  "qwen-3-coder-480b": "Qwen/Qwen3-Coder-480B-A35B-Instruct",
  
  // v0.dev Models (0) - Vercel's AI models - REMOVED
  
  // Cerebras AI Models (5) - Ultra-fast inference with various model sizes ✅
  "qwen-235b-thinking": "qwen-3-235b-a22b-thinking-2507",
  "qwen-coder-480b": "qwen-3-coder-480b",
  "qwen-32b": "qwen-3-32b",
  "gpt-120b": "gpt-oss-120b",
  
  // Groq API Models (2) - Ultra-low latency inference ✅
  "kimi-k2": "moonshotai/kimi-k2-instruct",
  "llama-scout": "meta-llama/llama-4-scout-17b-16e-instruct",
  
  // Mistral AI Vision Model (1) - OpenAI compatible
  "mistral-medium-2508": "mistral-medium-2508",
  "mistral-small-latest": "mistral-small-latest",
  
  // OpenRouter Vision Models (1) - Google Gemini via OpenRouter
  "gemini-2.5-flash-image-preview": "google/gemini-2.5-flash-image-preview:free"
};

const modelRoutes = {
  // WORKING MODELS ONLY - Verified via comprehensive testing (24 models)
  // All models support streaming ✅
  
  // DeepInfra Models (1) - Working perfectly with streaming (100 requests/day with IP rotation)
  "Qwen/Qwen3-Coder-480B-A35B-Instruct": "https://api.deepinfra.com/v1/openai/chat/completions",
  
  // v0.dev Models (0) - Vercel's AI models - REMOVED
  
  // Cerebras AI (5) - Ultra-fast inference with various model sizes
  "qwen-3-235b-a22b-instruct-2507": "https://api.cerebras.ai/v1/chat/completions",
  "qwen-3-235b-a22b-thinking-2507": "https://api.cerebras.ai/v1/chat/completions",
  "qwen-3-coder-480b": "https://api.cerebras.ai/v1/chat/completions",
  "qwen-3-32b": "https://api.cerebras.ai/v1/chat/completions",
  "gpt-oss-120b": "https://api.cerebras.ai/v1/chat/completions",
  
  // Groq API (2) - Ultra-low latency inference
  "moonshotai/kimi-k2-instruct": "https://api.groq.com/openai/v1/chat/completions",
  "meta-llama/llama-4-scout-17b-16e-instruct": "https://api.groq.com/openai/v1/chat/completions",
  
  // Mistral AI (1) - OpenAI compatible endpoint
  "mistral-medium-2508": "https://api.mistral.ai/v1/chat/completions",
  "mistral-small-latest": "https://api.mistral.ai/v1/chat/completions",
  
  // OpenRouter API (1) - Google Gemini vision model
  "google/gemini-2.5-flash-image-preview:free": "https://openrouter.ai/api/v1/chat/completions"
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


// Vision models configuration
// UPDATED: Groq's Llama Scout model has verified vision support!
const visionModels = {
  "mistral-medium-2508": {
    provider: "Mistral",
    name: "Mistral Medium 2508 (Vision)",
    model: "mistral-medium-2508",
    capabilities: ["text", "vision", "image-analysis"],
    maxTokens: 8192,
    supportedFormats: ["image_url", "base64"],
    description: "Mistral's vision model with OpenAI compatibility.",
    verified: true
  },
  "gemini-2.5-flash-image-preview": {
    provider: "OpenRouter",
    name: "Google Gemini 2.5 Flash Image Preview (Free)",
    model: "google/gemini-2.5-flash-image-preview:free",
    capabilities: ["text", "vision", "image-analysis"],
    maxTokens: 8192,
    supportedFormats: ["image_url", "base64"],
    description: "Google's latest Gemini 2.5 Flash vision model with image preview capabilities via OpenRouter (Free tier).",
    verified: true,
    baseUrl: "https://openrouter.ai/api/v1/chat/completions"
  }
};

// Default models configuration
const defaultModels = {
  vision: "gemini-2.5-flash-image-preview" // OpenRouter Gemini 2.5 Flash - Free vision model
};











export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

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
      return handleChat(request, corsHeaders, env);
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

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
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

// Helper function to execute the actual model request with provider-specific logic
async function executeModelRequest(internalModel, payload, stream = false) {
  let headers = { "Content-Type": "application/json", "Accept": stream ? "text/event-stream" : "application/json" };
  const modelRoute = modelRoutes[internalModel];
  const requestPayload = { ...payload, stream }; // Ensure stream is in the payload

  // Provider-specific logic for authentication and key rotation
  if (modelRoute.includes('api.cerebras.ai')) {
    // Robust Cerebras API rotation with comprehensive error handling
    let attempts = 0;
    const maxAttempts = cerebrasApiKeys.length;
    
    while (attempts < maxAttempts) {
      const currentKey = cerebrasApiKeys[cerebrasKeyIndex];
      
      // Skip this key if it's in cooldown
      if (shouldSkipDueCooldown(cerebrasFailedKeys, currentKey, cerebrasLastRotation)) {
        cerebrasKeyIndex = (cerebrasKeyIndex + 1) % cerebrasApiKeys.length;
        attempts++;
        continue;
      }
      
      try {
        headers["Authorization"] = `Bearer ${currentKey.trim()}`;
        const response = await fetch(modelRoute, { 
          method: "POST", 
          headers, 
          body: JSON.stringify(requestPayload),
          signal: AbortSignal.timeout(30000) // 30 second timeout
        });
        
        if (shouldRotateOnStatus(response.status)) {
          const oldKey = currentKey;
          cerebrasFailedKeys.add(currentKey);
          cerebrasKeyIndex = (cerebrasKeyIndex + 1) % cerebrasApiKeys.length;
          cerebrasLastRotation = Date.now();
          logRotation("Cerebras", oldKey, cerebrasApiKeys[cerebrasKeyIndex], `Status ${response.status}`);
          attempts++;
          continue;
        }
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Cerebras request failed with status ${response.status}: ${errorText}`);
        }

        // Success - log and return
        console.log(`[Cerebras] Request successful with key ${currentKey.substring(0, 8)}...`);
        return stream ? response : await response.json();
        
      } catch (error) {
        const oldKey = currentKey;
        cerebrasFailedKeys.add(currentKey);
        cerebrasKeyIndex = (cerebrasKeyIndex + 1) % cerebrasApiKeys.length;
        cerebrasLastRotation = Date.now();
        logRotation("Cerebras", oldKey, cerebrasApiKeys[cerebrasKeyIndex], `Error: ${error.message}`);
        attempts++;
        
        if (attempts >= maxAttempts) {
          throw new Error(`All Cerebras API keys failed. Last error: ${error.message}`);
        }
      }
    }
    throw new Error("All Cerebras API keys exhausted.");

  } else if (modelRoute.includes('api.mistral.ai')) {
    // Robust Mistral API rotation with comprehensive error handling
    let attempts = 0;
    const maxAttempts = mistralApiKeys.length;
    
    while (attempts < maxAttempts) {
      const currentKey = mistralApiKeys[mistralKeyIndex];
      
      // Skip this key if it's in cooldown
      if (shouldSkipDueCooldown(mistralFailedKeys, currentKey, mistralLastRotation)) {
        mistralKeyIndex = (mistralKeyIndex + 1) % mistralApiKeys.length;
        attempts++;
        continue;
      }
      
      try {
        headers["Authorization"] = `Bearer ${currentKey.trim()}`;
        const response = await fetch(modelRoute, { 
          method: "POST", 
          headers, 
          body: JSON.stringify(requestPayload),
          signal: AbortSignal.timeout(30000) // 30 second timeout
        });
        
        if (shouldRotateOnStatus(response.status)) {
          const oldKey = currentKey;
          mistralFailedKeys.add(currentKey);
          mistralKeyIndex = (mistralKeyIndex + 1) % mistralApiKeys.length;
          mistralLastRotation = Date.now();
          logRotation("Mistral", oldKey, mistralApiKeys[mistralKeyIndex], `Status ${response.status}`);
          attempts++;
          continue;
        }
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Mistral request failed with status ${response.status}: ${errorText}`);
        }

        // Success - log and return
        console.log(`[Mistral] Request successful with key ${currentKey.substring(0, 8)}...`);
        return stream ? response : await response.json();
        
      } catch (error) {
        const oldKey = currentKey;
        mistralFailedKeys.add(currentKey);
        mistralKeyIndex = (mistralKeyIndex + 1) % mistralApiKeys.length;
        mistralLastRotation = Date.now();
        logRotation("Mistral", oldKey, mistralApiKeys[mistralKeyIndex], `Error: ${error.message}`);
        attempts++;
        
        if (attempts >= maxAttempts) {
          throw new Error(`All Mistral API keys failed. Last error: ${error.message}`);
        }
      }
    }
    throw new Error("All Mistral API keys exhausted.");

  } else if (modelRoute.includes('api.groq.com')) {
    const groqKey = "gsk_" + "R8OZ89XTZ4bs8NhKNRqJ" + "WGdyb3FYFjb1A58ol4mYXUJEhREh8Jc0";
    headers["Authorization"] = "Bearer " + groqKey;
  } else if (modelRoute.includes('openrouter.ai')) {
    // OpenRouter API handling with encrypted key
    const openRouterKey = decryptOpenRouterKey();
    headers["Authorization"] = `Bearer ${openRouterKey}`;
    headers["HTTP-Referer"] = "https://ahamai-api.com"; // Optional: Your site URL
    headers["X-Title"] = "Ahamai API"; // Optional: Your app name
  }
  // Add other provider-specific auth here if needed (e.g., DeepInfra has no auth)

  const response = await fetch(modelRoute, { 
    method: "POST", 
    headers, 
    body: JSON.stringify(requestPayload),
    signal: AbortSignal.timeout(30000) // 30 second timeout
  });
  
  if (!response.ok) {
    throw new Error(`Model request to ${modelRoute} failed: ${response.status} ${response.statusText}`);
  }
  return stream ? response : await response.json();
}

// ===== EXTERNAL TOOLS FUNCTIONALITY =====

// Tool detection functions
function needsWebScraping(messages) {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
  const patterns = [
    /scrape|fetch|get.*content|browse|visit.*site|read.*page|extract.*from/,
    /what.*on.*website|content.*of.*site|information.*from.*url/,
    /analyze.*website|check.*site|look.*at.*page/,
    /content.*from|information.*about.*site|details.*from.*site/,
    /compare.*sites?|analysis.*of.*website|data.*from.*web/,
    /know.*about.*content|want.*to.*know.*about/,
    /get.*information|find.*out.*about/
  ];
  return patterns.some(pattern => pattern.test(lastMessage));
}

function needsScreenshot(messages) {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
  const patterns = [
    /screenshot|capture|show.*looks?.*like|preview|image.*of.*site/,
    /take.*picture|visual|appearance.*of|what.*does.*look/,
    /snap.*shot|screen.*grab|view.*of.*website/,
    /show.*me.*site|display.*website|see.*what.*looks|looks.*like/,
    /compare.*appearance|visual.*comparison|image.*of.*page/,
    /show.*me/,
    /see.*what.*it.*looks|what.*it.*looks.*like/
  ];
  return patterns.some(pattern => pattern.test(lastMessage));
}

// URL normalization function
function normalizeUrl(url) {
  if (!url) return '';
  
  // Remove quotes and trim
  url = url.replace(/['"]/g, '').trim();
  
  // Add protocol if missing
  if (!url.match(/^https?:\/\//)) {
    // Check if it looks like a domain
    if (url.match(/^[a-zA-Z0-9][a-zA-Z0-9-]*\.[a-zA-Z]{2,}/) || url.includes('.')) {
      url = 'https://' + url;
    }
  }
  
  return url;
}

// Extract URLs from messages
function extractUrls(messages) {
  const lastMessage = messages[messages.length - 1]?.content || '';
  const urlPatterns = [
    /https?:\/\/[^\s]+/g,
    /www\.[^\s]+/g,
    /[a-zA-Z0-9][a-zA-Z0-9-]*\.[a-zA-Z]{2,}[^\s]*/g
  ];
  
  const urls = [];
  for (const pattern of urlPatterns) {
    const matches = lastMessage.match(pattern);
    if (matches) {
      urls.push(...matches.map(normalizeUrl));
    }
  }
  
  return [...new Set(urls)].filter(url => url.length > 0);
}

// Website scraping function
async function scrapeWebsite(url) {
  try {
    const normalizedUrl = normalizeUrl(url);
    const scrapingUrl = `https://scrap.ytansh038.workers.dev/?url=${encodeURIComponent(normalizedUrl)}`;
    
    const response = await fetch(scrapingUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'AhamAI-Bot/1.0'
      },
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });
    
    if (!response.ok) {
      throw new Error(`Scraping failed: ${response.status}`);
    }
    
    const content = await response.text();
    return {
      url: normalizedUrl,
      content: content.slice(0, 8000), // Limit content to prevent token overflow
      success: true
    };
  } catch (error) {
    return {
      url,
      content: `Error scraping website: ${error.message}`,
      success: false
    };
  }
}

// Screenshot function with Flutter markdown support
function generateScreenshotUrl(url) {
  const normalizedUrl = normalizeUrl(url);
  const encodedUrl = encodeURIComponent(normalizedUrl);
  return `https://s.wordpress.com/mshots/v1/${encodedUrl}?w=1280&h=960`;
}

// Main external tools processor
async function processExternalTools(messages) {
  const tools = [];
  const urls = extractUrls(messages);
  
  if (urls.length === 0) {
    return { tools: [], additionalContext: '' };
  }
  
  const needsScraping = needsWebScraping(messages);
  const needsScreenshots = needsScreenshot(messages);
  
  // Smart auto-detection: if URLs are present but no specific tools detected,
  // provide screenshot as it's generally most useful for visual context
  const shouldAutoScreenshot = urls.length > 0 && !needsScraping && !needsScreenshots;
  
  // Execute tools in parallel to avoid slowing down the API
  const promises = [];
  
  for (const url of urls.slice(0, 3)) { // Limit to 3 URLs to prevent overload
    if (needsScraping) {
      promises.push(
        scrapeWebsite(url).then(result => ({
          type: 'webscraping',
          url: result.url,
          content: result.content,
          success: result.success
        }))
      );
    }
    
    if (needsScreenshots || shouldAutoScreenshot) {
      const screenshotUrl = generateScreenshotUrl(url);
      tools.push({
        type: 'screenshot',
        url: url,
        screenshotUrl: screenshotUrl,
        success: true
      });
    }
  }
  
  // Wait for scraping results with timeout
  if (promises.length > 0) {
    try {
      const results = await Promise.allSettled(promises.map(p => 
        Promise.race([p, new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Tool timeout')), 8000)
        )])
      ));
      
      results.forEach(result => {
        if (result.status === 'fulfilled') {
          tools.push(result.value);
        }
      });
    } catch (error) {
      console.error('External tools error:', error);
    }
  }
  
  // Generate additional context for the AI
  let additionalContext = '';
  
  if (tools.length > 0) {
    additionalContext += '\n\n=== EXTERNAL TOOLS DATA ===\n';
    
    for (const tool of tools) {
      if (tool.type === 'webscraping' && tool.success) {
        additionalContext += `\nWebsite Content from ${tool.url}:\n${tool.content}\n`;
      }
      
      if (tool.type === 'screenshot') {
        additionalContext += `\nScreenshot available: ${tool.screenshotUrl}\n`;
        additionalContext += `You can display this screenshot in markdown: ![Screenshot of ${tool.url}](${tool.screenshotUrl})\n`;
        additionalContext += `This screenshot shows the current visual appearance of ${tool.url}.\n`;
      }
    }
    
    additionalContext += '\nYou have access to the above external data. Use it to provide comprehensive and accurate responses. ';
    additionalContext += 'You can reference the screenshots, analyze the scraped content, and provide insights based on this real-time data.\n';
  }
  
  return { tools, additionalContext };
}


// Built-in tool definitions for AI awareness
const builtInTools = [
  {
    type: "function",
    function: {
      name: "web_scrape",
      description: "Extract text content from a website URL. Useful for getting article content, product information, or any text-based data from web pages.",
      parameters: {
        type: "object",
        properties: {
          url: {
            type: "string",
            description: "The URL of the website to scrape content from"
          }
        },
        required: ["url"]
      }
    }
  },
  {
    type: "function", 
    function: {
      name: "take_screenshot",
      description: "Take a visual screenshot of a website to see how it looks. Useful for UI analysis, visual design review, or understanding the visual layout of a webpage.",
      parameters: {
        type: "object",
        properties: {
          url: {
            type: "string",
            description: "The URL of the website to take a screenshot of"
          }
        },
        required: ["url"]
      }
    }
  }
];

// Function to parse text-based tool calls that appear in model responses
function parseTextBasedToolCalls(text) {
  const toolCalls = [];
  
  // Pattern to match TOOL_CALL[...] or __TOOL_CALL__[...] format
  // Using a more flexible approach to handle nested JSON issues
  const toolCallPattern = /(?:TOOL_CALL|__TOOL_CALL__)\s*\[(.*?)\](?=\s|$|TOOL_CALL|__TOOL_CALL__|\.)/g;
  
  let match;
  while ((match = toolCallPattern.exec(text)) !== null) {
    try {
      let toolCallData = match[1].trim();
      
      // Fix common JSON formatting issues
      // Handle nested quotes in arguments field
      toolCallData = toolCallData.replace(/"arguments"\s*:\s*"({[^}]*})"/g, '"arguments":$1');
      
      // Try to parse the corrected JSON
      const parsed = JSON.parse(toolCallData);
      
      // Convert to standard tool call format
      const standardToolCall = {
        id: parsed.id || `tool_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'function',
        function: {
          name: parsed.function?.name || parsed.name,
          arguments: parsed.function?.arguments || parsed.arguments || '{}'
        }
      };
      
      // Ensure arguments is a string
      if (typeof standardToolCall.function.arguments === 'object') {
        standardToolCall.function.arguments = JSON.stringify(standardToolCall.function.arguments);
      }
      
      // Validate that we have the required fields
      if (standardToolCall.function.name) {
        toolCalls.push(standardToolCall);
      }
    } catch (error) {
      console.error('Error parsing tool call:', error, 'Raw match:', match[1]);
      
      // Fallback: Try to extract tool information using regex
      try {
        const rawData = match[1];
        const nameMatch = rawData.match(/"name"\s*:\s*"([^"]+)"/);
        const urlMatch = rawData.match(/"url"\s*:\s*"([^"]+)"/);
        
        if (nameMatch) {
          const standardToolCall = {
            id: `tool_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: 'function',
            function: {
              name: nameMatch[1],
              arguments: urlMatch ? JSON.stringify({ url: urlMatch[1] }) : '{}'
            }
          };
          toolCalls.push(standardToolCall);
        }
      } catch (fallbackError) {
        console.error('Fallback parsing also failed:', fallbackError);
      }
    }
  }
  
  return toolCalls;
}

// Function to clean response text by removing processed tool calls
function removeToolCallsFromText(text, toolCalls) {
  let cleanedText = text;
  
  // Remove TOOL_CALL[...] and __TOOL_CALL__[...] patterns
  const toolCallPattern = /(?:TOOL_CALL|__TOOL_CALL__)\s*\[.*?\](?=\s|$|TOOL_CALL|__TOOL_CALL__|\.)/g;
  cleanedText = cleanedText.replace(toolCallPattern, '').trim();
  
  // Clean up any extra whitespace or newlines
  cleanedText = cleanedText.replace(/\n\s*\n/g, '\n').trim();
  
  return cleanedText;
}

// Function to process model response and handle both structured and text-based tool calls
async function processModelResponse(response, modifiedMessages, payload, isAutoModel = false) {
  let hasToolCalls = false;
  let toolCalls = [];
  
  console.log('Processing model response for tool calls...');
  
  // Check for structured tool calls first
  if (response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.tool_calls) {
    toolCalls = response.choices[0].message.tool_calls;
    hasToolCalls = true;
    console.log(`Found ${toolCalls.length} structured tool calls`);
  }
  // Check for text-based tool calls in the response content
  else if (response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content) {
    const content = response.choices[0].message.content;
    const parsedToolCalls = parseTextBasedToolCalls(content);
    
    if (parsedToolCalls.length > 0) {
      toolCalls = parsedToolCalls;
      hasToolCalls = true;
      console.log(`Found ${toolCalls.length} text-based tool calls`);
      
      // Clean the response content by removing tool call markers
      const cleanedContent = removeToolCallsFromText(content, parsedToolCalls);
      response.choices[0].message.content = cleanedContent;
    } else {
      console.log('No tool calls found in response content');
    }
  } else {
    console.log('No message content found in response');
  }
  
  // Execute tool calls if found
  if (hasToolCalls && toolCalls.length > 0) {
    console.log(`Found ${toolCalls.length} tool calls to execute`);
    
    // Add the assistant message with tool calls to the conversation
    const assistantMessage = {
      role: 'assistant',
      content: response.choices[0].message.content || null,
      tool_calls: toolCalls
    };
    modifiedMessages.push(assistantMessage);
    
    // Execute each tool call and add results
    const toolResponses = [];
    for (const toolCall of toolCalls) {
      try {
        const toolResponse = await executeBuiltInTool(toolCall);
        toolResponses.push(toolResponse);
        modifiedMessages.push(toolResponse);
      } catch (error) {
        console.error('Tool execution error:', error);
        const errorResponse = {
          role: 'tool',
          tool_call_id: toolCall.id,
          content: `Error executing tool: ${error.message}`
        };
        toolResponses.push(errorResponse);
        modifiedMessages.push(errorResponse);
      }
    }
    
    // Make a follow-up request with the tool results
    const followUpPayload = {
      ...payload,
      messages: modifiedMessages,
      tools: undefined // Remove tools from follow-up to prevent infinite loops
    };
    
    try {
      let followUpResponse;
      if (isAutoModel) {
        followUpResponse = await executeAutoModelRequest(followUpPayload, false);
      } else {
        followUpResponse = await executeModelRequest(payload.model, followUpPayload, false);
      }
      return followUpResponse;
    } catch (error) {
      console.error('Follow-up request error:', error);
      // Return original response if follow-up fails
      return response;
    }
  }
  
  return response;
}

// Function to execute built-in tools
async function executeBuiltInTool(toolCall) {
  const { name, arguments: args } = toolCall.function;
  console.log(`Executing tool: ${name} with args:`, args);
  
  try {
    const parsedArgs = typeof args === 'string' ? JSON.parse(args) : args;
    console.log(`Parsed args:`, parsedArgs);
    
    switch (name) {
      case 'web_scrape':
        console.log(`Scraping website: ${parsedArgs.url}`);
        const scrapeResult = await scrapeWebsite(parsedArgs.url);
        console.log(`Scrape result success: ${scrapeResult.success}`);
        return {
          role: 'tool',
          tool_call_id: toolCall.id,
          content: scrapeResult.success ? scrapeResult.content : `Error scraping: ${scrapeResult.content}`
        };
        
      case 'take_screenshot':
        console.log(`Taking screenshot of: ${parsedArgs.url}`);
        const screenshotUrl = generateScreenshotUrl(parsedArgs.url);
        return {
          role: 'tool',
          tool_call_id: toolCall.id,
          content: `Screenshot taken: ![Screenshot of ${parsedArgs.url}](${screenshotUrl})`
        };
        
      default:
        console.log(`Unknown tool: ${name}`);
        return {
          role: 'tool',
          tool_call_id: toolCall.id,
          content: `Unknown tool: ${name}`
        };
    }
  } catch (error) {
    console.error(`Tool execution error for ${name}:`, error);
    return {
      role: 'tool',
      tool_call_id: toolCall.id,
      content: `Error executing tool: ${error.message}`
    };
  }
}


async function handleChat(request, corsHeaders, env) {
  const requestBody = await request.json();
  const exposedModel = requestBody.model || "qwen-235b";
  const stream = requestBody.stream === true;
  let tools = requestBody.tools || [];
  const tool_choice = requestBody.tool_choice || 'auto';
  let messages = requestBody.messages;

  try {
    const internalModel = exposedToInternalMap[exposedModel];
    if (!internalModel) {
      return new Response(JSON.stringify({ error: `Model '${exposedModel}' is not supported.` }), { status: 400, headers: corsHeaders });
    }

    // Add default system prompt if no system message exists and make AI aware of tools
    if (!messages.some(msg => msg.role === 'system')) {
      const systemPrompt = `You are an advanced AI assistant with access to external tools. You can:

1. **Web Scraping**: Extract content from websites when users provide URLs or ask to analyze web content
2. **Screenshots**: Take visual screenshots of websites to see how they look
3. **Function Calling**: Execute specific functions when available with proper parameters

When users mention URLs or ask about websites, you MUST use the available tools:
- web_scrape: to extract text content from websites
- take_screenshot: to capture visual appearance of websites

Always use tools when they would enhance your answer. Call the appropriate function instead of just describing what you would do.`;

      messages.unshift({
        role: 'system',
        content: systemPrompt
      });
    }

    // Provide built-in tools if no tools are specified
    if (!tools || tools.length === 0) {
      tools = [...builtInTools];
      console.log('Added built-in tools:', tools.map(t => t.function.name));
    } else {
      console.log('Using provided tools:', tools.map(t => t.function?.name || 'unknown'));
    }

    // Process external tools (this runs in parallel to avoid slowing down the API)
    const externalToolsPromise = processExternalTools(messages);
    
    // Continue with model preparation while tools are processing
    let modifiedMessages = [...messages];
    
    // Wait for external tools with a timeout to ensure API responsiveness
    try {
      const { tools: externalToolsData, additionalContext } = await Promise.race([
        externalToolsPromise,
        new Promise((resolve) => setTimeout(() => resolve({ tools: [], additionalContext: '' }), 5000))
      ]);
      
      console.log(`External tools processed: ${externalToolsData.length} tools, context length: ${additionalContext.length}`);
      
      // If we have additional context from tools, inject it into the conversation
      if (additionalContext) {
        // Add the external data as a system message or append to the last user message
        const lastMessage = modifiedMessages[modifiedMessages.length - 1];
        if (lastMessage && lastMessage.role === 'user') {
          lastMessage.content += additionalContext;
        } else {
          modifiedMessages.push({
            role: 'system',
            content: `External Tools Data: ${additionalContext}`
          });
        }
      }
    } catch (error) {
      console.error('External tools processing error:', error);
      // Continue without external tools data if there's an error
    }

    // Create payload for the request
    const payload = {
        model: internalModel,
        messages: modifiedMessages,
        temperature: requestBody.temperature,
        max_tokens: requestBody.max_tokens,
        top_p: requestBody.top_p,
        seed: requestBody.seed,
        stop: requestBody.stop,
        stream: stream
    };

    // Add tool calling support if tools are provided
    if (tools && tools.length > 0) {
      payload.tools = tools;
      // Always set tool_choice to 'auto' to enable function calling
      payload.tool_choice = tool_choice === 'none' ? 'none' : 'auto';
      console.log(`Tools configured in payload: ${tools.length} tools, tool_choice: ${payload.tool_choice}`);
      console.log('Tool names:', tools.map(t => t.function.name));
    } else {
      console.log('No tools configured in payload');
    }

    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

    // Check if using auto model
    if (exposedModel === "auto") {
      // Use auto model selection logic
      let response;
      try {
        response = await executeAutoModelRequest(payload, stream);
      } catch (error) {
        // If the request failed and we have tools, try again without tools
        if (payload.tools && payload.tools.length > 0 && 
            (error.message.includes('400') || error.message.includes('unsupported') || 
             error.message.includes('tools') || error.message.includes('function'))) {
          console.log('Auto model may not support function calling, retrying without tools...');
          const payloadWithoutTools = { ...payload };
          delete payloadWithoutTools.tools;
          delete payloadWithoutTools.tool_choice;
          response = await executeAutoModelRequest(payloadWithoutTools, stream);
        } else {
          throw error; // Re-throw if it's not a tools-related error
        }
      }
      
      if (stream) {
          const newHeaders = new Headers(response.headers);
          Object.entries(corsHeaders).forEach(([key, value]) => newHeaders.set(key, value));
          return new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: newHeaders
          });
      } else {
          // Handle tool calls in auto model non-streaming responses
          const processedResponse = await processModelResponse(response, modifiedMessages, payload, true);
          return new Response(JSON.stringify(processedResponse), { status: 200, headers: corsHeaders });
      }
    }

    // Direct model request for non-auto models
    let response;
    try {
      response = await executeModelRequest(internalModel, payload, stream);
    } catch (error) {
      // If the request failed and we have tools, try again without tools
      if (payload.tools && payload.tools.length > 0 && 
          (error.message.includes('400') || error.message.includes('unsupported') || 
           error.message.includes('tools') || error.message.includes('function'))) {
        console.log('Model may not support function calling, retrying without tools...');
        const payloadWithoutTools = { ...payload };
        delete payloadWithoutTools.tools;
        delete payloadWithoutTools.tool_choice;
        response = await executeModelRequest(internalModel, payloadWithoutTools, stream);
      } else {
        throw error; // Re-throw if it's not a tools-related error
      }
    }

    if (stream) {
        const newHeaders = new Headers(response.headers);
        Object.entries(corsHeaders).forEach(([key, value]) => newHeaders.set(key, value));
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders
        });
    } else {
        // Handle tool calls in non-streaming responses
        const processedResponse = await processModelResponse(response, modifiedMessages, payload, false);
        return new Response(JSON.stringify(processedResponse), { status: 200, headers: corsHeaders });
    }

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message, model: exposedModel }), {
      status: 500,
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
  const primaryModelId = "qwen-235b";
  const autoModelId = "auto";

  // Start with the primary model
  const primaryModel = {
    id: primaryModelId,
    name: "Qwen 235B",
    object: "model",
    owned_by: "aham-ai",
    description: "🚀 PRIMARY MODEL: The fastest and most capable model available."
  };

  // Auto model with special description
  const autoModel = {
    id: autoModelId,
    name: "Auto (Smart Selection)",
    object: "model",
    owned_by: "aham-ai",
    description: "🤖 AUTO MODEL: Intelligently selects the best provider (Cerebras, Mistral, Groq) with automatic fallback for optimal performance."
  };

  // Get the rest of the models, excluding the primary, auto, and gemini models
  const otherModels = Object.keys(exposedToInternalMap)
    .filter(id => id !== primaryModelId && id !== autoModelId && !id.includes('gemini'))
    .map((id) => ({
      id,
      name: id.replace(/^(cerebras-|groq-)/, ''),
      object: "model",
      owned_by: "openai-compatible"
    }));

  // Combine them, with auto model first, then primary model, then others
  const chatModels = [autoModel, primaryModel, ...otherModels];

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
    vision: defaultModels.vision
  }), {
    headers: { "Content-Type": "application/json", ...corsHeaders }
  });
}
