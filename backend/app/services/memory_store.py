"""
=============================================================================
FILE 1: app/services/memory_store.py
=============================================================================
"""
from typing import Dict, List, Optional
from datetime import datetime, timedelta
import logging
from collections import defaultdict

from app.core.config import settings

logger = logging.getLogger(__name__)

class ConversationMemory:
    """Enhanced conversation memory with session management and cleanup"""
    
    def __init__(self):
        self.memory: Dict[str, List[Dict]] = defaultdict(list)
        self.last_access: Dict[str, datetime] = {}
        self.session_metadata: Dict[str, Dict] = {}
    
    def get_history(self, session_id: str, max_turns: Optional[int] = None) -> List[Dict[str, str]]:
        """Get conversation history for a session"""
        self._update_access_time(session_id)
        self._cleanup_old_sessions()
        
        history = self.memory.get(session_id, [])
        max_turns = max_turns or settings.MAX_HISTORY_LENGTH
        if len(history) > max_turns:
            history = history[-max_turns:]
        
        return history
    
    def add_turn(self, session_id: str, user_msg: str, assistant_msg: str, 
                 metadata: Optional[Dict] = None):
        """Add a conversation turn to memory"""
        turn = {
            "user": user_msg,
            "assistant": assistant_msg,
            "timestamp": datetime.utcnow().isoformat(),
            "metadata": metadata or {}
        }
        
        self.memory[session_id].append(turn)
        self._update_access_time(session_id)
        
        if len(self.memory[session_id]) > settings.MAX_HISTORY_LENGTH * 2:
            self.memory[session_id] = self.memory[session_id][-settings.MAX_HISTORY_LENGTH:]
        
        logger.debug(f"Added turn to session {session_id[:8]}...")
    
    def get_session_summary(self, session_id: str) -> Dict:
        """Get summary statistics for a session"""
        history = self.memory.get(session_id, [])
        return {
            "session_id": session_id,
            "turn_count": len(history),
            "created_at": history[0]["timestamp"] if history else None,
            "last_activity": self.last_access.get(session_id),
            "metadata": self.session_metadata.get(session_id, {})
        }
    
    def get_active_session_count(self) -> int:
        """Get number of active sessions"""
        self._cleanup_old_sessions()
        return len(self.memory)
    
    def clear_session(self, session_id: str):
        """Clear a specific session"""
        if session_id in self.memory:
            del self.memory[session_id]
            self.last_access.pop(session_id, None)
            self.session_metadata.pop(session_id, None)
            logger.info(f"Cleared session {session_id[:8]}...")
    
    def _update_access_time(self, session_id: str):
        """Update last access time for a session"""
        self.last_access[session_id] = datetime.utcnow()
    
    def _cleanup_old_sessions(self):
        """Remove sessions that haven't been accessed recently"""
        timeout = timedelta(minutes=settings.SESSION_TIMEOUT_MINUTES)
        now = datetime.utcnow()
        
        expired_sessions = [
            sid for sid, last_time in self.last_access.items()
            if now - last_time > timeout
        ]
        
        for sid in expired_sessions:
            self.clear_session(sid)
            logger.info(f"Cleaned up expired session {sid[:8]}...")
    
    def set_session_metadata(self, session_id: str, metadata: Dict):
        """Store metadata for a session"""
        self.session_metadata[session_id] = metadata
    
    def get_session_metadata(self, session_id: str) -> Dict:
        """Retrieve metadata for a session"""
        return self.session_metadata.get(session_id, {})

# Global instance
conversation_memory = ConversationMemory()

# Convenience functions
def get_history(session_id: str) -> List[Dict[str, str]]:
    return conversation_memory.get_history(session_id)

def add_to_history(session_id: str, user_msg: str, assistant_msg: str):
    conversation_memory.add_turn(session_id, user_msg, assistant_msg)

def get_active_sessions() -> int:
    return conversation_memory.get_active_session_count()
