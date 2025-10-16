import time
import jwt
from flask import current_app

ACCESS_TOKEN = "access"
REFRESH_TOKEN = "refresh"

def _create_token(user_id: int, token_type: str, expires_delta):
    now = int(time.time())
    payload = {
        "sub": user_id,
        "iat": now,
        "exp": now + int(expires_delta.total_seconds()),
        "type": token_type,
    }
    secret = current_app.config["JWT_SECRET_KEY"]
    return jwt.encode(payload, secret, algorithm="HS256")

def create_access_token(user_id: int) -> str:
    return _create_token(user_id, ACCESS_TOKEN, current_app.config["ACCESS_TOKEN_EXPIRES"])

def create_refresh_token(user_id: int) -> str:
    return _create_token(user_id, REFRESH_TOKEN, current_app.config["REFRESH_TOKEN_EXPIRES"])

def decode_token(token: str) -> dict:
    secret = current_app.config["JWT_SECRET_KEY"]
    return jwt.decode(token, secret, algorithms=["HS256"])
