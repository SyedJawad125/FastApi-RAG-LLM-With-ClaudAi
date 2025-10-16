from fastapi import APIRouter, UploadFile, HTTPException, File, status
from fastapi.responses import JSONResponse
import uuid
import logging
from datetime import datetime
import time

from app.utils.pdf_reader import extract_text_from_pdf
from app.services.vectorstore import vector_store
from app.services.groq_service import groq_service
from app.services.memory_store import conversation_memory
from app.services.prompt_template import build_contextualized_query
from app.schemas.rag_schemas import (
    AskRequest, AskResponse, UploadResponse, 
    HealthResponse, ErrorResponse
)
from app.core.config import settings

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/rag", tags=["RAG"])

@router.post("/upload", response_model=UploadResponse, status_code=status.HTTP_201_CREATED)
async def upload_file(file: UploadFile = File(...)):
    """
    Upload and process a PDF file into the vector store.
    
    - **file**: PDF file to upload (max 10MB)
    
    Returns information about the processed document.
    """
    try:
        # Validate file
        if not file.filename.endswith('.pdf'):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only PDF files are supported"
            )
        
        # Check file size (basic check)
        content = await file.read()
        file_size_mb = len(content) / (1024 * 1024)
        
        if file_size_mb > settings.MAX_FILE_SIZE_MB:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"File too large. Maximum size is {settings.MAX_FILE_SIZE_MB}MB"
            )
        
        # Reset file pointer
        await file.seek(0)
        
        # Extract text from PDF
        logger.info(f"Processing file: {file.filename}")
        text, pages_processed = extract_text_from_pdf(file.file)
        
        if not text.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No text could be extracted from the PDF"
            )
        
        # Add to vector store
        metadata = {
            "filename": file.filename,
            "upload_time": datetime.utcnow().isoformat(),
            "pages": pages_processed,
            "size_mb": round(file_size_mb, 2)
        }
        
        chunks_created = vector_store.add_document(text, metadata)
        
        logger.info(
            f"Successfully processed {file.filename}: "
            f"{pages_processed} pages, {chunks_created} chunks"
        )
        
        return UploadResponse(
            message="File successfully processed and added to knowledge base",
            filename=file.filename,
            pages_processed=pages_processed,
            chunks_created=chunks_created,
            status="success"
        )
        
    except HTTPException:
        raise
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"File upload failed: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process file: {str(e)}"
        )


@router.post("/ask", response_model=AskResponse)
async def ask_question(payload: AskRequest):
    """
    Ask a question with session-based memory and context retrieval.
    
    - **query**: The question to ask
    - **session_id**: Optional session ID for conversation continuity
    - **max_context_items**: Number of context chunks to retrieve (1-10)
    
    Returns the answer with session information.
    """
    start_time = time.time()
    
    try:
        # Generate or reuse session_id
        session_id = payload.session_id or str(uuid.uuid4())
        
        logger.info(f"Processing query for session {session_id[:8]}...")
        
        # Retrieve chat history
        history = conversation_memory.get_history(session_id)
        
        # Build contextualized query for better retrieval
        contextualized_query = build_contextualized_query(payload.query, history)
        
        # Retrieve similar contexts
        k = min(payload.max_context_items, settings.DEFAULT_TOP_K)
        search_results = vector_store.search(contextualized_query, k=k)
        contexts = [doc for doc, _, _ in search_results]
        
        if not contexts:
            logger.warning("No contexts found in vector store")
        
        # Generate answer using LLM
        result = groq_service.generate_answer(
            payload.query,
            contexts,
            history
        )
        
        answer = result["answer"]
        
        # Save turn to memory
        conversation_memory.add_turn(
            session_id,
            payload.query,
            answer,
            metadata={
                "contexts_used": len(contexts),
                "tokens_used": result.get("tokens_used"),
                "processing_time": result.get("processing_time")
            }
        )
        
        processing_time = time.time() - start_time
        
        logger.info(
            f"Query processed in {processing_time:.2f}s, "
            f"contexts: {len(contexts)}, session: {session_id[:8]}..."
        )
        
        return AskResponse(
            answer=answer,
            session_id=session_id,
            sources_count=len(contexts),
            processing_time=round(processing_time, 2),
            metadata={
                "tokens_used": result.get("tokens_used"),
                "model": result.get("model"),
                "turn_count": len(history) + 1
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Query processing failed: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process query: {str(e)}"
        )


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Check the health status of the RAG system.
    
    Returns system statistics and status.
    """
    try:
        return HealthResponse(
            status="healthy",
            timestamp=datetime.utcnow(),
            vector_store_size=vector_store.get_size(),
            active_sessions=conversation_memory.get_active_session_count()
        )
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Service unhealthy"
        )


@router.get("/session/{session_id}")
async def get_session_info(session_id: str):
    """
    Get information about a specific session.
    
    - **session_id**: The session identifier
    
    Returns session statistics and history.
    """
    try:
        summary = conversation_memory.get_session_summary(session_id)
        
        if summary["turn_count"] == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Session {session_id} not found"
            )
        
        return summary
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to get session info: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.delete("/session/{session_id}")
async def clear_session(session_id: str):
    """
    Clear a specific session's conversation history.
    
    - **session_id**: The session identifier to clear
    """
    try:
        conversation_memory.clear_session(session_id)
        return {"message": f"Session {session_id} cleared successfully"}
        
    except Exception as e:
        logger.error(f"Failed to clear session: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.delete("/vectorstore")
async def clear_vector_store():
    """
    Clear all documents from the vector store.
    
    **Warning**: This action cannot be undone.
    """
    try:
        vector_store.clear()
        return {"message": "Vector store cleared successfully"}
        
    except Exception as e:
        logger.error(f"Failed to clear vector store: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )