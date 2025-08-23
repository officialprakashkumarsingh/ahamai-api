#!/usr/bin/env node

const API_URL = 'https://ahamai-api.officialprakashkrsingh.workers.dev/v1/chat/completions';
const API_KEY = 'ahamaibyprakash25';

async function testFeatures() {
  console.log('🧪 Testing New Features');
  console.log('========================\n');
  
  // Test 1: Explicit web search request
  console.log('📝 Test 1: Explicit Web Search Request');
  console.log('---------------------------------------');
  
  try {
    const response1 = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gemini-2.0-flash',
        messages: [
          {
            role: 'user',
            content: 'Please search for the latest news about OpenAI'
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
        stream: false
      })
    });
    
    const data1 = await response1.json();
    if (data1.choices && data1.choices[0]) {
      const content = data1.choices[0].message.content;
      if (content.includes('[Google web search performed')) {
        console.log('✅ Explicit search request triggered web search!');
      } else {
        console.log('❌ Web search not triggered on explicit request');
      }
      console.log('Response preview:', content.substring(0, 150) + '...\n');
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
  
  // Test 2: Thinking tags formatting (simulate a model with thinking tags)
  console.log('\n📝 Test 2: Thinking Tags Formatting');
  console.log('------------------------------------');
  
  try {
    const response2 = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gemini-2.0-flash-thinking-exp-01-21',  // This model might have thinking tags
        messages: [
          {
            role: 'user',
            content: 'What is 25 * 37? Show your work step by step.'
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
        stream: false
      })
    });
    
    const data2 = await response2.json();
    if (data2.choices && data2.choices[0]) {
      const content = data2.choices[0].message.content;
      
      // Check if thinking tags are formatted
      if (content.includes('<details') && content.includes('Thinking')) {
        console.log('✅ Thinking tags are formatted into panels!');
      } else if (content.includes('<thinking>') || content.includes('<reasoning>')) {
        console.log('⚠️ Thinking tags present but not formatted');
      } else {
        console.log('ℹ️ No thinking tags in response (model may not use them)');
      }
      
      console.log('Response preview:', content.substring(0, 200) + '...\n');
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
  
  // Test 3: Combined test - search with "google" keyword
  console.log('\n📝 Test 3: "Google" Keyword Triggers Search');
  console.log('--------------------------------------------');
  
  try {
    const response3 = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'qwen-3-coder-480b',
        messages: [
          {
            role: 'user',
            content: 'Google the current weather in New York'
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
        stream: false
      })
    });
    
    const data3 = await response3.json();
    if (data3.choices && data3.choices[0]) {
      const content = data3.choices[0].message.content;
      if (content.includes('[Google web search performed')) {
        console.log('✅ "Google" keyword successfully triggered search!');
      } else {
        console.log('❌ "Google" keyword did not trigger search');
      }
      console.log('Response preview:', content.substring(0, 150) + '...\n');
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
  
  console.log('\n✅ All tests completed!');
}

// Run tests
testFeatures().catch(console.error);