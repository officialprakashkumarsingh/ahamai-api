#!/usr/bin/env node

// Test the formatThinkingContent function directly
function formatThinkingContent(content) {
  if (!content || typeof content !== 'string') return content;
  
  // Patterns for thinking/reasoning tags
  const thinkingPatterns = [
    // Standard XML-style tags
    { start: '<thinking>', end: '</thinking>', label: '🤔 Thinking Process' },
    { start: '<think>', end: '</think>', label: '🤔 Thinking' },
    { start: '<thoughts>', end: '</thoughts>', label: '💭 Thoughts' },
    { start: '<thought>', end: '</thought>', label: '💭 Thought' },
    { start: '<reasoning>', end: '</reasoning>', label: '🧠 Reasoning' },
    { start: '<reason>', end: '</reason>', label: '🧠 Reasoning' },
    { start: '<reflection>', end: '</reflection>', label: '🔍 Reflection' },
    { start: '<analysis>', end: '</analysis>', label: '📊 Analysis' },
    { start: '<planning>', end: '</planning>', label: '📝 Planning' },
    { start: '<scratch>', end: '</scratch>', label: '📋 Scratch Pad' }
  ];
  
  let formattedContent = content;
  let hasThinkingContent = false;
  
  // Process each pattern
  for (const pattern of thinkingPatterns) {
    const regex = new RegExp(`${pattern.start}([\\s\\S]*?)${pattern.end}`, 'gi');
    
    if (regex.test(formattedContent)) {
      hasThinkingContent = true;
      formattedContent = formattedContent.replace(regex, (match, thinkingContent) => {
        // Create a formatted panel for thinking content
        const panel = `
<details style="background-color: #f0f4f8; border: 1px solid #d1d9e6; border-radius: 8px; padding: 12px; margin: 10px 0;">
  <summary style="font-weight: bold; cursor: pointer; color: #4a5568;">
    ${pattern.label}
  </summary>
  <div style="margin-top: 10px; padding: 10px; background-color: #ffffff; border-radius: 4px; font-family: monospace; white-space: pre-wrap; color: #2d3748;">
${thinkingContent.trim()}
  </div>
</details>`;
        return panel;
      });
    }
  }
  
  // If content had thinking tags, add a separator before main response
  if (hasThinkingContent) {
    // Find where the actual response starts (after all thinking panels)
    const responseStart = formattedContent.lastIndexOf('</details>');
    if (responseStart !== -1) {
      const beforeResponse = formattedContent.substring(0, responseStart + 10);
      const afterResponse = formattedContent.substring(responseStart + 10).trim();
      
      if (afterResponse) {
        formattedContent = beforeResponse + '\n\n---\n\n' + afterResponse;
      } else {
        formattedContent = beforeResponse;
      }
    }
  }
  
  return formattedContent;
}

// Test cases
const testCases = [
  {
    name: "Simple thinking tag",
    input: "<thinking>Let me calculate 2+2. That's 4.</thinking>The answer is 4.",
    expected: "Should have a thinking panel"
  },
  {
    name: "Multiple tags",
    input: "<thinking>First thought</thinking><reasoning>My reasoning here</reasoning>The final answer.",
    expected: "Should have two panels"
  },
  {
    name: "Nested content",
    input: "<analysis>\nLine 1\nLine 2\nLine 3\n</analysis>\n\nHere's my analysis.",
    expected: "Should preserve line breaks"
  }
];

console.log('🧪 Testing Thinking Tag Formatting\n');
console.log('=====================================\n');

testCases.forEach((test, index) => {
  console.log(`Test ${index + 1}: ${test.name}`);
  console.log('Input:', test.input.substring(0, 50) + '...');
  
  const result = formatThinkingContent(test.input);
  
  if (result.includes('<details')) {
    console.log('✅ Panel created successfully');
  } else {
    console.log('❌ No panel created');
  }
  
  console.log('Output preview:');
  console.log(result.substring(0, 200) + '...\n');
  console.log('---\n');
});

// Test with actual API
const API_URL = 'https://ahamai-api.officialprakashkrsingh.workers.dev/v1/chat/completions';
const API_KEY = 'ahamaibyprakash25';

async function testWithAPI() {
  console.log('\n🌐 Testing with Live API\n');
  console.log('========================\n');
  
  // Test with a model that might output thinking tags
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'deepseek-r1-distill-llama-70b',  // This model might use thinking tags
      messages: [
        {
          role: 'user',
          content: 'What is 25 * 37? Think step by step.'
        }
      ],
      max_tokens: 500,
      temperature: 0.1,
      stream: false
    })
  });
  
  const data = await response.json();
  if (data.choices && data.choices[0]) {
    const content = data.choices[0].message.content;
    console.log('Response length:', content.length);
    
    if (content.includes('<details')) {
      console.log('✅ API response has formatted panels!');
    } else if (content.includes('<thinking>') || content.includes('<reasoning>')) {
      console.log('⚠️ API response has thinking tags but NOT formatted');
    } else {
      console.log('ℹ️ API response has no thinking tags');
    }
    
    console.log('\nFull response:');
    console.log(content);
  }
}

testWithAPI().catch(console.error);