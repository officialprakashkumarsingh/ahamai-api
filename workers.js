const API_KEY = "ahamaibyprakash25";

const exposedToInternalMap = {
  // Vision models
  "claude-4-sonnet": "io-8/claude-4-sonnet",
  "claude-4-opus": "io-8/claude-4-opus",
  "claude-3.7-sonnet": "io-8/claude-3.7-sonnet",
  "claude-3.5-sonnet": "io-8/claude-3.5-sonnet",
  "kimi-k2": "groq/moonshotai/kimi-k2",
  "kimi-k2-instruct": "groq/moonshotai/kimi-k2-instruct",
  "grok-3": "grok-3(clinesp)",
  "qwen3-coder-480B-A35B-instruct": "provider5-Qwen/Qwen3-Coder-480B-A35B-Instruct",
  "deepseek-chat-v3-0324-free": "deepseek-chat-v3-0324:free(clinesp)",
  // DeepSeek R1 - Free & Uncensored
  "deepseek-r1": "NiansuhAI/DeepSeek-R1",
  // Web search models
  "sonar": "io-4/sonar",
  "sonar-pro": "io-4/sonar-pro",
  // New server 2 models from rproxy-nine.vercel.app
  "claude-sonnet-4-2": "claude-sonnet-4",
  "claude-opus-4-2": "claude-opus-4",
  // HelpingAI models
  "dhanishtha-2.0-preview": "Dhanishtha-2.0-preview",
  "dhanishtha-2.0-preview-mini": "Dhanishtha-2.0-preview-mini",
  // v0.dev models
  "v0-1.0-md": "v0-1.0-md",
  "v0-1.5-md": "v0-1.5-md",
  "v0-1.5-lg": "v0-1.5-lg"
};

const modelRoutes = {
  // Vision models routes
  "io-8/claude-4-sonnet": "https://lm.0.sdk.li/v1/chat/completions",
  "io-8/claude-4-opus": "https://lm.0.sdk.li/v1/chat/completions",
  "io-8/claude-3.7-sonnet": "https://lm.0.sdk.li/v1/chat/completions",
  "io-8/claude-3.5-sonnet": "https://lm.0.sdk.li/v1/chat/completions",
  "groq/moonshotai/kimi-k2": "https://samuraiapi.in/v1/chat/completions",
  "groq/moonshotai/kimi-k2-instruct": "https://samuraiapi.in/v1/chat/completions",
  "grok-3(clinesp)": "https://samuraiapi.in/v1/chat/completions",
  "provider5-Qwen/Qwen3-Coder-480B-A35B-Instruct": "https://samuraiapi.in/v1/chat/completions",
  "deepseek-chat-v3-0324:free(clinesp)": "https://samuraiapi.in/v1/chat/completions",
  // DeepSeek R1 - Free & Uncensored
  "NiansuhAI/DeepSeek-R1": "https://fast.typegpt.net/v1/chat/completions",
  // Web search models routes
  "io-4/sonar": "https://lm.0.sdk.li/v1/chat/completions",
  "io-4/sonar-pro": "https://lm.0.sdk.li/v1/chat/completions",
  // New server 2 models routes
  "claude-sonnet-4": "https://rproxy-nine.vercel.app/v1/chat/completions",
  "claude-opus-4": "https://rproxy-nine.vercel.app/v1/chat/completions",
  // HelpingAI models routes
  "Dhanishtha-2.0-preview": "https://api.helpingai.co/v1/chat/completions",
  "Dhanishtha-2.0-preview-mini": "https://api.helpingai.co/v1/chat/completions",
  // v0.dev models routes
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
  if (modelRoutes[internalModel].includes('rproxy-nine.vercel.app')) {
    // For the new rproxy endpoint, no specific auth key needed
    headers["Authorization"] = "Bearer dummy-key";
  } else if (modelRoutes[internalModel].includes('samuraiapi.in')) {
    headers["Authorization"] = "Bearer sk-KFzgj5NntdNGMVlyRF4bJVvXGhLLrxchu9xdwLEk5l3M9iHk";
  } else if (modelRoutes[internalModel].includes('api.helpingai.co')) {
    // For HelpingAI endpoint
    headers["Authorization"] = "Bearer hl-5acd8e0c-4bb1-458b-bb6a-9aec773d3199";
  } else if (modelRoutes[internalModel].includes('api.v0.dev')) {
    // For v0.dev endpoint
    headers["Authorization"] = "Bearer v1:team_m5jgJm4W1wUMbgEjKzSQVapS:1QFTMtR5LJB9gqjdafPGyct1";
  } else if (modelRoutes[internalModel].includes('fast.typegpt.net')) {
    // For DeepSeek R1 endpoint
    headers["Authorization"] = "Bearer sk-BiEn3R0oF1aUTAwK8pWUEqvsxBvoHXffvtLBaC5NApX4SViv";
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
