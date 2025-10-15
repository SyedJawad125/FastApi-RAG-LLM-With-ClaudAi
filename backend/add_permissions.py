from sqlalchemy.orm import Session
from app.database import SessionLocal  # assuming SessionLocal returns a DB session
from app.models.permission import Permission

permissions = [
    {"name": "Create Role", "code": "create_role", "module_name": "Role", "description": "User can create role"},
    {"name": "Read Role", "code": "read_role", "module_name": "Role", "description": "User can read role"},
    {"name": "Update Role", "code": "update_role", "module_name": "Role", "description": "User can update role"},
    {"name": "Delete Role", "code": "delete_role", "module_name": "Role", "description": "User can delete role"},
    
    {"name": "Create Employee", "code": "create_employee", "module_name": "Employee", "description": "User can create Employee"},
    {"name": "Read Employee", "code": "read_employee", "module_name": "Employee", "description": "User can read Employee"},
    {"name": "Update Employee", "code": "update_employee", "module_name": "Employee", "description": "User can update Employee"},
    {"name": "Delete Employee", "code": "delete_employee", "module_name": "Employee", "description": "User can delete Employee"},

    {"name": "Create Image", "code": "create_image", "module_name": "Image", "description": "User can create Image"},
    {"name": "Read Image", "code": "read_image", "module_name": "Image", "description": "User can read Image"},
    {"name": "Update Image", "code": "update_image", "module_name": "Image", "description": "User can update Image"},
    {"name": "Delete Image", "code": "delete_image", "module_name": "Image", "description": "User can delete Image"},

    {"name": "Create Image Category", "code": "create_image_category", "module_name": "Image Category", "description": "User can create Image Category"},
    {"name": "Read Image Category", "code": "read_image_category", "module_name": "Image Category", "description": "User can read Image Category"},
    {"name": "Update Image Category", "code": "update_image_category", "module_name": "Image Category", "description": "User can update Image Category"},
    {"name": "Delete Image Category", "code": "delete_image_category", "module_name": "Image Category", "description": "User can delete Image Category"},
]

def add_permissions_to_db(db: Session):
    for perm in permissions:
        existing = db.query(Permission).filter_by(code=perm["code"]).first()
        if not existing:
            new_perm = Permission(**perm)
            db.add(new_perm)
            print(f"✅ Added: {perm['name']}")
        else:
            print(f"⏩ Skipped (already exists): {perm['name']}")
    db.commit()


if __name__ == "__main__":
    print("🚀 Populating permissions...")
    db = SessionLocal()
    try:
        add_permissions_to_db(db)
    finally:
        db.close()
