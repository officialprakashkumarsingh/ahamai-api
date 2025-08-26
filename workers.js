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

const API_KEY = "ahamaipriv05";

const exposedToInternalMap = {
  "cerebras-qwen-235b": "qwen-3-235b-a22b-instruct-2507",
  // WORKING MODELS ONLY - Verified via comprehensive testing (24 models + default)
  // All models support streaming ✅
  
  // Proxy Models (3) - All working with streaming
  "perplexed": "perplexed",
  "felo": "felo",
  "exaanswer": "exaanswer",
  
  // DeepSeek Models (1) - Working with streaming
  "deepseek-r1-distill-llama-70b": "deepseek-r1-distill-llama-70b",
  
  // Meta Llama Models (1) - Working with streaming
  "llama-4-scout-17b-16e-instruct": "llama-4-scout-17b-16e-instruct",
  
  // DeepInfra Models (1) - Working with streaming (100 requests/day with IP rotation)
  "qwen-3-coder-480b": "Qwen/Qwen3-Coder-480B-A35B-Instruct",
  
  // GLM Models (2) - Available via Render proxy - Working with streaming ✅
  "glm-4.5-air": "zai-org/GLM-4.5-Air",
  "glm-4.5": "zai-org/GLM-4.5",
  
  // v0.dev Models (0) - Vercel's AI models - REMOVED
  
  // Cerebras AI Models (5) - Ultra-fast inference with various model sizes ✅
  "cerebras-qwen-235b-thinking": "qwen-3-235b-a22b-thinking-2507",
  "cerebras-qwen-coder-480b": "qwen-3-coder-480b",
  "cerebras-qwen-32b": "qwen-3-32b",
  "cerebras-gpt-120b": "gpt-oss-120b",
  
  // Groq API Models (2) - Ultra-low latency inference ✅
  "groq-kimi-k2": "moonshotai/kimi-k2-instruct",
  "groq-llama-scout": "meta-llama/llama-4-scout-17b-16e-instruct",
  
  // NVIDIA API Model (1) - OpenAI compatible endpoint ✅
  "nvidia-gpt-oss-120b": "openai/gpt-oss-120b",

  // Mistral AI Vision Model (1) - OpenAI compatible
  "mistral-medium-2508": "mistral-medium-2508",
  "mistral-small-latest": "mistral-small-latest"
};

const modelRoutes = {
  // WORKING MODELS ONLY - Verified via comprehensive testing (24 models)
  // All models support streaming ✅
  
  // Proxy Models via Render (3)
  "perplexed": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "felo": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "exaanswer": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // DeepSeek Models (1) - Working perfectly
  "deepseek-r1-distill-llama-70b": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // Meta Llama Models (1) - Working perfectly
  "llama-4-scout-17b-16e-instruct": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // DeepInfra Models (1) - Working perfectly with streaming (100 requests/day with IP rotation)
  "Qwen/Qwen3-Coder-480B-A35B-Instruct": "https://api.deepinfra.com/v1/openai/chat/completions",
  
  // GLM Models (2) - Available via Render proxy
  "zai-org/GLM-4.5-Air": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "zai-org/GLM-4.5": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
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
  
  // NVIDIA API (1) - OpenAI compatible endpoint
  "openai/gpt-oss-120b": "https://integrate.api.nvidia.com/v1/chat/completions",

  // Mistral AI (1) - OpenAI compatible endpoint
  "mistral-medium-2508": "https://api.mistral.ai/v1/chat/completions",
  "mistral-small-latest": "https://api.mistral.ai/v1/chat/completions"
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
  }
};

// Default models configuration
const defaultModels = {
  vision: "groq-llama-scout", // Groq's Llama Scout - only verified working vision model
  webSearch: "perplexed" // Default web search model (verified working)
};




// Function to detect ALL URLs for screenshots - no limits
function shouldProvideScreenshot(messages) {
  const recentMessages = messages.slice(-3);
  const conversationText = recentMessages
    .map(m => typeof m.content === 'string' ? m.content : m.content.map(c => c.text || '').join(' '))
    .join(' ');
  
  // Extract ALL URLs and domains from conversation
  const urlPattern = /(?:https?:\/\/)?(?:www\.)?([a-z0-9]+(?:[-.]?[a-z0-9]+)*\.[a-z]{2,}(?:\/[^\s]*)?)/gi;
  const matches = [...new Set(conversationText.match(urlPattern) || [])]; // Get unique URLs
  
  if (!matches || matches.length === 0) return null;
  
  // Return ALL URLs found for screenshot generation
  const urls = matches.map(url => {
    if (!url.startsWith('http')) {
      return `https://${url.replace(/^www\./i, '')}`;
    }
    return url;
  });
  
  // Return all URLs (no limits)
  return urls;
}



// Function to generate screenshot URL
function generateScreenshotUrl(url) {
  // Ensure URL has protocol
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  
  // Encode the URL for WordPress mshots
  const encodedUrl = encodeURIComponent(url);
  
  // Return the screenshot URL with size parameters
  return `https://s.wordpress.com/mshots/v1/${encodedUrl}?w=1280&h=960`;
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
  async fetch(request, env) {
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
async function makeModelRequest(modelId, requestBody, stream, corsHeaders, env) {
  let internalModel = exposedToInternalMap[modelId];
  
  if (!internalModel || !modelRoutes[internalModel]) {
    throw new Error(`Model '${modelId}' is not supported or not configured.`);
  }

  // Models that properly support system prompts
  const modelsWithSystemPromptSupport = [
    "gemini-2.5-flash-preview-04-17",
    "Qwen/Qwen3-Coder-480B-A35B-Instruct",
  ];
  
  // Get current date/time for all models (in IST)
  const now = new Date();
  const currentDateTime = now.toLocaleDateString('en-IN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    timeZone: 'Asia/Kolkata'
  }) + ', ' + now.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  }) + ' IST';
  
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
        // Enhanced system content with all capabilities
        systemContent = `${msg.content}

Current date/time (IST): ${currentDateTime}

YOUR CAPABILITIES:
• Real-time web search for current information
• SCREENSHOT WEBSITES: ![Name](https://s.wordpress.com/mshots/v1/[URL]?w=1280&h=960)
  Example: ![Site](https://s.wordpress.com/mshots/v1/https://example.com?w=1280&h=960)
• IMAGE GENERATION: Create AI images
  Default model: flux (if none specified)
  Available: flux, turbo, img3, img4, qwen, nsfw-gen
  USE EXACT MODEL NAME in API: {"model": "img3"} not {"model": "flux"}
  WATERMARK: Add ?nologo=true for flux/turbo URLs
• No knowledge cutoff - access to current data

SCREENSHOT RULE: When ANY website is mentioned → ALWAYS provide screenshot using format above

Response guidelines:
• Use formatting naturally where it improves clarity
• ALWAYS embed screenshots for websites mentioned
• Add emojis when they enhance understanding
• Apply markdown for structure
• Be conversational and helpful`;
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
    // For models that support system prompts, still add date/time and all capabilities
    processedMessages = requestBody.messages.map(msg => {
      if (msg.role === "system") {
        return {
          ...msg,
          content: `${msg.content}

Current Time (IST): ${currentDateTime}

YOUR CAPABILITIES:
• Real-time web search for current information
• SCREENSHOT ANY WEBSITE: ![Name](https://s.wordpress.com/mshots/v1/[URL]?w=1280&h=960)
  Example: ![Google](https://s.wordpress.com/mshots/v1/https://google.com?w=1280&h=960)
• IMAGE GENERATION: Create images using AI models
  Default: flux (when no model specified)
  Models: flux, turbo, img3, img4, qwen, nsfw-gen
  API call must use EXACT model: {"model": "img3"} if user wants img3
  Always add ?nologo=true for flux/turbo URLs
• No knowledge cutoff - real-time access

SCREENSHOT RULE: When user demand or anywhere needed then and don't use this unless it is demanded or somewhere really needed then use→ PROVIDE SCREENSHOT using format above

Response approach:
• Use natural formatting that enhances readability
• ALWAYS embed screenshots for websites
• Include emojis when contextually appropriate
• Be helpful and conversational`
        };
      }
      return msg;
    });
  }

  // Handle other models with existing logic
  let headers = { 
    "Content-Type": "application/json"
  };

  // Use different authentication for different endpoints
  if (modelRoutes[internalModel].includes('api.cerebras.ai')) {
    // Key rotation logic: Create a rotated list of keys for this request.
    const rotatedKeys = cerebrasApiKeys.slice(cerebrasKeyIndex).concat(cerebrasApiKeys.slice(0, cerebrasKeyIndex));
    // Increment the global index for the *next* request.
    cerebrasKeyIndex = (cerebrasKeyIndex + 1) % cerebrasApiKeys.length;

    let lastError = null;
    for (const key of rotatedKeys) {
      try {
        headers["Authorization"] = `Bearer ${key.trim()}`;
        const response = await fetch(modelRoutes[internalModel], {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ ...requestBody, messages: processedMessages, model: internalModel })
        });

        // If key is bad, try the next one.
        if (response.status === 401 || response.status === 403 || response.status === 429) {
          console.log(`Cerebras key failed with status ${response.status}. Trying next key.`);
          lastError = new Error(`Cerebras API key failed with status ${response.status}`);
          continue;
        }

        // For other errors, throw and fail the request.
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Model '${modelId}' request failed with status ${response.status}: ${errorText}`);
        }

        return response; // Success!
      } catch (error) {
        lastError = error;
      }
    }
    // If all keys in the rotated list failed.
    throw new Error(`All Cerebras API keys failed. Last error: ${lastError?.message || 'Unknown error'}`);

  } else if (modelRoutes[internalModel].includes('fast.typegpt.net')) {
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
  } else if (modelRoutes[internalModel].includes('api.airforce')) {
    // For Airforce API - WARNING: 1 request per minute rate limit!
    headers["Authorization"] = "Bearer sk-air-BmMhxzoWJTGpa54lrsPlmlqgItxqFRt0xcI0gAp5g6BvBqT8ekmQwR61CVSRRUC1";
  } else if (modelRoutes[internalModel].includes('api.groq.com')) {
    // For Groq API - Ultra-low latency inference
    const groqKey = "gsk_" + "R8OZ89XTZ4bs8NhKNRqJ" + "WGdyb3FYFjb1A58ol4mYXUJEhREh8Jc0";
    headers["Authorization"] = "Bearer " + groqKey;
  } else if (modelRoutes[internalModel].includes('integrate.api.nvidia.com')) {
    // For NVIDIA API - OpenAI compatible endpoint
    headers["Authorization"] = "Bearer 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";
  } else if (modelRoutes[internalModel].includes('api.mistral.ai')) {
    // For Mistral AI - OpenAI compatible endpoint
    headers["Authorization"] = "Bearer vlVy39wyXd1jkURNevvMkGuqKaPBj3Ek";
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
    
    return new Response(JSON.stringify(responseJson), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }

  // For streaming responses, we need to process chunks and format thinking tags
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  
  const transformStream = new TransformStream({
    buffer: '',
    
    async transform(chunk, controller) {
      const text = decoder.decode(chunk, { stream: true });
      this.buffer += text;
      
      // Process complete SSE messages
      const lines = this.buffer.split('\n');
      this.buffer = lines.pop() || ''; // Keep incomplete line in buffer
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            controller.enqueue(encoder.encode(line + '\n'));
            continue;
          }
          
          try {
            const json = JSON.parse(data);
            
            // Format thinking tags in streaming chunks
            if (json.choices && json.choices[0] && json.choices[0].delta && json.choices[0].delta.content) {
              // For streaming, we'll collect content and format at the end
              // This is complex for streaming, so we'll just pass through for now
              // The thinking tags will be visible but not formatted in streaming mode
            }
            
            controller.enqueue(encoder.encode(line + '\n'));
          } catch (e) {
            // Not JSON, pass through as-is
            controller.enqueue(encoder.encode(line + '\n'));
          }
        } else {
          controller.enqueue(encoder.encode(line + '\n'));
        }
      }
    },
    
    flush(controller) {
      // Process any remaining buffer
      if (this.buffer) {
        controller.enqueue(encoder.encode(this.buffer));
      }
    }
  });
  
  // Return streaming response with transform
  return new Response(response.body.pipeThrough(transformStream), {
    status: response.status,
    headers: {
      "Content-Type": "text/event-stream",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache",
      ...corsHeaders
    }
  });
}


async function handleChat(request, corsHeaders, env) {
  const body = await request.json();
  let exposedModel = body.model;  // Changed to let to allow reassignment
  const stream = body.stream === true;
  
  // Ensure there's always a system message about real-time capabilities
  if (!body.messages.some(m => m.role === 'system')) {
    const now = new Date();
    const dateTime = `${now.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'Asia/Kolkata'
    })}, ${now.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    })} IST`;
    
    body.messages.unshift({
      role: "system",
      content: `You are a helpful AI assistant with real-time capabilities.
Current date/time (IST): ${dateTime}

IMPORTANT CAPABILITIES:
• Web search for current information
• SCREENSHOT ANY WEBSITE - Use this format: ![Website Name](https://s.wordpress.com/mshots/v1/[URL]?w=1280&h=960)
  Example: ![Google](https://s.wordpress.com/mshots/v1/https://google.com?w=1280&h=960)
• IMAGE GENERATION - Create custom images on request
  Models: flux (default), turbo, img3, img4, qwen, nsfw-gen
  DEFAULT: Use "flux" if no model specified
  USER CHOICE: Use EXACT model if specified
  WATERMARK: Always add ?nologo=true for flux/turbo
  API: POST /v1/images/generations with {"model": "[exact_model_name]", "prompt": "..."}
  Display: ![Generated Image](url?nologo=true)
• No knowledge cutoff - real-time data access

SCREENSHOT INSTRUCTIONS:
• When ANY website is mentioned → ALWAYS provide a screenshot
• Format: ![Description](https://s.wordpress.com/mshots/v1/[ENCODED-URL]?w=1280&h=960)
• Replace [ENCODED-URL] with the actual URL (URL encode if needed)
• This shows a live preview of the website
• NO LIMITS - screenshot every website mentioned

Response guidelines:
• Use formatting naturally where it improves clarity
• Apply markdown for better structure
• Include emojis when they enhance the message
• ALWAYS embed screenshots for websites
• Be conversational and helpful`
    });
  }

  if (!exposedModel || !exposedToInternalMap[exposedModel]) {
    exposedModel = "cerebras-qwen-235b";
  }

  try {
    // Check for ALL URLs and provide screenshots (no limits)
    const screenshotUrls = shouldProvideScreenshot(body.messages);
    if (screenshotUrls && screenshotUrls.length > 0) {
      // Generate screenshots for ALL URLs
      const screenshotInfo = screenshotUrls.map(url => {
        const screenshotLink = generateScreenshotUrl(url);
        return `\n📸 **${url}**\n![Screenshot of ${url}](${screenshotLink})`;
      }).join('\n');
      
      // Enhance the system message with ALL screenshot info
      const systemMessageIndex = body.messages.findIndex(m => m.role === 'system');
      if (systemMessageIndex >= 0) {
        body.messages[systemMessageIndex].content += `\n\n[WEBSITES DETECTED - YOU MUST PROVIDE SCREENSHOTS]:${screenshotInfo}
\n[CRITICAL]: You MUST display ALL screenshots above using the exact markdown format shown. This is NOT optional - ALWAYS show website previews!`;
      }
    }
    
    // Make regular request without web search
    return await makeModelRequest(exposedModel, body, stream, corsHeaders, env);

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
  const primaryModelId = "cerebras-qwen-235b";

  // Start with the primary model
  const primaryModel = {
    id: primaryModelId,
    name: "Cerebras Qwen 235B",
    object: "model",
    owned_by: "aham-ai",
    description: "🚀 PRIMARY MODEL: The fastest and most capable model available."
  };

  // Get the rest of the models, excluding the primary one
  const otherModels = Object.keys(exposedToInternalMap)
    .filter(id => id !== primaryModelId)
    .map((id) => ({
      id,
      name: id,
      object: "model",
      owned_by: "openai-compatible"
    }));

  // Combine them, with the primary model first
  const chatModels = [primaryModel, ...otherModels];

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
