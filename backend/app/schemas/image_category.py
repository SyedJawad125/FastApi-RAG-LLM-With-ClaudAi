# from typing import Optional, List
# from pydantic import BaseModel


# # ✅ Shared base schema for creation/update input
# class ImageCategoryBase(BaseModel):
#     category: str


# # ✅ Schema used only for creation input
# class ImageCategoryCreate(ImageCategoryBase):
#     created_by_user_id: Optional[int] = None

#     class Config:
#         extra = "forbid"


# # ✅ Schema used only for update input
# class ImageCategoryUpdate(BaseModel):
#     category: Optional[str] = None
#     updated_by_user_id: Optional[int] = None

#     class Config:
#         extra = "forbid"


# # ✅ Schema for nested image objects in response
# class ImageOut(BaseModel):
#     id: int
#     image_url: str

#     class Config:
#         from_attributes = True


# # ✅ Full response schema for a single image category
# class ImageCategory(ImageCategoryBase):
#     id: int
#     created_by_user_id: Optional[int] = None
#     updated_by_user_id: Optional[int] = None
#     # images: List[ImageOut] = []

#     class Config:
#         from_attributes = True


# # ✅ Schema for paginated list
# class PaginatedImageCategory(BaseModel):
#     count: int
#     data: List[ImageCategory]


# # ✅ Wrapper for API responses
# class ImageCategoryListResponse(BaseModel):
#     status: str
#     result: PaginatedImageCategory




# schemas/image_category.py

from typing import Optional, List
from pydantic import BaseModel

# ✅ Shared base schema for creation/update input
class ImageCategoryBase(BaseModel):
    category: str

# ✅ Schema used only for creation input
class ImageCategoryCreate(ImageCategoryBase):
    created_by_user_id: Optional[int] = None

    class Config:
        extra = "forbid"

# ✅ Schema used only for update input
class ImageCategoryUpdate(BaseModel):
    category: Optional[str] = None
    updated_by_user_id: Optional[int] = None

    class Config:
        extra = "forbid"

# ✅ Schema for nested image objects in response
class ImageOut(BaseModel):
    id: int
    image_url: str

    class Config:
        from_attributes = True

# ✅ Response schema (renamed for clarity)
class ImageCategoryOut(ImageCategoryBase):
    id: int
    created_by_user_id: Optional[int] = None
    updated_by_user_id: Optional[int] = None

    class Config:
        from_attributes = True

# ✅ Full response schema for a single image category (Optional)
class ImageCategory(ImageCategoryOut):
    pass

# ✅ Schema for paginated list
class PaginatedImageCategory(BaseModel):
    count: int
    data: List[ImageCategory]

# ✅ Wrapper for API responses
class ImageCategoryListResponse(BaseModel):
    status: str
    result: PaginatedImageCategory
