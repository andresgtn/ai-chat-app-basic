from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# Allow CORS for frontend development (running on localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

# Define the structure of the request body using Pydantic
class ChatRequest(BaseModel):
    message: str

# Define a POST endpoint at /chat
@app.post("/chat")
async def chat(req: ChatRequest):
    # Use OpenAI ChatCompletion API to generate a response
    completion = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": req.message}]
    )
    # Return the assistant's response
    return {"response": completion.choices[0].message["content"]}
