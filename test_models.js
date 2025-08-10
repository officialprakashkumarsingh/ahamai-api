#!/usr/bin/env node

const https = require('https');
const http = require('http');

// Model configurations from workers.js
const models = [
  // OpenAI-compatible proxy models
  "gpt-4o",
  "gpt-4o-mini", 
  "perplexed",
  "felo",
  "gpt-4.1-nano",
  "gpt-4.1-mini",
  "deepseek-chat",
  "deepseek-reasoner",
  "claude-3.5-haiku",
  "gemini-2.0-flash",
  "gemini-2.5-flash-proxy",
  "grok-3-mini",
  // DeepSeek R1
  "deepseek-r1",
  // Samurai API models
  "claude-sonnet-4",
  "claude-opus-4", 
  "grok-4",
  "kimi-k2-instruct"
];

const endpoints = [
  "https://gpt-oss-openai-proxy.onrender.com/v1/chat/completions",
  "https://fast.typegpt.net/v1/chat/completions", 
  "https://samuraiapi.in/v1/chat/completions"
];

async function testEndpoint(url) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-key'
      },
      timeout: 10000
    };

    const testPayload = JSON.stringify({
      model: "test",
      messages: [{"role": "user", "content": "Hello"}],
      max_tokens: 10
    });

    const req = (urlObj.protocol === 'https:' ? https : http).request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          responsive: res.statusCode < 500,
          response: data.substring(0, 200)
        });
      });
    });

    req.on('error', (error) => {
      resolve({
        url,
        status: 'ERROR',
        responsive: false,
        error: error.message
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        responsive: false,
        error: 'Request timeout'
      });
    });

    req.write(testPayload);
    req.end();
  });
}

async function testModel(workerUrl, model) {
  return new Promise((resolve) => {
    const urlObj = new URL(workerUrl);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ahamaibyprakash25'
      },
      timeout: 15000
    };

    const testPayload = JSON.stringify({
      model: model,
      messages: [{"role": "user", "content": "Say 'OK' if you can respond"}],
      max_tokens: 10
    });

    const req = (urlObj.protocol === 'https:' ? https : http).request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({
            model,
            status: res.statusCode,
            working: res.statusCode === 200 && parsed.choices && parsed.choices.length > 0,
            response: parsed.choices?.[0]?.message?.content || 'No content',
            error: parsed.error?.message
          });
        } catch (e) {
          resolve({
            model,
            status: res.statusCode,
            working: false,
            error: 'Invalid JSON response',
            rawResponse: data.substring(0, 200)
          });
        }
      });
    });

    req.on('error', (error) => {
      resolve({
        model,
        status: 'ERROR',
        working: false,
        error: error.message
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        model,
        status: 'TIMEOUT',
        working: false,
        error: 'Request timeout'
      });
    });

    req.write(testPayload);
    req.end();
  });
}

async function main() {
  console.log('🔍 Testing AI Chat Models Response Status\n');
  
  // First test endpoints directly
  console.log('📡 Testing Backend Endpoints:');
  console.log('=' .repeat(50));
  
  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint);
    const status = result.responsive ? '✅ RESPONSIVE' : '❌ DOWN';
    console.log(`${status} ${endpoint}`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  }
  
  console.log('\n🤖 Testing Models via Worker:');
  console.log('=' .repeat(50));
  
  // Ask user for worker URL since we can't determine it automatically
  console.log('⚠️  Please provide your Cloudflare Worker URL to test models');
  console.log('   Example: https://your-worker-name.your-subdomain.workers.dev');
  console.log('   Or run: wrangler dev to get a local URL\n');
  
  // For now, let's show what we would test
  console.log('📋 Models that would be tested:');
  models.forEach((model, index) => {
    console.log(`${(index + 1).toString().padStart(2)}. ${model}`);
  });
  
  console.log('\n💡 To test manually, you can use:');
  console.log('curl -X POST https://YOUR-WORKER-URL/v1/chat/completions \\');
  console.log('  -H "Content-Type: application/json" \\');
  console.log('  -H "Authorization: Bearer ahamaibyprakash25" \\');
  console.log('  -d \'{"model":"MODEL-NAME","messages":[{"role":"user","content":"Hello"}],"max_tokens":10}\'');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testModel, testEndpoint, models };