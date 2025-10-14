# backend/app.py
# pip install Flask mysql-connector-python argon2-cffi

from flask import Flask, jsonify, request
import mysql.connector
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
import re

app = Flask(__name__)

DB_CONF = {
    "user": "root",           # Replace with your DB user
    "password": "password",   # Replace with your DB password
    "host": "localhost",
    "database": "auth_name", #I need DB Name
}
ph = PasswordHasher()

def get_db_connection():
    return mysql.connector.connect(**DB_CONF)

def is_valid_username(username):
    # Only allow 3-32 alphanumeric/underscore characters
    return bool(username and re.fullmatch(r"[A-Za-z0-9_]{3,32}", username))

def is_strong_password(password):
    # User password should be at least 8 characters
    return bool(password and len(password) >= 8)

@app.route("/health")
def health():
    return jsonify(status="ok")

@app.route("/register", methods=["POST"])
def register():
    username = request.form.get("username")
    password = request.form.get("password")

    # Input validation
    if not is_valid_username(username):
        return "Invalid username.", 400
    if not is_strong_password(password):
        return "Password must be at least 8 characters.", 400

    password_hash = ph.hash(password)
    try:
        with get_db_connection() as db:
            with db.cursor() as cur:
                sql = "INSERT INTO users (username, password_hash) VALUES (%s, %s)"
                cur.execute(sql, (username, password_hash))
                db.commit()
        return "Registration successful!", 200
    except mysql.connector.IntegrityError:
        # Don't reveal if username exists
        return "Registration failed. Please try another username.", 400
    except Exception:
        return "Registration failed.", 500

@app.route("/login", methods=["POST"])
def login():
    username = request.form.get("username")
    password = request.form.get("password")

    if not is_valid_username(username) or not is_strong_password(password):
        return "Invalid username or password.", 400

    try:
        with get_db_connection() as db:
            with db.cursor() as cur:
                cur.execute("SELECT password_hash FROM users WHERE username=%s", (username,))
                row = cur.fetchone()
    except Exception:
        return "Login failed.", 500

    # Use generic invalid error
    if not row:
        return "Invalid username or password.", 400

    stored_hash = row[0]
    try:
        ph.verify(stored_hash, password)
        return f"Welcome, {username}! Login successful.", 200
    except VerifyMismatchError:
        return "Invalid username or password.", 400

if __name__ == "__main__":
    app.run(port=3000)
