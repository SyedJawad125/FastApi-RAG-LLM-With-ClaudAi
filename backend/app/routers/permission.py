from fastapi import APIRouter, Depends, status, Request, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional, Any
from .. import database, schemas, models, oauth2
from app.utils.utils import paginate_data, create_response, filter_permissions
from fastapi.responses import JSONResponse


router = APIRouter(
    prefix="/permissions",
    tags=['Permissions']
)

# @router.get("/", response_model=List[schemas.Department])

# @router.get("/", response_model=Any)
@router.get("/", response_model=schemas.PermissionListResponse)
def get_permissions(
    request: Request,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(oauth2.get_current_user),
):
    try:
        query = db.query(models.Permission)
        query = filter_permissions(request.query_params, query)
        data = query.all()
        paginated_data, count = paginate_data(data, request)

        # ✅ Convert ORM to Pydantic
        serialized_data = [schemas.Permission.from_orm(perms) for perms in paginated_data]

        response_data = {
            "count": count,
            "data": serialized_data
        }

        return {
            "status": "SUCCESSFUL",
            "result": response_data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Permission)
# @router.post("/", status_code=status.HTTP_201_CREATED)
def create_permission(
    permission: schemas.PermissionCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(oauth2.get_current_user)
) -> Any:
    try:
        

        permission_data = permission.dict()
        permission_data["created_by_user_id"] = current_user.id  # ✅ Correct field name

        new_permission = models.Permission(**permission_data)
        db.add(new_permission)
        db.commit()
        db.refresh(new_permission)

        return new_permission

    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@router.get("/{id}", response_model=schemas.Permission)
def get_permission(id: int, db: Session = Depends(database.get_db), 
                  current_user: models.User = Depends(oauth2.get_current_user)):
    permission = db.query(models.Permission).filter(models.Permission.id == id).first()
    if not permission:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                           detail=f"Permission with id {id} not found")
    return permission

@router.patch("/{id}", response_model=schemas.Permission)
def patch_update_permission(
    id: int,
    updated_permission: schemas.PermissionUpdate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(oauth2.get_current_user)
):
    try:
        

        permission_instance = db.query(models.Permission).filter(models.Permission.id == id).first()

        if not permission_instance:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Permission with id {id} not found"
            )

        update_data = updated_permission.dict(exclude_unset=True)

        for key, value in update_data.items():
            setattr(permission_instance, key, value)

        db.commit()
        db.refresh(permission_instance)

        return permission_instance

    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while patching the permission: {str(e)}"
        )


# @router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)

@router.delete("/{id}", status_code=status.HTTP_200_OK)
def delete_permission(
    id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(oauth2.get_current_user)
):
    

    permission_query = db.query(models.Permission).filter(models.Permission.id == id)
    permission = permission_query.first()

    if not permission:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Permission with id {id} not found"
        )

    permission_query.delete(synchronize_session=False)
    db.commit()

    return {"message": "Permission deleted successfully"}
