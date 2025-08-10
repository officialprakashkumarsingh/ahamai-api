#!/usr/bin/env python3

import json
import time
import sys
import requests
from datetime import datetime
from typing import Dict, List, Any

# Configuration
API_KEY = "ahamaibyprakash25"
BASE_URL = "http://localhost:8787"  # Change this to your actual worker URL

# Color codes for terminal output
class Colors:
    RESET = '\033[0m'
    BOLD = '\033[1m'
    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    MAGENTA = '\033[95m'
    CYAN = '\033[96m'

# All chat models from the worker
CHAT_MODELS = [
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

# All image models from the worker
IMAGE_MODELS = [
    "flux",
    "turbo",
    "img3",
    "img4",
    "uncen",
    "gemini2.0"
]

class APIModelTester:
    def __init__(self, base_url: str = BASE_URL, api_key: str = API_KEY):
        self.base_url = base_url
        self.api_key = api_key
        self.test_results = {
            "chat": {},
            "image": {},
            "summary": {
                "total_chat_models": len(CHAT_MODELS),
                "working_chat_models": 0,
                "failed_chat_models": 0,
                "total_image_models": len(IMAGE_MODELS),
                "working_image_models": 0,
                "failed_image_models": 0
            }
        }
        
    def make_request(self, endpoint: str, method: str = "POST", json_data: Dict = None) -> Dict[str, Any]:
        """Make an API request with proper error handling"""
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }
        
        try:
            url = f"{self.base_url}{endpoint}"
            response = requests.request(
                method=method,
                url=url,
                headers=headers,
                json=json_data,
                timeout=30
            )
            
            # For image models that return binary data
            if response.headers.get('Content-Type', '').startswith('image/'):
                return {
                    "success": response.status_code == 200,
                    "status": response.status_code,
                    "data": {"type": "image", "size": len(response.content)}
                }
            
            try:
                data = response.json()
            except:
                data = {"error": "Invalid JSON response"}
                
            return {
                "success": response.ok,
                "status": response.status_code,
                "data": data
            }
        except requests.exceptions.Timeout:
            return {"success": False, "error": "Request timeout"}
        except requests.exceptions.ConnectionError:
            return {"success": False, "error": "Connection failed"}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def test_chat_model(self, model: str) -> None:
        """Test a single chat model"""
        print(f"{Colors.CYAN}Testing chat model: {Colors.BOLD}{model}{Colors.RESET}")
        
        start_time = time.time()
        
        request_body = {
            "model": model,
            "messages": [
                {
                    "role": "user",
                    "content": "Say 'Hello, I am working!' in exactly 5 words."
                }
            ],
            "max_tokens": 50,
            "temperature": 0.1
        }
        
        result = self.make_request("/v1/chat/completions", json_data=request_body)
        response_time = int((time.time() - start_time) * 1000)
        
        if result["success"]:
            print(f"{Colors.GREEN}✓ {model} is working{Colors.RESET} ({response_time}ms)")
            
            # Extract response content
            response_text = "N/A"
            if result["data"] and "choices" in result["data"] and result["data"]["choices"]:
                response_text = result["data"]["choices"][0].get("message", {}).get("content", "No content")
            
            self.test_results["chat"][model] = {
                "status": "working",
                "response_time": response_time,
                "response": response_text[:100],
                "status_code": result.get("status", 200)
            }
            self.test_results["summary"]["working_chat_models"] += 1
        else:
            error_msg = result.get("error") or result.get("data", {}).get("error") or f"HTTP {result.get('status', 'Unknown')}"
            print(f"{Colors.RED}✗ {model} failed{Colors.RESET} - {error_msg}")
            
            self.test_results["chat"][model] = {
                "status": "failed",
                "error": error_msg,
                "status_code": result.get("status", "N/A")
            }
            self.test_results["summary"]["failed_chat_models"] += 1
        
        # Small delay to avoid rate limiting
        time.sleep(0.5)
    
    def test_image_model(self, model: str) -> None:
        """Test a single image model"""
        print(f"{Colors.MAGENTA}Testing image model: {Colors.BOLD}{model}{Colors.RESET}")
        
        start_time = time.time()
        
        request_body = {
            "model": model,
            "prompt": "A simple test image with the text 'API TEST' clearly visible",
            "width": 512,
            "height": 512
        }
        
        result = self.make_request("/v1/images/generations", json_data=request_body)
        response_time = int((time.time() - start_time) * 1000)
        
        if result["success"]:
            print(f"{Colors.GREEN}✓ {model} is working{Colors.RESET} ({response_time}ms)")
            
            self.test_results["image"][model] = {
                "status": "working",
                "response_time": response_time,
                "status_code": result.get("status", 200)
            }
            self.test_results["summary"]["working_image_models"] += 1
        else:
            error_msg = result.get("error") or result.get("data", {}).get("error") or f"HTTP {result.get('status', 'Unknown')}"
            print(f"{Colors.RED}✗ {model} failed{Colors.RESET} - {error_msg}")
            
            self.test_results["image"][model] = {
                "status": "failed",
                "error": error_msg,
                "status_code": result.get("status", "N/A")
            }
            self.test_results["summary"]["failed_image_models"] += 1
        
        time.sleep(0.5)
    
    def generate_report(self) -> None:
        """Generate and display the test report"""
        print("\n" + "=" * 80)
        print(f"{Colors.BOLD}{Colors.BLUE}API MODELS TEST REPORT{Colors.RESET}")
        print("=" * 80)
        
        # Summary
        summary = self.test_results["summary"]
        print(f"\n{Colors.BOLD}SUMMARY:{Colors.RESET}")
        print(f"Total Chat Models: {summary['total_chat_models']}")
        print(f"{Colors.GREEN}Working Chat Models: {summary['working_chat_models']}{Colors.RESET}")
        print(f"{Colors.RED}Failed Chat Models: {summary['failed_chat_models']}{Colors.RESET}")
        print(f"\nTotal Image Models: {summary['total_image_models']}")
        print(f"{Colors.GREEN}Working Image Models: {summary['working_image_models']}{Colors.RESET}")
        print(f"{Colors.RED}Failed Image Models: {summary['failed_image_models']}{Colors.RESET}")
        
        # Chat Models Details
        print(f"\n{Colors.BOLD}{Colors.CYAN}CHAT MODELS DETAILS:{Colors.RESET}")
        print("-" * 80)
        
        working_chat = []
        failed_chat = []
        
        for model, result in self.test_results["chat"].items():
            if result["status"] == "working":
                working_chat.append(model)
                print(f"{Colors.GREEN}✓ {model}{Colors.RESET}")
                print(f"  Response Time: {result['response_time']}ms")
                print(f"  Sample Response: \"{result['response'][:50]}...\"")
            else:
                failed_chat.append(model)
        
        if failed_chat:
            print(f"\n{Colors.RED}Failed Chat Models:{Colors.RESET}")
            for model in failed_chat:
                result = self.test_results["chat"][model]
                print(f"{Colors.RED}✗ {model}{Colors.RESET}")
                print(f"  Error: {result['error']}")
                print(f"  Status Code: {result['status_code']}")
        
        # Image Models Details
        print(f"\n{Colors.BOLD}{Colors.MAGENTA}IMAGE MODELS DETAILS:{Colors.RESET}")
        print("-" * 80)
        
        working_image = []
        failed_image = []
        
        for model, result in self.test_results["image"].items():
            if result["status"] == "working":
                working_image.append(model)
                print(f"{Colors.GREEN}✓ {model}{Colors.RESET}")
                print(f"  Response Time: {result['response_time']}ms")
            else:
                failed_image.append(model)
        
        if failed_image:
            print(f"\n{Colors.RED}Failed Image Models:{Colors.RESET}")
            for model in failed_image:
                result = self.test_results["image"][model]
                print(f"{Colors.RED}✗ {model}{Colors.RESET}")
                print(f"  Error: {result['error']}")
                print(f"  Status Code: {result['status_code']}")
        
        # Recommendations
        print(f"\n{Colors.BOLD}{Colors.YELLOW}RECOMMENDATIONS:{Colors.RESET}")
        print("-" * 80)
        
        if working_chat:
            print(f"{Colors.GREEN}Recommended Chat Models (sorted by speed):{Colors.RESET}")
            # Sort by response time
            sorted_chat = sorted(working_chat, key=lambda x: self.test_results["chat"][x]["response_time"])
            for model in sorted_chat[:5]:
                response_time = self.test_results["chat"][model]["response_time"]
                print(f"  • {model} ({response_time}ms)")
        
        if working_image:
            print(f"\n{Colors.GREEN}Recommended Image Models (sorted by speed):{Colors.RESET}")
            sorted_image = sorted(working_image, key=lambda x: self.test_results["image"][x]["response_time"])
            for model in sorted_image:
                response_time = self.test_results["image"][model]["response_time"]
                print(f"  • {model} ({response_time}ms)")
        
        # Save results to file
        report_data = {
            "timestamp": datetime.now().isoformat(),
            "results": self.test_results,
            "working_models": {
                "chat": working_chat,
                "image": working_image
            },
            "failed_models": {
                "chat": failed_chat,
                "image": failed_image
            }
        }
        
        with open("test_results_python.json", "w") as f:
            json.dump(report_data, f, indent=2)
        
        print(f"\n{Colors.BOLD}Full results saved to: test_results_python.json{Colors.RESET}")
        print("\n" + "=" * 80)
    
    def run_tests(self) -> None:
        """Run all tests"""
        print(f"{Colors.BOLD}{Colors.BLUE}Starting API Models Test...{Colors.RESET}")
        print(f"Testing against: {self.base_url}")
        print(f"Using API Key: {self.api_key[:10]}...")
        print("-" * 80)
        
        # Test chat models
        print(f"\n{Colors.BOLD}Testing Chat Models...{Colors.RESET}\n")
        for model in CHAT_MODELS:
            self.test_chat_model(model)
        
        # Test image models
        print(f"\n{Colors.BOLD}Testing Image Models...{Colors.RESET}\n")
        for model in IMAGE_MODELS:
            self.test_image_model(model)
        
        # Generate report
        self.generate_report()


def main():
    """Main function"""
    # Parse command line arguments
    base_url = BASE_URL
    if len(sys.argv) > 1:
        for arg in sys.argv[1:]:
            if arg.startswith("--url="):
                base_url = arg.split("=")[1]
                print(f"Using custom URL: {base_url}")
    
    # Create tester and run tests
    tester = APIModelTester(base_url=base_url)
    
    try:
        tester.run_tests()
    except KeyboardInterrupt:
        print(f"\n{Colors.YELLOW}Test interrupted by user{Colors.RESET}")
        sys.exit(1)
    except Exception as e:
        print(f"{Colors.RED}Error running tests: {e}{Colors.RESET}")
        sys.exit(1)


if __name__ == "__main__":
    main()