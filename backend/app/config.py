# from pydantic_settings import BaseSettings
# from pydantic import Field, AnyUrl, validator
# from typing import Optional
# import warnings

# class Settings(BaseSettings):
#     # Database configuration (using AnyUrl instead of PostgresDsn)
#     SQLALCHEMY_DATABASE_URL: str = Field(
#         default="postgresql+psycopg2://postgres:admin@localhost:5432/FastApi_RAG_LLM",
#         description="PostgreSQL connection URL"
#     )
    
#     # Add validator to ensure it's a PostgreSQL URL
#     @validator('SQLALCHEMY_DATABASE_URL')
#     def validate_db_url(cls, v):
#         if not v.startswith('postgresql'):
#             warnings.warn(f"Using non-PostgreSQL database: {v}", RuntimeWarning)
#         return v
    
#     # Authentication
#     SECRET_KEY: str = Field(
#         default="this-is-a-very-secure-32-char-secret-key-1234",
#         min_length=32,
#         max_length=128
#     )
#     ALGORITHM: str = Field(default="HS256")
#     ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=30, gt=0)
    
#     # Optional configurations
#     EMAIL_HOST: Optional[str] = None
#     EMAIL_PORT: Optional[int] = None
#     EMAIL_USE_SSL: Optional[bool] = None
#     EMAIL_USER: Optional[str] = None
#     EMAIL_PASSWORD: Optional[str] = None
#     ADMIN_EMAIL: Optional[str] = None
    
#     REDIS_HOST: Optional[str] = None
#     REDIS_PORT: Optional[int] = None
#     REDIS_DB: Optional[int] = None
#     REDIS_CACHE_TTL: Optional[int] = None

#     class Config:
#         env_file = ".env"
#         env_file_encoding = 'utf-8'
#         extra = "ignore"

# settings = Settings()

# # Additional validation
# if not settings.SQLALCHEMY_DATABASE_URL.startswith('postgresql'):
#     raise ValueError("Only PostgreSQL database is supported")