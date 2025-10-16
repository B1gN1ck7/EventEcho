from sqlalchemy.exc import IntegrityError
from ..extensions import db
from ..models import User
from ..utils.security import hash_password, verify_password
from .token_service import create_access_token, create_refresh_token

class UserAlreadyExists(Exception): ...
class InvalidCredentials(Exception): ...

def register_user(username: str, password: str) -> User:
    user = User(username=username, password_hash=hash_password(password))
    db.session.add(user)
    try:
        db.session.commit()
    except IntegrityError as exc:
        db.session.rollback()
        raise UserAlreadyExists("Username already taken") from exc
    return user

def authenticate_user(username: str, password: str):
    user = User.query.filter_by(username=username).first()
    if not user or not verify_password(user.password_hash, password):
        raise InvalidCredentials("Invalid username or password")
    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id)
    return user, access_token, refresh_token
