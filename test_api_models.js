#!/usr/bin/env node

const API_KEY = "ahamaibyprakash25";
const BASE_URL = "http://localhost:8787"; // Change this to your actual worker URL

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// All chat models from the worker
const chatModels = [
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
  "deepseek-r1",
  "claude-sonnet-4",
  "claude-opus-4",
  "grok-4",
  "kimi-k2-instruct"
];

// All image models from the worker
const imageModels = [
  "flux",
  "turbo",
  "img3",
  "img4",
  "uncen",
  "gemini2.0"
];

// Test results storage
const testResults = {
  chat: {},
  image: {},
  summary: {
    totalChatModels: chatModels.length,
    workingChatModels: 0,
    failedChatModels: 0,
    totalImageModels: imageModels.length,
    workingImageModels: 0,
    failedImageModels: 0
  }
};

// Helper function to make API requests
async function makeRequest(url, options) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        ...options.headers
      }
    });
    
    const data = await response.json();
    return { success: response.ok, status: response.status, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Test a single chat model
async function testChatModel(model) {
  console.log(`${colors.cyan}Testing chat model: ${colors.bright}${model}${colors.reset}`);
  
  const startTime = Date.now();
  
  const requestBody = {
    model: model,
    messages: [
      {
        role: "user",
        content: "Say 'Hello, I am working!' in exactly 5 words."
      }
    ],
    max_tokens: 50,
    temperature: 0.1
  };
  
  const result = await makeRequest(`${BASE_URL}/v1/chat/completions`, {
    method: "POST",
    body: JSON.stringify(requestBody)
  });
  
  const responseTime = Date.now() - startTime;
  
  if (result.success) {
    console.log(`${colors.green}✓ ${model} is working${colors.reset} (${responseTime}ms)`);
    
    // Extract the response content
    let responseText = "N/A";
    if (result.data && result.data.choices && result.data.choices[0]) {
      responseText = result.data.choices[0].message?.content || "No content";
    }
    
    testResults.chat[model] = {
      status: "working",
      responseTime: responseTime,
      response: responseText.substring(0, 100), // Limit response length for report
      statusCode: result.status
    };
    testResults.summary.workingChatModels++;
  } else {
    console.log(`${colors.red}✗ ${model} failed${colors.reset} - ${result.error || `Status: ${result.status}`}`);
    
    testResults.chat[model] = {
      status: "failed",
      error: result.error || result.data?.error || `HTTP ${result.status}`,
      statusCode: result.status || "N/A"
    };
    testResults.summary.failedChatModels++;
  }
  
  // Add a small delay between tests to avoid rate limiting
  await new Promise(resolve => setTimeout(resolve, 500));
}

// Test a single image model
async function testImageModel(model) {
  console.log(`${colors.magenta}Testing image model: ${colors.bright}${model}${colors.reset}`);
  
  const startTime = Date.now();
  
  const requestBody = {
    model: model,
    prompt: "A simple test image with the text 'API TEST' clearly visible",
    width: 512,
    height: 512
  };
  
  const result = await makeRequest(`${BASE_URL}/v1/images/generations`, {
    method: "POST",
    body: JSON.stringify(requestBody)
  });
  
  const responseTime = Date.now() - startTime;
  
  if (result.success) {
    console.log(`${colors.green}✓ ${model} is working${colors.reset} (${responseTime}ms)`);
    
    testResults.image[model] = {
      status: "working",
      responseTime: responseTime,
      statusCode: result.status
    };
    testResults.summary.workingImageModels++;
  } else {
    console.log(`${colors.red}✗ ${model} failed${colors.reset} - ${result.error || `Status: ${result.status}`}`);
    
    testResults.image[model] = {
      status: "failed",
      error: result.error || result.data?.error || `HTTP ${result.status}`,
      statusCode: result.status || "N/A"
    };
    testResults.summary.failedImageModels++;
  }
  
  // Add a small delay between tests
  await new Promise(resolve => setTimeout(resolve, 500));
}

// Generate detailed report
function generateReport() {
  console.log("\n" + "=".repeat(80));
  console.log(`${colors.bright}${colors.blue}API MODELS TEST REPORT${colors.reset}`);
  console.log("=".repeat(80));
  
  // Summary
  console.log(`\n${colors.bright}SUMMARY:${colors.reset}`);
  console.log(`Total Chat Models: ${testResults.summary.totalChatModels}`);
  console.log(`${colors.green}Working Chat Models: ${testResults.summary.workingChatModels}${colors.reset}`);
  console.log(`${colors.red}Failed Chat Models: ${testResults.summary.failedChatModels}${colors.reset}`);
  console.log(`\nTotal Image Models: ${testResults.summary.totalImageModels}`);
  console.log(`${colors.green}Working Image Models: ${testResults.summary.workingImageModels}${colors.reset}`);
  console.log(`${colors.red}Failed Image Models: ${testResults.summary.failedImageModels}${colors.reset}`);
  
  // Chat Models Details
  console.log(`\n${colors.bright}${colors.cyan}CHAT MODELS DETAILS:${colors.reset}`);
  console.log("-".repeat(80));
  
  const workingChat = [];
  const failedChat = [];
  
  for (const [model, result] of Object.entries(testResults.chat)) {
    if (result.status === "working") {
      workingChat.push(model);
      console.log(`${colors.green}✓ ${model}${colors.reset}`);
      console.log(`  Response Time: ${result.responseTime}ms`);
      console.log(`  Sample Response: "${result.response}"`);
    } else {
      failedChat.push(model);
    }
  }
  
  if (failedChat.length > 0) {
    console.log(`\n${colors.red}Failed Chat Models:${colors.reset}`);
    for (const model of failedChat) {
      const result = testResults.chat[model];
      console.log(`${colors.red}✗ ${model}${colors.reset}`);
      console.log(`  Error: ${result.error}`);
      console.log(`  Status Code: ${result.statusCode}`);
    }
  }
  
  // Image Models Details
  console.log(`\n${colors.bright}${colors.magenta}IMAGE MODELS DETAILS:${colors.reset}`);
  console.log("-".repeat(80));
  
  const workingImage = [];
  const failedImage = [];
  
  for (const [model, result] of Object.entries(testResults.image)) {
    if (result.status === "working") {
      workingImage.push(model);
      console.log(`${colors.green}✓ ${model}${colors.reset}`);
      console.log(`  Response Time: ${result.responseTime}ms`);
    } else {
      failedImage.push(model);
    }
  }
  
  if (failedImage.length > 0) {
    console.log(`\n${colors.red}Failed Image Models:${colors.reset}`);
    for (const model of failedImage) {
      const result = testResults.image[model];
      console.log(`${colors.red}✗ ${model}${colors.reset}`);
      console.log(`  Error: ${result.error}`);
      console.log(`  Status Code: ${result.statusCode}`);
    }
  }
  
  // Recommendations
  console.log(`\n${colors.bright}${colors.yellow}RECOMMENDATIONS:${colors.reset}`);
  console.log("-".repeat(80));
  
  if (workingChat.length > 0) {
    console.log(`${colors.green}Recommended Chat Models:${colors.reset}`);
    const topChat = workingChat.slice(0, 5);
    topChat.forEach(model => {
      const responseTime = testResults.chat[model].responseTime;
      console.log(`  • ${model} (${responseTime}ms)`);
    });
  }
  
  if (workingImage.length > 0) {
    console.log(`\n${colors.green}Recommended Image Models:${colors.reset}`);
    workingImage.forEach(model => {
      const responseTime = testResults.image[model].responseTime;
      console.log(`  • ${model} (${responseTime}ms)`);
    });
  }
  
  // Save results to file
  const reportData = {
    timestamp: new Date().toISOString(),
    results: testResults,
    workingModels: {
      chat: workingChat,
      image: workingImage
    },
    failedModels: {
      chat: failedChat,
      image: failedImage
    }
  };
  
  require('fs').writeFileSync('test_results.json', JSON.stringify(reportData, null, 2));
  console.log(`\n${colors.bright}Full results saved to: test_results.json${colors.reset}`);
  
  console.log("\n" + "=".repeat(80));
}

// Main test function
async function runTests() {
  console.log(`${colors.bright}${colors.blue}Starting API Models Test...${colors.reset}`);
  console.log(`Testing against: ${BASE_URL}`);
  console.log(`Using API Key: ${API_KEY.substring(0, 10)}...`);
  console.log("-".repeat(80));
  
  // Test chat models
  console.log(`\n${colors.bright}Testing Chat Models...${colors.reset}\n`);
  for (const model of chatModels) {
    await testChatModel(model);
  }
  
  // Test image models
  console.log(`\n${colors.bright}Testing Image Models...${colors.reset}\n`);
  for (const model of imageModels) {
    await testImageModel(model);
  }
  
  // Generate and display report
  generateReport();
}

// Check if running directly or being imported
if (require.main === module) {
  // Parse command line arguments
  const args = process.argv.slice(2);
  if (args.length > 0) {
    // Allow overriding the base URL from command line
    const urlArg = args.find(arg => arg.startsWith('--url='));
    if (urlArg) {
      const customUrl = urlArg.split('=')[1];
      console.log(`Using custom URL: ${customUrl}`);
      Object.defineProperty(module.exports, 'BASE_URL', {
        value: customUrl,
        writable: false
      });
    }
  }
  
  // Run the tests
  runTests().catch(error => {
    console.error(`${colors.red}Error running tests: ${error.message}${colors.reset}`);
    process.exit(1);
  });
}

module.exports = { runTests, testChatModel, testImageModel };