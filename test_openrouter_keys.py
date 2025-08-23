#!/usr/bin/env python3
"""
OpenRouter API Key Validator
Tests multiple API keys for validity and functionality
"""

import urllib.request
import urllib.error
import json
import time
from typing import Dict, List, Tuple
from datetime import datetime

# API Keys to test
API_KEYS = [
    "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",
    "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",
    "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",
    "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",
    "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",
    "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"
]

# OpenRouter endpoints
BASE_URL = "https://openrouter.ai/api/v1"
MODELS_ENDPOINT = f"{BASE_URL}/models"
CHAT_ENDPOINT = f"{BASE_URL}/chat/completions"

# Test models - using popular and cheap models for testing
TEST_MODELS = [
    "openai/gpt-3.5-turbo",
    "meta-llama/llama-3.2-3b-instruct:free",
    "google/gemini-2.0-flash-exp:free"
]

def test_models_endpoint(api_key: str) -> Tuple[bool, List[str], str]:
    """
    Test if API key can fetch models list
    Returns: (success, models_list, error_message)
    """
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    try:
        request = urllib.request.Request(MODELS_ENDPOINT, headers=headers)
        
        with urllib.request.urlopen(request, timeout=10) as response:
            if response.status == 200:
                data = json.loads(response.read().decode('utf-8'))
                models = [model['id'] for model in data.get('data', [])]
                return True, models, "Successfully fetched models"
            else:
                return False, [], f"Error: HTTP {response.status}"
                
    except urllib.error.HTTPError as e:
        if e.code == 401:
            return False, [], "Invalid API key (401 Unauthorized)"
        elif e.code == 403:
            return False, [], "API key forbidden (403)"
        else:
            error_body = e.read().decode('utf-8', errors='ignore')[:200]
            return False, [], f"Error: HTTP {e.code} - {error_body}"
    except urllib.error.URLError as e:
        return False, [], f"Connection error: {str(e)}"
    except json.JSONDecodeError:
        return False, [], "Invalid JSON response"
    except Exception as e:
        return False, [], f"Unexpected error: {str(e)}"

def test_chat_completion(api_key: str, model: str) -> Tuple[bool, str, str]:
    """
    Test if API key can make a chat completion request
    Returns: (success, response_text, error_message)
    """
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://github.com/test-api-validator",
        "X-Title": "API Key Validator"
    }
    
    payload = {
        "model": model,
        "messages": [
            {
                "role": "user",
                "content": "Reply with just 'Hello' and nothing else."
            }
        ],
        "max_tokens": 10,
        "temperature": 0.1
    }
    
    try:
        data = json.dumps(payload).encode('utf-8')
        request = urllib.request.Request(CHAT_ENDPOINT, data=data, headers=headers, method='POST')
        
        with urllib.request.urlopen(request, timeout=15) as response:
            if response.status == 200:
                result = json.loads(response.read().decode('utf-8'))
                content = result.get('choices', [{}])[0].get('message', {}).get('content', '')
                return True, content, "Success"
            else:
                return False, "", f"HTTP {response.status}"
                
    except urllib.error.HTTPError as e:
        if e.code == 401:
            return False, "", "Invalid API key (401)"
        elif e.code == 402:
            return False, "", "Payment required - no credits"
        elif e.code == 403:
            return False, "", "Forbidden (403)"
        elif e.code == 429:
            return False, "", "Rate limited (429)"
        else:
            error_msg = e.read().decode('utf-8', errors='ignore')[:200] if e.read() else f"HTTP {e.code}"
            return False, "", f"Error: {error_msg}"
    except urllib.error.URLError as e:
        return False, "", f"Connection error: {str(e)}"
    except Exception as e:
        return False, "", f"Unexpected error: {str(e)}"

def validate_api_key(api_key: str, key_index: int) -> Dict:
    """
    Comprehensive validation of a single API key
    """
    print(f"\n{'='*60}")
    print(f"Testing API Key #{key_index + 1}")
    print(f"Key: {api_key[:20]}...{api_key[-10:]}")
    print(f"{'='*60}")
    
    result = {
        "key": api_key,
        "key_preview": f"{api_key[:20]}...{api_key[-10:]}",
        "valid": False,
        "models_access": False,
        "chat_access": False,
        "available_models_count": 0,
        "tested_models": {},
        "errors": []
    }
    
    # Test 1: Fetch models
    print("\n1. Testing models endpoint...")
    success, models, error = test_models_endpoint(api_key)
    
    if success:
        result["models_access"] = True
        result["available_models_count"] = len(models)
        print(f"   ✓ Successfully fetched {len(models)} models")
        
        # Show some available models
        if models:
            print(f"   Sample models: {', '.join(models[:5])}")
    else:
        result["errors"].append(f"Models endpoint: {error}")
        print(f"   ✗ Failed: {error}")
        print(f"   This key appears to be invalid or expired")
        return result
    
    # Test 2: Try chat completions with different models
    print("\n2. Testing chat completions...")
    successful_chats = 0
    
    for model in TEST_MODELS:
        # Check if model is available
        if models and model not in models:
            print(f"   - {model}: Skipped (not in available models)")
            result["tested_models"][model] = "Not available"
            continue
            
        print(f"   Testing {model}...")
        success, response, error = test_chat_completion(api_key, model)
        
        if success:
            successful_chats += 1
            result["tested_models"][model] = f"Success: '{response[:50]}'"
            print(f"     ✓ Success! Response: '{response[:50]}'")
        else:
            result["tested_models"][model] = f"Failed: {error}"
            print(f"     ✗ Failed: {error}")
        
        # Small delay to avoid rate limiting
        time.sleep(0.5)
    
    # Determine overall validity
    if result["models_access"] and successful_chats > 0:
        result["valid"] = True
        result["chat_access"] = True
        print(f"\n✅ API Key is VALID and WORKING!")
    elif result["models_access"]:
        result["valid"] = True  # Partially valid
        print(f"\n⚠️  API Key is VALID but chat completions failed (possibly no credits)")
    else:
        print(f"\n❌ API Key is INVALID")
    
    return result

def main():
    """
    Main function to test all API keys
    """
    print("="*70)
    print("OPENROUTER API KEY VALIDATOR")
    print(f"Testing {len(API_KEYS)} API keys")
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("="*70)
    
    results = []
    
    for i, api_key in enumerate(API_KEYS):
        result = validate_api_key(api_key, i)
        results.append(result)
        time.sleep(1)  # Delay between different API keys
    
    # Summary Report
    print("\n" + "="*70)
    print("SUMMARY REPORT")
    print("="*70)
    
    valid_keys = [r for r in results if r["valid"]]
    working_keys = [r for r in results if r["chat_access"]]
    
    print(f"\nTotal keys tested: {len(API_KEYS)}")
    print(f"Valid keys: {len(valid_keys)} / {len(API_KEYS)}")
    print(f"Working keys (can make requests): {len(working_keys)} / {len(API_KEYS)}")
    
    print("\n" + "-"*70)
    print("DETAILED RESULTS:")
    print("-"*70)
    
    for i, result in enumerate(results):
        print(f"\nKey #{i+1}: {result['key_preview']}")
        
        if result['valid']:
            if result['chat_access']:
                print(f"  Status: ✅ VALID & WORKING")
            else:
                print(f"  Status: ⚠️  VALID but NO CHAT ACCESS (no credits?)")
            print(f"  Models available: {result['available_models_count']}")
            
            if result['tested_models']:
                print(f"  Chat tests:")
                for model, status in result['tested_models'].items():
                    if "Success" in status:
                        print(f"    ✓ {model}: {status}")
                    else:
                        print(f"    ✗ {model}: {status}")
        else:
            print(f"  Status: ❌ INVALID")
            if result['errors']:
                print(f"  Errors: {', '.join(result['errors'])}")
    
    print("\n" + "="*70)
    print(f"Testing completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("="*70)
    
    # Save results to file
    with open('/workspace/api_key_test_results.json', 'w') as f:
        json.dump({
            "test_date": datetime.now().isoformat(),
            "total_keys": len(API_KEYS),
            "valid_keys": len(valid_keys),
            "working_keys": len(working_keys),
            "results": results
        }, f, indent=2)
    
    print(f"\nResults saved to: /workspace/api_key_test_results.json")

if __name__ == "__main__":
    main()