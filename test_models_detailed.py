#!/usr/bin/env python3
"""
Detailed script to test all models and capture exact error responses
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

def test_model_with_curl(model_id: str) -> Tuple[bool, str, str, str]:
    """
    Test a single model using raw curl command
    Returns: (success, raw_response, parsed_content, error_message)
    """
    
    # Prepare the test payload
    payload = {
        "model": model_id,
        "messages": [
            {
                "role": "user",
                "content": "Reply with 'OK' if you are working"
            }
        ],
        "max_tokens": 50,
        "temperature": 0.7
    }
    
    # Create curl command as a single string for shell execution
    curl_cmd = f'''curl -s -X POST "{API_URL}/v1/chat/completions" \
        -H "Authorization: Bearer {API_KEY}" \
        -H "Content-Type: application/json" \
        -d '{json.dumps(payload)}' \
        --max-time 30'''
    
    try:
        # Execute the curl command
        result = subprocess.run(
            curl_cmd,
            shell=True,
            capture_output=True,
            text=True,
            timeout=35
        )
        
        raw_response = result.stdout
        
        # If empty response
        if not raw_response:
            return False, "", "", "Empty response from API"
        
        # Try to parse as JSON
        try:
            response_data = json.loads(raw_response)
            
            # Check for error in response
            if "error" in response_data:
                error_msg = str(response_data.get("error", "Unknown error"))
                return False, raw_response, "", f"API Error: {error_msg}"
            
            # Check different response formats
            # Standard OpenAI format
            if "choices" in response_data:
                choices = response_data.get("choices", [])
                if choices and len(choices) > 0:
                    # Handle both dict and string message formats
                    message = choices[0].get("message")
                    if isinstance(message, dict):
                        content = message.get("content", "")
                    elif isinstance(message, str):
                        content = message
                    else:
                        content = str(choices[0].get("message", ""))
                    
                    if content:
                        return True, raw_response, content, ""
                    else:
                        return False, raw_response, "", "No content in response"
                else:
                    return False, raw_response, "", "Empty choices array"
            
            # Alternative response format (direct content)
            elif "content" in response_data:
                content = response_data.get("content", "")
                if content:
                    return True, raw_response, content, ""
                else:
                    return False, raw_response, "", "Empty content field"
            
            # Alternative response format (direct message)
            elif "message" in response_data:
                content = response_data.get("message", "")
                if content:
                    return True, raw_response, content, ""
                else:
                    return False, raw_response, "", "Empty message field"
            
            # Unknown format but has some data
            else:
                # Check if it's just a string response
                if isinstance(response_data, str):
                    return True, raw_response, response_data, ""
                else:
                    return False, raw_response, "", f"Unknown response format: {list(response_data.keys())}"
                
        except json.JSONDecodeError as e:
            # Not JSON, might be plain text response
            if "error" in raw_response.lower() or "failed" in raw_response.lower():
                return False, raw_response, "", f"Non-JSON error response: {raw_response[:200]}"
            else:
                # Some APIs might return plain text
                return True, raw_response, raw_response, ""
            
    except subprocess.TimeoutExpired:
        return False, "", "", "Request timed out (35s)"
    except Exception as e:
        return False, "", "", f"Unexpected error: {str(e)}"

def main():
    """Main function to test all models with detailed output"""
    
    print("=" * 80)
    print("DETAILED MODEL TESTING FOR AHAMAI API")
    print("=" * 80)
    print(f"API URL: {API_URL}")
    print(f"Total models to test: {len(models)}")
    print("=" * 80)
    
    working_models = []
    non_working_models = []
    detailed_results = []
    
    for i, model in enumerate(models, 1):
        print(f"\n[{i}/{len(models)}] Testing model: {model}")
        print("-" * 40)
        
        # Test the model
        success, raw_response, content, error = test_model_with_curl(model)
        
        # Store detailed result
        result_entry = {
            "model": model,
            "success": success,
            "error": error if error else None,
            "response_preview": raw_response[:500] if raw_response else None,
            "extracted_content": content[:200] if content else None
        }
        detailed_results.append(result_entry)
        
        if success:
            print(f"✅ SUCCESS: {model} is working!")
            print(f"   Content: {content[:100] if content else 'N/A'}...")
            working_models.append(model)
        else:
            print(f"❌ FAILED: {model} is not working")
            print(f"   Error: {error}")
            if raw_response:
                print(f"   Raw Response (first 200 chars): {raw_response[:200]}...")
            non_working_models.append((model, error))
        
        # Small delay between requests
        time.sleep(1)
    
    # Print summary
    print("\n" + "=" * 80)
    print("FINAL SUMMARY REPORT")
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
            print(f"    Error: {error[:100]}...")
    else:
        print("  All models are working!")
    
    # Save detailed results
    final_report = {
        "api_url": API_URL,
        "test_date": time.strftime("%Y-%m-%d %H:%M:%S"),
        "summary": {
            "total_models": len(models),
            "working_count": len(working_models),
            "non_working_count": len(non_working_models)
        },
        "working_models": working_models,
        "non_working_models": [{"model": m, "error": e} for m, e in non_working_models],
        "detailed_results": detailed_results
    }
    
    with open("/workspace/detailed_model_test_results.json", "w") as f:
        json.dump(final_report, f, indent=2)
    
    print(f"\n📄 Detailed results saved to: /workspace/detailed_model_test_results.json")
    
    # Create a simple list of working models
    with open("/workspace/working_models.txt", "w") as f:
        f.write("WORKING MODELS:\n")
        f.write("=" * 40 + "\n")
        for model in working_models:
            f.write(f"{model}\n")
    
    print(f"📄 Working models list saved to: /workspace/working_models.txt")
    print("=" * 80)
    
    return working_models, non_working_models

if __name__ == "__main__":
    working, non_working = main()