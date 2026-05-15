# Import FastAPI framework
from fastapi import FastAPI

# Used to make API requests
import requests

# Loads environment variables from .env file
from dotenv import load_dotenv

# Lets us access environment variables
import os

# CORS middleware allows frontend and backend
# to communicate with each other
from fastapi.middleware.cors import CORSMiddleware


# Load variables from .env
load_dotenv()


# Create FastAPI app
app = FastAPI()


# Allow frontend requests
app.add_middleware(

    CORSMiddleware,

    # Allow React frontend
    allow_origins=["http://localhost:5173"],

    # Allow everything else
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Get API key from .env file
API_KEY = os.getenv("GROQ_API_KEY")


# Home route
@app.get("/")
def home():

    # Simple test response
    return {
        "message": "AI Study Copilot Running"
    }


# AI route
@app.get("/ask")
def ask_ai(question: str):
    
    print("===== REQUEST STARTED =====")

    print("Question received:")
    print(question)

    
    # Groq API endpoint
    url = "https://api.groq.com/openai/v1/chat/completions"
    

    # Request headers
    headers = {

        # Authentication
        "Authorization": f"Bearer {API_KEY}",

        # Sending JSON data
        "Content-Type": "application/json"
    }


    # Data sent to AI model
    data = {

        # AI model name
        "model": "llama-3.3-70b-versatile",

        # Conversation messages
        "messages": [

            {
                "role": "user",

                # User question from frontend
                "content": question
            }
        ]
    }

    print("Sending request to AI...")
    # Send POST request to Groq AI
    response = requests.post(

        url,

        headers=headers,

        json=data
    )

    print("Response received!")
    
    # Convert response into Python dictionary
    result = response.json()

    print("Full AI response:")
    print(result)

    # Extract only AI answer text
    answer = result["choices"][0]["message"]["content"]

    print("Extracted answer:")
    print(answer)
    
    
    
    # Return clean response
    return {

        "question": question,

        "answer": answer
    }