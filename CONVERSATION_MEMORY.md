# Conversation Memory System

## Overview
The AI now has the ability to remember previous conversations with users, storing up to 10 previous messages (5 exchanges) per conversation. This creates a more natural and context-aware chat experience.

## Features

### 🧠 Automatic Memory
- **Remembers last 10 messages** per conversation
- **24-hour retention** - conversations expire after 24 hours
- **User-specific** - each user has their own conversation history
- **Multiple conversations** - support for separate conversation threads

### 🔧 Configuration Options

When making chat requests, you can control memory behavior:

```json
{
  "model": "gpt-oss-20b",
  "messages": [{"role": "user", "content": "Hello"}],
  "use_memory": true,          // Enable/disable memory (default: true)
  "conversation_id": "chat-123", // Separate conversation threads (default: "default")
  "clear_memory": false         // Clear history before this request (default: false)
}
```

## API Endpoints

### Chat with Memory
`POST /v1/chat/completions`
- Standard chat endpoint with automatic memory support
- Set `use_memory: false` to disable memory for a specific request
- Use `conversation_id` to maintain separate conversation threads

### Get Conversation Info
`GET /v1/conversations/info`
- Returns memory system configuration and status

### List User Conversations
`GET /v1/conversations`
- Lists all conversation IDs for the current user

### Get Conversation History
`GET /v1/conversations/history?conversation_id=<id>`
- Retrieves the message history for a specific conversation

### Clear Conversation
`POST /v1/conversations/clear`
```json
{
  "conversation_id": "chat-123"  // Optional, defaults to "default"
}
```

## Usage Examples

### Basic Conversation with Memory
```javascript
// First message
const response1 = await fetch("/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
  },
  body: JSON.stringify({
    model: "gpt-oss-20b",
    messages: [
      { role: "user", content: "My name is Alice" }
    ]
  })
});

// Second message - AI will remember your name
const response2 = await fetch("/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
  },
  body: JSON.stringify({
    model: "gpt-oss-20b",
    messages: [
      { role: "user", content: "What's my name?" }
    ]
  })
});
// AI responds: "Your name is Alice"
```

### Multiple Conversation Threads
```javascript
// Conversation about coding
await fetch("/v1/chat/completions", {
  body: JSON.stringify({
    model: "gpt-oss-20b",
    messages: [{ role: "user", content: "Help me with Python" }],
    conversation_id: "coding-help"
  })
});

// Separate conversation about recipes
await fetch("/v1/chat/completions", {
  body: JSON.stringify({
    model: "gpt-oss-20b",
    messages: [{ role: "user", content: "Recipe for pasta" }],
    conversation_id: "cooking"
  })
});
```

### Clear and Start Fresh
```javascript
await fetch("/v1/chat/completions", {
  body: JSON.stringify({
    model: "gpt-oss-20b",
    messages: [{ role: "user", content: "Let's start over" }],
    clear_memory: true  // Clears history before processing
  })
});
```

## Deployment Setup

### 1. Create KV Namespace
```bash
wrangler kv:namespace create "CONVERSATIONS"
```

### 2. Update wrangler.toml
Replace the placeholder IDs with the actual IDs from step 1:
```toml
[[kv_namespaces]]
binding = "CONVERSATIONS"
id = "your_actual_kv_id"
preview_id = "your_preview_kv_id"
```

### 3. Deploy
```bash
wrangler publish
```

## Privacy & Security

- **User Isolation**: Each user's conversations are isolated based on their authentication token and client information
- **Auto-Expiry**: Conversations automatically expire after 24 hours
- **No Cross-User Access**: Users cannot access other users' conversation histories
- **Manual Clear**: Users can manually clear their conversation history at any time

## Limitations

- Maximum 10 messages stored per conversation (5 user + 5 assistant messages)
- Conversations expire after 24 hours
- Streaming responses are not saved to memory (only non-streaming)
- Requires Cloudflare Workers KV storage (not available in local development without setup)

## Testing

Run the test script to verify memory functionality:
```bash
node test_conversation_memory.js
```

Note: Full functionality requires deployment with KV namespace configured.