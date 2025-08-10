const API_KEY = "ahamaibyprakash25";

const exposedToInternalMap = {
  // OpenAI-compatible proxy models (put first)
  "gpt-4o": "gpt-4o",
  "gpt-4o-mini": "gpt-4o-mini",
  "perplexed": "perplexed",
  "felo": "felo",
  "gpt-4.1-nano": "gpt-4.1-nano",
  "gpt-4.1-mini": "gpt-4.1-mini",
  "deepseek-chat": "deepseek-chat",
  "deepseek-reasoner": "deepseek-reasoner",
  "claude-3.5-haiku": "claude-3.5-haiku",
  "gemini-2.0-flash": "gemini-2.0-flash",
  "gemini-2.5-flash-proxy": "gemini-2.5-flash",
  "grok-3-mini": "grok-3-mini",
  // DeepSeek R1 - Free & Uncensored (keeping this one)
  "deepseek-r1": "NiansuhAI/DeepSeek-R1",
  // Samurai API models to keep (Claude, Grok-4, Kimi)
  "claude-sonnet-4": "Paid/bedrock/us.anthropic.claude-sonnet-4-20250514-v1:0",
  "claude-opus-4": "Paid/bedrock/us.anthropic.claude-opus-4-20250514-v1:0",
  "grok-4": "Paid/xai/grok-4",
  "kimi-k2-instruct": "groq/moonshotai/kimi-k2-instruct"
};

const modelRoutes = {
  // DeepSeek R1 - keeping original route
  "NiansuhAI/DeepSeek-R1": "https://fast.typegpt.net/v1/chat/completions",
  // Samurai API models to keep (Claude, Grok-4, Kimi)
  "Paid/bedrock/us.anthropic.claude-sonnet-4-20250514-v1:0": "https://samuraiapi.in/v1/chat/completions",
  "Paid/bedrock/us.anthropic.claude-opus-4-20250514-v1:0": "https://samuraiapi.in/v1/chat/completions",
  "Paid/xai/grok-4": "https://samuraiapi.in/v1/chat/completions",
  "groq/moonshotai/kimi-k2-instruct": "https://samuraiapi.in/v1/chat/completions",
  // OpenAI-compatible proxy models
  "gpt-4o": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "gpt-4o-mini": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "perplexed": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "felo": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "gpt-4.1-nano": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "gpt-4.1-mini": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "deepseek-chat": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "deepseek-reasoner": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "claude-3.5-haiku": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "gemini-2.0-flash": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "gemini-2.5-flash": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "grok-3-mini": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions"
};

// Backup internal targets if primary route fails (e.g., proxy downtime)
const backupInternalForExposed = {
  "gpt-4o": "gpt-4o-mini",
  "gpt-4o-mini": "gpt-4o",
  "deepseek-chat": "NiansuhAI/DeepSeek-R1",
  "deepseek-reasoner": "NiansuhAI/DeepSeek-R1",
  "claude-3.5-haiku": "claude-sonnet-4",
  "grok-3-mini": "grok-4"
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
  }
};

// Default models configuration
const defaultModels = {
  vision: "claude-sonnet-4", // Default vision model
  webSearch: "perplexed" // Default web search model
};

// Dynamic fallback system - automatically detect working models
function getWorkingModels() {
  // Models known to be reliable based on endpoint
  const reliableModels = [];
  
  // Check which models use reliable endpoints
  for (const [exposedModel, internalModel] of Object.entries(exposedToInternalMap)) {
    const route = modelRoutes[internalModel];
    if (route && (route.includes('samuraiapi.in') || route.includes('fast.typegpt.net') || route.includes('gpt-oss-openai-proxy.onrender.com'))) {
      reliableModels.push(exposedModel);
    }
  }
  
  return reliableModels;
}

// Model categories for intelligent fallback
const modelCategories = {
  claude: ["claude-sonnet-4", "claude-opus-4", "claude-3.5-haiku"],
  openai: ["gpt-4o", "gpt-4o-mini", "gpt-4.1-nano", "gpt-4.1-mini"],
  google: ["gemini-2.0-flash", "gemini-2.5-flash-proxy"],
  xai: ["grok-4", "grok-3-mini"],
  moonshot: ["kimi-k2-instruct"],
  deepseek: ["deepseek-r1", "deepseek-chat", "deepseek-reasoner"],
  search: ["perplexed", "felo"]
};






export default {
  async fetch(request) {
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

    // Auth check
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

    if (path === "/v1/defaults" && request.method === "GET") {
      return handleDefaults(corsHeaders);
    }

    if (path === "/v1/automation/url" && request.method === "POST") {
      return handleUrlAutomation(request, corsHeaders);
    }

    if (path === "/v1/screenshot" && request.method === "POST") {
      return handleScreenshot(request, corsHeaders);
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
};

// Get intelligent fallback model based on the original model's category
function getIntelligentFallback(originalModel) {
  const workingModels = getWorkingModels();
  
  // Find which category the original model belongs to
  for (const [category, models] of Object.entries(modelCategories)) {
    if (models.includes(originalModel)) {
      // Try other models in the same category first
      for (const model of models) {
        if (model !== originalModel && workingModels.includes(model)) {
          return model;
        }
      }
    }
  }
  // If no category match or no available models in category, use first working model
  return workingModels[0];
}

// Try to make a request with fallback support
async function tryModelRequest(modelId, requestBody, stream, corsHeaders) {
  let internalModel = exposedToInternalMap[modelId];
  
  const attemptOnce = async (internal) => {
    if (!internal || !modelRoutes[internal]) {
      return null;
    }

    // Special handling for different models
    let modifiedBody = { ...requestBody };
    
    if (internal.includes("DeepSeek") || internal.includes("deepseek")) {
      // DeepSeek models - force uncensored mode by removing system prompts
      modifiedBody.messages = requestBody.messages.filter(msg => msg.role !== "system");
      console.log(`🔥 DeepSeek Uncensored Mode: Removed ${requestBody.messages.length - modifiedBody.messages.length} system prompt(s) for model ${internal}`);
    } else {
      // For other models - add screenshot capability system prompt
      const screenshotSystemPrompt = {
        role: "system",
        content: `You are an AI assistant with screenshot capabilities. You can take screenshots of websites using the following format:

To take a screenshot, you can use this URL format:
https://s.wordpress.com/mshots/v1/[ENCODED_URL]?w=[WIDTH]&h=[HEIGHT]

For example:
- https://s.wordpress.com/mshots/v1/https%3A%2F%2Fgoogle.com?w=1920&h=1080
- https://s.wordpress.com/mshots/v1/https%3A%2F%2Fgithub.com?w=1280&h=720

When a user asks you to take a screenshot of a website, explain that you can capture it and provide the formatted URL. The URL must be properly URL-encoded.

You have access to this screenshot functionality and should offer it when relevant to user requests.`
      };
      
      // Check if there's already a system message, if not add ours at the beginning
      const hasSystemMessage = modifiedBody.messages.some(msg => msg.role === "system");
      if (!hasSystemMessage) {
        modifiedBody.messages = [screenshotSystemPrompt, ...modifiedBody.messages];
      }
    }

    let headers = { 
      "Content-Type": "application/json"
    };

    // Use different authentication for different endpoints
    if (modelRoutes[internal].includes('fast.typegpt.net')) {
      // For DeepSeek R1 endpoint
      headers["Authorization"] = "Bearer sk-BiEn3R0oF1aUTAwK8pWUEqvsxBvoHXffvtLBaC5NApX4SViv";
    } else if (modelRoutes[internal].includes('samuraiapi.in')) {
      // For Samurai API endpoint
      headers["Authorization"] = "Bearer sk-IvMBi9qmzLiWHl0RpJ9KbyJpczm9YSIHAnMU2aDBbkpbYLF8";
    } else if (modelRoutes[internal].includes('gpt-oss-openai-proxy.onrender.com')) {
      // For OpenAI-compatible onrender proxy
      headers["Authorization"] = `Bearer ${API_KEY}`;
    }

    try {
      const response = await fetch(modelRoutes[internal], {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ ...modifiedBody, model: internal })
      });

      // Check if response indicates an error
      if (!response.ok || response.status >= 400) {
        return null;
      }

      // For non-streaming, check if response has empty content or errors
      if (!stream) {
        const responseText = await response.text();
        try {
          const responseJson = JSON.parse(responseText);
          // Check for various error conditions
          if (responseJson.error || 
              (responseJson.choices && responseJson.choices[0] && 
               responseJson.choices[0].message && 
               (responseJson.choices[0].message.content === "" || 
                responseJson.choices[0].message.content.includes("I apologize, but I encountered an error")))) {
            return null;
          }
          return new Response(responseText, {
            status: 200,
            headers: { "Content-Type": "application/json", ...corsHeaders }
          });
        } catch (e) {
          return null;
        }
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

    } catch (error) {
      return null;
    }
  };

  // First attempt: primary internal model
  let primaryResult = await attemptOnce(internalModel);
  if (primaryResult) {
    return primaryResult;
  }

  // If failed and we have a backup internal route for this exposed model, try it
  if (backupInternalForExposed[modelId]) {
    const backupResult = await attemptOnce(backupInternalForExposed[modelId]);
    if (backupResult) {
      return backupResult;
    }
  }

  return null;
}

async function handleChat(request, corsHeaders) {
  const body = await request.json();
  const exposedModel = body.model;
  const stream = body.stream === true;

  if (!exposedToInternalMap[exposedModel]) {
    return new Response(JSON.stringify({ error: `Model '${exposedModel}' is not supported.` }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }

  // Try the requested model first
  let result = await tryModelRequest(exposedModel, body, stream, corsHeaders);
  if (result) {
    return result;
  }

  // If original model failed, try intelligent fallback
  const intelligentFallback = getIntelligentFallback(exposedModel);
  if (intelligentFallback !== exposedModel) {
    result = await tryModelRequest(intelligentFallback, body, stream, corsHeaders);
    if (result) {
      return result;
    }
  }

  // If intelligent fallback failed, try all working models in order
  const workingModels = getWorkingModels();
  for (const fallbackModel of workingModels) {
    if (fallbackModel !== exposedModel && fallbackModel !== intelligentFallback) {
      result = await tryModelRequest(fallbackModel, body, stream, corsHeaders);
      if (result) {
        return result;
      }
    }
  }

  // If all models failed, return error
  return new Response(JSON.stringify({ 
    error: `Model '${exposedModel}' and all fallback models are currently unavailable. Please try again later.`,
    attempted_fallbacks: workingModels 
  }), {
    status: 503,
    headers: { "Content-Type": "application/json", ...corsHeaders }
  });
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

async function handleScreenshot(request, corsHeaders) {
  const body = await request.json();
  const { url, width = 1920, height = 1080 } = body;

  if (!url) {
    return new Response(JSON.stringify({ error: "URL parameter is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }

  try {
    // Encode the URL for the WordPress mshots API
    const encodedUrl = encodeURIComponent(url);
    const screenshotUrl = `https://s.wordpress.com/mshots/v1/${encodedUrl}?w=${width}&h=${height}`;
    
    // Fetch the screenshot
    const screenshotResponse = await fetch(screenshotUrl);
    
    if (!screenshotResponse.ok) {
      return new Response(JSON.stringify({ error: "Failed to capture screenshot" }), {
        status: screenshotResponse.status,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    // Return the screenshot image
    return new Response(screenshotResponse.body, {
      status: 200,
      headers: {
        "Content-Type": screenshotResponse.headers.get("Content-Type") || "image/png",
        "Transfer-Encoding": "chunked",
        ...corsHeaders
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Screenshot service unavailable" }), {
      status: 503,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
}
