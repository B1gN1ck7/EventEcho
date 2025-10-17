# backend/app.py

from flask import Flask, jsonify, request
import psycopg2
from psycopg2 import IntegrityError
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
import re

app = Flask(__name__)

DB_CONF = {
    "user": "postgres",         # Your server username
    "password": "Reds0404!",    # Your DB password
    "host": "localhost",
    "dbname": "EventEcho",      # Your database name (case sensitive)
}
ph = PasswordHasher()

def get_db_connection():
    return psycopg2.connect(**DB_CONF)

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
    # Accept JSON or form-encoded bodies
    data = request.get_json(silent=True) or request.form
    username = data.get("username")
    password = data.get("password")

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
        return jsonify(message="Registration successful"), 200
    except IntegrityError as e:
        # psycopg2 raises IntegrityError for unique constraint violations.
        # Check SQLSTATE code for unique_violation (23505)
        pgcode = getattr(e, 'pgcode', None)
        if pgcode == '23505':
            return jsonify(error="Username already exists"), 400
        # Re-raise or return generic error for other integrity issues
        return jsonify(error="Registration failed due to constraint error"), 400
    except Exception as e:
        # Log exception in real app
        return jsonify(error="Registration failed"), 500

@app.route("/login", methods=["POST"])
def login():
    # Accept JSON or form-encoded bodies
    data = request.get_json(silent=True) or request.form
    username = data.get("username")
    password = data.get("password")

    if not is_valid_username(username) or not is_strong_password(password):
        return "Invalid username or password.", 400

    try:
        with get_db_connection() as db:
            with db.cursor() as cur:
                cur.execute("SELECT password_hash FROM users WHERE username=%s", (username,))
                row = cur.fetchone()
    except Exception:
        return jsonify(error="Login failed"), 500

    if not row:
        return jsonify(error="Invalid username or password"), 400

    stored_hash = row[0]
    try:
        ph.verify(stored_hash, password)
        return jsonify(message=f"Welcome, {username}! Login successful."), 200
    except VerifyMismatchError:
        return jsonify(error="Invalid username or password"), 400

if __name__ == "__main__":
    # In production use a WSGI server; keep debug off by default
    app.run(host="0.0.0.0", port=5000, debug=False)
