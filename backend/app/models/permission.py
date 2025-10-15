from sqlalchemy import Column, Integer, String, Text, ForeignKey, Table
from sqlalchemy.orm import relationship
from app.database import Base


user_permission = Table(
    "user_permission",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id")),
    Column("permission_id", Integer, ForeignKey("permissions.id"))
)

class Permission(Base):
    __tablename__ = 'permissions'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)
    code = Column(String(50), nullable=False)
    module_name = Column(String(50), nullable=True)

    created_by_user_id = Column(Integer, ForeignKey("users.id"))
    creator = relationship("User", back_populates="created_permissions")

    roles = relationship("Role", secondary="role_permission", back_populates="permissions")
    
    users = relationship(
    "User",
    secondary=user_permission,
    back_populates="permissions"
)

    