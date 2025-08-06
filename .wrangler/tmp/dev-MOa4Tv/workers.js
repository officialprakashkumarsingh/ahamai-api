var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// workers.js
var API_KEY = "ahamaibyprakash25";
var exposedToInternalMap = {
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
  // Samurai API models with Paid prefix (simple naming)
  "claude-sonnet-4": "Paid/bedrock/us.anthropic.claude-sonnet-4-20250514-v1:0",
  "claude-opus-4": "Paid/bedrock/us.anthropic.claude-opus-4-20250514-v1:0",
  "grok-4": "Paid/xai/grok-4"
};
var modelRoutes = {
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
  // Samurai API models with Paid prefix (renamed for client)
  "Paid/bedrock/us.anthropic.claude-sonnet-4-20250514-v1:0": "https://samuraiapi.in/v1/chat/completions",
  "Paid/bedrock/us.anthropic.claude-opus-4-20250514-v1:0": "https://samuraiapi.in/v1/chat/completions",
  "Paid/xai/grok-4": "https://samuraiapi.in/v1/chat/completions"
};
var imageModelRoutes = {
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
var defaultModels = {
  vision: "claude-sonnet-4",
  // Default vision model
  webSearch: "claude-sonnet-4"
  // Default web search model
};
function getWorkingModels() {
  const reliableModels = [];
  for (const [exposedModel, internalModel] of Object.entries(exposedToInternalMap)) {
    const route = modelRoutes[internalModel];
    if (route && (route.includes("samuraiapi.in") || route.includes("fast.typegpt.net"))) {
      reliableModels.push(exposedModel);
    }
  }
  return reliableModels;
}
__name(getWorkingModels, "getWorkingModels");
var modelCategories = {
  claude: ["claude-sonnet-4", "claude-opus-4", "claude-3.5-sonnet", "claude-3.7-sonnet", "claude-3.7-sonnet-thought"],
  openai: ["gpt-4o", "gpt-4.1", "o1", "o3-mini", "o4-mini"],
  google: ["gemini-2.0-flash-001", "gemini-2.5-pro"],
  xai: ["grok-4"],
  deepseek: ["deepseek-r1"]
};
var workers_default = {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    };
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders
      });
    }
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
function getIntelligentFallback(originalModel) {
  const workingModels = getWorkingModels();
  for (const [category, models] of Object.entries(modelCategories)) {
    if (models.includes(originalModel)) {
      for (const model of models) {
        if (model !== originalModel && workingModels.includes(model)) {
          return model;
        }
      }
    }
  }
  return workingModels[0];
}
__name(getIntelligentFallback, "getIntelligentFallback");
async function tryModelRequest(modelId, requestBody, stream, corsHeaders) {
  const internalModel = exposedToInternalMap[modelId];
  if (!internalModel || !modelRoutes[internalModel]) {
    return null;
  }
  let headers = {
    "Content-Type": "application/json"
  };
  if (modelRoutes[internalModel].includes("samfy001-giuthubsss.hf.space")) {
  } else if (modelRoutes[internalModel].includes("fast.typegpt.net")) {
    headers["Authorization"] = "Bearer sk-BiEn3R0oF1aUTAwK8pWUEqvsxBvoHXffvtLBaC5NApX4SViv";
  } else if (modelRoutes[internalModel].includes("samuraiapi.in")) {
    headers["Authorization"] = "Bearer sk-IvMBi9qmzLiWHl0RpJ9KbyJpczm9YSIHAnMU2aDBbkpbYLF8";
  }
  try {
    const response = await fetch(modelRoutes[internalModel], {
      method: "POST",
      headers,
      body: JSON.stringify({ ...requestBody, model: internalModel })
    });
    if (!response.ok || response.status >= 400) {
      return null;
    }
    if (!stream) {
      const responseText = await response.text();
      try {
        const responseJson = JSON.parse(responseText);
        if (responseJson.error || responseJson.choices && responseJson.choices[0] && responseJson.choices[0].message && (responseJson.choices[0].message.content === "" || responseJson.choices[0].message.content.includes("I apologize, but I encountered an error"))) {
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
    if (modelRoutes[internalModel].includes("samfy001-giuthubsss.hf.space")) {
      return null;
    }
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
}
__name(tryModelRequest, "tryModelRequest");
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
  let result = await tryModelRequest(exposedModel, body, stream, corsHeaders);
  if (result) {
    return result;
  }
  const intelligentFallback = getIntelligentFallback(exposedModel);
  if (intelligentFallback !== exposedModel) {
    result = await tryModelRequest(intelligentFallback, body, stream, corsHeaders);
    if (result) {
      return result;
    }
  }
  const workingModels = getWorkingModels();
  for (const fallbackModel of workingModels) {
    if (fallbackModel !== exposedModel && fallbackModel !== intelligentFallback) {
      result = await tryModelRequest(fallbackModel, body, stream, corsHeaders);
      if (result) {
        return result;
      }
    }
  }
  return new Response(JSON.stringify({
    error: `Model '${exposedModel}' and all fallback models are currently unavailable. Please try again later.`,
    attempted_fallbacks: workingModels
  }), {
    status: 503,
    headers: { "Content-Type": "application/json", ...corsHeaders }
  });
}
__name(handleChat, "handleChat");
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
    const requestBody = {
      model,
      prompt,
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
__name(handleImage, "handleImage");
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
__name(handleChatModelList, "handleChatModelList");
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
__name(handleImageModelList, "handleImageModelList");
function handleDefaults(corsHeaders = {}) {
  return new Response(JSON.stringify({
    vision: defaultModels.vision,
    webSearch: defaultModels.webSearch
  }), {
    headers: { "Content-Type": "application/json", ...corsHeaders }
  });
}
__name(handleDefaults, "handleDefaults");
async function handleUrlAutomation(request, corsHeaders) {
  const body = await request.json();
  const { action, url, data } = body;
  const automationResponse = {
    action,
    url,
    success: true,
    message: `Automation action '${action}' processed`,
    data: data || {}
  };
  switch (action) {
    case "youtube_search":
      automationResponse.url = `https://www.youtube.com/results?search_query=${encodeURIComponent(data.query)}`;
      break;
    case "scroll_page":
      automationResponse.script = `window.scrollTo(0, ${data.position || 0});`;
      break;
    case "fill_input":
      automationResponse.script = `document.querySelector('${data.selector}').value = '${data.value}';`;
      break;
    case "click_element":
      automationResponse.script = `document.querySelector('${data.selector}').click();`;
      break;
    case "login":
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
__name(handleUrlAutomation, "handleUrlAutomation");

// ../home/ubuntu/.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../home/ubuntu/.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-KOm8e6/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = workers_default;

// ../home/ubuntu/.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-KOm8e6/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=workers.js.map
