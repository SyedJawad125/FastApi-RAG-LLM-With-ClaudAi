from sqlalchemy import Column, Integer, String, Text, ForeignKey, Table
from sqlalchemy.orm import relationship
from app.database import Base

role_permission = Table(
    'role_permission',
    Base.metadata,
    Column('role_id', Integer, ForeignKey('roles.id')),
    Column('permission_id', Integer, ForeignKey('permissions.id'))
)

class Role(Base):
    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)
    code = Column(String(50), nullable=True)

    created_by_user_id = Column(Integer, ForeignKey("users.id"))
    # created_by_user_id = Column(Integer)  # temporarily remove FK

    creator = relationship("User", back_populates="created_roles", foreign_keys=[created_by_user_id])
    users = relationship("User", back_populates="role", foreign_keys="[User.role_id]")

    permissions = relationship("Permission", secondary=role_permission, back_populates="roles")
