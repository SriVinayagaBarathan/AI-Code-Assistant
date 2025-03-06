from langchain.utils.openai_functions import convert_pydantic_to_openai_function
import os
import json
from dotenv import load_dotenv
import openai
from pydantic import BaseModel, Field
from typing import List, Dict, Any

# class TestCase(BaseModel):
#     """Schema for test cases with input and expected output."""
#     input: Dict[str, Any] = Field(..., description="Input parameters for the function")
#     expected_output: Any = Field(..., description="Expected output from the function")

# class FinalOutput(BaseModel):
#     """Schema for the final optimized code and its explanation."""
#     code: str = Field(..., description="The optimized or completed Python function")
#     explanation: str = Field(..., description="A detailed explanation of the changes made")

# class LLMResponse(BaseModel):
#     """Schema for the LLM-generated response following ReACT methodology."""
#     observation: str = Field(..., description="Initial analysis of the provided code")
#     reasoning: List[str] = Field(..., description="Step-by-step reasoning before making changes")
#     actions_taken: List[str] = Field(..., description="List of actions applied to optimize or complete the code")
#     final_output: FinalOutput = Field(..., description="The optimized or completed function along with an explanation")
#     test_cases: List[TestCase] = Field(..., description="Generated test cases to validate the function")



# print(convert_pydantic_to_openai_function(LLMResponse))    
    
function={
  "name": "LLMResponse",
  "description": "Schema for the LLM-generated response following ReACT methodology.",
  "parameters": {
    "properties": {
      "observation": {
        "description": "Initial analysis of the provided code",
        "type": "string"
      },
      "reasoning": {
        "description": "Step-by-step reasoning before making changes",
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "actions_taken": {
        "description": "List of actions applied to optimize or complete the code",
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "final_output": {
        "description": "Schema for the final optimized code and its explanation.",
        "type": "object",
        "properties": {
          "code": {
            "description": "The optimized or completed Python function",
            "type": "string"
          },
          "explanation": {
            "description": "A detailed explanation of the changes made",
            "type": "string"
          }
        },
        "required": ["code", "explanation"]
      },
      "test_cases": {
        "description": "Generated test cases to validate the function",
        "type": "array",
        "items": {
          "description": "Schema for test cases with input and expected output.",
          "type": "object",
          "properties": {
            "input": {
              "description": "Input parameters for the function",
              "type": "object"
            },
            "expected_output": {
              "description": "Expected output from the function"
            }
          },
          "required": ["input", "expected_output"]
        }
      }
    },
    "required": ["observation", "reasoning", "actions_taken", "final_output", "test_cases"],
    "type": "object"
  }
}
    