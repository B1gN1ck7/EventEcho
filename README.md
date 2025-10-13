# Event Management System with AI Integration

This repository contains the source code and documentation for our Event Management System.  
The system allows students and organizers to create, discover, and engage with campus events.  
AI features are integrated using Hugging Face APIs.

## Features
- Canversational Assistant – answers questions about campus events.
- Event Description Generator – creates event descriptions from organizer inputs.
- Comment Moderation – ensures respectful and safe interactions in the comment section.

## Repository Structure
/frontend → React-based frontend (user interface)
/backend → Backend with Flask app (AI integration, APIs)
/setup.md → Setup instructions for development


## Branching Strategy
We use a feature branch workflow:

- main → stable, production-ready code  
- dev → active development branch  
- feature/[feature-name] → feature-specific work (e.g., `feature/chat-assistant`)  
- bugfix/[issue] → bug fixes  

See [CONTRIBUTING.md] for detailed contribution guidelines.  

## Project Management
We use GitHub Projects (Kanban) to manage tasks
