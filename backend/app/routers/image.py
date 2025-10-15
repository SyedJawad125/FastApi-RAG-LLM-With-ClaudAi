# app/routers/image.py

from fastapi import APIRouter, Depends, UploadFile, File,Form, HTTPException, Request
from sqlalchemy.orm import Session
from app import database, schemas
from app.database import get_db
from app.schemas.image import ImageCreate, ImageOut, ImageUpdate, ImageListResponse
from app.crud.image import create_image, get_all_images, get_image, update_image, delete_image
from app import oauth2, models
from app.utils.utils import paginate_data, filter_images, filter_images_all
from typing import List, Optional
from app.schemas.image import ImageUpdate, ImageOut
from app.crud.image import update_image , save_image_file
from app.schemas.image import ImageCreate
from app.crud.image import update_image
from builtins import Exception
from app.dependencies.permission import require

router = APIRouter(prefix="/images", tags=["Images"])


@router.post("/", response_model=ImageOut, dependencies=[require("read_image")])
def upload_image(
    file: UploadFile = File(...),
    name: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    category_id: Optional[int] = Form(None),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(oauth2.get_current_user)
):
    try:
        # 1. First save the file and get its path
        file_info = save_image_file(file)
        if not file_info or not file_info.get("image_path"):
            raise HTTPException(
                status_code=400, 
                detail="Failed to save image file"
            )

        # 2. Prepare complete image data including the path
        image_data = {
            "name": name,
            "description": description,
            "category_id": category_id,
            "image_path": file_info["image_path"],  # Include the saved path
            "created_by_user_id": current_user.id,
            "updated_by_user_id": None,
        }

        # 3. Create the image record
        db_image = models.Image(**image_data)
        db.add(db_image)
        db.commit()
        db.refresh(db_image)

        return db_image

    except HTTPException:
        raise  # Re-raise HTTP exceptions
    except Exception as e:
        db.rollback()
        # Clean up the saved file if database operation failed
        if 'file_info' in locals() and file_info.get("image_path"):
            try:
                Path(file_info["image_path"]).unlink(missing_ok=True)
            except Exception:
                pass
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to upload image: {str(e)}"
        )


@router.get("/", response_model=ImageListResponse, dependencies=[require("read_image")])
def get_images(
    request: Request,
    db: Session = Depends(database.get_db),
    # current_user: models.User = Depends(oauth2.get_current_user),
):
    try:
        query = db.query(models.Image)

        # Convert query params to dictionary and include current_user.id as a filter
        query_params = dict(request.query_params)
        # query_params["created_by_user_id"] = str(current_user.id)

        query = filter_images_all(query_params, query)

        data = query.all()
        paginated_data, count = paginate_data(data, request)

        serialized_data = [schemas.ImageOut.from_orm(item) for item in paginated_data]

        return {
            "status": "SUCCESSFUL",
            "result": {
                "count": count,
                "data": serialized_data
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



from fastapi import APIRouter, Query, Depends, HTTPException, Request
from sqlalchemy.orm import Session, joinedload
from typing import List
from app import models, oauth2
from app.database import get_db
from app.schemas.image import ImageListResponse, PaginatedImages, ImageOut
from app.models.image_category import ImageCategory
from app.utils.utils import paginate_data  # adjust import as needed


@router.get("/categorywise", response_model=ImageListResponse, dependencies=[require("read_image")])
def get_images_by_category(
    request: Request,
    category: str = Query(..., description="Category of images to filter by"),
    db: Session = Depends(get_db),
    # current_user: models.User = Depends(oauth2.get_current_user)
):
    try:
        images = (
            db.query(models.Image)
            .join(ImageCategory)
            .options(joinedload(models.Image.category))
            .filter(ImageCategory.category == category)
            .all()
        )

        if not images:
            raise HTTPException(
                status_code=404,
                detail=f"No images found in category '{category}'"
            )

        paginated_data, count = paginate_data(images, request)

        return ImageListResponse(
            status="SUCCESSFUL",
            result=PaginatedImages(
                count=count,
                data=paginated_data
            )
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




@router.get("/publiccategorywise", response_model=ImageListResponse, dependencies=[require("read_image")])
def get_images_by_category(
    request: Request,
    category: str = Query(..., description="Category of images to filter by"),
    db: Session = Depends(get_db),
    # current_user: models.User = Depends(oauth2.get_current_user)
):
    try:
        images = (
            db.query(models.Image)
            .join(ImageCategory)
            .options(joinedload(models.Image.category))
            .filter(ImageCategory.category == category)
            .all()
        )

        if not images:
            raise HTTPException(
                status_code=404,
                detail=f"No images found in category '{category}'"
            )

        paginated_data, count = paginate_data(images, request)

        return ImageListResponse(
            status="SUCCESSFUL",
            result=PaginatedImages(
                count=count,
                data=paginated_data
            )
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{image_id}", response_model=ImageOut, dependencies=[require("read_image")])
def read_image(
    image_id: int, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(oauth2.get_current_user)
):
    try:
        image = get_image(db, image_id)
        if not image:
            raise HTTPException(status_code=404, detail="Image not found")
        return image
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))





from fastapi import UploadFile, File, Form, HTTPException
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional
from pathlib import Path
import logging
from datetime import datetime

# Import your models and schemas
from app import models, oauth2
from app.database import get_db
from app.schemas.image import ImageOut, ImageUpdate
from app.crud.image import save_image_file

logger = logging.getLogger(__name__)

@router.patch("/{image_id}", response_model=ImageOut, dependencies=[require("update_image")])
def update_image_route(
    image_id: int,
    file: Optional[UploadFile] = File(None),
    name: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    category_id: Optional[int] = Form(None),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(oauth2.get_current_user)
):
    try:
        db_image = db.query(models.Image).filter(models.Image.id == image_id).first()
        if not db_image:
            raise HTTPException(status_code=404, detail="Image not found")

        # Always update these fields
        db_image.updated_by_user_id = current_user.id
        db_image.upload_date = datetime.utcnow()

        # Update other fields if provided
        if name is not None:
            db_image.name = name
        if description is not None:
            db_image.description = description
        if category_id is not None:
            db_image.category_id = category_id

        # Handle file upload
        if file:
            file_info = save_image_file(file)
            # Clean up old file first
            if db_image.image_path:
                try:
                    Path(db_image.image_path).unlink(missing_ok=True)
                except Exception as e:
                    logger.warning(f"Couldn't delete old image: {e}")
            # Update file-related fields
            db_image.image_path = file_info["image_path"]
            db_image.original_filename = file_info.get("original_filename")
            db_image.file_size = file_info.get("file_size")
            db_image.mime_type = file_info.get("mime_type")

        db.commit()
        db.refresh(db_image)
        return db_image

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{image_id}", dependencies=[require("delete_image")])
def delete_existing_image(
    image_id: int, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(oauth2.get_current_user)
):
    try:
        if delete_image(db, image_id):
            return {"status": "SUCCESSFUL", "message": "Image deleted successfully"}
        raise HTTPException(status_code=404, detail="Image not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
