"""
=============================================================================
FILE 4: app/services/groq_service.py
=============================================================================
"""
from groq import Groq
from typing import List, Dict, Optional
import logging
from functools import lru_cache
import time

from app.core.config import settings
from app.services.prompt_template import build_prompt, build_system_prompt

logger = logging.getLogger(__name__)

class GroqService:
    """Enhanced Groq service with error handling and retry logic"""
    
    def __init__(self):
        if not settings.GROQ_API_KEY:
            raise ValueError("GROQ_API_KEY not found in environment variables")
        self.client = Groq(api_key=settings.GROQ_API_KEY)
        self.model = settings.GROQ_MODEL
        self.max_retries = 3
        self.retry_delay = 1
    
    def generate_answer(
        self,
        query: str,
        contexts: List[str],
        chat_history: List[Dict],
        temperature: float = 0.7,
        max_tokens: int = 1024
    ) -> Dict[str, any]:
        """Generate an answer using Groq LLM"""
        start_time = time.time()
        
        try:
            combined_context = "\n\n".join(contexts) if contexts else ""
            prompt = build_prompt(combined_context, query, chat_history)
            response = self._generate_with_retry(prompt, temperature, max_tokens)
            
            processing_time = time.time() - start_time
            
            result = {
                "answer": response["content"],
                "model": response["model"],
                "tokens_used": response["usage"],
                "processing_time": processing_time,
                "contexts_used": len(contexts)
            }
            
            logger.info(
                f"Generated answer in {processing_time:.2f}s, "
                f"tokens: {response['usage']['total_tokens']}"
            )
            
            return result
            
        except Exception as e:
            logger.error(f"Answer generation failed: {str(e)}")
            raise
    
    def _generate_with_retry(self, prompt: str, temperature: float, max_tokens: int) -> Dict:
        """Generate response with retry logic"""
        last_error = None
        
        for attempt in range(self.max_retries):
            try:
                response = self.client.chat.completions.create(
                    model=self.model,
                    messages=[
                        {"role": "system", "content": build_system_prompt()},
                        {"role": "user", "content": prompt}
                    ],
                    temperature=temperature,
                    max_tokens=max_tokens,
                    top_p=1,
                    stream=False
                )
                
                return {
                    "content": response.choices[0].message.content,
                    "model": response.model,
                    "usage": {
                        "prompt_tokens": response.usage.prompt_tokens,
                        "completion_tokens": response.usage.completion_tokens,
                        "total_tokens": response.usage.total_tokens
                    }
                }
                
            except Exception as e:
                last_error = e
                logger.warning(f"Attempt {attempt + 1} failed: {str(e)}")
                
                if attempt < self.max_retries - 1:
                    time.sleep(self.retry_delay * (attempt + 1))
                    continue
                else:
                    raise last_error

# Global instance
groq_service = GroqService()

# Convenience function
def generate_answer_with_history(query: str, contexts: List[str], chat_history: List[Dict]) -> str:
    """Generate answer and return just the text"""
    result = groq_service.generate_answer(query, contexts, chat_history)
    return result["answer"]