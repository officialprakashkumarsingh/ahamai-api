const API_KEY = "ahamaibyprakash25";

const exposedToInternalMap = {
  "claude-sonnet-4": "rproxy/claude-sonnet-4",
  "claude-opus-4": "rproxy/claude-opus-4",
  "grok-3-mini-beta": "HeckAI/x-ai/grok-3-mini-beta",
  "grok-3-mini-fast": "SciraChat/grok-3-mini-fast",
  "grok-3-mini": "SciraChat/grok-3-mini",
  "grok-3-mini-server-2": "Flowith/grok-3-mini",
  "grok-3-fast": "SciraChat/grok-3-fast",
  "grok-3-beta": "oivscode/grok-3-beta",
  "grok-3-beta-server-2": "Toolbaz/grok-3-beta",
  "grok-3-blackbox": "BLACKBOXAI/Grok 3"
};

const modelRoutes = {
  "rproxy/claude-sonnet-4": "https://rproxy-nine.vercel.app/v1/chat/completions",
  "rproxy/claude-opus-4": "https://rproxy-nine.vercel.app/v1/chat/completions",
  "HeckAI/x-ai/grok-3-mini-beta": "https://ai4free-test.hf.space/v1/chat/completions",
  "SciraChat/grok-3-mini-fast": "https://ai4free-test.hf.space/v1/chat/completions",
  "SciraChat/grok-3-mini": "https://ai4free-test.hf.space/v1/chat/completions",
  "Flowith/grok-3-mini": "https://ai4free-test.hf.space/v1/chat/completions",
  "SciraChat/grok-3-fast": "https://ai4free-test.hf.space/v1/chat/completions",
  "oivscode/grok-3-beta": "https://ai4free-test.hf.space/v1/chat/completions",
  "Toolbaz/grok-3-beta": "https://ai4free-test.hf.space/v1/chat/completions",
  "BLACKBOXAI/Grok 3": "https://ai4free-test.hf.space/v1/chat/completions"
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



  // Prepare headers based on the model
  const headers = { "Content-Type": "application/json" };

  // For rproxy models, use the original exposed model name
  let requestModel = internalModel;
  if (internalModel === "rproxy/claude-sonnet-4") {
    requestModel = "claude-sonnet-4";
  } else if (internalModel === "rproxy/claude-opus-4") {
    requestModel = "claude-opus-4";
  }

  const response = await fetch(modelRoutes[internalModel], {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ ...body, model: requestModel })
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
