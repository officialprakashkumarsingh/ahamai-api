const API_KEY = "ahamaibyprakash25";

const exposedToInternalMap = {
  // Vision models
  "claude-4-sonnet": "io-8/claude-4-sonnet",
  "claude-4-opus": "io-8/claude-4-opus",
  "claude-3.7-sonnet": "io-8/claude-3.7-sonnet",
  "claude-3.5-sonnet": "io-8/claude-3.5-sonnet",
  "kimi-k2": "io-6/kimi-k2",
  "qwen3-coder-480B-A35B": "io-6/qwen3-coder-480B-A35B",
  // Web search models
  "sonar": "io-4/sonar",
  "sonar-pro": "io-4/sonar-pro",
  // New server 2 models from rproxy-nine.vercel.app
  "claude-sonnet-4-2": "claude-sonnet-4",
  "claude-opus-4-2": "claude-opus-4"
};

const modelRoutes = {
  // Vision models routes
  "io-8/claude-4-sonnet": "https://lm.0.sdk.li/v1/chat/completions",
  "io-8/claude-4-opus": "https://lm.0.sdk.li/v1/chat/completions",
  "io-8/claude-3.7-sonnet": "https://lm.0.sdk.li/v1/chat/completions",
  "io-8/claude-3.5-sonnet": "https://lm.0.sdk.li/v1/chat/completions",
  "io-6/kimi-k2": "https://lm.0.sdk.li/v1/chat/completions",
  "io-6/qwen3-coder-480B-A35B": "https://lm.0.sdk.li/v1/chat/completions",
  // Web search models routes
  "io-4/sonar": "https://lm.0.sdk.li/v1/chat/completions",
  "io-4/sonar-pro": "https://lm.0.sdk.li/v1/chat/completions",
  // New server 2 models routes
  "claude-sonnet-4": "https://rproxy-nine.vercel.app/v1/chat/completions",
  "claude-opus-4": "https://rproxy-nine.vercel.app/v1/chat/completions"
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
  }
};

// Default models configuration
const defaultModels = {
  vision: "claude-4-sonnet", // Default vision model
  webSearch: "sonar" // Default web search model
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

    // Handle root endpoint for model listing
    if (path === "/" && request.method === "GET") {
      return handleModelList(corsHeaders);
    }

    if (path === "/v1/chat/completions" && request.method === "POST") {
      return handleChat(request, corsHeaders);
    }

    if (path === "/v1/images/generations" && request.method === "POST") {
      return handleImage(request, corsHeaders);
    }

    if (path === "/v1/models" && request.method === "GET") {
      return handleModelList(corsHeaders);
    }

    if (path === "/v1/chat/models" && request.method === "GET") {
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
  if (modelRoutes[internalModel].includes('rproxy-nine.vercel.app')) {
    // For the new rproxy endpoint, no specific auth key needed
    headers["Authorization"] = "Bearer dummy-key";
  } else {
    // For existing lm.0.sdk.li endpoint
    headers["Authorization"] = "Bearer LM0_QZMKWYVVUDYAIUDG.1748-UPYOUMDGIMAV";
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
  const prompt = encodeURIComponent(body.prompt || "");

  if (!imageModelRoutes[model]) {
    return new Response(JSON.stringify({ error: `Image model '${model}' is not supported.` }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }

  const { baseUrl } = imageModelRoutes[model];

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

  const imageUrl = `${baseUrl}${prompt}?${params.toString()}`;
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

function handleModelList(corsHeaders = {}) {
  const chatModels = Object.keys(exposedToInternalMap).map((id) => ({
    id,
    object: "model",
    owned_by: "openai-compatible"
  }));

  const imageModels = Object.keys(imageModelRoutes).map((id) => ({
    id,
    object: "image-model",
    owned_by: "pollinations"
  }));

  return new Response(JSON.stringify({
    object: "list",
    data: [...chatModels, ...imageModels]
  }), {
    headers: { "Content-Type": "application/json", ...corsHeaders }
  });
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
    object: "image-model",
    provider: meta.provider,
    name: meta.displayName,
    width: meta.width,
    height: meta.height
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
