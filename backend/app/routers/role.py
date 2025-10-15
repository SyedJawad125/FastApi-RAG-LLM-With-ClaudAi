from fastapi import APIRouter, Depends, status, Request, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional, Any
from .. import database, schemas, models, oauth2
from app.utils.utils import paginate_data, create_response, filter_roles
from fastapi.responses import JSONResponse
from app.dependencies.permission import permission_required, require



router = APIRouter(
    prefix="/roles",
    tags=['Roles']
)

# @router.get("/", response_model=List[schemas.Department])

# @router.get("/", response_model=Any)
@router.get("/", response_model=schemas.RoleListResponse, dependencies=[require("read_role")])
def get_roles(
    request: Request,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(oauth2.get_current_user),
):
    try:
        query = db.query(models.Role)
        query = filter_roles(request.query_params, query)
        data = query.all()
        paginated_data, count = paginate_data(data, request)

        # ✅ Convert ORM to Pydantic
        serialized_data = [schemas.Role.from_orm(perms) for perms in paginated_data]

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




@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Role, dependencies=[require("create_role")])
def create_role(
    role: schemas.RoleCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(oauth2.get_current_user)
) -> Any:
    try:
        # Extract permission IDs and remove them from role_data
        permission_ids = role.permission_ids or []
        role_data = role.dict(exclude={"permission_ids"})
        role_data["created_by_user_id"] = current_user.id

        # Create Role instance
        new_role = models.Role(**role_data)

        # Fetch Permission instances and assign to role
        if permission_ids:
            permissions = db.query(models.Permission).filter(models.Permission.id.in_(permission_ids)).all()
            new_role.permissions = permissions

        db.add(new_role)
        db.commit()
        db.refresh(new_role)

        return new_role

    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




@router.get("/{id}", response_model=schemas.Role, dependencies=[require("read_role")])
def get_role(id: int, db: Session = Depends(database.get_db), 
                  current_user: models.User = Depends(oauth2.get_current_user)):
    role = db.query(models.Role).filter(models.Role.id == id).first()
    if not role:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                           detail=f"Role with id {id} not found")
    return role

# @router.patch("/{id}", response_model=schemas.Role, dependencies=[require("update_role")])
# def patch_update_role(
#     id: int,
#     updated_role: schemas.RoleUpdate,
#     db: Session = Depends(database.get_db),
#     current_user: models.User = Depends(oauth2.get_current_user)
# ):
#     try:
        

#         role_instance = db.query(models.Role).filter(models.Role.id == id).first()

#         if not role_instance:
#             raise HTTPException(
#                 status_code=status.HTTP_404_NOT_FOUND,
#                 detail=f"Role with id {id} not found"
#             )

#         update_data = updated_role.dict(exclude_unset=True)

#         for key, value in update_data.items():
#             setattr(role_instance, key, value)

#         db.commit()
#         db.refresh(role_instance)

#         return role_instance

#     except HTTPException as he:
#         raise he
#     except Exception as e:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"An error occurred while patching the Role: {str(e)}"
#         )

@router.patch("/{id}", response_model=schemas.Role, dependencies=[require("update_role")])
def patch_update_role(
    id: int,
    updated_role: schemas.RoleUpdate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(oauth2.get_current_user)
):
    try:
        role_instance = db.query(models.Role).filter(models.Role.id == id).first()

        if not role_instance:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Role with id {id} not found"
            )

        update_data = updated_role.dict(exclude_unset=True)

        # Update basic fields
        for key in ['name', 'description', 'code']:
            if key in update_data:
                setattr(role_instance, key, update_data[key])

        # Handle permission_ids manually
        if 'permission_ids' in update_data:
            # Clear existing permissions
            role_instance.permissions.clear()

            # Add new permissions
            permissions = db.query(models.Permission).filter(models.Permission.id.in_(update_data['permission_ids'])).all()
            role_instance.permissions.extend(permissions)

        db.commit()
        db.refresh(role_instance)

        return role_instance

    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while patching the Role: {str(e)}"
        )


# @router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)

@router.delete("/{id}", status_code=status.HTTP_200_OK)
def delete_role(
    id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(oauth2.get_current_user),
    _: None = Depends(permission_required(["delete_role"]))

):
    

    role_query = db.query(models.Role).filter(models.Role.id == id)
    role = role_query.first()

    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Role with id {id} not found"
        )

    role_query.delete(synchronize_session=False)
    db.commit()

    return {"message": "Role deleted successfully"}




# @router.post("/login")
# def login(user_credentials: schemas.LoginRequest, db: Session = Depends(database.get_db)):
#     # Step 1: Authenticate user
#     user = db.query(models.User).filter(models.User.email == user_credentials.email).first()
    
#     if not user or not utils.verify_password(user_credentials.password, user.hashed_password):
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Incorrect email or password"
#         )

#     # Step 2: (Optional) Check if user is active
#     if hasattr(user, "is_active") and not user.is_active:
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Account is disabled"
#         )

#     # Step 3: Load all permissions to prepare a permission map
#     all_permissions = db.query(models.Permission).all()
#     permissions_dict = {perm.code: False for perm in all_permissions}

#     # Step 4: Assign permissions
#     if user.is_superuser and not user.role:
#         # Superuser with no role gets full access
#         for perm in all_permissions:
#             permissions_dict[perm.code] = True
#     elif user.role:
#         # Regular user or superuser with a role gets role-specific permissions
#         for perm in user.role.permissions:
#             permissions_dict[perm.code] = True
#     else:
#         # No role assigned
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="User has no role assigned"
#         )

#     # Step 5: Create access token
#     access_token = oauth2.create_access_token(data={"user_id": user.id})

#     # Step 6: Return full response
#     return {
#         "message": "Successful",
#         "access_token": access_token,
#         "token_type": "bearer",
#         "user_id": user.id,
#         "username": user.username,
#         "email": user.email,
#         "is_superuser": bool(user.is_superuser),  # ✅ Always return true or false correctly
#         "role_id": user.role.id if user.role else None,
#         "role_name": user.role.name if user.role else None,
#         "permissions": permissions_dict
#     }



# @router.post("/login")
# def login(user_credentials: schemas.LoginRequest, db: Session = Depends(database.get_db)):
#     # Step 1: Authenticate user
#     user = db.query(models.User).filter(models.User.email == user_credentials.email).first()

#     if not user or not utils.verify_password(user_credentials.password, user.hashed_password):
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Incorrect email or password"
#         )

#     # Step 2: Check if user is active (optional)
#     if hasattr(user, "is_active") and not user.is_active:
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Account is disabled"
#         )

#     # Step 3: Load all permissions and initialize permissions_dict
#     all_permissions = db.query(models.Permission).all()
#     permissions_dict = {perm.code: False for perm in all_permissions}

#     # Step 4: Determine is_superuser based on role
#     is_superuser_response = False

#     if user.is_superuser and not user.role:
#         # Superuser with no role: grant all permissions
#         for perm in all_permissions:
#             permissions_dict[perm.code] = True
#         is_superuser_response = True

#     elif user.role:
#         # Role-based user (even if is_superuser in DB): only assign role permissions
#         for perm in user.role.permissions:
#             permissions_dict[perm.code] = True

#     else:
#         # No role and not a superuser => invalid user setup
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="User has no role assigned"
#         )

#     # Step 5: Create access token
#     access_token = oauth2.create_access_token(data={"user_id": user.id})

#     # Step 6: Return full response
#     return {
#         "message": "Successful",
#         "access_token": access_token,
#         "token_type": "bearer",
#         "user_id": user.id,
#         "username": user.username,
#         "email": user.email,
#         "is_superuser": is_superuser_response,  # ✅ True only if superuser AND no role
#         "role_id": user.role.id if user.role else None,
#         "role_name": user.role.name if user.role else None,
#         "permissions": permissions_dict
#     }
