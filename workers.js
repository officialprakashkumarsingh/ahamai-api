const API_KEY = "ahamaibyprakash25";

const exposedToInternalMap = {
  "claude-3-5-sonnet": "anthropic/claude-3-5-sonnet",
  "claude-3-7-sonnet": "anthropic/claude-3-7-sonnet",
  "claude-sonnet-4": "anthropic/claude-sonnet-4",
  "claude-3-5-sonnet-ashlynn": "ashlynn/claude-3-5-sonnet",
  "claude-sonnet-4-rproxy": "rproxy/claude-sonnet-4",
  "claude-opus-4": "rproxy/claude-opus-4",
  "Kimi-K2": "Kimi-K2",
  "DeepSeek-R1-Think": "DeepSeek-R1-Think",
  "DeepSeek-R1-0528-Think": "DeepSeek-R1-0528-Think",
  "DeepSeek-V3": "DeepSeek-V3",
  "Llama4-Maverick-17B-lnstruct": "Llama4-Maverick-17B-lnstruct",
  "Llama4-Scout-17B-16E-lnstruct": "Llama4-Scout-17B-16E-lnstruct",
  "grok-3-mini-beta": "HeckAI/x-ai/grok-3-mini-beta",
  "grok-3-mini-beta-server-2": "HeckAI/x-ai/grok-3-mini-beta",
  "grok-3-mini-fast": "SciraChat/grok-3-mini-fast",
  "grok-3-mini-fast-server-2": "SciraChat/grok-3-mini-fast",
  "grok-3-mini": "SciraChat/grok-3-mini",
  "grok-3-mini-server-2": "SciraChat/grok-3-mini",
  "grok-3-mini-flowith": "Flowith/grok-3-mini",
  "grok-3-mini-flowith-server-2": "Flowith/grok-3-mini",
  "grok-3-fast": "SciraChat/grok-3-fast",
  "grok-3-fast-server-2": "SciraChat/grok-3-fast",
  "grok-3-beta": "oivscode/grok-3-beta",
  "grok-3-beta-server-2": "oivscode/grok-3-beta",
  "grok-3-beta-toolbaz": "Toolbaz/grok-3-beta",
  "grok-3-beta-toolbaz-server-2": "Toolbaz/grok-3-beta",
  "grok-3-blackbox": "BLACKBOXAI/Grok 3",
  "grok-3-blackbox-server-2": "BLACKBOXAI/Grok 3"
};

const modelRoutes = {
  "anthropic/claude-3-5-sonnet": "http://V1.s1.sdk.li/v1/chat/completions",
  "anthropic/claude-3-7-sonnet": "http://V1.s1.sdk.li/v1/chat/completions",
  "anthropic/claude-sonnet-4": "http://V1.s1.sdk.li/v1/chat/completions",
  "ashlynn/claude-3-5-sonnet": "https://ai.ashlynn.workers.dev/ask",
  "rproxy/claude-sonnet-4": "https://rproxy-nine.vercel.app/v1/chat/completions",
  "rproxy/claude-opus-4": "https://rproxy-nine.vercel.app/v1/chat/completions",
  "Kimi-K2": "https://a7-at41rv.vercel.app/v1/chat/completions",
  "DeepSeek-R1-Think": "https://a7-at41rv.vercel.app/v1/chat/completions",
  "DeepSeek-R1-0528-Think": "https://a7-at41rv.vercel.app/v1/chat/completions",
  "DeepSeek-V3": "https://a7-at41rv.vercel.app/v1/chat/completions",
  "Llama4-Maverick-17B-lnstruct": "https://a7-at41rv.vercel.app/v1/chat/completions",
  "Llama4-Scout-17B-16E-lnstruct": "https://a7-at41rv.vercel.app/v1/chat/completions",
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

  // Handle ashlynn endpoint differently
  if (internalModel === "ashlynn/claude-3-5-sonnet") {
    return handleAshlynn(body, stream, corsHeaders);
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
