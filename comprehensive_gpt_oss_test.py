import requests
import time
from webscout.litagent import LitAgent
from webscout.AIutel import sanitize_stream

class GptOss:
    api_endpoint = "https://api.gpt-oss.com/chatkit"
    available_models = ["gpt-oss-20b", "gpt-oss-120b"]

    @classmethod
    def create_stream(cls, model: str, messages, reasoning_effort="high", proxy=None, **kwargs):
        user_message = messages[-1]["content"]
        data = {
            "op": "threads.create",
            "params": {
                "input": {
                    "text": user_message,
                    "content": [{"type": "input_text", "text": user_message}],
                    "quoted_text": "",
                    "attachments": []
                }
            }
        }
        headers = LitAgent().generate_fingerprint()
        headers.update({
            "accept": "text/event-stream",
            "x-reasoning-effort": reasoning_effort,
            "x-selected-model": model if model in cls.available_models else cls.available_models[0],
            "x-show-reasoning": "true"
        })
        cookies = {}
        full_response_content = ""
        try:
            with requests.post(cls.api_endpoint, headers=headers, cookies=cookies, json=data, stream=True, proxies={"http": proxy, "https": proxy} if proxy else None) as response:
                response.raise_for_status()
                for chunk in sanitize_stream(
                    response.iter_lines(),
                    intro_value="data: ",
                    to_json=True,
                    skip_markers=["[DONE]"],
                    strip_chars=None,
                    content_extractor=lambda d: d.get('update', {}).get('delta') if d.get('type') == 'thread.item_updated' and d.get('update', {}).get('type') == 'assistant_message.content_part.text_delta' else None,
                    yield_raw_on_error=False,
                    encoding="utf-8",
                    raw=False
                ):
                    if chunk:
                        print(chunk, end='', flush=True)
                        full_response_content += chunk
        except Exception as e:
            print(f"Error: {e}")
            return f"Error: {e}"
        return full_response_content

def test_model(model_name, test_message, reasoning_effort="high"):
    """Test a specific model with a specific message"""
    print(f"\n{'='*60}")
    print(f"🤖 Testing Model: {model_name}")
    print(f"💭 Reasoning Effort: {reasoning_effort}")
    print(f"📝 Test Message: {test_message}")
    print(f"{'='*60}")
    
    start_time = time.time()
    
    try:
        response = GptOss.create_stream(
            model=model_name,
            messages=[{"role": "user", "content": test_message}],
            reasoning_effort=reasoning_effort
        )
        
        end_time = time.time()
        duration = end_time - start_time
        
        print(f"\n⏱️ Response Time: {duration:.2f} seconds")
        print(f"📊 Response Length: {len(response)} characters")
        
        return {
            "model": model_name,
            "reasoning_effort": reasoning_effort,
            "test_message": test_message,
            "response": response,
            "duration": duration,
            "success": True,
            "error": None
        }
        
    except Exception as e:
        end_time = time.time()
        duration = end_time - start_time
        
        print(f"\n❌ Error: {e}")
        print(f"⏱️ Failed after: {duration:.2f} seconds")
        
        return {
            "model": model_name,
            "reasoning_effort": reasoning_effort,
            "test_message": test_message,
            "response": None,
            "duration": duration,
            "success": False,
            "error": str(e)
        }

def main():
    print("🔍 Comprehensive GPT-OSS API Testing")
    print("🌐 Endpoint: https://api.gpt-oss.com/chatkit")
    print("=" * 60)
    
    # Test scenarios
    test_scenarios = [
        {
            "message": "Hello! Please respond with just 'OK' to confirm you're working.",
            "description": "Basic connectivity test"
        },
        {
            "message": "What is 2+2? Explain your reasoning step by step.",
            "description": "Simple math with reasoning"
        },
        {
            "message": "Write a short poem about AI.",
            "description": "Creative writing test"
        },
        {
            "message": "Explain quantum computing in simple terms.",
            "description": "Complex topic explanation"
        }
    ]
    
    reasoning_efforts = ["low", "medium", "high"]
    
    results = []
    
    # Test each model
    for model in GptOss.available_models:
        print(f"\n🚀 Starting tests for {model}")
        
        # Test with different reasoning efforts using first scenario
        for effort in reasoning_efforts:
            print(f"\n🧠 Testing reasoning effort: {effort}")
            result = test_model(
                model_name=model,
                test_message=test_scenarios[0]["message"],
                reasoning_effort=effort
            )
            results.append(result)
            time.sleep(2)  # Small delay between requests
        
        # Test different scenarios with high reasoning effort
        for scenario in test_scenarios[1:]:  # Skip first one (already tested)
            print(f"\n📋 Testing: {scenario['description']}")
            result = test_model(
                model_name=model,
                test_message=scenario["message"],
                reasoning_effort="high"
            )
            results.append(result)
            time.sleep(2)  # Small delay between requests
    
    # Print summary
    print(f"\n\n📊 TEST SUMMARY")
    print("=" * 60)
    
    successful_tests = [r for r in results if r["success"]]
    failed_tests = [r for r in results if not r["success"]]
    
    print(f"✅ Successful Tests: {len(successful_tests)}/{len(results)}")
    print(f"❌ Failed Tests: {len(failed_tests)}/{len(results)}")
    print(f"📈 Success Rate: {len(successful_tests)/len(results)*100:.1f}%")
    
    if successful_tests:
        avg_duration = sum(r["duration"] for r in successful_tests) / len(successful_tests)
        print(f"⏱️ Average Response Time: {avg_duration:.2f} seconds")
        
        fastest = min(successful_tests, key=lambda x: x["duration"])
        slowest = max(successful_tests, key=lambda x: x["duration"])
        
        print(f"🏃 Fastest Response: {fastest['duration']:.2f}s ({fastest['model']} - {fastest['reasoning_effort']})")
        print(f"🐌 Slowest Response: {slowest['duration']:.2f}s ({slowest['model']} - {slowest['reasoning_effort']})")
    
    if failed_tests:
        print(f"\n❌ FAILED TESTS:")
        for i, failed in enumerate(failed_tests, 1):
            print(f"{i}. {failed['model']} ({failed['reasoning_effort']}) - {failed['error']}")
    
    # Model comparison
    model_performance = {}
    for model in GptOss.available_models:
        model_tests = [r for r in results if r["model"] == model]
        model_success = [r for r in model_tests if r["success"]]
        
        if model_tests:
            model_performance[model] = {
                "total_tests": len(model_tests),
                "successful": len(model_success),
                "success_rate": len(model_success) / len(model_tests) * 100,
                "avg_duration": sum(r["duration"] for r in model_success) / len(model_success) if model_success else 0
            }
    
    print(f"\n🏆 MODEL PERFORMANCE COMPARISON:")
    for model, perf in model_performance.items():
        print(f"{model}:")
        print(f"   Success Rate: {perf['success_rate']:.1f}% ({perf['successful']}/{perf['total_tests']})")
        print(f"   Avg Response Time: {perf['avg_duration']:.2f}s")
    
    print(f"\n💡 RECOMMENDATIONS:")
    
    # Find best performing model
    if model_performance:
        best_model = max(model_performance.items(), 
                        key=lambda x: (x[1]['success_rate'], -x[1]['avg_duration']))
        print(f"🥇 Best Overall Model: {best_model[0]} ({best_model[1]['success_rate']:.1f}% success, {best_model[1]['avg_duration']:.2f}s avg)")
    
    # Reasoning effort analysis
    reasoning_analysis = {}
    for effort in reasoning_efforts:
        effort_tests = [r for r in results if r["reasoning_effort"] == effort]
        effort_success = [r for r in effort_tests if r["success"]]
        
        if effort_tests:
            reasoning_analysis[effort] = {
                "success_rate": len(effort_success) / len(effort_tests) * 100,
                "avg_duration": sum(r["duration"] for r in effort_success) / len(effort_success) if effort_success else 0
            }
    
    if reasoning_analysis:
        print(f"\n🧠 REASONING EFFORT ANALYSIS:")
        for effort, analysis in reasoning_analysis.items():
            print(f"{effort}: {analysis['success_rate']:.1f}% success, {analysis['avg_duration']:.2f}s avg")
    
    print(f"\n✅ Testing completed! GPT-OSS API is {'working' if successful_tests else 'having issues'}.")

if __name__ == "__main__":
    main()