from typing import Optional, List
from pydantic import BaseModel
from app.schemas.permission import Permission as PermissionSchema  # ✅ Use Pydantic schema only

# Shared base schema
class RoleBase(BaseModel):
    name: str
    description: str
    code: Optional[str] = None

# ✅ For role creation
class RoleCreate(RoleBase):
    permission_ids: Optional[List[int]] = []

    class Config:
        extra = "forbid"  # Prevents unexpected fields like "permissions"

# ✅ For role update
class RoleUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    code: Optional[str] = None
    permission_ids: Optional[List[int]] = []

    class Config:
        extra = "forbid"

# ✅ Role response schema
class Role(RoleBase):
    id: int
    permissions: List[PermissionSchema] = []

    class Config:
        from_attributes = True  # Pydantic v2 equivalent of orm_mode

# ✅ Paginated role list
class PaginatedRoles(BaseModel):
    count: int
    data: List[Role]

# ✅ Full API response wrapper
class RoleListResponse(BaseModel):
    status: str
    result: PaginatedRoles
