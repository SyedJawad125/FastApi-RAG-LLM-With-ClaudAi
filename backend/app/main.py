from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Enable SQLAlchemy logging
import logging
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

# Import Base and engine from database (use absolute import)




# Import routers
from app.routers import (
     rag_router
)

app = FastAPI(
    title="HRM System with House Price Prediction",
    version="1.0.0",
    description="An API for managing HRM features with machine learning capabilities",
    openapi_tags=[
        
        {
            "name": "Employees",
            "description": "Employee profile management"
        },
        {
            "name": "Users",
            "description": "User login and registration"
        },
        {
            "name": "Roles",
            "description": "Roles profile management"
        },
        {
            "name": "Image Categories",
            "description": "Image categories management"
        },
        {
            "name": "Machine Learning",
            "description": "House price prediction model"
        }
    ]
)

# CORS settings to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.staticfiles import StaticFiles
import os
# Mount static files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/api/hello")
def read_root():
    return {"message": "Hello from FastAPI!"}

# Include all routers
app.include_router(rag_router.router)


@app.get("/")
def root():
    return {"message": "Welcome to HRM API with Machine Learning capabilities"}

@app.get("/")
def read_root():
    return {"message": "Customer Churn Prediction API"}

@app.get("/ping")
async def health_check():
    return {"status": "healthy"}

@app.get("/test")
def test():
    return {"status": "working"}

@app.get("/")
def root():
    return {"message": "RAG Application with Groq is running 🚀"}