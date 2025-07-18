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
  try {
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

  const { url, headers: routeHeaders } = modelRoutes[internalModel];

  if (stream) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(routeHeaders || {}) },
      body: JSON.stringify({ ...body, model: internalModel })
    });
    return new Response(res.body, {
      status: res.status,
      headers: {
        "Content-Type": "text/event-stream",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache"
      }
    });
  }

  const tools = body.tools || [
    {
      type: "function",
      function: {
        name: "web_search",
        description: "Search the web using DuckDuckGo and Wikipedia",
        parameters: {
          type: "object",
          properties: { query: { type: "string" } },
          required: ["query"]
        }
      }
    }
  ];

  const initialPayload = { ...body, model: internalModel, tools };
  const firstRes = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(routeHeaders || {}) },
    body: JSON.stringify(initialPayload)
  });

  const firstData = await firstRes.json();
  const toolCalls = firstData.choices?.[0]?.message?.tool_calls || [];

  if (toolCalls.length > 0) {
    const messages = body.messages || [];
    messages.push(firstData.choices[0].message);

    for (const call of toolCalls) {
      if (call.function?.name === "web_search") {
        let args = {};
        try {
          args = JSON.parse(call.function.arguments || "{}");
        } catch {}
        const result = await performWebSearch(args.query || "");
        messages.push({
          role: "tool",
          tool_call_id: call.id,
          content: JSON.stringify(result)
        });
      }
    }

    const finalRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(routeHeaders || {}) },
      body: JSON.stringify({ ...body, model: internalModel, messages })
    });
    return new Response(await finalRes.text(), {
      status: finalRes.status,
      headers: { "Content-Type": "application/json" }
    });
  }

    return new Response(JSON.stringify(firstData), {
      status: firstRes.status,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
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

async function performWebSearch(query) {
  const results = [];

  try {
    const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
    const ddgRes = await fetch(ddgUrl);
    if (ddgRes.ok) {
      const data = await ddgRes.json();
      if (data.AbstractText) {
        results.push({ text: data.AbstractText, source: data.AbstractURL });
      }
      if (Array.isArray(data.RelatedTopics)) {
        for (const item of data.RelatedTopics) {
          if (item.Text && item.FirstURL) {
            results.push({ text: item.Text, source: item.FirstURL });
          } else if (item.Topics) {
            for (const sub of item.Topics) {
              if (sub.Text && sub.FirstURL) {
                results.push({ text: sub.Text, source: sub.FirstURL });
              }
            }
          }
        }
      }
    }
  } catch (err) {
    results.push({ text: `DuckDuckGo search failed: ${err.message}` });
  }

  try {
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;
    const wikiRes = await fetch(wikiUrl);
    if (wikiRes.ok) {
      const wikiData = await wikiRes.json();
      const searchResults = wikiData?.query?.search || [];
      for (const r of searchResults.slice(0, 3)) {
        const pageUrl = `https://en.wikipedia.org/?curid=${r.pageid}`;
        results.push({ text: r.snippet.replace(/<[^>]+>/g, ""), source: pageUrl });
      }
    }
  } catch (err) {
    results.push({ text: `Wikipedia search failed: ${err.message}` });
  }

  return { query, time: new Date().toISOString(), results };
}
