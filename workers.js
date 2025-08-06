const API_KEY = "ahamaibyprakash25";

const exposedToInternalMap = {
  // DeepSeek R1 - Free & Uncensored (keeping this one)
  "deepseek-r1": "NiansuhAI/DeepSeek-R1",
  // GitHub Copilot/Hugging Face spaces models
  "gpt-4o": "gpt-4o",
  "o3-mini": "o3-mini",
  "o1": "o1",
  "claude-3.5-sonnet": "claude-3.5-sonnet",
  "claude-3.7-sonnet": "claude-3.7-sonnet",
  "claude-3.7-sonnet-thought": "claude-3.7-sonnet-thought",
  "claude-sonnet-4": "claude-sonnet-4",
  "gemini-2.0-flash-001": "gemini-2.0-flash-001",
  "gemini-2.5-pro": "gemini-2.5-pro",
  "gpt-4.1": "gpt-4.1",
  "o4-mini": "o4-mini",
  // Samurai API models with Paid prefix
  "claude-sonnet-4-bedrock": "Paid/bedrock/us.anthropic.claude-sonnet-4-20250514-v1:0",
  "claude-opus-4-bedrock": "Paid/bedrock/us.anthropic.claude-opus-4-20250514-v1:0",
  "grok-4": "Paid/xai/grok-4"
};

const modelRoutes = {
  // DeepSeek R1 - keeping original route
  "NiansuhAI/DeepSeek-R1": "https://fast.typegpt.net/v1/chat/completions",
  // GitHub Copilot/Hugging Face spaces models
  "gpt-4o": "https://samfy001-giuthubsss.hf.space/v1/chat/completions",
  "o3-mini": "https://samfy001-giuthubsss.hf.space/v1/chat/completions",
  "o1": "https://samfy001-giuthubsss.hf.space/v1/chat/completions",
  "claude-3.5-sonnet": "https://samfy001-giuthubsss.hf.space/v1/chat/completions",
  "claude-3.7-sonnet": "https://samfy001-giuthubsss.hf.space/v1/chat/completions",
  "claude-3.7-sonnet-thought": "https://samfy001-giuthubsss.hf.space/v1/chat/completions",
  "claude-sonnet-4": "https://samfy001-giuthubsss.hf.space/v1/chat/completions",
  "gemini-2.0-flash-001": "https://samfy001-giuthubsss.hf.space/v1/chat/completions",
  "gemini-2.5-pro": "https://samfy001-giuthubsss.hf.space/v1/chat/completions",
  "gpt-4.1": "https://samfy001-giuthubsss.hf.space/v1/chat/completions",
  "o4-mini": "https://samfy001-giuthubsss.hf.space/v1/chat/completions",
  // Samurai API models with Paid prefix
  "Paid/bedrock/us.anthropic.claude-sonnet-4-20250514-v1:0": "https://samuraiapi.in/v1/chat/completions",
  "Paid/bedrock/us.anthropic.claude-opus-4-20250514-v1:0": "https://samuraiapi.in/v1/chat/completions",
  "Paid/xai/grok-4": "https://samuraiapi.in/v1/chat/completions"
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
  "qwen": {
    provider: "infip",
    baseUrl: "https://api.infip.pro/v1/images/generations",
    displayName: "Qwen - Image Generation",
    width: 1024,
    height: 1024
  },
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
  vision: "claude-3.5-sonnet", // Default vision model
  webSearch: "claude-3.5-sonnet" // Default web search model
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

async function handleChat(request, corsHeaders) {
  const body = await request.json();
  const exposedModel = body.model;
  const internalModel = exposedToInternalMap[exposedModel];
  const stream = body.stream === true;

  if (!internalModel || !modelRoutes[internalModel]) {
    return new Response(JSON.stringify({ error: `Model '${exposedModel}' is not supported.` }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }



  // Prepare headers based on the model and API endpoint
  let headers = { 
    "Content-Type": "application/json"
  };

  // Use different authentication for different endpoints
  if (modelRoutes[internalModel].includes('samfy001-giuthubsss.hf.space')) {
    // For the GitHub Copilot endpoint, no authorization needed
    // headers["Authorization"] = "Bearer ahamaibyprakash25";
  } else if (modelRoutes[internalModel].includes('fast.typegpt.net')) {
    // For DeepSeek R1 endpoint
    headers["Authorization"] = "Bearer sk-BiEn3R0oF1aUTAwK8pWUEqvsxBvoHXffvtLBaC5NApX4SViv";
  } else if (modelRoutes[internalModel].includes('samuraiapi.in')) {
    // For Samurai API endpoint
    headers["Authorization"] = "Bearer sk-IvMBi9qmzLiWHl0RpJ9KbyJpczm9YSIHAnMU2aDBbkpbYLF8";
  }

  const response = await fetch(modelRoutes[internalModel], {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ ...body, model: internalModel })
  });

  return stream
    ? new Response(response.body, {
        status: response.status,
        headers: {
          "Content-Type": "text/event-stream",
          "Transfer-Encoding": "chunked",
          "Cache-Control": "no-cache",
          ...corsHeaders
        }
      })
    : new Response(await response.text(), {
        status: response.status,
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
    default:
      automationResponse.success = false;
      automationResponse.message = `Unknown automation action: ${action}`;
  }

  return new Response(JSON.stringify(automationResponse), {
    headers: { "Content-Type": "application/json", ...corsHeaders }
  });
}
