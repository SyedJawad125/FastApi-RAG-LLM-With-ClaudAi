# from typing import Optional
# from pydantic import BaseModel
# from datetime import datetime
# from .image_category import ImageCategory

# # Shared base schema
# class ImageBase(BaseModel):
#     name: Optional[str]
#     description: Optional[str]
#     bulletsdescription: Optional[str]
#     category_id: Optional[int]

# # Schema for image creation (client cannot set internal fields)
# class ImageCreate(ImageBase):
#     pass

# # Schema for image update (file metadata allowed, but not user info)
# class ImageUpdate(ImageBase):
#     image_path: Optional[str]
#     original_filename: Optional[str]
#     file_size: Optional[int]
#     mime_type: Optional[str]

# # Schema for API response
# class ImageOut(ImageBase):
#     id: int
#     image_path: str
#     original_filename: Optional[str]
#     file_size: Optional[int]
#     mime_type: Optional[str]
#     upload_date: datetime
#     created_by_user_id: Optional[int]
#     updated_by_user_id: Optional[int]
#     category: Optional[ImageCategory] = None

#     class Config:
#         from_attributes = True

# # Schema for paginated list response
# class PaginatedImages(BaseModel):
#     count: int
#     data: list[ImageOut]

# # API response wrapper
# class ImageListResponse(BaseModel):
#     status: str
#     result: PaginatedImages



# from typing import Optional
# from pydantic import BaseModel
# from datetime import datetime
# from .image_category import ImageCategory

# class ImageBase(BaseModel):
#     name: Optional[str]
#     description: Optional[str]
#     bulletsdescription: Optional[str]
#     category_id: Optional[int]

# class ImageCreate(ImageBase):
#     pass

# class ImageUpdate(ImageBase):
#     image_path: Optional[str]
#     original_filename: Optional[str]
#     file_size: Optional[int]
#     mime_type: Optional[str]

# class ImageOut(ImageBase):
#     id: int
#     image_path: str
#     original_filename: Optional[str]
#     file_size: Optional[int]
#     mime_type: Optional[str]
#     upload_date: datetime
#     category: Optional[ImageCategory] = None

#     class Config:
#         from_attributes = True

# class PaginatedImages(BaseModel):
#     count: int
#     data: list[ImageOut]

# class ImageListResponse(BaseModel):
#     status: str
#     result: PaginatedImages



from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime
from .image_category import ImageCategoryOut  # ✅ Correct import


class ImageBase(BaseModel):
    name: Optional[str] = Field(None, max_length=30)
    description: Optional[str] = Field(None, max_length=500)
    category_id: Optional[int] = None

class ImageCreate(ImageBase):
    # Required fields for creation
    created_by_user_id: int
    updated_by_user_id: int
    image_path: str
    
    # Optional file metadata that should come from the uploaded file
    original_filename: Optional[str] = None
    file_size: Optional[int] = None
    mime_type: Optional[str] = None

class ImageUpdate(ImageBase):
    image_path: Optional[str] = None
    original_filename: Optional[str] = None
    file_size: Optional[int] = None
    mime_type: Optional[str] = None
    updated_by_user_id: Optional[int] = None


class ImageOut(ImageBase):
    id: int
    image_path: str  # Make sure this is not optional in the response
    upload_date: datetime
    created_by_user_id: int  # Changed from Optional to required
    updated_by_user_id: Optional[int] = None  # Keep as Optional
    # category: Optional[ImageCategory] = None
    category: Optional[ImageCategoryOut] = None  # Use the response schema

    class Config:
        from_attributes = True

class PaginatedImages(BaseModel):
    count: int
    data: list[ImageOut]

class ImageListResponse(BaseModel):
    status: str
    result: PaginatedImages