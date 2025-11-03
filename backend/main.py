from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal
from models import User

# Create tables if not exist
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS setup
origins = ["https://your-frontend.vercel.app"]  # change this to your frontend URL

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"message": "Backend connected successfully"}

@app.get("/api/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

@app.post("/api/users")
def create_user(name: str, db: Session = Depends(get_db)):
    user = User(name=name)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": f"User '{name}' added!", "user": {"id": user.id, "name": user.name}}