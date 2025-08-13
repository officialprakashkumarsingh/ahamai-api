const API_KEY = "ahamaibyprakash25";

const exposedToInternalMap = {
  // Core Models (6)
  "gpt-4o": "gpt-4o",
  "gpt-4o-mini": "gpt-4o-mini",
  "perplexed": "perplexed",
  "felo": "felo",
  "gpt-oss-20b": "gpt-oss-20b",
  "gpt-oss-120b": "gpt-oss-120b",
  // DeepSeek R1 - Free & Uncensored (special endpoint)
  "deepseek-r1": "NiansuhAI/DeepSeek-R1",
  
  // Google Gemini Models (4)
  "gemini-2.0-flash": "gemini-2.0-flash",
  "gemini-2.0-flash-thinking-exp-01-21": "gemini-2.0-flash-thinking-exp-01-21",
  "gemini-2.5-flash-lite-preview-06-17": "gemini-2.5-flash-lite-preview-06-17",
  "gemini-2.5-flash": "gemini-2.5-flash",
  
  // DeepSeek Models (8) - All from render endpoint
  "deepseek/deepseek-r1:free": "deepseek/deepseek-r1:free",
  "deepseek-r1-distill-llama-70b": "deepseek-r1-distill-llama-70b",
  "deepseek-ai/DeepSeek-R1-0528-Turbo": "deepseek-ai/DeepSeek-R1-0528-Turbo",
  "deepseek-ai/DeepSeek-V3-0324-Turbo": "deepseek-ai/DeepSeek-V3-0324-Turbo",
  "deepseek-ai/DeepSeek-Prover-V2-671B": "deepseek-ai/DeepSeek-Prover-V2-671B",
  "deepseek-ai/DeepSeek-R1-0528": "deepseek-ai/DeepSeek-R1-0528",
  "deepseek-ai/DeepSeek-V3-0324": "deepseek-ai/DeepSeek-V3-0324",
  "deepseek-ai/DeepSeek-R1-Distill-Llama-70B": "deepseek-ai/DeepSeek-R1-Distill-Llama-70B",
  "deepseek-ai/DeepSeek-V3": "deepseek-ai/DeepSeek-V3",
  
  // Meta Llama Models (7) - All from render endpoint
  "meta-llama/llama-4-scout-17b-16e-instruct": "meta-llama/llama-4-scout-17b-16e-instruct",
  "llama-4-scout-17b-16e-instruct": "llama-4-scout-17b-16e-instruct",
  "meta-llama/Llama-4-Maverick-17B-128E-Instruct-Turbo": "meta-llama/Llama-4-Maverick-17B-128E-Instruct-Turbo",
  "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8": "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
  "meta-llama/Llama-4-Scout-17B-16E-Instruct": "meta-llama/Llama-4-Scout-17B-16E-Instruct",
  "meta-llama/Llama-3.3-70B-Instruct-Turbo": "meta-llama/Llama-3.3-70B-Instruct-Turbo",
  "meta-llama/Llama-3.3-70B-Instruct": "meta-llama/Llama-3.3-70B-Instruct",
  
  // Qwen Models (8) - Complete Qwen 3 family
  "Qwen/Qwen3-235B-A22B-Thinking-2507": "Qwen/Qwen3-235B-A22B-Thinking-2507",
  "Qwen/Qwen3-Coder-480B-A35B-Instruct": "Qwen/Qwen3-Coder-480B-A35B-Instruct",
  "Qwen/Qwen3-Coder-480B-A35B-Instruct-Turbo": "Qwen/Qwen3-Coder-480B-A35B-Instruct-Turbo",
  "Qwen/Qwen3-235B-A22B-Instruct-2507": "Qwen/Qwen3-235B-A22B-Instruct-2507",
  "Qwen/Qwen3-30B-A3B": "Qwen/Qwen3-30B-A3B",
  "Qwen/Qwen3-32B": "Qwen/Qwen3-32B",
  "Qwen/Qwen3-14B": "Qwen/Qwen3-14B",
  "Qwen/QwQ-32B": "Qwen/QwQ-32B",
  
  // Microsoft Models (3) - All Phi-4 variants
  "microsoft/phi-4-reasoning-plus": "microsoft/phi-4-reasoning-plus",
  "microsoft/Phi-4-multimodal-instruct": "microsoft/Phi-4-multimodal-instruct",
  "microsoft/phi-4": "microsoft/phi-4",
  
  // Google Gemma Models (3) - Complete Gemma 3 family
  "google/gemma-3-27b-it": "google/gemma-3-27b-it",
  "google/gemma-3-12b-it": "google/gemma-3-12b-it",
  "google/gemma-3-4b-it": "google/gemma-3-4b-it",
  
  // Mistral Models (3) - Devstral and Mistral variants
  "mistralai/Devstral-Small-2505": "mistralai/Devstral-Small-2505",
  "mistralai/Devstral-Small-2507": "mistralai/Devstral-Small-2507",
  "mistralai/Mistral-Small-3.2-24B-Instruct-2506": "mistralai/Mistral-Small-3.2-24B-Instruct-2506",
  
  // GLM Models (3) - Complete GLM 4.5 family
  "zai-org/GLM-4.5-Air": "zai-org/GLM-4.5-Air",
  "zai-org/GLM-4.5": "zai-org/GLM-4.5",
  "zai-org/GLM-4.5V": "zai-org/GLM-4.5V",
  
  // Other Advanced Models (5)
  "exaanswer": "exaanswer",
  "moonshotai/Kimi-K2-Instruct": "moonshotai/Kimi-K2-Instruct",
  "NovaSky-AI/Sky-T1-32B-Preview": "NovaSky-AI/Sky-T1-32B-Preview",
  "allenai/olmOCR-7B-0725-FP8": "allenai/olmOCR-7B-0725-FP8",
  "openai/gpt-oss-120b": "openai/gpt-oss-120b",
  "openai/gpt-oss-20b": "openai/gpt-oss-20b",

  // NEW MODELS - 6 Latest Discoveries (Jan 2025)
  
  // DeepSeek Simplified Access (2)
  "deepseek/deepseek-chat": "deepseek/deepseek-chat",
  "deepseek/deepseek-r1": "deepseek/deepseek-r1",
  
  // Official Namespace Variants (2)
  "openai/gpt-4o-mini": "openai/gpt-4o-mini",
  "meta-llama/llama-4-scout": "meta-llama/llama-4-scout",
  
  // xAI & MiniMax - Ultra-Advanced Models (2)
  "x-ai/grok-3-mini-beta": "x-ai/grok-3-mini-beta",
  "minimax-text-01-456B": "minimax-text-01-456B"
};

const modelRoutes = {
  // DeepSeek R1 - keeping original route
  "NiansuhAI/DeepSeek-R1": "https://fast.typegpt.net/v1/chat/completions",
  
  // Core Models via Render
  "gpt-4o": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "gpt-4o-mini": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "perplexed": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "felo": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "gpt-oss-20b": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "gpt-oss-120b": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // Google Gemini Models
  "gemini-2.0-flash": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "gemini-2.0-flash-thinking-exp-01-21": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "gemini-2.5-flash-lite-preview-06-17": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "gemini-2.5-flash": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // DeepSeek Models
  "deepseek/deepseek-r1:free": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "deepseek-r1-distill-llama-70b": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "deepseek-ai/DeepSeek-R1-0528-Turbo": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "deepseek-ai/DeepSeek-V3-0324-Turbo": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "deepseek-ai/DeepSeek-Prover-V2-671B": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "deepseek-ai/DeepSeek-R1-0528": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "deepseek-ai/DeepSeek-V3-0324": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "deepseek-ai/DeepSeek-R1-Distill-Llama-70B": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "deepseek-ai/DeepSeek-V3": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // Meta Llama Models
  "meta-llama/llama-4-scout-17b-16e-instruct": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "llama-4-scout-17b-16e-instruct": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "meta-llama/Llama-4-Maverick-17B-128E-Instruct-Turbo": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "meta-llama/Llama-4-Scout-17B-16E-Instruct": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "meta-llama/Llama-3.3-70B-Instruct-Turbo": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "meta-llama/Llama-3.3-70B-Instruct": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // Qwen Models
  "Qwen/Qwen3-235B-A22B-Thinking-2507": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "Qwen/Qwen3-Coder-480B-A35B-Instruct": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "Qwen/Qwen3-Coder-480B-A35B-Instruct-Turbo": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "Qwen/Qwen3-235B-A22B-Instruct-2507": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "Qwen/Qwen3-30B-A3B": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "Qwen/Qwen3-32B": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "Qwen/Qwen3-14B": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "Qwen/QwQ-32B": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // Microsoft Models
  "microsoft/phi-4-reasoning-plus": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "microsoft/Phi-4-multimodal-instruct": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "microsoft/phi-4": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // Google Gemma Models
  "google/gemma-3-27b-it": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "google/gemma-3-12b-it": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "google/gemma-3-4b-it": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // Mistral Models
  "mistralai/Devstral-Small-2505": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "mistralai/Devstral-Small-2507": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "mistralai/Mistral-Small-3.2-24B-Instruct-2506": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // GLM Models
  "zai-org/GLM-4.5-Air": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "zai-org/GLM-4.5": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "zai-org/GLM-4.5V": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // Other Advanced Models
  "exaanswer": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "moonshotai/Kimi-K2-Instruct": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "NovaSky-AI/Sky-T1-32B-Preview": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "allenai/olmOCR-7B-0725-FP8": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "openai/gpt-oss-120b": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "openai/gpt-oss-20b": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",

  // NEW MODELS - 6 Latest Discoveries (Jan 2025)
  
  // DeepSeek Simplified Access
  "deepseek/deepseek-chat": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "deepseek/deepseek-r1": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // Official Namespace Variants
  "openai/gpt-4o-mini": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "meta-llama/llama-4-scout": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  
  // xAI & MiniMax - Ultra-Advanced Models
  "x-ai/grok-3-mini-beta": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "minimax-text-01-456B": "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions"
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
  vision: "gpt-4o", // Changed to working model
  webSearch: "perplexed" // Default web search model (working)
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


    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
};



// Make a request to the specified model only (no fallback)
async function makeModelRequest(modelId, requestBody, stream, corsHeaders) {
  let internalModel = exposedToInternalMap[modelId];
  
  if (!internalModel || !modelRoutes[internalModel]) {
    throw new Error(`Model '${modelId}' is not supported or not configured.`);
  }



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

  try {
    // Make request to the specified model only (no fallback)
    return await makeModelRequest(exposedModel, body, stream, corsHeaders);
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