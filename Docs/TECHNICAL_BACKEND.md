# StudyHub Backend Technical Documentation

## Overview

The backend is built using **Python** and **Flask**. It provides a REST API that allows the frontend to authenticate users, manage notes, upload attachments, record study sessions, and retrieve leaderboard data.

The backend is responsible for:

- User authentication
- Database management
- Business logic
- File uploads
- Returning JSON responses
- Securing protected routes

---

## Technologies

- Python 3
- Flask
- Flask-SQLAlchemy
- Flask-JWT-Extended
- Flask-CORS
- python-dotenv
- SQLite (Development)
- PostgreSQL (Production)

---

## Project Structure

```
backend/
├── models/
│   ├── __init__.py
│   ├── user.py
│   ├── note.py
│   └── session.py
│
├── routes/
│   ├── __init__.py
│   ├── auth.py
│   ├── notes.py
│   ├── sessions.py
│   └── leaderboard.py
│
├── tests/
│
├── .env
├── .env.example
├── app.py
├── config.py
├── database.py
└── requirements.txt
```

---

## Architecture

The backend follows a simple layered structure:

```
HTTP Request
     │
     ▼
Flask Route
     │
     ▼
Database Model
     │
     ▼
SQLite / PostgreSQL
     │
     ▼
JSON Response
```

---

## Application Entry Point

**app.py**

Responsibilities:

- Create the Flask application
- Load configuration
- Initialize extensions
- Register blueprints
- Start the server

---

## Configuration

**config.py**

Responsible for:

- Secret keys
- Database configuration
- JWT configuration
- Application settings

Environment variables are loaded from the `.env` file.

---

## Database

**database.py**

Initializes SQLAlchemy.

Responsibilities:

- Create the database connection
- Initialize the ORM

---

## Models

The `models` folder contains all database tables. Each model represents one database table.

Current models:

- User
- Note
- Study Session

---

## Routes

The `routes` folder contains the API endpoints.

### auth.py

Handles:

- User registration
- User login
- JWT authentication

### notes.py

Handles:

- Create note
- Read notes
- Update note
- Delete note

### sessions.py

Handles:

- Create study session
- View study sessions

### leaderboard.py

Handles:

- Retrieve leaderboard data
- Calculate ranking based on study time

---

## Authentication

Authentication uses **JWT (JSON Web Token)**.

Flow:

```
User Login
     │
     ▼
Verify Credentials
     │
     ▼
Generate JWT Token
     │
     ▼
Return Token
     │
     ▼
Client sends token with protected requests
```

Protected endpoints require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## Database Flow

```
Request
   │
   ▼
Route
   │
   ▼
Model
   │
   ▼
Database
   │
   ▼
JSON Response
```

---

## Error Handling

The backend returns appropriate HTTP status codes.

| Status Code | Description |
|---|---|
| 200 | Success |
| 201 | Resource Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Resource Not Found |
| 500 | Internal Server Error |

Example response:

```json
{
  "message": "Invalid credentials."
}
```

---

## Testing

Tests are located inside the `tests` directory.

Planned tests:

- Authentication
- Notes
- Study Sessions
- Leaderboard

---

## Future Improvements

Possible backend improvements:

- File attachment support
- Password reset
- Email verification
- Search functionality
- Pagination
- Docker support
- Logging
- Unit testing with Pytest