# StudyHub API Documentation

## Base URL

```
http://localhost:5000/api
```

---

## Authentication

### Register

Creates a new user account.

**Endpoint**

```http
POST /auth/register
```

**Request Body**

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201)**

```json
{
  "message": "User registered successfully."
}
```

**Error Response (400)**

```json
{
  "message": "Email already exists."
}
```

---

### Login

Authenticates a user and returns an access token.

**Endpoint**

```http
POST /auth/login
```

**Request Body**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200)**

```json
{
  "access_token": "JWT_TOKEN"
}
```

**Error Response (401)**

```json
{
  "message": "Invalid email or password."
}
```

---

## Notes

> All note endpoints require authentication.

### Get All Notes

**Endpoint**

```http
GET /notes
```

**Success Response (200)**

```json
[
  {
    "id": 1,
    "title": "Python Notes",
    "content": "Classes and objects...",
    "created_at": "2026-07-23T14:20:00",
    "updated_at": "2026-07-23T14:20:00"
  }
]
```

---

### Get Single Note

**Endpoint**

```http
GET /notes/:id
```

**Success Response (200)**

```json
{
  "id": 1,
  "title": "Python Notes",
  "content": "Classes and objects...",
  "created_at": "2026-07-23T14:20:00",
  "updated_at": "2026-07-23T14:20:00"
}
```

**Error Response (404)**

```json
{
  "message": "Note not found."
}
```

---

### Create Note

**Endpoint**

```http
POST /notes
```

**Request Body**

```json
{
  "title": "React",
  "content": "Learn useEffect."
}
```

**Success Response (201)**

```json
{
  "message": "Note created successfully."
}
```

---

### Update Note

**Endpoint**

```http
PUT /notes/:id
```

**Request Body**

```json
{
  "title": "Updated Title",
  "content": "Updated content."
}
```

**Success Response (200)**

```json
{
  "message": "Note updated successfully."
}
```

**Error Response (404)**

```json
{
  "message": "Note not found."
}
```

---

### Delete Note

**Endpoint**

```http
DELETE /notes/:id
```

**Success Response (200)**

```json
{
  "message": "Note deleted successfully."
}
```

**Error Response (404)**

```json
{
  "message": "Note not found."
}
```

---

## Attachments

### Upload Attachment

**Endpoint**

```http
POST /attachments
```

**Content Type**

```
multipart/form-data
```

**Fields**

| Name | Type | Description |
|---|---|---|
| file | File | The file to upload |
| note_id | Integer | The note to attach the file to |

**Success Response (201)**

```json
{
  "message": "Attachment uploaded successfully."
}
```

---

### Delete Attachment

**Endpoint**

```http
DELETE /attachments/:id
```

**Success Response (200)**

```json
{
  "message": "Attachment deleted successfully."
}
```

**Error Response (404)**

```json
{
  "message": "Attachment not found."
}
```

---

## Study Sessions

### Create Session

**Endpoint**

```http
POST /sessions
```

**Request Body**

```json
{
  "duration": 25,
  "subject": "Python"
}
```

**Success Response (201)**

```json
{
  "message": "Session started successfully."
}
```

---

### Get All Sessions

**Endpoint**

```http
GET /sessions
```

**Success Response (200)**

```json
[
  {
    "id": 1,
    "subject": "Python",
    "started_at": "2026-07-23T14:00:00",
    "ended_at": "2026-07-23T14:35:00",
    "duration_minutes": 35,
    "status": "completed"
  }
]
```

---

## Leaderboard

### Get Leaderboard

**Endpoint**

```http
GET /leaderboard
```

**Success Response (200)**

```json
[
  {
    "username": "Alex",
    "total_minutes": 860
  },
  {
    "username": "John",
    "total_minutes": 720
  }
]
```

---

## Authentication Header

Protected endpoints require the access token to be sent as a Bearer token:

```http
Authorization: Bearer <access_token>
```

---

## Status Codes

| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |