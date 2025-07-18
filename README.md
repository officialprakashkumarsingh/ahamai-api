# ahamai-api

This repository contains the Cloudflare Worker used for the `ahamai-api`.
The Worker implements routes for chat completions, image generation and
model listings.

## Deployment

Ensure you have [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
installed. Deploy with:

```sh
npx wrangler deploy
```

The `wrangler.toml` file specifies `workers.js` as the main entry point.

Store your OpenRouter key as a secret with:

```sh
npx wrangler secret put OPENROUTER_API_KEY
```

## Supported Models

The Worker proxies several OpenAI-compatible models. Current chat models are:

- `claude-3-5-sonnet`
- `claude-3-7-sonnet`
- `claude-sonnet-4`
- `Kimi K2` (via OpenRouter)

The Worker reads `OPENROUTER_API_KEY` from its environment to contact
OpenRouter. Clients only need the Worker API key (`ahamaibyprakash25`).
