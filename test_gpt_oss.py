import requests
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
        return full_response_content

if __name__ == "__main__":
    GptOss().create_stream(model="gpt-oss-120b", messages=[{"role": "user", "content": "Hello, world!"}])