# StudyHub Database Documentation

## Overview

StudyHub uses a relational database to store user accounts, notes, file attachments, and study activity.

Main database principles:

- Each user owns their personal data.
- Users can create and manage notes.
- Notes can contain file attachments.
- Users can track their study sessions through a Pomodoro timer.
- Leaderboard rankings are calculated from completed study sessions.

---

## Database Tables

### 1. Users

Stores user account information and authentication data.

| Field | Type | Description |
|---|---|---|
| id | Integer | Primary Key |
| username | String | Unique username |
| email | String | Unique email address |
| password_hash | String | Hashed user password |
| created_at | DateTime | Account creation date |
| deleted_at | DateTime Nullable | Account deletion request date |

### 2. Notes

Stores personal study notes created by users.

| Field | Type | Description |
|---|---|---|
| id | Integer | Primary Key |
| title | String | Note title |
| content | Text | Note content |
| created_at | DateTime | Creation date |
| updated_at | DateTime | Last modification date |
| user_id | Integer | Owner of the note |

### 3. Attachments

Stores files uploaded and connected to notes.

| Field | Type | Description |
|---|---|---|
| id | Integer | Primary Key |
| original_filename | String | Original uploaded file name |
| stored_filename | String | Generated unique file name |
| file_path | String | Location where file is stored |
| uploaded_at | DateTime | Upload date |
| note_id | Integer | Related note |

**File Storage Logic**

When a user uploads a file:

1. Backend receives the file.
2. A unique filename is generated.
3. The file is stored.
4. The file information is saved in the database.

Example:

```
Original: math_notes.pdf
Stored:   8f72a91c-math_notes.pdf
```

### 4. Study Sessions

Stores Pomodoro study sessions.

A study session is created when a user starts a timer. The system tracks:

- When studying starts.
- When studying ends.
- How many minutes were actually studied.
- Current session status.

| Field | Type | Description |
|---|---|---|
| id | Integer | Primary Key |
| user_id | Integer | Session owner |
| subject | String | Study subject |
| started_at | DateTime | Timer start time |
| ended_at | DateTime Nullable | Timer finish time |
| duration_minutes | Integer | Actual studied minutes |
| status | String | active, completed, cancelled |
| created_at | DateTime | Session creation date |

---

## Relationships

### User → Notes

One user can have many notes.

```
User
 └───< Notes
```

Example:

```
User: Esmira
Notes:
  - Python Notes
  - Flask API Notes
  - Database Ideas
```

### Note → Attachments

One note can have many attachments.

```
Note
 └───< Attachments
```

Example:

```
Note: "Database Design"
Attachments:
  - ERD.png
  - SQL.pdf
```

### User → Study Sessions

One user can have many study sessions.

```
User
 └───< Study Sessions
```

Example:

```
User: (any user)
Study Sessions:
  - Math   - 50 minutes
  - Python - 90 minutes
  - English - 30 minutes
```

---

## Entity Relationship Diagram (ERD)

```
Users (1) ──< (N) Notes (1) ──< (N) Attachments

Users (1) ──< (N) Study Sessions
```

**Users**
- id
- username
- email
- password_hash
- created_at
- deleted_at

**Notes**
- id
- title
- content
- created_at
- updated_at
- user_id (FK → Users.id)

**Attachments**
- id
- original_filename
- stored_filename
- file_path
- uploaded_at
- note_id (FK → Notes.id)

**Study Sessions**
- id
- user_id (FK → Users.id)
- subject
- started_at
- ended_at
- duration_minutes
- status
- created_at

---

## Pomodoro Session Logic

### Starting a Session

When the user clicks Start, the backend checks:

> Does the user already have an active session?

- **If yes:** Return an error — the user cannot start another timer.
- **If no:** Create a new session:
  ```
  status = active
  started_at = current time
  ended_at = null
  duration_minutes = 0
  ```

### Active Session

While the timer is running:

- Frontend displays the timer.
- Backend stores `started_at` and `status = active`.
- The backend is the source of truth for time calculation.

### Ending a Session

When the user clicks Stop, the backend:

1. Gets the current time.
2. Calculates the actual study duration.
3. Updates the session.

Example:

```
started_at:       14:00
ended_at:         14:35
duration_minutes: 35
```

The session becomes:

```
status = completed
```

### Closing Browser / Leaving Page

If a user closes the browser, the session is **not** automatically lost.

When the user returns, the backend checks:

> Is there an active session?

If yes, the user can continue or finish the session.

---

## Leaderboard Logic

The leaderboard does not have a separate database table. Ranking is calculated from Study Sessions.

```
Study Sessions → SUM(duration_minutes) → User Ranking
```

Example:

```
User A: 500 minutes
User B: 350 minutes
User C: 200 minutes
```

Ranking:

```
1. User A
2. User B
3. User C
```

---

## Account Deletion Logic

Users are not immediately deleted. When a user deletes their account:

```
deleted_at = current date
```

The account enters a recovery period.

### Recovery Period

The user can restore their account within 14 days. During this time:

- Login is restricted.
- Data is kept safely.

After 14 days, the account is permanently deleted, along with:

- User account
- Notes
- Attachments
- Study Sessions

---

## Future Database Improvements

### Categories

Allow users to organize notes.

Example: `Programming`, `Mathematics`, `Languages`

Relationship:

```
Category (1) ──< (N) Notes
```

### Tags

Allow multiple labels for notes.

Example: `#python`, `#backend`, `#exam`

### Notifications

For:

- Study reminders
- Goals
- Deadlines

### Achievements

Gamification system. Examples:

- First Pomodoro completed
- 10 hours studied
- 100 notes created

### User Settings

Stores personal preferences:

- Theme
- Timer preferences
- Notification settings