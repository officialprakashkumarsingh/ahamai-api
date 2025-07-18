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

Before deploying, ensure `wrangler` can access your Cloudflare account by
running `npx wrangler login` or by setting a `CLOUDFLARE_API_TOKEN` environment
variable.

Clients only need the Worker API key (`ahamaibyprakash25`).

## Supported Models

The Worker proxies several OpenAI-compatible models. Current chat models are:

- `claude-3-5-sonnet`
- `claude-3-7-sonnet`
- `claude-sonnet-4`

## Web Search

An additional `/v1/web-search` endpoint performs basic web searches using free
sources such as DuckDuckGo. Requests should provide a `q` query parameter.
Results include a timestamp indicating when the search was performed.
