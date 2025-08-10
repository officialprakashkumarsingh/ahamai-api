#!/usr/bin/env python3
import requests
import time
import urllib.parse
from typing import Dict, List, Any, Optional

class A3ZAPIGateway:
    def __init__(self, base_url: str = "https://api.a3z.workers.dev/"):
        self.base_url = base_url
        self.available_models = [
            "claude-sonnet-4",
            "gpt-4.1", 
            "gemini-2.5-pro-preview-06-05",
            "gpt-4o-mini",
            "o4-mini"
        ]
    
    def query(self, user_message: str, model: str = "gpt-4o-mini", 
              system: Optional[str] = None, temperature: Optional[float] = None,
              max_tokens: Optional[int] = None, timeout: int = 60) -> Dict[str, Any]:
        """Send a query to the A3Z API Gateway"""
        
        # Build parameters
        params = {
            "user": user_message,
            "model": model
        }
        
        if system:
            params["system"] = system
        if temperature is not None:
            params["temperature"] = temperature
        if max_tokens is not None:
            params["max_tokens"] = max_tokens
        
        # Build URL with query parameters
        url = self.base_url + "?" + urllib.parse.urlencode(params)
        
        try:
            response = requests.get(url, timeout=timeout)
            
            # Return both status and content for analysis
            result = {
                "status_code": response.status_code,
                "url": url,
                "headers": dict(response.headers)
            }
            
            if response.text:
                try:
                    result["json"] = response.json()
                except:
                    result["raw_text"] = response.text
            
            return result
            
        except requests.exceptions.RequestException as e:
            return {
                "error": str(e),
                "url": url
            }

def test_model_scenario(api: A3ZAPIGateway, model: str, scenario: Dict[str, Any]) -> Dict[str, Any]:
    """Test a specific scenario with a specific model"""
    
    print(f"\n{'='*70}")
    print(f"🧪 Testing: {scenario['name']}")
    print(f"🤖 Model: {model}")
    print(f"📝 Message: {scenario['message'][:50]}...")
    print(f"{'='*70}")
    
    start_time = time.time()
    
    try:
        result = api.query(
            user_message=scenario["message"],
            model=model,
            system=scenario.get("system"),
            temperature=scenario.get("temperature"),
            max_tokens=scenario.get("max_tokens")
        )
        
        end_time = time.time()
        duration = end_time - start_time
        
        print(f"⏱️ Response Time: {duration:.2f} seconds")
        print(f"📊 Status Code: {result.get('status_code', 'N/A')}")
        
        if "error" in result:
            print(f"❌ Request Error: {result['error']}")
            return {
                "scenario": scenario["name"],
                "model": model,
                "success": False,
                "error": result["error"],
                "duration": duration
            }
        
        # Analyze response
        if "json" in result:
            json_data = result["json"]
            print(f"🔧 Response Structure: {list(json_data.keys())}")
            
            # Check for successful response
            if "choices" in json_data and json_data["choices"]:
                content = json_data["choices"][0].get("message", {}).get("content", "")
                tokens = json_data.get("usage", {}).get("total_tokens", 0)
                
                print(f"✅ Success!")
                print(f"📊 Response Length: {len(content)} characters")
                print(f"🔢 Total Tokens: {tokens}")
                
                # Show preview
                preview = content[:200] + "..." if len(content) > 200 else content
                print(f"📄 Content Preview:\n{preview}")
                
                return {
                    "scenario": scenario["name"],
                    "model": model,
                    "success": True,
                    "response": content,
                    "duration": duration,
                    "tokens": tokens,
                    "response_length": len(content),
                    "full_response": json_data
                }
            
            # Check for error response
            elif "error" in json_data:
                error_msg = json_data.get("message", json_data["error"])
                print(f"❌ API Error: {error_msg}")
                
                if "available_models" in json_data:
                    print(f"📋 Available Models: {json_data['available_models']}")
                
                return {
                    "scenario": scenario["name"],
                    "model": model,
                    "success": False,
                    "error": error_msg,
                    "duration": duration,
                    "api_error": True,
                    "available_models": json_data.get("available_models")
                }
            
            else:
                print(f"❌ Unexpected Response Format")
                print(f"📄 Response: {json_data}")
                
                return {
                    "scenario": scenario["name"],
                    "model": model,
                    "success": False,
                    "error": "Unexpected response format",
                    "duration": duration,
                    "raw_response": json_data
                }
        
        elif "raw_text" in result:
            print(f"📄 Raw Text Response: {result['raw_text'][:200]}...")
            
            return {
                "scenario": scenario["name"],
                "model": model,
                "success": False,
                "error": "Non-JSON response",
                "duration": duration,
                "raw_text": result["raw_text"]
            }
        
        else:
            print(f"❌ Empty Response")
            return {
                "scenario": scenario["name"],
                "model": model,
                "success": False,
                "error": "Empty response",
                "duration": duration
            }
            
    except Exception as e:
        end_time = time.time()
        duration = end_time - start_time
        
        print(f"❌ Exception: {str(e)}")
        return {
            "scenario": scenario["name"],
            "model": model,
            "success": False,
            "error": str(e),
            "duration": duration
        }

def main():
    print("🚀 Testing A3Z AI API Gateway")
    print("🌐 Base URL: https://api.a3z.workers.dev/")
    print("🤖 Models: claude-sonnet-4, gpt-4.1, gemini-2.5-pro-preview-06-05, gpt-4o-mini, o4-mini")
    print("🎯 Focus: Comprehensive functionality testing")
    print("=" * 70)
    
    api = A3ZAPIGateway()
    
    # Define test scenarios
    test_scenarios = [
        {
            "name": "Basic Connectivity Test",
            "message": "Hello! Please respond with 'API Working' to confirm.",
            "max_tokens": 50
        },
        {
            "name": "Simple Math Problem",
            "message": "What is 15 * 23? Show your calculation.",
            "max_tokens": 100
        },
        {
            "name": "Creative Writing", 
            "message": "Write a short haiku about artificial intelligence.",
            "system": "You are a creative poet who writes beautiful, thoughtful poetry.",
            "temperature": 0.8,
            "max_tokens": 150
        },
        {
            "name": "Code Generation",
            "message": "Write a Python function to calculate fibonacci numbers with memoization.",
            "system": "You are an expert Python developer who writes clean, efficient code.",
            "temperature": 0.3,
            "max_tokens": 300
        },
        {
            "name": "Data Analysis Question",
            "message": "Explain the difference between supervised and unsupervised machine learning.",
            "system": "You are a data science expert who explains complex concepts clearly.",
            "temperature": 0.2,
            "max_tokens": 250
        },
        {
            "name": "Creative Storytelling",
            "message": "Tell me a short story about a robot learning to paint.",
            "system": "You are a creative storyteller who writes engaging, imaginative stories.",
            "temperature": 0.9,
            "max_tokens": 400
        },
        {
            "name": "Technical Problem Solving",
            "message": "How would you design a REST API for a library management system?",
            "system": "You are a senior software architect with expertise in API design.",
            "temperature": 0.4,
            "max_tokens": 500
        },
        {
            "name": "Long Form Content",
            "message": "Explain quantum computing in simple terms with examples.",
            "temperature": 0.3,
            "max_tokens": 800
        }
    ]
    
    # Run tests
    results = []
    
    for model in api.available_models:
        print(f"\n🚀 Starting tests for {model}")
        print("=" * 50)
        
        model_results = []
        
        for scenario in test_scenarios:
            result = test_model_scenario(api, model, scenario)
            results.append(result)
            model_results.append(result)
            
            # Respectful delay between requests
            time.sleep(2)
        
        # Quick model summary
        successes = [r for r in model_results if r["success"]]
        print(f"\n📊 {model} Summary: {len(successes)}/{len(model_results)} successful")
    
    # Comprehensive Analysis
    print(f"\n\n📊 COMPREHENSIVE TEST RESULTS")
    print("=" * 70)
    
    successful_tests = [r for r in results if r["success"]]
    failed_tests = [r for r in results if not r["success"]]
    
    print(f"✅ Successful Tests: {len(successful_tests)}/{len(results)}")
    print(f"❌ Failed Tests: {len(failed_tests)}/{len(results)}")
    print(f"📈 Overall Success Rate: {len(successful_tests)/len(results)*100:.1f}%")
    
    if successful_tests:
        avg_duration = sum(r["duration"] for r in successful_tests) / len(successful_tests)
        avg_tokens = sum(r.get("tokens", 0) for r in successful_tests) / len(successful_tests)
        avg_length = sum(r.get("response_length", 0) for r in successful_tests) / len(successful_tests)
        
        print(f"⏱️ Average Response Time: {avg_duration:.2f} seconds")
        print(f"🔢 Average Token Usage: {avg_tokens:.0f} tokens")
        print(f"📊 Average Response Length: {avg_length:.0f} characters")
        
        fastest = min(successful_tests, key=lambda x: x["duration"])
        slowest = max(successful_tests, key=lambda x: x["duration"])
        
        print(f"🏃 Fastest: {fastest['duration']:.2f}s ({fastest['model']} - {fastest['scenario']})")
        print(f"🐌 Slowest: {slowest['duration']:.2f}s ({slowest['model']} - {slowest['scenario']})")
    
    # Model Performance Analysis
    print(f"\n🏆 MODEL PERFORMANCE COMPARISON:")
    for model in api.available_models:
        model_tests = [r for r in results if r["model"] == model]
        model_successes = [r for r in model_tests if r["success"]]
        
        if model_tests:
            success_rate = len(model_successes) / len(model_tests) * 100
            avg_duration = sum(r["duration"] for r in model_successes) / len(model_successes) if model_successes else 0
            avg_tokens = sum(r.get("tokens", 0) for r in model_successes) / len(model_successes) if model_successes else 0
            
            print(f"\n{model}:")
            print(f"   ✅ Success Rate: {success_rate:.1f}% ({len(model_successes)}/{len(model_tests)})")
            
            if model_successes:
                print(f"   ⏱️ Avg Response Time: {avg_duration:.2f}s")
                print(f"   🔢 Avg Tokens: {avg_tokens:.0f}")
                
                # Find best performing scenario for this model
                best_scenario = max(model_successes, key=lambda x: x.get("response_length", 0))
                print(f"   🏆 Best Scenario: {best_scenario['scenario']} ({best_scenario.get('response_length', 0)} chars)")
    
    # Scenario Performance Analysis
    print(f"\n📋 SCENARIO PERFORMANCE ANALYSIS:")
    scenario_names = list(set(r["scenario"] for r in results))
    
    for scenario in scenario_names:
        scenario_tests = [r for r in results if r["scenario"] == scenario]
        scenario_successes = [r for r in scenario_tests if r["success"]]
        
        if scenario_tests:
            success_rate = len(scenario_successes) / len(scenario_tests) * 100
            print(f"{scenario}: {success_rate:.1f}% success rate")
    
    # Error Analysis
    if failed_tests:
        print(f"\n❌ ERROR ANALYSIS:")
        error_types = {}
        for failed in failed_tests:
            error = failed.get("error", "Unknown")
            error_types[error] = error_types.get(error, 0) + 1
        
        for error, count in error_types.items():
            print(f"   {error}: {count} occurrences")
        
        # Show available models if provided
        models_info = [f for f in failed_tests if f.get("available_models")]
        if models_info:
            print(f"\n📋 API Reported Available Models: {models_info[0]['available_models']}")
    
    # Feature Analysis
    print(f"\n🔧 FEATURE ANALYSIS:")
    
    # Parameter support
    temp_tests = [r for r in successful_tests if "temperature" in [s for s in test_scenarios if s["name"] == r["scenario"]][0]]
    system_tests = [r for r in successful_tests if "system" in [s for s in test_scenarios if s["name"] == r["scenario"]][0]]
    
    print(f"🌡️ Temperature Parameter: {'✅ Working' if temp_tests else '❌ Not tested/working'}")
    print(f"🔧 System Prompts: {'✅ Working' if system_tests else '❌ Not tested/working'}")
    
    # Response quality analysis
    if successful_tests:
        long_responses = [r for r in successful_tests if r.get("response_length", 0) > 200]
        creative_responses = [r for r in successful_tests if "Creative" in r["scenario"]]
        code_responses = [r for r in successful_tests if "Code" in r["scenario"]]
        
        print(f"📝 Long-form Responses: {len(long_responses)} successful")
        print(f"🎨 Creative Tasks: {len(creative_responses)} successful")  
        print(f"💻 Code Generation: {len(code_responses)} successful")
    
    # Final Recommendations
    print(f"\n💡 FINAL RECOMMENDATIONS:")
    
    if len(successful_tests) == len(results):
        print("🎉 EXCELLENT! All tests passed successfully.")
        print("✅ This API is ready for production use.")
        
        # Find best model
        model_performance = {}
        for model in api.available_models:
            model_tests = [r for r in results if r["model"] == model and r["success"]]
            if model_tests:
                # Score based on success rate and average response quality
                avg_length = sum(r.get("response_length", 0) for r in model_tests) / len(model_tests)
                avg_duration = sum(r["duration"] for r in model_tests) / len(model_tests)
                score = avg_length / avg_duration  # Quality per second
                model_performance[model] = score
        
        if model_performance:
            best_model = max(model_performance.items(), key=lambda x: x[1])
            print(f"🏆 Best Overall Model: {best_model[0]}")
    
    elif len(successful_tests) > len(results) * 0.7:
        print("👍 GOOD performance with some limitations.")
        print("💭 Suitable for most applications with fallback handling.")
        
        working_models = list(set(r["model"] for r in successful_tests))
        print(f"✅ Recommended Models: {', '.join(working_models)}")
    
    else:
        print("⚠️ SIGNIFICANT ISSUES detected.")
        print("🔍 Investigate failed scenarios before production use.")
        
        if failed_tests:
            failing_models = list(set(r["model"] for r in failed_tests))
            print(f"❌ Problematic Models: {', '.join(failing_models)}")
    
    # Usage recommendations
    print(f"\n🎯 USAGE RECOMMENDATIONS:")
    print("📝 For simple queries: Use gpt-4o-mini (usually fastest)")
    print("🎨 For creative tasks: Use claude-sonnet-4 with higher temperature")
    print("💻 For coding tasks: Use gpt-4.1 or claude-sonnet-4 with low temperature")
    print("📊 For analysis: Use gemini-2.5-pro-preview-06-05")
    
    print(f"\n✅ Testing completed! API evaluation: {'Excellent' if len(successful_tests) == len(results) else 'Good' if len(successful_tests) > len(results) * 0.7 else 'Needs Investigation'}")

if __name__ == "__main__":
    main()