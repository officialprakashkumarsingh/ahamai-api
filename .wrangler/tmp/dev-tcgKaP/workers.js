var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// workers.js
var API_KEY = "ahamaibyprakash25";
var exposedToInternalMap = {
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
var modelRoutes = {
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
  vision: "claude-4-sonnet",
  // Default vision model
  webSearch: "sonar"
  // Default web search model
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
  let headers = {
    "Content-Type": "application/json"
  };
  if (modelRoutes[internalModel].includes("rproxy-nine.vercel.app")) {
    headers["Authorization"] = "Bearer dummy-key";
  } else if (modelRoutes[internalModel].includes("samuraiapi.in")) {
    headers["Authorization"] = "Bearer sk-KFzgj5NntdNGMVlyRF4bJVvXGhLLrxchu9xdwLEk5l3M9iHk";
  } else if (modelRoutes[internalModel].includes("api.helpingai.co")) {
    headers["Authorization"] = "Bearer hl-5acd8e0c-4bb1-458b-bb6a-9aec773d3199";
  } else if (modelRoutes[internalModel].includes("api.v0.dev")) {
    headers["Authorization"] = "Bearer v1:team_m5jgJm4W1wUMbgEjKzSQVapS:1QFTMtR5LJB9gqjdafPGyct1";
  } else {
    headers["Authorization"] = "Bearer LM0_QZMKWYVVUDYAIUDG.1748-UPYOUMDGIMAV";
  }
  const response = await fetch(modelRoutes[internalModel], {
    method: "POST",
    headers,
    body: JSON.stringify({ ...body, model: internalModel })
  });
  return stream ? new Response(response.body, {
    status: response.status,
    headers: {
      "Content-Type": "text/event-stream",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache",
      ...corsHeaders
    }
  }) : new Response(await response.text(), {
    status: response.status,
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
function handleModelList(corsHeaders = {}) {
  const chatModels = Object.keys(exposedToInternalMap).map((id) => ({
    id,
    object: "model",
    owned_by: "openai-compatible"
  }));
  const imageModels = Object.entries(imageModelRoutes).map(([id, meta]) => ({
    id,
    object: "model",
    owned_by: meta.provider
  }));
  return new Response(JSON.stringify({
    object: "list",
    data: [...chatModels, ...imageModels]
  }), {
    headers: { "Content-Type": "application/json", ...corsHeaders }
  });
}
__name(handleModelList, "handleModelList");
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

// ../home/ubuntu/.nvm/versions/node/v22.16.0/lib/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
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

// ../home/ubuntu/.nvm/versions/node/v22.16.0/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
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

// .wrangler/tmp/bundle-4vFHvD/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = workers_default;

// ../home/ubuntu/.nvm/versions/node/v22.16.0/lib/node_modules/wrangler/templates/middleware/common.ts
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

// .wrangler/tmp/bundle-4vFHvD/middleware-loader.entry.ts
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
