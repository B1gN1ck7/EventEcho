from functools import wraps
from flask import request, jsonify, g
from ..services.token_service import decode_token, ACCESS_TOKEN

def jwt_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        parts = auth_header.split()

        if len(parts) != 2 or parts[0].lower() != "bearer":
            return jsonify({"message": "Missing or invalid Authorization header"}), 401

        token = parts[1]
        try:
            payload = decode_token(token)
            if payload.get("type") != ACCESS_TOKEN:
                raise ValueError("Wrong token type")
        except Exception:
            return jsonify({"message": "Invalid or expired token"}), 401

        g.current_user_id = payload["sub"]
        return fn(*args, **kwargs)
    return wrapper
