# # reff -------------------> https://console.groq.com/docs/text-chat




# from typing import List, Optional
# import json

# from pydantic import BaseModel
# from groq import Groq
# import os
# from dotenv import load_dotenv

# # Load environment variables from .env file
# load_dotenv()



 

# groq = Groq(api_key=os.getenv("GROQ_API_KEY"))


# chat_completion = groq.chat.completions.create(
#     #
#     # Required parameters
#     #
#     messages=[
#         # Set an optional system message. This sets the behavior of the
#         # assistant and can be used to provide specific instructions for
#         # how it should behave throughout the conversation.
#         {
#             "role": "system",
#             "content": "you are a helpful assistant."
#         },
#         # Set a user message for the assistant to respond to.
#         {
#             "role": "user",
#             "content": "Explain the importance of fast language models",
#         }
#     ],

#     # The language model which will generate the completion.
#     model="llama-3.3-70b-versatile",

#     #
#     # Optional parameters
#     #

#     # Controls randomness: lowering results in less random completions.
#     # As the temperature approaches zero, the model will become deterministic
#     # and repetitive.
#     temperature=0.5,

#     # The maximum number of tokens to generate. Requests can use up to
#     # 32,768 tokens shared between prompt and completion.
#     max_completion_tokens=1024,

#     # Controls diversity via nucleus sampling: 0.5 means half of all
#     # likelihood-weighted options are considered.
#     top_p=1,

#     # A stop sequence is a predefined or user-specified text string that
#     # signals an AI to stop generating content, ensuring its responses
#     # remain focused and concise. Examples include punctuation marks and
#     # markers like "[end]".
#     stop=None,

#     # If set, partial message deltas will be sent.
#     stream=False,
# )

# # Print the completion returned by the LLM.
# print(chat_completion.choices[0].message.content)





from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()


import os
import json
import openai
from pydantic import BaseModel, Field

# Create client
client = openai.OpenAI(
    base_url = "https://api.groq.com/openai/v1",
    api_key = os.environ['GROQ_API_KEY'],
)

# Define the schema for the output.
class User(BaseModel):
    name: str = Field(description="user name")
    address: str = Field(description="address")
    
# Generate
chat_completion = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    response_format={
        "type": "json_object", 
        "schema": User.model_json_schema()
    },
    messages=[
        {"role": "system", "content": "You are a helpful assistant that answers in JSON."},
        {"role": "user", "content": "Create a user named Alice, who lives in 42, Wonderland Avenue."}
    ],
)

created_user = json.loads(chat_completion.choices[0].message.content)
print(json.dumps(created_user, indent=2))
