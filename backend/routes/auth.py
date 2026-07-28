from flask import Blueprint, request
from flask_jwt_extended import create_access_token
from database import db
from models.user import User

auth_bp = Blueprint(
    "auth",
    __name__
)


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return {
            "message": "Username, email and password are required."
        }, 400

    username = username.strip()
    email = email.strip().lower()

    if len(password) < 8:
        return {
            "message": "Password must be at least 8 characters."
        }, 400

    existing_username = User.query.filter_by(username=username).first()
    if existing_username:
        return {
            "message": "Username already exists."
        }, 409

    existing_email = User.query.filter_by(email=email).first()
    if existing_email:
        return {
            "message": "Email already exists."
        }, 409

    user = User(
        username=username,
        email=email
    )

    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return {
        "message": "Account created successfully."
    }, 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return {
            "message": "Email and password are required."
        }, 400

    email = email.strip().lower()

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return {
            "message": "Invalid email or password."
        }, 401

    access_token = create_access_token(
        identity=user.id
    )

    return {
        "message": "Login successful.",
        "access_token": access_token
    }, 200
