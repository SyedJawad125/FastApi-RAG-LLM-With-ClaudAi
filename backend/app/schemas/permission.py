# app/schemas/permission.py

from typing import Optional, List
from pydantic import BaseModel

# Shared base schema
class PermissionBase(BaseModel):
    name: str
    description: str
    code: str
    module_name: Optional[str] = None

# For permission creation
class PermissionCreate(PermissionBase):
    class Config:
        extra = "forbid"

# For permission update
class PermissionUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    code: Optional[str] = None
    module_name: Optional[str] = None

    class Config:
        extra = "forbid"

# Permission response schema
class Permission(PermissionBase):
    id: int

    class Config:
        from_attributes = True  # Pydantic v2 equivalent of orm_mode

# Paginated permission list
class PaginatedPermissions(BaseModel):
    count: int
    data: List[Permission]

# Full API response wrapper
class PermissionListResponse(BaseModel):
    status: str
    result: PaginatedPermissions
