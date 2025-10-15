from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings
import logging

# Configure logging
logging.basicConfig()
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Create PostgreSQL engine
engine = create_engine(
    settings.SQLALCHEMY_DATABASE_URL,
    echo=True,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Verify connection
try:
    with engine.connect() as conn:
        logger.info(f"✅ Connected to PostgreSQL at: {settings.SQLALCHEMY_DATABASE_URL}")
except Exception as e:
    logger.error(f"❌ Failed to connect to PostgreSQL: {e}")
    raise