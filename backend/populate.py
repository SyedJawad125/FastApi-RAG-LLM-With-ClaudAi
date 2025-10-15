# from app.database import SessionLocal
# from app.models import User, Role, Permission, role_permission, user_role
# from app.utils import get_password_hash
# from sqlalchemy.exc import SQLAlchemyError

# def populate():
#     db = SessionLocal()

#     try:
#         # Step 1: Check/Create superuser
#         superuser = db.query(User).filter(User.username == "adminuser1").first()
#         if not superuser:
#             superuser = User(
#                 username="adminuser1",
#                 email="syedjawadali92@gmail.com",
#                 hashed_password=get_password_hash("password123"),
#                 is_superuser=True,
#                 is_active=True
#             )
#             db.add(superuser)
#             db.commit()
#             db.refresh(superuser)
#             print("✅ Superuser created.")
#         else:
#             print("✅ Superuser already exists.")

#         # Step 2: Check/Create 'Super Admin' role
#         role = db.query(Role).filter(Role.name == "Super Admin").first()
#         if not role:
#             role = Role(
#                 name="Super Admin",
#                 description="Has all permissions",
#                 code="super_admin",
#                 created_by_user_id=superuser.id
#             )
#             db.add(role)
#             db.commit()
#             db.refresh(role)
#             print("✅ 'Super Admin' role created.")

#             # Step 3: Assign all permissions to this role
#             all_permissions = db.query(Permission).all()
#             for permission in all_permissions:
#                 db.execute(role_permission.insert().values(
#                     role_id=role.id,
#                     permission_id=permission.id
#                 ))
#             db.commit()
#             print("✅ All permissions assigned to 'Super Admin' role.")

#         # Step 4: Assign role to superuser
#         existing_assignment = db.execute(
#             user_role.select().where(
#                 (user_role.c.user_id == superuser.id) &
#                 (user_role.c.role_id == role.id)
#             )
#         ).first()

#         if not existing_assignment:
#             db.execute(user_role.insert().values(
#                 user_id=superuser.id,
#                 role_id=role.id
#             ))
#             db.commit()
#             print("✅ Superuser assigned to 'Super Admin' role.")
#         else:
#             print("✅ Superuser already assigned to 'Super Admin' role.")

#     except SQLAlchemyError as e:
#         db.rollback()
#         print("❌ Error:", str(e))
#     finally:
#         db.close()

# if __name__ == "__main__":
#     populate()

from app.database import SessionLocal
from app.models import User
from app.utils import get_password_hash
from sqlalchemy.exc import SQLAlchemyError

def populate():
    db = SessionLocal()

    try:
        # Step 1: Check/Create superuser
        superuser = db.query(User).filter(User.username == "adminuser1").first()
        if not superuser:
            superuser = User(
                username="adminuser1",
                email="syedjawadali92@gmail.com",
                hashed_password=get_password_hash("password123"),
                is_superuser=True,
                is_active=True
            )
            db.add(superuser)
            db.commit()
            db.refresh(superuser)
            print("✅ Superuser created.")
        else:
            print("✅ Superuser already exists.")

        # ✅ Skip creating role and assigning it to superuser
        print("ℹ️ Skipping role and permission assignment for superuser. Superuser has all permissions by default.")

    except SQLAlchemyError as e:
        db.rollback()
        print("❌ Error:", str(e))
    finally:
        db.close()

if __name__ == "__main__":
    populate()
