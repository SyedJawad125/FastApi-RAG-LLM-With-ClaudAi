from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime
from app.models.permission import Permission, user_permission

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True, nullable=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, server_default='TRUE', nullable=False)
    is_superuser = Column(Boolean, server_default='FALSE', nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, default=datetime.utcnow)

    role_id = Column(Integer, ForeignKey("roles.id"))
    role = relationship("Role", back_populates="users", foreign_keys=[role_id])
    created_roles = relationship("Role", back_populates="creator", foreign_keys="Role.created_by_user_id")
    created_permissions = relationship("Permission", back_populates="creator")
    permissions = relationship("Permission", secondary=user_permission, back_populates="users")
    # Employee
    employee_id = Column(Integer, ForeignKey("employees.id"), unique=True)  # one user per employee
    employee    = relationship("Employee", back_populates="user")
    