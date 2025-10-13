# EventEcho – Setup Guide

This guide explains how to set up EventEcho locally for development.

---

Requirements

- **Python** 3.10.11
- **PostgreSQL** (>= 14)
- **Git**

---

1. Clone the Repository

	git clone https://github.com/<your-org>/EventEcho.git
	cd EventEcho
	The project is structured as:
		EventEcho/
 		├── frontend/      # Next.js (HTML + CSS + JS)
 		├── backend/       # Node.js (Python)
 		├── docs/          # Documentation
 		└── SETUP.md
2. Environment Variables
	Create .env files in both frontend/ and backend/.

	Backend .env (inside ScholarXCel/backend/.env)		
		# Server
		PORT=5000
		NODE_ENV=development

		# Database
		DATABASE_URL=postgresql://<user>:<password>@localhost:5432/scholarxcel

		# JWT Auth
		JWT_SECRET=your-secret-key

		# File storage (local or S3-compatible later)
		UPLOAD_DIR=uploads

		# AI model
		AI_MODEL=gpt2
		AI_DEVICE=api
	
	Frontend .env.local (inside ScholarXCel/frontend/.env.local)
		NEXT_PUBLIC_API_URL=http://localhost:5000

3. Database Setup
	Create the database and run migrations.

		# Access Postgres
		psql -U postgres

		# Inside psql shell:
		CREATE DATABASE EventEcho;

		Run schema setup (see docs/schema.sql or migrations):
			psql -U postgres -d scholarxcel -f docs/schema.sql

4. Install Dependencies
	Backend
		cd backend
		npm install
	Frontend
		cd ../frontend
		npm install

5. Run Locally
	Start backend:
		cd backend
		npm run dev
	Start frontend:
		cd ../frontend
		npm run dev
	
	Frontend should now run at http://localhost:3000
	Backend should run at http://localhost:5000

6. Development Commands
	# Backend (Python)
	pytest            # run tests
	flake8 .          # linting
	black .           # formatting

	# Frontend (JS)
	npm run lint
	npm run test

7. Branching Strategy & Commit Conventions
	Branching
		main → production-ready
		dev → active development
		feature/* → new features
		fix/* → bug fixes

	Commit Messages (Conventional Commits)
		feat: add email API integration with Brevo
		fix: correct DB connection error
		docs: update setup guide
		chore: update dependencies

Done! EventEcho should now be running locally or in production