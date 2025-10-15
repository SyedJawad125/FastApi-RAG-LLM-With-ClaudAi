from pydantic import BaseModel, Field, validator
from typing import Optional, List, Dict
from datetime import datetime

class AskRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=2000, description="User query")
    session_id: Optional[str] = Field(None, description="Session identifier for conversation continuity")
    max_context_items: Optional[int] = Field(3, ge=1, le=10, description="Number of context chunks to retrieve")
    
    @validator('query')
    def query_not_empty(cls, v):
        if not v.strip():
            raise ValueError('Query cannot be empty or whitespace')
        return v.strip()

class AskResponse(BaseModel):
    answer: str
    session_id: str
    sources_count: int = Field(description="Number of source documents used")
    processing_time: Optional[float] = Field(None, description="Time taken to process in seconds")
    metadata: Optional[Dict] = Field(default_factory=dict)

class UploadResponse(BaseModel):
    message: str
    filename: str
    pages_processed: int
    chunks_created: int
    status: str = "success"

class HealthResponse(BaseModel):
    status: str
    timestamp: datetime
    vector_store_size: int
    active_sessions: int

class ErrorResponse(BaseModel):
    error: str
    detail: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)