# # import os
# # from dotenv import load_dotenv

# # load_dotenv()

# # class Settings:
# #     GROQ_API_KEY: str = os.getenv("GROQ_API_KEY")
# #     EMBEDDING_MODEL: str = "all-MiniLM-L6-v2"
# #     GROQ_MODEL: str = "llama-3.1-8b-instant"

# # settings = Settings()



# # from functools import lru_cache
# # from pydantic_settings import BaseSettings


# # class Settings(BaseSettings):
# #     GROQ_API_KEY: str  # Required
# #     EMBEDDING_MODEL: str = "all-MiniLM-L6-v2"  # Default
# #     CHUNK_SIZE: int = 1000
# #     MAX_HISTORY_LENGTH: int = 10
# #     SESSION_TIMEOUT_MINUTES: int = 60
    
# #     class Config:
# #         env_file = ".env"
# #         case_sensitive = True

# # @lru_cache()
# # def get_settings():
# #     return Settings()



# import os
# from dotenv import load_dotenv
# from pydantic_settings import BaseSettings
# from functools import lru_cache

# load_dotenv()

# class Settings(BaseSettings):
#     # API Keys
#     GROQ_API_KEY: str
    
#     # Model Configuration
#     EMBEDDING_MODEL: str = "all-MiniLM-L6-v2"
#     GROQ_MODEL: str = "llama-3.1-8b-instant"
    
#     # RAG Configuration
#     CHUNK_SIZE: int = 1000
#     CHUNK_OVERLAP: int = 200
#     MAX_CONTEXT_LENGTH: int = 4000
#     DEFAULT_TOP_K: int = 3
    
#     # Memory Configuration
#     MAX_HISTORY_LENGTH: int = 10
#     SESSION_TIMEOUT_MINUTES: int = 60
    
#     # File Upload Configuration
#     MAX_FILE_SIZE_MB: int = 10
#     ALLOWED_EXTENSIONS: list = [".pdf"]
    
#     # API Configuration
#     API_TITLE: str = "Advanced RAG System"
#     API_VERSION: str = "2.0.0"
#     API_DESCRIPTION: str = "Retrieval-Augmented Generation with Memory"
    
#     # Logging
#     LOG_LEVEL: str = "INFO"
#     LOG_FILE: str = "rag_system.log"
    
#     # Performance
#     ENABLE_CACHING: bool = True
#     CACHE_TTL_SECONDS: int = 3600
    
#     class Config:
#         env_file = ".env"
#         case_sensitive = True

# @lru_cache()
# def get_settings() -> Settings:
#     """Cached settings instance"""
#     return Settings()

# settings = get_settings()





import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings
from functools import lru_cache

load_dotenv()

class Settings(BaseSettings):
    # -----------------------------
    # ✅ Database
    # -----------------------------
    SQLALCHEMY_DATABASE_URL: str

    # -----------------------------
    # ✅ Authentication / Security
    # -----------------------------
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # -----------------------------
    # ✅ API Keys
    # -----------------------------
    GROQ_API_KEY: str

    # -----------------------------
    # ✅ Model Configuration
    # -----------------------------
    EMBEDDING_MODEL: str = "all-MiniLM-L6-v2"
    GROQ_MODEL: str = "llama-3.1-8b-instant"

    # -----------------------------
    # ✅ RAG Configuration
    # -----------------------------
    CHUNK_SIZE: int = 1000
    CHUNK_OVERLAP: int = 200
    MAX_CONTEXT_LENGTH: int = 4000
    DEFAULT_TOP_K: int = 3

    # -----------------------------
    # ✅ Memory Configuration
    # -----------------------------
    MAX_HISTORY_LENGTH: int = 10
    SESSION_TIMEOUT_MINUTES: int = 60

    # -----------------------------
    # ✅ File Upload Configuration
    # -----------------------------
    MAX_FILE_SIZE_MB: int = 10
    ALLOWED_EXTENSIONS: list = [".pdf"]

    # -----------------------------
    # ✅ API Configuration
    # -----------------------------
    API_TITLE: str = "Advanced RAG System"
    API_VERSION: str = "2.0.0"
    API_DESCRIPTION: str = "Retrieval-Augmented Generation with Memory"

    # -----------------------------
    # ✅ Logging
    # -----------------------------
    LOG_LEVEL: str = "INFO"
    LOG_FILE: str = "rag_system.log"

    # -----------------------------
    # ✅ Performance
    # -----------------------------
    ENABLE_CACHING: bool = True
    CACHE_TTL_SECONDS: int = 3600

    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "allow"  # Optional — ignore undeclared vars in .env

@lru_cache()
def get_settings() -> Settings:
    """Cached settings instance"""
    return Settings()

settings = get_settings()
