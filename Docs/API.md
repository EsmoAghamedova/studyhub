# API Documentation

## Base URL

```
http://localhost:5000/api
```

---

# Authentication

## Register

Creates a new user account.

### Endpoint

```http
POST /auth/register
```

### Request Body

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response (201)

```json
{
  "message": "User registered successfully."
}
```

### Error Response (400)

```json
{
  "message": "Email already exists."
}
```

---

## Login

Authenticates a user.

### Endpoint

```http
POST /auth/login
```

### Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response (200)

```json
{
  "access_token": "JWT_TOKEN"
}
```

---

# Notes

> All note endpoints require authentication.

---

## Get All Notes

### Endpoint

```http
GET /notes
```

### Success Response

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

## Get Single Note

### Endpoint

```http
GET /notes/:id
```

---

## Create Note

### Endpoint

```http
POST /notes
```

### Request Body

```json
{
  "title": "React",
  "content": "Learn useEffect."
}
```

### Success Response

```json
{
  "message": "Note created successfully."
}
```

---

## Update Note

### Endpoint

```http
PUT /notes/:id
```

### Request Body

```json
{
  "title": "Updated Title",
  "content": "Updated content."
}
```

---

## Delete Note

### Endpoint

```http
DELETE /notes/:id
```

### Success Response

```json
{
  "message": "Note deleted successfully."
}
```

---

# Attachments

## Upload Attachment

### Endpoint

```http
POST /attachments
```

### Content Type

```
multipart/form-data
```

### Fields

| Name | Type |
|------|------|
| file | File |
| note_id | Integer |

---

## Delete Attachment

### Endpoint

```http
DELETE /attachments/:id
```

---

# Study Sessions

## Create Session

### Endpoint

```http
POST /sessions
```

### Request Body

```json
{
  "duration": 25,
  "subject": "Python"
}
```

---

## Get All Sessions

### Endpoint

```http
GET /sessions
```

---

# Leaderboard

## Get Leaderboard

### Endpoint

```http
GET /leaderboard
```

### Success Response

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

# Authentication Header

Protected endpoints require:

```http
Authorization: Bearer <access_token>
```

---

# Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |