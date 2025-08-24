#!/bin/bash

API_URL="https://ahamai-api.officialprakashkrsingh.workers.dev/v1/chat/completions"
API_KEY="ahamaipriv05"

MODELS=(
  "default"
  "perplexed"
  "felo"
  "exaanswer"
  "gemini-2.0-flash"
  "gemini-2.0-flash-thinking-exp-01-21"
  "gemini-2.5-flash-lite-preview-06-17"
  "gemini-2.5-flash"
  "deepseek-r1-distill-llama-70b"
  "llama-4-scout-17b-16e-instruct"
  "gemini-2.5-flash-preview-04-17"
  "qwen-3-coder-480b"
  "glm-4.5-air"
  "glm-4.5"
  "v0-1.0-md"
  "v0-1.5-md"
  "airforce-gpt-4o-mini"
  "cerebras-qwen-235b"
  "cerebras-qwen-235b-thinking"
  "cerebras-qwen-coder-480b"
  "cerebras-qwen-32b"
  "cerebras-gpt-120b"
  "groq-kimi-k2"
  "groq-llama-scout"
  "nvidia-gpt-oss-120b"
)

for model in "${MODELS[@]}"; do
  echo "Testing model: $model"
  curl -s --connect-timeout 10 -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $API_KEY" \
    -d '{
      "model": "'"$model"'",
      "messages": [{"role": "user", "content": "hello"}],
      "stream": true
    }' > "streaming_test_$model.log" &
done

# Wait for all background jobs to finish
wait

for model in "${MODELS[@]}"; do
    echo "----------------------------------------"
    echo "Verifying model: $model"
  if grep -q "data: \[DONE\]" "streaming_test_$model.log"; then
    echo "  ✅ Streaming works for $model"
  else
    echo "  ❌ Streaming failed for $model"
    echo "--- LOG START ---"
    cat "streaming_test_$model.log"
    echo "--- LOG END ---"
  fi
done
