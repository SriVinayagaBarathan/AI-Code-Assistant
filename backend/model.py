import requests
def predict(prompt):
 
  endpoint = 'https://api.together.xyz/v1/chat/completions'
  res = requests.post(endpoint, json={
    "model": "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    "max_tokens": 4000,
    "temperature": 0.7,
    "top_p": 0.7,
    "top_k": 50,
    "repetition_penalty": 1,
    "stop": [
        "</s>",
        "[/INST]"
    ],
    "messages": [
        {
            "content": prompt,
            "role": "user"
        }
        
    ]
}, headers={
    "Authorization": "Bearer 5163ca5d36975cde3256687fc40394e0dd3fbe5eb35147f3e7327d02e246c68a",
})
  return res.json()['choices'][0]['message']['content']