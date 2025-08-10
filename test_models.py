#!/usr/bin/env python3
"""
Script to test all models from the API and identify working vs non-working models
"""

import json
import subprocess
import time
from typing import Dict, List, Tuple

API_URL = "https://ahamai-api.officialprakashkrsingh.workers.dev"
API_KEY = "ahamaibyprakash25"

# List of models from the API
models = [
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
]

def test_model(model_id: str) -> Tuple[bool, str, str]:
    """
    Test a single model by sending a simple chat completion request
    Returns: (success, response, error_message)
    """
    
    # Prepare the test payload
    payload = {
        "model": model_id,
        "messages": [
            {
                "role": "user",
                "content": "Say 'Hello, I am working!' in exactly 5 words."
            }
        ],
        "max_tokens": 50,
        "temperature": 0.7
    }
    
    # Prepare the curl command
    curl_command = [
        "curl",
        "-s",  # Silent mode
        "-X", "POST",
        f"{API_URL}/v1/chat/completions",
        "-H", f"Authorization: Bearer {API_KEY}",
        "-H", "Content-Type: application/json",
        "-d", json.dumps(payload),
        "--max-time", "30"  # 30 second timeout
    ]
    
    try:
        # Execute the curl command
        result = subprocess.run(
            curl_command,
            capture_output=True,
            text=True,
            timeout=35
        )
        
        # Check if we got a response
        if result.returncode != 0:
            return False, "", f"Curl failed with return code {result.returncode}"
        
        # Parse the response
        try:
            response_data = json.loads(result.stdout)
            
            # Check for error in response
            if "error" in response_data:
                error_msg = response_data.get("error", {}).get("message", "Unknown error")
                return False, result.stdout, f"API Error: {error_msg}"
            
            # Check if we got a valid completion
            if "choices" in response_data and len(response_data["choices"]) > 0:
                content = response_data["choices"][0].get("message", {}).get("content", "")
                if content:
                    return True, result.stdout, ""
                else:
                    return False, result.stdout, "No content in response"
            else:
                return False, result.stdout, "Invalid response structure"
                
        except json.JSONDecodeError:
            return False, result.stdout, "Invalid JSON response"
            
    except subprocess.TimeoutExpired:
        return False, "", "Request timed out (35s)"
    except Exception as e:
        return False, "", f"Unexpected error: {str(e)}"

def main():
    """Main function to test all models"""
    
    print("=" * 80)
    print("TESTING ALL MODELS FROM AHAMAI API")
    print("=" * 80)
    print(f"API URL: {API_URL}")
    print(f"Total models to test: {len(models)}")
    print("=" * 80)
    
    working_models = []
    non_working_models = []
    
    for i, model in enumerate(models, 1):
        print(f"\n[{i}/{len(models)}] Testing model: {model}")
        print("-" * 40)
        
        # Test the model
        success, response, error = test_model(model)
        
        if success:
            print(f"✅ SUCCESS: {model} is working!")
            working_models.append(model)
            
            # Parse and show sample response
            try:
                resp_data = json.loads(response)
                if "choices" in resp_data:
                    content = resp_data["choices"][0]["message"]["content"]
                    print(f"   Response: {content[:100]}...")
            except:
                pass
        else:
            print(f"❌ FAILED: {model} is not working")
            print(f"   Error: {error}")
            non_working_models.append((model, error))
        
        # Small delay between requests to avoid rate limiting
        time.sleep(1)
    
    # Print summary
    print("\n" + "=" * 80)
    print("SUMMARY REPORT")
    print("=" * 80)
    
    print(f"\n✅ WORKING MODELS ({len(working_models)}/{len(models)}):")
    print("-" * 40)
    if working_models:
        for model in working_models:
            print(f"  • {model}")
    else:
        print("  None")
    
    print(f"\n❌ NON-WORKING MODELS ({len(non_working_models)}/{len(models)}):")
    print("-" * 40)
    if non_working_models:
        for model, error in non_working_models:
            print(f"  • {model}")
            print(f"    Error: {error}")
    else:
        print("  All models are working!")
    
    # Save results to file
    results = {
        "api_url": API_URL,
        "test_date": time.strftime("%Y-%m-%d %H:%M:%S"),
        "total_models": len(models),
        "working_models": working_models,
        "non_working_models": [{"model": m, "error": e} for m, e in non_working_models]
    }
    
    with open("/workspace/model_test_results.json", "w") as f:
        json.dump(results, f, indent=2)
    
    print(f"\n📄 Results saved to: /workspace/model_test_results.json")
    print("=" * 80)
    
    return working_models, non_working_models

if __name__ == "__main__":
    working, non_working = main()