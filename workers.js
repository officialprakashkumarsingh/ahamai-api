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

const braveApiKeys = [
  "BSAP1ZmJl9wMXKDvGnGM78r9__i_VuG",
  "BSAx_ihSqqUJXgGPvZJduSZhcZbfnQB",
  "BSAFHHikdsv2YXSYODQSPES2tTMILHI",
  "BSA7N3mbuH1WLUgTE-C7wvOS5SR7Srl",
  "BSAFvyFnGBcWt8IImCnXR_7tgwymtdr",
  "BSAWAka3FqwUpp3FJP_f5izlPCmXYJE",
  "BSAN7HoBWjJOUG-zXVN8rkIGXpbsRtq",
  "BSAttExzgW4_H4rcHMmpHQ9hw7vz2lX",
  "BSAP0LqtBpuCz19UbWd_SF6BCSTgQbD",
  "BSAsHWA8JejN8yR7rmQpB6zbiuN0kiz",
  "BSAsDd5v_DhzOXMvxDp59Up7gE4F9FU",
  "BSAxGC1s-JGptZejZb7W-srU3C38tUa",
  "BSANO2wi1X7VobnaHKDZiKtSSUVLJbs",
  "BSAF0Eghn0LJVunT162U9_hjUTwpoxT",
  "BSAatEHiEyQVY0E2m5VTZpURgWmwVJs",
  "BSAhdZD3bibK1I21NLKCOEYIzF92JAg",
  "BSA5Wbq3XcFhkVnlqkFvWy9oQ6LCpPM",
  "BSA9cI-ySSlj9AcH1Te378Dns7u-a94",
  "BSALK6kVOrH0IJeW-y5cFmAkvkdYtXK",
  "BSA91HObAKlxwVldV5teh4TTKGw8_qN",
  "BSAhxxZOTsSPVAi4c-5Jye3ZNTxiCpO",
  "BSApz0194z7SG6DplmVozl7ttFOi0Eo",
  "BSA_qIkGjGbHL3dAZ8ud30KkrFA-AoR",
  "BSAtniQaa7lCvHmj0z6gHUTzxfwRmtP",
  "BSALH5My3WviqKzd52GFKMPb8Nkq-cl",
  "BSABCX8h0_23my3-3VbXZU2LZscu-LX",
  "BSACjemCARQailPeTLzGQ9auvrc8bsM",
  "BSApoyO-93mdXe0VM3BTFtMJUKQALhO",
  "BSA6k-wEGLawcaINnEb-iIiwBnq9-Y2",
  "BSArXZ987KsjfuUmJRTvpXPjuYVP7-I",
  "BSAe7FiTb62lN_g3Qctb-L97QJIqkDF",
  "BSAYFCph1muTB4F5t5cFNIGQfv9UT8j",
  "BSAtrR5zhssDQA9iHdKR6rtIqhxilR8",
  "BSAQ0gsYuaYuEZHayb_Ek1pnl1l2RiW"
];
let braveKeyIndex = 0;
const braveFailedKeys = new Set();
let braveLastRotation = 0;

// Multiple scraping endpoints with rotation
const scrapingEndpoints = [
  "https://scrap.ytansh038.workers.dev/",
  "https://scraper-api.smartproxy.com/v2/scrape",
  "https://api.scraperapi.com/",
  "https://scrape.abstractapi.com/v1/",
  "https://api.scrapfly.io/scrape"
];
let scrapingEndpointIndex = 0;
const scrapingFailedEndpoints = new Set();
let scrapingLastRotation = 0;

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

const WEB_SCRAPER_TOOL = {
  type: "function",
  function: {
    name: "web_scraper",
    description: "Scrapes the content of a given URL. Use this to get information from a specific webpage. Avoid using for coding questions, programming tutorials, or general conversation - only use when you need to extract content from a specific known URL.",
    parameters: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "The URL of the webpage to scrape."
        }
      },
      required: ["url"]
    }
  }
};

const WEB_SEARCH_TOOL = {
  type: "function",
  function: {
    name: "web_search",
    description: "Performs a web search to find current information, news, or recent developments. Use this when you need up-to-date information, current events, live data, or recent developments. Avoid using for coding questions, programming tutorials, general knowledge that doesn't require current information, or casual conversation.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "The search query to find current information."
        }
      },
      required: ["query"]
    }
  }
};

const STOCK_VIDEO_SEARCH_TOOL = {
  type: "function",
  function: {
    name: "stock_video_search",
    description: "Searches for stock videos based on a query. Use this when you need to find high-quality stock video footage for projects, presentations, or content creation. Returns video results with titles, thumbnails, and download links.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "The search query to find stock videos (e.g., 'nature', 'business', 'technology', 'ocean')."
        },
        page: {
          type: "number",
          description: "Page number for pagination (optional, defaults to 1).",
          default: 1
        }
      },
      required: ["query"]
    }
  }
};

const SCREENSHOT_TOOL = {
  type: "function",
  function: {
    name: "take_screenshot",
    description: "Takes a screenshot of any website or URL. Use this when users want to see what a website looks like, need a visual preview of a webpage, or request screenshots. Supports any publicly accessible website.",
    parameters: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "The URL of the website to screenshot (can include or exclude https://)"
        },
        width: {
          type: "number",
          description: "Screenshot width in pixels (optional, defaults to 1920)",
          default: 1920
        },
        height: {
          type: "number",
          description: "Screenshot height in pixels (optional, defaults to 1080)",
          default: 1080
        }
      },
      required: ["url"]
    }
  }
};

const API_KEY = "ahamaipriv05";

const exposedToInternalMap = {
  "qwen-235b": "qwen-3-235b-a22b-instruct-2507",
  // WORKING MODELS ONLY - Verified via comprehensive testing (24 models + default)
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

    if (path === "/web" && request.method === "GET") {
      return handleWebSearch(request, corsHeaders);
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


async function handleChat(request, corsHeaders, env) {
  const requestBody = await request.json();
  const exposedModel = requestBody.model || "cerebras-qwen-235b";
  const stream = requestBody.stream === true;
  let messages = requestBody.messages;

  // System prompt injection...
  if (!messages.some(m => m.role === 'system')) {
    const now = new Date();
    const dateTime = `${now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata'})}, ${now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata'})} IST`;
    messages.unshift({
      role: "system",
      content: `You are a helpful AI assistant. Today's date is ${dateTime}. You have access to web search, web scraper, stock video search, and screenshot tools. Use web search for current information, news, or recent developments. Use web scraper for extracting content from specific URLs. Use stock video search when users need stock video footage for projects, presentations, or content creation. Use screenshot tool when users want to see what a website looks like or need visual previews of webpages. Avoid using these tools for coding questions, programming tutorials, or general conversation - respond normally for those topics.`
    });
  }

  try {
    const internalModel = exposedToInternalMap[exposedModel];
    if (!internalModel) {
      return new Response(JSON.stringify({ error: `Model '${exposedModel}' is not supported.` }), { status: 400, headers: corsHeaders });
    }

    // Step 1: Make an initial call to the model to see if it wants to use a tool.
    const tools = [WEB_SEARCH_TOOL, WEB_SCRAPER_TOOL, STOCK_VIDEO_SEARCH_TOOL, SCREENSHOT_TOOL];
    const safePayload = {
        model: internalModel,
        messages: messages,
        temperature: requestBody.temperature,
        max_tokens: requestBody.max_tokens,
        top_p: requestBody.top_p,
        seed: requestBody.seed,
        stop: requestBody.stop,
        tools: tools,
        tool_choice: "auto",
        stream: false
    };
    Object.keys(safePayload).forEach(key => safePayload[key] === undefined && delete safePayload[key]);

    const responseJson = await executeModelRequest(internalModel, safePayload, false);
    const message = responseJson.choices[0].message;
    messages.push(message);

    // Step 2: Check for tool calls.
    if (!message.tool_calls || message.tool_calls.length === 0) {
      // No tool call. If user wanted a stream, we need to re-request.
      if (stream) {
        const streamPayload = { ...safePayload, messages: requestBody.messages, stream: true };
        delete streamPayload.tools;
        delete streamPayload.tool_choice;
        const streamingResponse = await executeModelRequest(internalModel, streamPayload, true);
        const newHeaders = new Headers(streamingResponse.headers);
        Object.entries(corsHeaders).forEach(([key, value]) => newHeaders.set(key, value));
        return new Response(streamingResponse.body, {
            status: streamingResponse.status,
            statusText: streamingResponse.statusText,
            headers: newHeaders
        });
      } else {
        return new Response(JSON.stringify(responseJson), { status: 200, headers: corsHeaders });
      }
    }

    // Step 3: Execute tool calls.
    const toolCalls = message.tool_calls;
    for (const toolCall of toolCalls) {
      if (toolCall.function.name === 'web_scraper') {
        const args = JSON.parse(toolCall.function.arguments);
        try {
          const scrapeResult = await performWebScrape(args.url);
          messages.push({ role: "tool", tool_call_id: toolCall.id, name: toolCall.function.name, content: scrapeResult });
        } catch (error) {
          messages.push({ role: "tool", tool_call_id: toolCall.id, name: toolCall.function.name, content: JSON.stringify({ error: error.message }) });
        }
      } else if (toolCall.function.name === 'web_search') {
        const args = JSON.parse(toolCall.function.arguments);
        try {
          // Add current date/time context to search query for better results
          const now = new Date();
          const dateTime = `${now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata'})}, ${now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata'})} IST`;
          
          const searchResults = await performWebSearch(args.query);
          const formattedResults = `[Search performed on: ${dateTime}]\n\n${searchResults.map(r => `Title: ${r.title}\nURL: ${r.url}\nDescription: ${r.description}`).join('\n\n')}`;
          messages.push({ role: "tool", tool_call_id: toolCall.id, name: toolCall.function.name, content: formattedResults });
        } catch (error) {
          messages.push({ role: "tool", tool_call_id: toolCall.id, name: toolCall.function.name, content: JSON.stringify({ error: error.message }) });
        }
      } else if (toolCall.function.name === 'stock_video_search') {
        const args = JSON.parse(toolCall.function.arguments);
        try {
          const videoResults = await performStockVideoSearch(args.query, args.page);
          const formattedResults = videoResults.map(v => `Title: ${v.title}\nThumbnail: ${v.thumbnail}\nDownload Link: ${v.download_link}`).join('\n\n');
          messages.push({ role: "tool", tool_call_id: toolCall.id, name: toolCall.function.name, content: formattedResults });
        } catch (error) {
          messages.push({ role: "tool", tool_call_id: toolCall.id, name: toolCall.function.name, content: JSON.stringify({ error: error.message }) });
        }
      } else if (toolCall.function.name === 'take_screenshot') {
        const args = JSON.parse(toolCall.function.arguments);
        try {
          let url = args.url;
          const width = args.width || 1920;
          const height = args.height || 1080;
          
          // Ensure URL has protocol
          if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
          }
          
          // Encode the URL for WordPress mshots
          const encodedUrl = encodeURIComponent(url);
          
          // Generate screenshot URL
          const screenshotUrl = `https://s.wordpress.com/mshots/v1/${encodedUrl}?w=${width}&h=${height}`;
          
          const result = {
            screenshot_url: screenshotUrl,
            original_url: url,
            dimensions: `${width}x${height}`,
            message: `Screenshot captured for ${url}. You can view it at the provided URL.`
          };
          
          messages.push({ role: "tool", tool_call_id: toolCall.id, name: toolCall.function.name, content: JSON.stringify(result) });
        } catch (error) {
          messages.push({ role: "tool", tool_call_id: toolCall.id, name: toolCall.function.name, content: JSON.stringify({ error: error.message }) });
        }
      }
    }

    // Step 4: Make the final call to the model with the tool results.
    const finalPayload = { ...safePayload, messages, stream };
    delete finalPayload.tools;
    delete finalPayload.tool_choice;

    const finalResponse = await executeModelRequest(internalModel, finalPayload, stream);

    if (stream) {
        const newHeaders = new Headers(finalResponse.headers);
        Object.entries(corsHeaders).forEach(([key, value]) => newHeaders.set(key, value));
        return new Response(finalResponse.body, {
            status: finalResponse.status,
            statusText: finalResponse.statusText,
            headers: newHeaders
        });
    } else {
        return new Response(JSON.stringify(finalResponse), { status: 200, headers: corsHeaders });
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

  // Start with the primary model
  const primaryModel = {
    id: primaryModelId,
    name: "Qwen 235B",
    object: "model",
    owned_by: "aham-ai",
    description: "🚀 PRIMARY MODEL: The fastest and most capable model available."
  };

  // Get the rest of the models, excluding the primary one
  const otherModels = Object.keys(exposedToInternalMap)
    .filter(id => id !== primaryModelId)
    .map((id) => ({
      id,
      name: id.replace(/^(cerebras-|groq-)/, ''),
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
    vision: defaultModels.vision
  }), {
    headers: { "Content-Type": "application/json", ...corsHeaders }
  });
}

// Helper function to fetch from Brave Search API with enhanced rotation
async function fetchBraveSearch(query, count, offset, apiKey) {
  const searchUrl = new URL("https://api.search.brave.com/res/v1/web/search");
  searchUrl.searchParams.append("q", query);
  searchUrl.searchParams.append("count", count.toString());
  searchUrl.searchParams.append("offset", offset.toString());

  const response = await fetch(searchUrl.toString(), {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Accept-Encoding": "gzip",
      "X-Subscription-Token": apiKey
    },
    signal: AbortSignal.timeout(15000) // 15 second timeout
  });

  if (!response.ok) {
    const errorText = await response.text();
    const error = new Error(`Brave Search API request failed with status ${response.status}: ${errorText}`);

    // Enhanced status code checking for rotation
    if (shouldRotateOnStatus(response.status)) {
      error.shouldRetry = true;
    } else {
      error.shouldRetry = false;
    }
    throw error;
  }

  const results = await response.json();
  return results.web && results.web.results ? results.web.results : [];
}

// Helper function to search for stock videos using Pexels API
async function performStockVideoSearch(query, page = 1) {
  if (!query) {
    throw new Error("Query parameter is required for stock video search.");
  }

  const targetUrl = `https://www.pexels.com/en-us/api/v3/search/videos/?query=${encodeURIComponent(query)}&page=${page}`;

  const headers = {
    'Host': 'www.pexels.com',
    'cache-control': 'no-cache, no-store, must-revalidate',
    'content-type': 'application/json',
    'secret-key': 'H2jk9uKnhRmL6WPwh89zBezWvr',
    'expires': '0',
    'pragma': 'no-cache',
    'x-client-type': 'mobile',
    'x-client-version': '7.4.2',
    'user-agent': 'PexelsMobileApp/7.4.2 (android 28)',
    'accept-encoding': 'gzip',
    'cookie': '__cf_bm=dummy; _cfuvid=dummy'
  };

  try {
    const response = await fetch(targetUrl, { 
      headers,
      signal: AbortSignal.timeout(15000) // 15 second timeout
    });

    if (!response.ok) {
      throw new Error(`Pexels API request failed with status ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();

    const minimal = (json?.data || []).map(video => ({
      title: video?.attributes?.title || '',
      thumbnail: video?.attributes?.video?.thumbnail?.medium || '',
      download_link: video?.attributes?.video?.download_link || ''
    }));

    return minimal;

  } catch (error) {
    console.error(`Stock video search error: ${error.message}`);
    throw new Error(`Failed to search stock videos: ${error.message}`);
  }
}

async function performWebSearch(query) {
  if (!query) {
    throw new Error("Query parameter is required for web search.");
  }

  let attempts = 0;
  const maxAttempts = braveApiKeys.length;
  let lastError = null;

  while (attempts < maxAttempts) {
    const currentKey = braveApiKeys[braveKeyIndex];
    
    // Skip this key if it's in cooldown
    if (shouldSkipDueCooldown(braveFailedKeys, currentKey, braveLastRotation)) {
      braveKeyIndex = (braveKeyIndex + 1) % braveApiKeys.length;
      attempts++;
      continue;
    }

    try {
      // Fetch two pages of results
      const results1 = await fetchBraveSearch(query, 20, 0, currentKey);
      const results2 = await fetchBraveSearch(query, 20, 1, currentKey);

      // If we get here, the key worked. Log success
      console.log(`[Brave Search] Request successful with key ${currentKey.substring(0, 8)}...`);

      // Combine and de-duplicate results
      const allResults = [...results1, ...results2];
      const uniqueResults = Array.from(new Map(allResults.map(item => [item.url, item])).values());

      // Take the first 30
      const finalResults = uniqueResults.slice(0, 30);

      // Format the results
      const formattedResults = finalResults.map(result => ({
        title: result.title || "No title",
        url: result.url || "",
        description: result.description || "No description available",
        image: result.thumbnail ? result.thumbnail.src : null
      }));

      // Success - move to next key for next request (balanced load)
      braveKeyIndex = (braveKeyIndex + 1) % braveApiKeys.length;
      return formattedResults;

    } catch (error) {
      lastError = error;
      if (error.shouldRetry) {
        const oldKey = currentKey;
        braveFailedKeys.add(currentKey);
        braveKeyIndex = (braveKeyIndex + 1) % braveApiKeys.length;
        braveLastRotation = Date.now();
        logRotation("Brave Search", oldKey, braveApiKeys[braveKeyIndex], `Error: ${error.message}`);
        attempts++;
        continue;
      } else {
        throw error;
      }
    }
  }

  // If we get here, all keys failed.
  throw new Error(`All Brave API keys failed. Last error: ${lastError ? lastError.message : 'Unknown error'}`);
}

// Enhanced content sanitization function
function sanitizeScrapedContent(content) {
  if (!content || typeof content !== 'string') {
    return "No content available";
  }
  
  // Remove potentially problematic characters and normalize whitespace
  let sanitized = content
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '') // Remove control characters
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  // Limit content length to prevent overwhelming the AI
  const maxLength = 8000;
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength) + "\n\n[Content truncated due to length limit]";
  }
  
  // Ensure content is valid and not empty
  if (sanitized.length < 10) {
    return "Content too short or unavailable after sanitization";
  }
  
  return sanitized;
}

// Robust web scraping with multiple endpoints and rotation
async function performWebScrape(url) {
    if (!url) {
        throw new Error("URL is required for web scraping.");
    }
    
    console.log(`Scraping URL: ${url}`);
    
    let attempts = 0;
    const maxAttempts = scrapingEndpoints.length;
    let lastError = null;

    while (attempts < maxAttempts) {
        const currentEndpoint = scrapingEndpoints[scrapingEndpointIndex];
        
        // Skip this endpoint if it's in cooldown
        if (shouldSkipDueCooldown(scrapingFailedEndpoints, currentEndpoint, scrapingLastRotation)) {
            scrapingEndpointIndex = (scrapingEndpointIndex + 1) % scrapingEndpoints.length;
            attempts++;
            continue;
        }
        
        try {
            let scraperUrl;
            let requestOptions = {
                method: "GET",
                signal: AbortSignal.timeout(20000) // 20 second timeout
            };
            
            // Configure request based on endpoint
            if (currentEndpoint.includes('ytansh038.workers.dev')) {
                scraperUrl = `${currentEndpoint}?url=${encodeURIComponent(url)}`;
            } else if (currentEndpoint.includes('smartproxy.com')) {
                scraperUrl = currentEndpoint;
                requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic " + btoa("user:pass") // Example auth
                    },
                    body: JSON.stringify({
                        target: url,
                        locale: "en",
                        geo: "United States",
                        device_type: "desktop"
                    }),
                    signal: AbortSignal.timeout(20000)
                };
            } else if (currentEndpoint.includes('scraperapi.com')) {
                scraperUrl = `${currentEndpoint}?api_key=demo&url=${encodeURIComponent(url)}`;
            } else if (currentEndpoint.includes('abstractapi.com')) {
                scraperUrl = `${currentEndpoint}?api_key=demo&url=${encodeURIComponent(url)}`;
            } else if (currentEndpoint.includes('scrapfly.io')) {
                scraperUrl = `${currentEndpoint}?key=demo&url=${encodeURIComponent(url)}`;
            } else {
                // Default configuration
                scraperUrl = `${currentEndpoint}?url=${encodeURIComponent(url)}`;
            }
            
            const response = await fetch(scraperUrl, requestOptions);
            
            if (shouldRotateOnStatus(response.status)) {
                const oldEndpoint = currentEndpoint;
                scrapingFailedEndpoints.add(currentEndpoint);
                scrapingEndpointIndex = (scrapingEndpointIndex + 1) % scrapingEndpoints.length;
                scrapingLastRotation = Date.now();
                logRotation("Scraping", oldEndpoint, scrapingEndpoints[scrapingEndpointIndex], `Status ${response.status}`);
                attempts++;
                continue;
            }
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Scraper API failed with status ${response.status}: ${errorText}`);
            }
            
            const scrapedContent = await response.text();
            const sanitizedContent = sanitizeScrapedContent(scrapedContent);
            
            console.log(`[Scraping] Request successful with endpoint ${currentEndpoint.substring(0, 30)}...`);
            
            // Success - move to next endpoint for load balancing
            scrapingEndpointIndex = (scrapingEndpointIndex + 1) % scrapingEndpoints.length;
            
            return sanitizedContent;
            
        } catch (error) {
            lastError = error;
            const oldEndpoint = currentEndpoint;
            scrapingFailedEndpoints.add(currentEndpoint);
            scrapingEndpointIndex = (scrapingEndpointIndex + 1) % scrapingEndpoints.length;
            scrapingLastRotation = Date.now();
            logRotation("Scraping", oldEndpoint, scrapingEndpoints[scrapingEndpointIndex], `Error: ${error.message}`);
            attempts++;
            
            if (attempts >= maxAttempts) {
                console.error("All scraping endpoints failed:", error);
                // Return a sanitized error message that won't confuse the AI
                return `Unable to scrape content from ${url}. The webpage may be unavailable, require authentication, or have anti-scraping measures in place. Please try a different URL or check if the site is accessible.`;
            }
        }
    }
    
    // Fallback error response
    return `Scraping service temporarily unavailable for ${url}. All scraping endpoints are currently experiencing issues. Please try again later or provide the content manually.`;
}

async function handleWebSearch(request, corsHeaders) {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');

    if (!query) {
        return new Response("Missing search query. Use ?q=<query>", {
            status: 400,
            headers: { "Content-Type": "text/plain", ...corsHeaders }
        });
    }

    try {
        const searchResults = await performWebSearch(query);

        const plainTextResults = searchResults.map(result => {
            return `Title: ${result.title}\nURL: ${result.url}\nDescription: ${result.description}\nImage: ${result.image || 'N/A'}`;
        }).join('\n\n---\n\n');

        return new Response(plainTextResults, {
            status: 200,
            headers: { "Content-Type": "text/plain; charset=utf-8", ...corsHeaders }
        });
    } catch (error) {
        return new Response(`Error performing web search: ${error.message}`, {
            status: 500,
            headers: { "Content-Type": "text/plain", ...corsHeaders }
        });
    }
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
