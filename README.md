# StudyHub

A full-stack study productivity application built with React and Flask.

## Features (MVP)

- User authentication (register/login with JWT)
- Create, edit, delete, and search notes
- Pomodoro timer
- Study session tracking
- Dashboard with study stats
- Leaderboard

> Advanced features (flashcards, file attachments, AI, real-time study rooms, etc.) are planned post-MVP — see [`DATABASE.md`](./DATABASE.md) and the team's roadmap discussion for details.

## Tech Stack

### Frontend
- React
- JavaScript
- Tailwind CSS
- Axios
- React Router

(if it needs changes guys change it)

### Backend
- Flask
- Flask-SQLAlchemy
- Flask-JWT-Extended
- Flask-CORS
- SQLite

## Team

**Backend (lead)**
- Esmira — API, database, auth

**Frontend**
- 1 Cat
- 2 Humans

## Installation

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Backend runs at `http://localhost:5000`

### Frontend

just go to the frontend directory by
```bash
cd frontend 
npm run dev
```
you can test for SEO issues by doing 
```bash
cd frontend 
npm run build
npm run preview
```

## Project Structure

```
StudyHub/
├── frontend/          # React application (frontend team's own structure)
├── backend/           # Flask API
└── docs/
    ├── README.md      # This file — maintained by backend lead
    ├── API.md         # Every backend endpoint — the contract with frontend
    └── DATABASE.md    # Tables and relationships
```

## Documentation

- [`API.md`](./API.md) — every backend endpoint. This is the contract frontend builds against — flag anything unclear or missing here.
- [`DATABASE.md`](./DATABASE.md) — tables and relationships.

Frontend-side docs (component structure, pages, task tracking) are owned and maintained by the frontend team.

## Screenshots

...soon