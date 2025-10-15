"""
=============================================================================
FILE 2: app/services/prompt_template.py
=============================================================================
"""
from typing import List, Dict
import logging

logger = logging.getLogger(__name__)

def build_prompt(context: str, query: str, chat_history: List[Dict], 
                 max_context_length: int = 4000) -> str:
    """Build an optimized prompt with context, history, and query"""
    history_text = _format_chat_history(chat_history)
    
    if len(context) > max_context_length:
        context = context[:max_context_length] + "...[truncated]"
        logger.warning(f"Context truncated to {max_context_length} characters")
    
    prompt = f"""You are an intelligent AI assistant with access to a knowledge base. Your role is to provide accurate, helpful, and contextual responses.

## Conversation History
{history_text if history_text else "This is the start of the conversation."}

## Retrieved Context
{context if context else "No specific context available for this query."}

## Current Question
{query}

## Instructions
- Answer based on the provided context and conversation history
- If the context contains relevant information, use it to provide a detailed answer
- If the context doesn't contain the answer, clearly state: "I don't have enough information in the knowledge base to answer this question."
- Maintain conversation continuity by referring to previous messages when relevant
- Be concise but thorough
- Use a professional and friendly tone
- Do not make up information or hallucinate facts
- If you're uncertain, express that uncertainty clearly

## Your Response:"""
    
    return prompt.strip()

def _format_chat_history(chat_history: List[Dict], max_turns: int = 5) -> str:
    """Format chat history into readable text"""
    if not chat_history:
        return ""
    
    recent_history = chat_history[-max_turns:] if len(chat_history) > max_turns else chat_history
    
    history_lines = []
    for i, turn in enumerate(recent_history, 1):
        history_lines.append(f"[Turn {i}]")
        history_lines.append(f"User: {turn.get('user', '')}")
        history_lines.append(f"Assistant: {turn.get('assistant', '')}")
        history_lines.append("")
    
    return "\n".join(history_lines)

def build_system_prompt() -> str:
    """Build a system prompt for the LLM"""
    return """You are a helpful AI assistant with access to a knowledge base. 
Your primary goal is to provide accurate, contextual, and helpful responses.
Always prioritize accuracy over speculation, and clearly indicate when you don't have sufficient information."""

def build_contextualized_query(query: str, chat_history: List[Dict]) -> str:
    """Build a contextualized query for better retrieval"""
    if not chat_history:
        return query
    
    last_turn = chat_history[-1] if chat_history else None
    
    if last_turn and len(query.split()) < 5:
        contextualized = f"{last_turn.get('user', '')} {query}"
        logger.debug(f"Contextualized query: {contextualized}")
        return contextualized
    
    return query
