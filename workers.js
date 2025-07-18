const API_KEY = "ahamaibyprakash25";

const exposedToInternalMap = {
  "claude-3-5-sonnet": "anthropic/claude-3-5-sonnet",
  "claude-3-7-sonnet": "anthropic/claude-3-7-sonnet",
  "claude-sonnet-4": "anthropic/claude-sonnet-4"
};

const modelRoutes = {
  "anthropic/claude-3-5-sonnet": "http://V1.s1.sdk.li/v1/chat/completions",
  "anthropic/claude-3-7-sonnet": "http://V1.s1.sdk.li/v1/chat/completions",
  "anthropic/claude-sonnet-4": "http://V1.s1.sdk.li/v1/chat/completions"
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

    // Auth check
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || authHeader !== `Bearer ${API_KEY}`) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (path === "/v1/chat/completions" && request.method === "POST") {
      return handleChat(request);
    }

    if (path === "/v1/images/generations" && request.method === "POST") {
      return handleImage(request);
    }

    if (path === "/v1/models" && request.method === "GET") {
      return handleModelList();
    }

    if (path === "/v1/chat/models" && request.method === "GET") {
      return handleChatModelList();
    }

    if (path === "/v1/images/models" && request.method === "GET") {
      return handleImageModelList();
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }
};

async function handleChat(request) {
  const body = await request.json();
  const exposedModel = body.model;
  const internalModel = exposedToInternalMap[exposedModel];
  const stream = body.stream === true;

  if (!internalModel || !modelRoutes[internalModel]) {
    return new Response(JSON.stringify({ error: `Model '${exposedModel}' is not supported.` }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const response = await fetch(modelRoutes[internalModel], {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, model: internalModel })
  });

  return stream
    ? new Response(response.body, {
        status: response.status,
        headers: {
          "Content-Type": "text/event-stream",
          "Transfer-Encoding": "chunked",
          "Cache-Control": "no-cache"
        }
      })
    : new Response(await response.text(), {
        status: response.status,
        headers: { "Content-Type": "application/json" }
      });
}

async function handleImage(request) {
  const body = await request.json();
  const model = body.model || "flux";
  const prompt = encodeURIComponent(body.prompt || "");

  if (!imageModelRoutes[model]) {
    return new Response(JSON.stringify({ error: `Image model '${model}' is not supported.` }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
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
      "Transfer-Encoding": "chunked"
    }
  });
}

function handleModelList() {
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
    headers: { "Content-Type": "application/json" }
  });
}

function handleChatModelList() {
  const chatModels = Object.keys(exposedToInternalMap).map((id) => ({
    id,
    object: "model",
    owned_by: "openai-compatible"
  }));

  return new Response(JSON.stringify({
    object: "list",
    data: chatModels
  }), {
    headers: { "Content-Type": "application/json" }
  });
}

function handleImageModelList() {
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
    headers: { "Content-Type": "application/json" }
  });
}
