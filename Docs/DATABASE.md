# Database Documentation

## Overview

The application uses a relational database.

Each user has their own notes and study sessions.

---

# Tables

## Users

Stores user accounts.

| Field | Type | Description |
|------|------|-------------|
| id | Integer | Primary Key |
| username | String | Unique username |
| email | String | Unique email |
| password_hash | String | Hashed password |
| created_at | DateTime | Account creation date |

---

## Notes

Stores study notes.

| Field | Type | Description |
|------|------|-------------|
| id | Integer | Primary Key |
| title | String | Note title |
| content | Text | Note content |
| created_at | DateTime | Creation date |
| updated_at | DateTime | Last update |
| user_id | Integer | Owner of the note |

---

## Attachments

Stores uploaded files.

| Field | Type | Description |
|------|------|-------------|
| id | Integer | Primary Key |
| filename | String | Original file name |
| file_path | String | File location |
| uploaded_at | DateTime | Upload date |
| note_id | Integer | Related note |

---

## Study Sessions

Stores completed Pomodoro sessions.

| Field | Type | Description |
|------|------|-------------|
| id | Integer | Primary Key |
| subject | String | Study subject |
| duration | Integer | Duration in minutes |
| completed_at | DateTime | Session completion time |
| user_id | Integer | Owner of the session |

---

# Relationships

## User → Notes

One user can have many notes.

```
User
  │
  └──────< Notes
```

---

## Note → Attachments

One note can have many attachments.

```
Note
  │
  └──────< Attachments
```

---

## User → Study Sessions

One user can have many study sessions.

```
User
  │
  └──────< Study Sessions
```

---

# Entity Relationship Diagram (ERD)

```
Users
│
├── id
├── username
├── email
├── password_hash
└── created_at
      │
      │ 1
      │
      ▼
Notes
├── id
├── title
├── content
├── created_at
├── updated_at
└── user_id
      │
      │ 1
      │
      ▼
Attachments
├── id
├── filename
├── file_path
├── uploaded_at
└── note_id


Users
      │
      │ 1
      │
      ▼
Study Sessions
├── id
├── subject
├── duration
├── completed_at
└── user_id
```

---

# Future Tables (Optional)

Possible additions:

- Categories
- Tags
- Notifications
- User Settings
- Friend System
- Achievements