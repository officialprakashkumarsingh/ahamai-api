const API_URL = 'https://ahamai-api.officialprakashkrsingh.workers.dev';
const API_KEY = 'ahamaibyprakash25';

async function testFluxTurbo() {
  console.log('🎨 Testing Flux/Turbo Models\n');
  console.log('=====================================\n');

  const models = ['flux', 'turbo'];
  
  for (const model of models) {
    console.log(`\n📸 Testing ${model} model...`);
    
    try {
      const response = await fetch(`${API_URL}/v1/images/generations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          prompt: 'A beautiful sunset over mountains',
          n: 1,
          size: "1024x1024"
        })
      });

      console.log(`   Status: ${response.status}`);
      console.log(`   Content-Type: ${response.headers.get('content-type')}`);
      
      // Check if response is JSON or binary
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('image')) {
        // It's returning the actual image
        console.log(`   ✅ Returns actual image data (binary)`);
        console.log(`   📝 This model returns the image directly, not a URL`);
        console.log(`   ⚠️ Need to handle differently - save and serve the image`);
        
        // For Pollinations models, the URL format might be:
        const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent('A beautiful sunset over mountains')}`;
        console.log(`   💡 Alternative: Use Pollinations direct URL:`);
        console.log(`      ${pollinationsUrl}`);
        console.log(`      Without watermark: ${pollinationsUrl}?nologo=true`);
        
      } else if (contentType && contentType.includes('json')) {
        const data = await response.json();
        console.log(`   📝 JSON Response:`, JSON.stringify(data).substring(0, 200));
        
        if (data.data && data.data[0] && data.data[0].url) {
          console.log(`   ✅ URL: ${data.data[0].url}`);
        }
      } else {
        // Try to read as text
        const text = await response.text();
        console.log(`   📝 Response preview:`, text.substring(0, 100));
      }
      
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n\n💡 SOLUTION:');
  console.log('=====================================');
  console.log('For flux/turbo models that return binary:');
  console.log('1. Use direct Pollinations URL format:');
  console.log('   https://image.pollinations.ai/prompt/[encoded_prompt]?nologo=true');
  console.log('2. Or handle binary response and convert to data URL');
  console.log('3. Or use img3/img4 which return proper URLs');
}

testFluxTurbo();