from flask import Blueprint, jsonify, request
from ..services import user_service
from ..services.token_service import decode_token, REFRESH_TOKEN, create_access_token

bp = Blueprint("auth", __name__, url_prefix="/auth")

@bp.post("/register")
def register():
    data = request.get_json(silent=True) or {}
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "username and password required"}), 400

    try:
        user = user_service.register_user(username, password)
    except user_service.UserAlreadyExists:
        return jsonify({"message": "username already taken"}), 409

    return jsonify({"id": user.id, "username": user.username}), 201

@bp.post("/login")
def login():
    data = request.get_json(silent=True) or {}
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "username and password required"}), 400

    try:
        user, access_token, refresh_token = user_service.authenticate_user(username, password)
    except user_service.InvalidCredentials:
        return jsonify({"message": "invalid credentials"}), 401

    return jsonify({
        "user": {"id": user.id, "username": user.username},
        "access_token": access_token,
        "refresh_token": refresh_token
    }), 200

@bp.post("/refresh")
def refresh():
    data = request.get_json(silent=True) or {}
    refresh_token = data.get("refresh_token")
    if not refresh_token:
        return jsonify({"message": "refresh_token required"}), 400

    try:
        payload = decode_token(refresh_token)
        if payload.get("type") != REFRESH_TOKEN:
            raise ValueError("Invalid token type")
    except Exception:
        return jsonify({"message": "invalid refresh token"}), 401

    new_access_token = create_access_token(payload["sub"])
    return jsonify({"access_token": new_access_token}), 200
