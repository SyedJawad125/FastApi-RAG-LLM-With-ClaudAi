from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from .. import database, schemas, models, utils, oauth2
from typing import List
from app.schemas.user import UserOut
from ..schemas import LoginRequest, Token
from .. import database, models, utils, oauth2
from fastapi.security import OAuth2PasswordRequestForm
from ..database import get_db
from fastapi.responses import JSONResponse


from app import models, schemas, utils, oauth2, database


router = APIRouter(
    prefix="/users",
    tags=['Users']
)

# router = APIRouter(tags=['Authentication'])

# routers/auth.py or similar

from fastapi import HTTPException
import traceback



@router.post("/signup", response_model=schemas.Token)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    try:
        # Check if user already exists
        db_user = db.query(models.User).filter(models.User.email == user.email).first()
        if db_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        # Hash password
        hashed_password = utils.get_password_hash(user.password)

        # Superuser flag (optional)
        is_superuser = getattr(user, "is_superuser", False)

        # Validate role only if not superuser
        role = None
        if not is_superuser:
            if user.role_id is None:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="role_id is required for non-superusers"
                )

            role = db.query(models.Role).filter(models.Role.id == user.role_id).first()
            if not role:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Role not found"
                )

        # Create user
        new_user = models.User(
            username=user.username,
            email=user.email,
            hashed_password=hashed_password,
            is_active=True,
            is_superuser=is_superuser,
            role_id=user.role_id if not is_superuser else None
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        # Create token
        access_token = oauth2.create_access_token(data={"user_id": new_user.id})
        return {"access_token": access_token, "token_type": "bearer"}

    except HTTPException:
        raise  # Re-raise HTTPExceptions without modification
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Internal server error")


# @router.post("/login", response_model=Token)

# router = APIRouter(tags=["Authentication"])


@router.post("/login")
def login(user_credentials: schemas.LoginRequest, db: Session = Depends(database.get_db)):
    # Step 1: Authenticate user
    user = db.query(models.User).filter(models.User.email == user_credentials.email).first()

    if not user or not utils.verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Incorrect email or password"
        )

    # Step 2: Check if user is active (optional)
    if hasattr(user, "is_active") and not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is disabled"
        )

    # Step 3: Load all permissions and initialize permissions_dict
    all_permissions = db.query(models.Permission).all()
    permissions_dict = {perm.code: False for perm in all_permissions}

    # Step 4: Determine is_superuser based on role
    is_superuser_response = False

    if user.is_superuser and not user.role:
        for perm in all_permissions:
            permissions_dict[perm.code] = True
        is_superuser_response = True

    elif user.role:
        for perm in user.role.permissions:
            permissions_dict[perm.code] = True

    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User has no role assigned"
        )

    # Step 5: Create access and refresh tokens
    access_token = oauth2.create_access_token(data={"user_id": user.id})
    refresh_token = oauth2.create_refresh_token(data={"user_id": user.id})

    # Step 6: Prepare response
    response_data = {
        "message": "Successful",
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user_id": user.id,
        "username": user.username,
        "email": user.email,
        "is_superuser": is_superuser_response,
        "role_id": user.role.id if user.role else None,
        "role_name": user.role.name if user.role else None,
        "permissions": permissions_dict
    }

    # Step 7: Return response with status code
    return JSONResponse(status_code=status.HTTP_200_OK, content=response_data)
    
    
# For personal profile
@router.get("/me", response_model=schemas.UserOut)
def get_me(current_user: models.User = Depends(oauth2.get_current_user)):
    return current_user

# For admin or other users
@router.get("/{id}", response_model=schemas.UserOut)
def get_user(id: int, db: Session = Depends(database.get_db),
             current_user: models.User = Depends(oauth2.get_current_user)):
    if current_user.id != id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized to access this user's information")
    
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=404, detail=f"User with id {id} not found")
    
    return user


@router.get("/", response_model=List[schemas.UserOut])
def get_all_users(db: Session = Depends(database.get_db), 
                 current_user: models.User = Depends(oauth2.get_current_user)):
    # Only allow admin to view all users
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admin users can view all users"
        )
    
    users = db.query(models.User).all()
    return users

@router.put("/{id}", response_model=schemas.UserOut)
def update_user(id: int, updated_user: schemas.UserCreate, 
               db: Session = Depends(database.get_db), 
               current_user: models.User = Depends(oauth2.get_current_user)):
    # Only allow users to update their own profile or admin to update any profile
    if current_user.id != id and not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this user's information"
        )
    
    user_query = db.query(models.User).filter(models.User.id == id)
    user = user_query.first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {id} not found"
        )
    
    # Hash the password if it's being updated
    if updated_user.password:
        updated_user.password = utils.get_password_hash(updated_user.password)
    
    user_query.update(updated_user.dict(), synchronize_session=False)
    db.commit()
    return user_query.first()

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(id: int, db: Session = Depends(database.get_db), 
               current_user: models.User = Depends(oauth2.get_current_user)):
    # Only allow admin to delete users or users to delete themselves
    # if current_user.id != id and not current_user.is_admin:
    #     raise HTTPException(
    #         status_code=status.HTTP_403_FORBIDDEN,
    #         detail="Not authorized to delete this user"
    #     )
    
    user_query = db.query(models.User).filter(models.User.id == id)
    user = user_query.first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {id} not found"
        )
    
    user_query.delete(synchronize_session=False)
    db.commit()
    return




# @router.post("/signup", response_model=schemas.Token)
# async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
#     try:
#         # Check if user already exists
#         db_user = db.query(models.User).filter(models.User.email == user.email).first()
#         if db_user:
#             raise HTTPException(
#                 status_code=status.HTTP_400_BAD_REQUEST,
#                 detail="Email already registered"
#             )

#         # Check if role exists
#         role = db.query(models.Role).filter(models.Role.id == user.role_id).first()
#         if not role:
#             raise HTTPException(
#                 status_code=status.HTTP_404_NOT_FOUND,
#                 detail="Role not found"
#             )

#         # Hash password
#         hashed_password = utils.get_password_hash(user.password)

#         # Create user
#         new_user = models.User(
#             username=user.username,
#             email=user.email,
#             hashed_password=hashed_password,
#             is_active=True,
#             role_id=user.role_id
#         )

#         db.add(new_user)
#         db.commit()
#         db.refresh(new_user)

#         # Token
#         access_token = oauth2.create_access_token(data={"user_id": new_user.id})
#         return {"access_token": access_token, "token_type": "bearer"}

#     except Exception as e:
#         traceback.print_exc()  # Show error in terminal
#         raise HTTPException(status_code=500, detail=str(e))




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