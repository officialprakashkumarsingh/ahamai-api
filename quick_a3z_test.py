#!/usr/bin/env python3
import requests
import time
import urllib.parse

def test_a3z_api():
    """Quick test of A3Z API Gateway"""
    
    base_url = "https://api.a3z.workers.dev/"
    models = ["claude-sonnet-4", "gpt-4.1", "gemini-2.5-pro-preview-06-05", "gpt-4o-mini", "o4-mini"]
    
    print("🚀 Quick A3Z API Gateway Test")
    print("🌐 URL: https://api.a3z.workers.dev/")
    print("=" * 50)
    
    results = []
    
    for model in models:
        print(f"\n🤖 Testing {model}")
        print("-" * 30)
        
        # Simple test
        params = {
            "user": "Hello! Please respond with 'Working' to confirm.",
            "model": model,
            "max_tokens": 20
        }
        
        url = base_url + "?" + urllib.parse.urlencode(params)
        
        start_time = time.time()
        
        try:
            response = requests.get(url, timeout=15)
            duration = time.time() - start_time
            
            print(f"⏱️ Response Time: {duration:.2f}s")
            print(f"📊 Status Code: {response.status_code}")
            
            if response.text:
                try:
                    json_data = response.json()
                    print(f"🔧 Response Keys: {list(json_data.keys())}")
                    
                    if "choices" in json_data and json_data["choices"]:
                        content = json_data["choices"][0].get("message", {}).get("content", "")
                        tokens = json_data.get("usage", {}).get("total_tokens", 0)
                        
                        print(f"✅ Success!")
                        print(f"📝 Response: {content[:100]}")
                        print(f"🔢 Tokens: {tokens}")
                        
                        results.append({
                            "model": model,
                            "success": True,
                            "response": content,
                            "duration": duration,
                            "tokens": tokens
                        })
                    
                    elif "error" in json_data:
                        error_msg = json_data.get("message", json_data["error"])
                        print(f"❌ API Error: {error_msg}")
                        
                        if "available_models" in json_data:
                            print(f"📋 Available: {json_data['available_models']}")
                        
                        results.append({
                            "model": model,
                            "success": False,
                            "error": error_msg,
                            "duration": duration
                        })
                    
                    else:
                        print(f"❌ Unexpected format: {json_data}")
                        results.append({
                            "model": model,
                            "success": False,
                            "error": "Unexpected response format",
                            "duration": duration
                        })
                
                except Exception as e:
                    print(f"❌ JSON Error: {e}")
                    print(f"📄 Raw: {response.text[:200]}")
                    results.append({
                        "model": model,
                        "success": False,
                        "error": f"JSON parse error: {e}",
                        "duration": duration
                    })
            
            else:
                print(f"❌ Empty response")
                results.append({
                    "model": model,
                    "success": False,
                    "error": "Empty response",
                    "duration": duration
                })
        
        except Exception as e:
            duration = time.time() - start_time
            print(f"❌ Request Error: {e}")
            results.append({
                "model": model,
                "success": False,
                "error": str(e),
                "duration": duration
            })
    
    # Summary
    print(f"\n📊 SUMMARY")
    print("=" * 30)
    
    successful = [r for r in results if r["success"]]
    failed = [r for r in results if not r["success"]]
    
    print(f"✅ Working: {len(successful)}/{len(results)} models")
    print(f"❌ Failed: {len(failed)}/{len(results)} models")
    
    if successful:
        avg_time = sum(r["duration"] for r in successful) / len(successful)
        avg_tokens = sum(r.get("tokens", 0) for r in successful) / len(successful)
        print(f"⏱️ Avg Time: {avg_time:.2f}s")
        print(f"🔢 Avg Tokens: {avg_tokens:.0f}")
        
        print(f"\n✅ Working Models:")
        for r in successful:
            print(f"   {r['model']}: {r['duration']:.2f}s, {r.get('tokens', 0)} tokens")
    
    if failed:
        print(f"\n❌ Failed Models:")
        for r in failed:
            print(f"   {r['model']}: {r['error']}")
    
    return len(successful) == len(results)

if __name__ == "__main__":
    success = test_a3z_api()
    print(f"\n🎯 Result: {'✅ EXCELLENT' if success else '⚠️ MIXED RESULTS'}")