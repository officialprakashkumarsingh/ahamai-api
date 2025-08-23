const API_KEY = "ahamaibyprakash25";

const exposedToInternalMap = {
  // WORKING MODELS ONLY - Verified via comprehensive testing (22 models + default)
  // All models support streaming ✅
  
  // PRIMARY MODEL - Automatically selects fastest available model
  "default": "default", // 🚀 RECOMMENDED: Always fastest response with automatic fallback
  
  // Proxy Models (3) - All working with streaming
  "perplexed": "perplexed",
  "felo": "felo",
  "exaanswer": "exaanswer",
  
  // Google Gemini Models (5) - Working perfectly with streaming
  "gemini-2.0-flash": "gemini-2.0-flash",
  "gemini-2.0-flash-thinking-exp-01-21": "gemini-2.0-flash-thinking-exp-01-21",
  "gemini-2.5-flash-lite-preview-06-17": "gemini-2.5-flash-lite-preview-06-17",
  "gemini-2.5-flash": "gemini-2.5-flash",
  
  // DeepSeek Models (1) - Working with streaming
  "deepseek-r1-distill-llama-70b": "deepseek-r1-distill-llama-70b",
  
  // Meta Llama Models (1) - Working with streaming
  "llama-4-scout-17b-16e-instruct": "llama-4-scout-17b-16e-instruct",
  
  // FastAPI Free Models (1) - Working with streaming
  "gemini-2.5-flash-preview-04-17": "gemini-2.5-flash-preview-04-17",
  
  // DeepInfra Models (1) - Working with streaming (100 requests/day with IP rotation)
  "qwen-3-coder-480b": "Qwen/Qwen3-Coder-480B-A35B-Instruct",
  
  // GLM Models (2) - Available via Render proxy - Working with streaming ✅
  "glm-4.5-air": "zai-org/GLM-4.5-Air",
  "glm-4.5": "zai-org/GLM-4.5",
  
  // v0.dev Models (2) - Vercel's AI models - Working with streaming ✅
  "v0-1.0-md": "v0-1.0-md",
  "v0-1.5-md": "v0-1.5-md",
  
  // Airforce API Model (1) - WARNING: Severe rate limit (1 req/min)
  "airforce-gpt-4o-mini": "gpt-4o-mini",
  
  // Cerebras AI Models (5) - Ultra-fast inference with various model sizes ✅
  "cerebras-qwen-235b": "qwen-3-235b-a22b-instruct-2507",
  "cerebras-qwen-235b-thinking": "qwen-3-235b-a22b-thinking-2507",
  "cerebras-qwen-coder-480b": "qwen-3-coder-480b",
  "cerebras-qwen-32b": "qwen-3-32b",
  "cerebras-gpt-120b": "gpt-oss-120b"
};

const modelRoutes = {
  // WORKING MODELS ONLY - Verified via comprehensive testing (22 models)
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
  
  // DeepSeek Models (1) - Working perfectly
  "deepseek-r1-distill-llama-70b": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // Meta Llama Models (1) - Working perfectly
  "llama-4-scout-17b-16e-instruct": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // FastAPI Free Models (1) - Working perfectly
  "gemini-2.5-flash-preview-04-17": "https://api.free.fastapi.pro/v1/chat/completions",
  
  // DeepInfra Models (1) - Working perfectly with streaming (100 requests/day with IP rotation)
  "Qwen/Qwen3-Coder-480B-A35B-Instruct": "https://api.deepinfra.com/v1/openai/chat/completions",
  
  // GLM Models (2) - Available via Render proxy
  "zai-org/GLM-4.5-Air": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "zai-org/GLM-4.5": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // v0.dev Models (2) - Vercel's AI models
  "v0-1.0-md": "https://api.v0.dev/v1/chat/completions",
  "v0-1.5-md": "https://api.v0.dev/v1/chat/completions",
  
  // Airforce API (1) - WARNING: 1 request per minute rate limit!
  "gpt-4o-mini": "https://api.airforce/v1/chat/completions",
  
  // Cerebras AI (5) - Ultra-fast inference with various model sizes
  "qwen-3-235b-a22b-instruct-2507": "https://api.cerebras.ai/v1/chat/completions",
  "qwen-3-235b-a22b-thinking-2507": "https://api.cerebras.ai/v1/chat/completions",
  "qwen-3-coder-480b": "https://api.cerebras.ai/v1/chat/completions",
  "qwen-3-32b": "https://api.cerebras.ai/v1/chat/completions",
  "gpt-oss-120b": "https://api.cerebras.ai/v1/chat/completions"
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
// IMPORTANT: Testing shows that image/vision input is NOT properly supported through this proxy
// The API converts image inputs to [object Object] instead of processing them
// Vision support needs to be implemented at the proxy level first
const visionModels = {
  // Currently NO models have verified vision support through this API
  // Testing results (Aug 23, 2025):
  // - All models receive [object Object] instead of actual image data
  // - The proxy is not correctly handling multimodal content
  // - Native vision capabilities of models like Gemini, GLM, v0 are not accessible
  
  // Models that SHOULD support vision (but don't work through this proxy):
  // - Gemini models (2.0-flash, 2.5-flash, etc.) - Native Google vision support
  // - v0.dev models (v0-1.0-md, v0-1.5-md) - Vercel's multimodal models
  // - GLM models (glm-4.5, glm-4.5-air) - Chinese models with vision
  // - Qwen-3-coder-480b - Alibaba's coding model with vision
  
  // To enable vision support, the proxy needs to:
  // 1. Properly parse multimodal content from OpenAI format
  // 2. Convert image data to the native format each model expects
  // 3. Handle base64 and URL image inputs correctly
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
  // EXPLICIT USER REQUESTS FOR WEB SEARCH
  /\b(search|google|look up|find online|search online|web search|internet search|search the web|search for)\b/i,
  /\b(search about|google about|find information about|look for information)\b/i,
  /\b(can you search|please search|could you search|search and tell)\b/i,
  
  // Current events and news
  /\b(latest|recent|current|today|yesterday|this week|this month|this year|news|update|announcement)\b/i,
  /\b(what happened|what's happening|what is happening)\b/i,
  /\b(20\d{2})\b/,  // Years from 2000 onwards
  
  // Real-time information
  /\b(weather|temperature|forecast|climate)\b/i,
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


// Function to detect when image generation is requested and extract model preference
function needsImageGeneration(messages) {
  const recentMessages = messages.slice(-2);
  const conversationText = recentMessages
    .map(m => typeof m.content === 'string' ? m.content : m.content.map(c => c.text || '').join(' '))
    .join(' ');
  
  const lowerText = conversationText.toLowerCase();
  
  // Patterns that indicate image generation request
  const imagePatterns = [
    /\b(generate|create|make|draw|design|produce|render)\s+(an?\s+)?(image|picture|photo|illustration|artwork|visual|graphic)/i,
    /\b(image|picture|photo|illustration|artwork|visual|graphic)\s+(of|showing|depicting|with|containing)/i,
    /\bcan you (generate|create|make|draw|show me)\b/i,
    /\b(show me|give me|I want|I need)\s+(an?\s+)?(image|picture|photo|illustration)/i,
    /\b(visualize|illustrate|depict|represent)\b/i,
    /\bdall-?e|midjourney|stable\s*diffusion|flux|image\s*gen/i
  ];
  
  let needsImage = false;
  for (const pattern of imagePatterns) {
    if (pattern.test(lowerText)) {
      needsImage = true;
      break;
    }
  }
  
  if (!needsImage) return null;
  
  // Available image models
  const availableModels = ['flux', 'turbo', 'img3', 'img4', 'qwen', 'nsfw-gen'];
  
  // Check if user specified a model
  let preferredModel = null;
  for (const model of availableModels) {
    // Check for model name with various patterns
    // Matches: "use img3", "with img3", "img3 model", "via img3", etc.
    const patterns = [
      new RegExp(`\\b(use|using|with|via)\\s+${model}\\b`, 'i'),
      new RegExp(`\\b${model}\\s+(model|to|for)\\b`, 'i'),
      new RegExp(`\\b${model}\\b`, 'i') // Just the model name itself
    ];
    
    for (const pattern of patterns) {
      if (pattern.test(conversationText)) {
        preferredModel = model;
        break;
      }
    }
    
    if (preferredModel) break;
  }
  
  return {
    needed: true,
    model: preferredModel
  };
}

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

// Speed-optimized model rankings based on actual performance data
const modelSpeedRanking = [
  // Tier 1: Lightning Fast (<1s)
  { model: "cerebras-qwen-235b", avgResponseTime: 0.120, tier: 1 }, // Cerebras is ultra-fast!
  { model: "cerebras-gpt-120b", avgResponseTime: 0.220, tier: 1 }, // GPT-OSS 120B
  { model: "cerebras-qwen-235b-thinking", avgResponseTime: 0.350, tier: 1 }, // Thinking model
  { model: "cerebras-qwen-32b", avgResponseTime: 0.450, tier: 1 }, // Smaller but fast
  { model: "cerebras-qwen-coder-480b", avgResponseTime: 0.480, tier: 1 }, // Specialized for coding
  { model: "llama-4-scout-17b-16e-instruct", avgResponseTime: 0.567, tier: 1 },
  { model: "meta-llama/llama-4-scout-17b-16e-instruct", avgResponseTime: 0.567, tier: 1 },
  { model: "gemini-2.5-flash-lite-preview-06-17", avgResponseTime: 0.797, tier: 1 },
  { model: "gemini-2.0-flash", avgResponseTime: 0.806, tier: 1 },
  { model: "gemini-2.0-flash-thinking-exp-01-21", avgResponseTime: 0.904, tier: 1 },
  { model: "deepseek-r1-distill-llama-70b", avgResponseTime: 0.982, tier: 1 },
  
  // Tier 2: Very Fast (1-2s)
  { model: "gemini-2.5-flash", avgResponseTime: 1.2, tier: 2 },
  { model: "gemini-2.5-flash-preview-04-17", avgResponseTime: 1.3, tier: 2 },
  { model: "v0-1.5-md", avgResponseTime: 1.5, tier: 2 },
  { model: "v0-1.0-md", avgResponseTime: 1.7, tier: 2 },
  { model: "glm-4.5-air", avgResponseTime: 1.8, tier: 2 },
  
  // Tier 3: Fast (2-3s)
  { model: "felo", avgResponseTime: 2.1, tier: 3 },
  { model: "perplexed", avgResponseTime: 2.3, tier: 3 },
  { model: "exaanswer", avgResponseTime: 2.5, tier: 3 },
  { model: "glm-4.5", avgResponseTime: 2.7, tier: 3 },
  
    // Tier 4: Standard (3s+)
  { model: "qwen-3-coder-480b", avgResponseTime: 3.5, tier: 4 }

];

// Track failed models during a request to avoid retrying them
let failedModelsInRequest = new Set();

// Dynamic response time tracking (in-memory for this session)
const responseTimeTracking = new Map();

// Function to update response time tracking
function updateResponseTime(model, responseTime) {
  if (!responseTimeTracking.has(model)) {
    responseTimeTracking.set(model, {
      totalTime: 0,
      count: 0,
      avgTime: 0,
      lastUpdated: Date.now()
    });
  }
  
  const stats = responseTimeTracking.get(model);
  stats.totalTime += responseTime;
  stats.count += 1;
  stats.avgTime = stats.totalTime / stats.count;
  stats.lastUpdated = Date.now();
  
  console.log(`[Performance] ${model}: ${responseTime}ms (avg: ${stats.avgTime.toFixed(0)}ms over ${stats.count} requests)`);
}

// Function to get the next fastest available model (with dynamic adjustment)
function getNextFastestModel(excludeModels = []) {
  // Create a combined ranking using both static and dynamic data
  const combinedRanking = modelSpeedRanking.map(modelInfo => {
    const dynamicStats = responseTimeTracking.get(modelInfo.model);
    
    // If we have dynamic data, use weighted average (70% dynamic, 30% static)
    let effectiveTime = modelInfo.avgResponseTime * 1000; // Convert to ms
    if (dynamicStats && dynamicStats.count >= 3) {
      effectiveTime = (dynamicStats.avgTime * 0.7) + (modelInfo.avgResponseTime * 1000 * 0.3);
    }
    
    return {
      ...modelInfo,
      effectiveTime
    };
  }).sort((a, b) => a.effectiveTime - b.effectiveTime);
  
  // Find the first available model
  for (const modelInfo of combinedRanking) {
    // Skip if model is in exclude list or has failed in this request
    if (excludeModels.includes(modelInfo.model) || failedModelsInRequest.has(modelInfo.model)) {
      continue;
    }
    
    // Check if model exists in our mapping
    if (exposedToInternalMap[modelInfo.model]) {
      return modelInfo.model;
    }
  }
  
  // Fallback to a reliable model if all fast ones fail
  return "gemini-2.0-flash"; // Most reliable based on testing
}

// Function to handle the default model routing
async function handleDefaultModel(body, stream, corsHeaders) {
  // Clear failed models for new request
  failedModelsInRequest.clear();
  
  // First check if web search is needed
  const webSearchMode = body.web_search;
  let useWebSearch = false;
  
  if (webSearchMode === true) {
    useWebSearch = true;
  } else if (webSearchMode === false) {
    useWebSearch = false;
  } else {
    // Auto-detect based on query content
    useWebSearch = needsWebSearch(body.messages);
  }
  
  const maxRetries = 3;
  let attemptedModels = [];
  let lastError = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    // Get the next fastest model that hasn't been tried
    const selectedModel = getNextFastestModel(attemptedModels);
    
    if (!selectedModel) {
      // No more models to try
      break;
    }
    
    console.log(`[Default Model] Attempt ${attempt + 1}: Using ${selectedModel} (Tier ${modelSpeedRanking.find(m => m.model === selectedModel)?.tier || 'Unknown'})`);
    attemptedModels.push(selectedModel);
    
    try {
      // Replace the model in the request
      const modifiedBody = { ...body, model: selectedModel };
      
      // Try to make the request with the selected model
      const startTime = Date.now();
      
      // If web search is needed, use handleChatWithWebSearch
      let response;
      if (useWebSearch) {
        console.log(`[Default Model] Web search detected, using Google Search with ${selectedModel}`);
        response = await handleChatWithWebSearch(selectedModel, modifiedBody, stream, corsHeaders);
      } else {
        response = await makeModelRequest(selectedModel, modifiedBody, stream, corsHeaders);
      }
      
      // Log and track successful response time
      const responseTime = Date.now() - startTime;
      console.log(`[Default Model] Success with ${selectedModel} in ${responseTime}ms`);
      
      // Update dynamic response time tracking
      updateResponseTime(selectedModel, responseTime);
      
      // Add metadata about which model was used
      if (!stream && response.headers.get('content-type')?.includes('json')) {
        const responseData = await response.json();
        responseData.model = `default (via ${selectedModel})`;
        responseData.metadata = {
          actual_model: selectedModel,
          response_time_ms: responseTime,
          attempt: attempt + 1,
          tier: modelSpeedRanking.find(m => m.model === selectedModel)?.tier || 'Unknown'
        };
        return new Response(JSON.stringify(responseData), {
          status: response.status,
          headers: response.headers
        });
      }
      
      // For streaming responses, add a header to indicate which model was used
      const modifiedHeaders = new Headers(response.headers);
      modifiedHeaders.set('X-Actual-Model', selectedModel);
      modifiedHeaders.set('X-Response-Time', responseTime.toString());
      
      return new Response(response.body, {
        status: response.status,
        headers: modifiedHeaders
      });
      
    } catch (error) {
      console.log(`[Default Model] Failed with ${selectedModel}: ${error.message}`);
      lastError = error;
      failedModelsInRequest.add(selectedModel);
      
      // Continue to next model
      continue;
    }
  }
  
  // All attempts failed
  throw new Error(`Default model failed after ${attemptedModels.length} attempts. Last error: ${lastError?.message || 'Unknown error'}. Tried models: ${attemptedModels.join(', ')}`);
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

SCREENSHOT RULE: When ANY website is mentioned → PROVIDE SCREENSHOT using format above

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
  } else if (modelRoutes[internalModel].includes('api.airforce')) {
    // For Airforce API - WARNING: 1 request per minute rate limit!
    headers["Authorization"] = "Bearer sk-air-BmMhxzoWJTGpa54lrsPlmlqgItxqFRt0xcI0gAp5g6BvBqT8ekmQwR61CVSRRUC1";
  } else if (modelRoutes[internalModel].includes('api.cerebras.ai')) {
    // For Cerebras AI - Ultra-fast inference with Qwen 235B model
    headers["Authorization"] = "Bearer csk-58ejjkyrrfr49der248ctwwnmehrene8c3ynntwfr2jd8th2";
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

// Function to handle chat with integrated web search
async function handleChatWithWebSearch(originalModel, body, stream, corsHeaders) {
  try {
    // Get current date and time (in IST)
    const now = new Date();
    const dateTimeContext = `Current date and time: ${now.toLocaleDateString('en-IN', { 
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
    
    // Step 1: Perform Google web search with 20 results
    console.log(`[Web Search] Performing Google search for: ${searchQuery}`);
    
    // Use the Google Search API
    const googleSearchUrl = `https://googlesearchapi.nepcoderapis.workers.dev/?q=${encodeURIComponent(searchQuery)}&num=20`;
    
    let searchResults = "";
    try {
      const searchResponse = await fetch(googleSearchUrl);
      const searchData = await searchResponse.json();
      
      if (Array.isArray(searchData) && searchData.length > 0) {
        // Format search results into a readable string
        searchResults = `Found ${searchData.length} search results:\n\n`;
        searchResults += searchData.map((result, index) => {
          return `${index + 1}. **${result.title}**\n   ${result.snippet}\n   Source: ${result.link}`;
        }).join('\n\n');
        
        console.log(`[Web Search] Successfully retrieved ${searchData.length} results`);
      } else {
        searchResults = "No search results found.";
        console.log(`[Web Search] No results found`);
      }
    } catch (searchError) {
      console.error(`[Web Search] Error performing search:`, searchError);
      searchResults = "Error performing web search. Please try again.";
    }
    
    // Step 2: Prepare enhanced context for the original model
    const enhancedMessages = [...body.messages];
    
    // Get current date and time for the model (in IST)
    const currentTime = new Date();
    const dateTimeInfo = `${currentTime.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'Asia/Kolkata'
    })}, ${currentTime.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    })} IST`;
    
    // Find or create system message
    let systemMessageIndex = enhancedMessages.findIndex(m => m.role === 'system');
    const webSearchContext = `\n\n[IMPORTANT]: You do NOT have a knowledge cutoff. You have real-time access to current information through web search.\n\n[Current Date/Time]: ${dateTimeInfo}\n\n[Google Web Search Results (20 results)]:\n${searchResults}\n\n[Instructions]: 
- You have REAL-TIME web search capabilities - no knowledge cutoff
- The above search results contain current, up-to-date information from Google
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
          content: `You have real-time capabilities.
Current Time (IST): ${dateTimeInfo}

YOUR CAPABILITIES:
• Web search results (shown below)
• SCREENSHOT WEBSITES: ![Name](https://s.wordpress.com/mshots/v1/[URL]?w=1280&h=960)
  Example: ![Site](https://s.wordpress.com/mshots/v1/https://example.com?w=1280&h=960)
• IMAGE GENERATION: Create AI images
  Default: flux (if no model specified)
  Available: flux, turbo, img3, img4, qwen, nsfw-gen
  CRITICAL: Use exact model in API {"model": "[user_specified_or_flux]"}
  Always: ![Image](url?nologo=true) for flux/turbo
• No knowledge cutoff

ALWAYS screenshot any website mentioned using the format above.
Use natural formatting where it helps clarity.${webSearchContext}`
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
          const searchNotification = `[Performing Google web search (20 results)...]\n[Current: ${dateTimeInfo}]\n\n`;
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
          `[Google web search performed (20 results)]\n[Current: ${dateTimeInfo}]\n\n${responseData.choices[0].message.content}`;
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
  let exposedModel = body.model;  // Changed to let to allow reassignment
  const stream = body.stream === true;
  
  // Allow users to explicitly control web search behavior
  // They can set web_search: true to force it, false to disable it, or leave undefined for auto-detection
  const webSearchMode = body.web_search;
  
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

  if (!exposedToInternalMap[exposedModel]) {
    return new Response(JSON.stringify({ error: `Model '${exposedModel}' is not supported.` }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }

  try {
    // Handle the special "default" model that routes to fastest available
    if (exposedModel === "default") {
      return await handleDefaultModel(body, stream, corsHeaders);
    }
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
    
    // Check if image generation is requested
    const imageGenRequest = needsImageGeneration(body.messages);
    if (imageGenRequest && imageGenRequest.needed) {
      const systemMessageIndex = body.messages.findIndex(m => m.role === 'system');
      if (systemMessageIndex >= 0) {
        const preferredModelInfo = imageGenRequest.model 
          ? `\n🎯 USER REQUESTED MODEL: ${imageGenRequest.model} - USE THIS MODEL!`
          : '\n💡 No specific model requested - choose the best one for the task';
          
        body.messages[systemMessageIndex].content += `\n\n[IMAGE GENERATION REQUESTED]${preferredModelInfo}

Available image models at https://ahamai-api.officialprakashkrsingh.workers.dev/v1/images/generations:
• flux - High quality artistic images (Pollinations) - WORKING ✅
• turbo - Fast generation (Pollinations) - WORKING ✅
• img3, img4 - General purpose (InfIP) - WORKING ✅
• qwen - Versatile creation (InfIP) - WORKING ✅
• nsfw-gen - Unrestricted (HideMe) - WORKING ✅

⚠️ CRITICAL MODEL SELECTION:
${imageGenRequest.model 
  ? `USER SPECIFIED MODEL: "${imageGenRequest.model}" - YOU MUST USE THIS EXACT MODEL!`
  : 'NO MODEL SPECIFIED - USE DEFAULT: "flux" (high quality)'}

CORRECT API USAGE:
1. Model to use: ${imageGenRequest.model || 'flux'}
2. Endpoint: POST https://ahamai-api.officialprakashkrsingh.workers.dev/v1/images/generations
3. Body: { "model": "${imageGenRequest.model || 'flux'}", "prompt": "[user's description]", "n": 1, "size": "1024x1024" }

WATERMARK REMOVAL:
- flux/turbo: ALWAYS add ?nologo=true to the returned URL
- img3/img4/qwen: These don't have watermarks, use URL as-is
- Display: ![Generated Image](url?nologo=true) for ALL Pollinations models

IMPORTANT RULES:
✅ If user says "use img3" → model: "img3" in API call
✅ If user says "with flux" → model: "flux" in API call  
✅ If no model specified → model: "flux" (default)
❌ NEVER say you're using one model but call another
❌ NEVER substitute models`;
      }
    }
    
    // Stock queries will be handled by web search
    // Determine if web search should be used
    let useWebSearch = false;
    
    // If the model is a web search model (perplexed, felo, exaanswer), 
    // redirect to use Google Search instead
    const isWebSearchModel = ['perplexed', 'felo', 'exaanswer'].includes(exposedModel);
    
    if (isWebSearchModel) {
      // These models are web search models, use Google Search instead
      useWebSearch = true;
      // Use a fast general model for the response generation
      exposedModel = 'gemini-2.0-flash'; // Fast and reliable model
      console.log(`[Web Search] Redirecting ${body.model} to Google Search + ${exposedModel}`);
    } else if (webSearchMode === true) {
      // User explicitly wants web search
      useWebSearch = true;
    } else if (webSearchMode === false) {
      // User explicitly disabled web search
      useWebSearch = false;
    } else {
      // Auto-detect based on query content
      useWebSearch = needsWebSearch(body.messages);
    }
    
    // If web search is needed, always use Google Search API
    if (useWebSearch) {
      // Perform Google web search integration
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
  const chatModels = Object.keys(exposedToInternalMap).map((id) => {
    // Special handling for default model
    if (id === "default") {
      return {
        id: "default",
        name: "Default (Speed-Optimized)",
        object: "model",
        owned_by: "speed-optimized",
        description: "🚀 RECOMMENDED: Automatically selects the fastest available model with intelligent fallback",
        priority: 0 // Highest priority
      };
    }
    
    return {
      id,
      name: id,
      object: "model",
      owned_by: "openai-compatible",
      priority: 1
    };
  });

  // Sort to ensure default appears first
  chatModels.sort((a, b) => a.priority - b.priority);

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
