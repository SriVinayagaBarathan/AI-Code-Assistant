import os
import json
import openai
from pydantic import BaseModel, Field, ValidationError
from typing import List, Dict, Any

# Create client
client = openai.OpenAI(
    base_url="https://api.groq.com/openai/v1",
    # api_key=os.environ["GROQ_API_KEY"],
    api_key="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"
)

# Define the schema for LLM response
class TestCase(BaseModel):
    """Schema for test cases with input and expected output."""
    input: Dict[str, Any] = Field(..., description="Input parameters for the function")
    expected_output: Any = Field(..., description="Expected output from the function")

class FinalOutput(BaseModel):
    """Schema for the final optimized code and its explanation."""
    code: str = Field(..., description="The optimized or completed Python function")
    explanation: str = Field(..., description="A detailed explanation of the changes made")

class LLMResponse(BaseModel):
    """Schema for the LLM-generated response following structured output."""
    observation: str = Field(..., description="Initial analysis of the provided code")
    reasoning: List[str] = Field(..., description="Step-by-step reasoning before making changes")
    actions_taken: List[str] = Field(..., description="List of actions applied to optimize or complete the code")
    final_output: FinalOutput = Field(..., description="The optimized or completed function along with an explanation")
    test_cases: List[TestCase] = Field(..., description="Generated test cases to validate the function")

# Generate request to Groq API
chat_completion = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    max_tokens=10000,
    response_format={
        "type": "json_object",
        "schema": LLMResponse.model_json_schema()
    },
    messages=[
        {"role": "system", "content": "You are an expert Python code optimizer. Return the response **strictly** in JSON format matching this schema:\n" + json.dumps(LLMResponse.model_json_schema(), indent=2)},
        {"role": "user", "content": "   "}
    ],
)

# Parse and validate the result
try:
    structured_response = json.loads(chat_completion.choices[0].message.content)
    validated_response = LLMResponse(**structured_response)  # Validate against Pydantic schema
    print(json.dumps(validated_response.dict(), indent=2))
except ValidationError as e:
    print("⚠️ Validation Error! The LLM response didn't match the schema.")
    print(e.json())
    print("Raw Response:\n", chat_completion.choices[0].message.content)
