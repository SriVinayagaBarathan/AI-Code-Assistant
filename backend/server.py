from fastapi import FastAPI
from model_groq import predict
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI!"}

@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello, {name}!"}

class CodeOptimizerRequest(BaseModel):
    codeString: str  # Ensure proper JSON format

@app.post("/optimize-code/")
async def optimizeCode(code: CodeOptimizerRequest):
    response = predict(code.codeString)

    return {"message": "Base Optimised Code sent successfully", "optimised code": response}






# uvicorn server:app --reload                              
