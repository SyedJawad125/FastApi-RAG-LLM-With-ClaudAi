"""
=============================================================================
FILE 3: app/services/vectorstore.py
=============================================================================
"""
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
from typing import List, Tuple, Optional
import logging
import pickle
import os
from datetime import datetime

from app.core.config import settings

logger = logging.getLogger(__name__)

class VectorStore:
    """Enhanced vector store with persistence and metadata tracking"""
    
    def __init__(self):
        self.embedding_model = SentenceTransformer(settings.EMBEDDING_MODEL)
        self.dimension = self.embedding_model.get_sentence_embedding_dimension()
        self.index = faiss.IndexFlatL2(self.dimension)
        self.documents: List[str] = []
        self.metadata: List[dict] = []
        self.index_file = "faiss_index.bin"
        self.docs_file = "documents.pkl"
        
        self._load_index()
    
    def add_document(self, text: str, metadata: Optional[dict] = None) -> int:
        """Add a document to the vector store"""
        try:
            from app.utils.pdf_reader import chunk_text
            
            chunks = chunk_text(text, settings.CHUNK_SIZE, settings.CHUNK_OVERLAP)
            
            if not chunks:
                raise ValueError("No valid chunks created from document")
            
            embeddings = self.embedding_model.encode(chunks, show_progress_bar=False)
            self.index.add(np.array(embeddings, dtype=np.float32))
            
            for i, chunk in enumerate(chunks):
                self.documents.append(chunk)
                chunk_metadata = metadata.copy() if metadata else {}
                chunk_metadata.update({
                    "chunk_id": len(self.documents) - 1,
                    "chunk_index": i,
                    "timestamp": datetime.utcnow().isoformat(),
                    "length": len(chunk)
                })
                self.metadata.append(chunk_metadata)
            
            logger.info(f"Added {len(chunks)} chunks to vector store")
            self._save_index()
            
            return len(chunks)
            
        except Exception as e:
            logger.error(f"Failed to add document to vector store: {str(e)}")
            raise
    
    def search(self, query: str, k: int = 3, threshold: float = None) -> List[Tuple[str, float, dict]]:
        """Search for similar documents"""
        if len(self.documents) == 0:
            logger.warning("Vector store is empty")
            return []
        
        try:
            q_emb = self.embedding_model.encode([query], show_progress_bar=False)
            k = min(k, len(self.documents))
            distances, indices = self.index.search(np.array(q_emb, dtype=np.float32), k)
            
            results = []
            for dist, idx in zip(distances[0], indices[0]):
                if idx < len(self.documents):
                    if threshold is None or dist <= threshold:
                        results.append((
                            self.documents[idx],
                            float(dist),
                            self.metadata[idx]
                        ))
            
            logger.info(f"Found {len(results)} relevant documents for query")
            return results
            
        except Exception as e:
            logger.error(f"Search failed: {str(e)}")
            return []
    
    def get_size(self) -> int:
        """Get the number of documents in the store"""
        return len(self.documents)
    
    def clear(self):
        """Clear all documents from the store"""
        self.index = faiss.IndexFlatL2(self.dimension)
        self.documents = []
        self.metadata = []
        self._save_index()
        logger.info("Vector store cleared")
    
    def _save_index(self):
        """Persist index and documents to disk"""
        try:
            faiss.write_index(self.index, self.index_file)
            with open(self.docs_file, 'wb') as f:
                pickle.dump({'documents': self.documents, 'metadata': self.metadata}, f)
            logger.debug("Index saved to disk")
        except Exception as e:
            logger.error(f"Failed to save index: {str(e)}")
    
    def _load_index(self):
        """Load index and documents from disk if available"""
        try:
            if os.path.exists(self.index_file) and os.path.exists(self.docs_file):
                self.index = faiss.read_index(self.index_file)
                with open(self.docs_file, 'rb') as f:
                    data = pickle.load(f)
                    self.documents = data['documents']
                    self.metadata = data.get('metadata', [{}] * len(self.documents))
                logger.info(f"Loaded {len(self.documents)} documents from disk")
        except Exception as e:
            logger.warning(f"Could not load existing index: {str(e)}")

# Global instance
vector_store = VectorStore()

# Convenience functions
def add_document_to_index(text: str, metadata: Optional[dict] = None) -> int:
    return vector_store.add_document(text, metadata)

def search_similar_documents(query: str, k: int = 3) -> List[str]:
    results = vector_store.search(query, k)
    return [doc for doc, _, _ in results]

def get_vector_store_size() -> int:
    return vector_store.get_size()
