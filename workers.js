const API_KEY = "ahamaibyprakash25";

const exposedToInternalMap = {
  "claude-3-5-sonnet": "anthropic/claude-3-5-sonnet",
  "claude-3-7-sonnet": "anthropic/claude-3-7-sonnet",
  "claude-sonnet-4": "anthropic/claude-sonnet-4",
  "claude-3-5-sonnet-ashlynn": "ashlynn/claude-3-5-sonnet",
  // Vision models
  "claude-4-sonnet": "io-8/claude-4-sonnet",
  "claude-4-opus": "io-8/claude-4-opus",
  "claude-3.7-sonnet-vision": "io-8/claude-3.7-sonnet",
  "claude-3.5-sonnet-vision": "io-8/claude-3.5-sonnet",
  // Web search models
  "sonar": "io-4/sonar",
  "sonar-pro": "io-4/sonar-pro"
};

const modelRoutes = {
  "anthropic/claude-3-5-sonnet": "https://lm.0.sdk.li/v1/chat/completions",
  "anthropic/claude-3-7-sonnet": "https://lm.0.sdk.li/v1/chat/completions",
  "anthropic/claude-sonnet-4": "https://lm.0.sdk.li/v1/chat/completions",
  "ashlynn/claude-3-5-sonnet": "https://ai.ashlynn.workers.dev/ask",
  // Vision models routes
  "io-8/claude-4-sonnet": "https://lm.0.sdk.li/v1/chat/completions",
  "io-8/claude-4-opus": "https://lm.0.sdk.li/v1/chat/completions",
  "io-8/claude-3.7-sonnet": "https://lm.0.sdk.li/v1/chat/completions",
  "io-8/claude-3.5-sonnet": "https://lm.0.sdk.li/v1/chat/completions",
  // Web search models routes
  "io-4/sonar": "https://lm.0.sdk.li/v1/chat/completions",
  "io-4/sonar-pro": "https://lm.0.sdk.li/v1/chat/completions"
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

  // Handle ashlynn endpoint differently
  if (internalModel === "ashlynn/claude-3-5-sonnet") {
    return handleAshlynn(body, stream, corsHeaders);
  }

  // Prepare headers based on the model
  const headers = { 
    "Content-Type": "application/json",
    "Authorization": "Bearer LM0_QZMKWYVVUDYAIUDG.1748-UPYOUMDGIMAV"
  };

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

async function handleAshlynn(body, stream, corsHeaders) {
  // Extract the user message from the OpenAI format
  const messages = body.messages || [];
  const lastMessage = messages[messages.length - 1];
  const prompt = lastMessage?.content || "";
  
  if (!prompt) {
    return new Response(JSON.stringify({ error: "No prompt provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }

  // Make request to ashlynn endpoint with Claude 3.5 Sonnet
  const encodedPrompt = encodeURIComponent(prompt);
  const ashlynnUrl = `https://ai.ashlynn.workers.dev/ask?prompt=${encodedPrompt}&model=Claude+3.5+Sonnet`;
  
  try {
    const response = await fetch(ashlynnUrl);
    const data = await response.json();
    
    if (!data.success) {
      return new Response(JSON.stringify({ error: data.error || "Request failed" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    // Convert to OpenAI format
    const openaiResponse = {
      id: `chatcmpl-${Date.now()}`,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model: "claude-3-5-sonnet-ashlynn",
      choices: [{
        index: 0,
        message: {
          role: "assistant",
          content: data.response
        },
        finish_reason: "stop"
      }],
      usage: {
        prompt_tokens: prompt.length,
        completion_tokens: data.response.length,
        total_tokens: prompt.length + data.response.length
      }
    };

    if (stream) {
      // For streaming, create a simple stream with the complete response
      const streamData = `data: ${JSON.stringify({
        id: openaiResponse.id,
        object: "chat.completion.chunk",
        created: openaiResponse.created,
        model: "claude-3-5-sonnet-ashlynn",
        choices: [{
          index: 0,
          delta: {
            role: "assistant",
            content: data.response
          },
          finish_reason: "stop"
        }]
      })}\n\ndata: [DONE]\n\n`;

      return new Response(streamData, {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          ...corsHeaders
        }
      });
    }

    return new Response(JSON.stringify(openaiResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to process request" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
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
