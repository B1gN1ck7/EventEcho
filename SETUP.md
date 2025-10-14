# EventEcho Setup Guide

This guide explains how to set up EventEcho locally for development.

---

## Requirements

- **Python** 3.10+
- **PostgreSQL** 14+
- **Git**

Frontend uses basic **HTML**, **CSS**, and **JavaScript**, so no framework is required.

---

## 1. Clone the Repository

```bash
git clone https://github.com/B1gN1ck7/EventEcho.git
cd EventEcho
```

Project structure:
EventEcho/
├── backend/      # Python REST API (Flask or FastAPI)
├── frontend/     # Static HTML/CSS/JS frontend
├── docs/         # Documentation and database schemas
└── README.md

## 2. TODO: Environment Variables

Create a .env file inside backend/:

PORT=5000
ENV=development

# Database (work in progress, details pending)
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/eventecho

# JWT Auth (may not be using, check with contributors)
JWT_SECRET=your-secret-key

# File storage (work in progress, details pending)
UPLOAD_DIR=uploads

# If the frontend needs to call the API, we need to define an API base URL in JS or a small config file, e.g.:
// frontend/config.js
const API_URL = "http://localhost:5000";

## TODO: 3. Database Setup

Open PostgreSQL:

psql -U postgres


Create the database:

CREATE DATABASE eventecho;


Run your schema or migrations (if provided):

psql -U postgres -d eventecho -f docs/schema.sql

## 4. Backend Setup
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt


Start the backend server (example for Flask/FastAPI):

python app.py


The API should now be running at http://localhost:5000

## TODO: 5. Frontend Setup

If it’s a static frontend:

Just open frontend/index.html in your browser, or

Serve it via a simple Python server:

cd frontend
python -m http.server 3000


Then visit http://localhost:3000

If the frontend calls the backend API, make sure both are running.

## TODO: 6. Development Commands
Backend
pytest           # Run tests
flake8 .         # Linting
black .          # Auto-formatting

## TODO: 7. Branching & Commits

Branching

main --> production-ready

feature/* --> new features

fix/* --> bug fixes

Example Commit Message Conventions:

feat: add event registration endpoint
fix: correct database connection settings
docs: update setup instructions
