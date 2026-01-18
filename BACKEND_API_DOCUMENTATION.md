# Backend API Documentation

## Complete Backend Implementation Summary

This document provides a comprehensive overview of all backend routes, authentication, and database structure for the Abou Taleb Platform.

---

## 🗄️ Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique, required),
  password: String (hashed, required),
  phone: String,
  role: "student" | "admin" (default: "student"),
  createdAt: Date,
  updatedAt: Date
}
```

### University Model
```javascript
{
  name: String (required),
  city: String,
  type: String,
  website: String,
  description: String,
  image: String,
  tuition: String,
  programs: [String],
  language: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Application Model
```javascript
{
  studentId: ObjectId (ref: User, required),
  universityId: ObjectId (ref: University, required),
  universityName: String,
  status: "pending" | "accepted" | "rejected" | "missing_documents" (default: "pending"),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

Token payload structure:
```javascript
{
  userId: String,
  role: "student" | "admin",
  exp: Number
}
```

---

## 📡 API Routes

### Public Routes

#### POST `/api/auth/register`
Register a new student account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890" // optional
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Account created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "student"
  },
  "redirectUrl": "/student/dashboard"
}
```

---

#### POST `/api/auth/login`
Login for both students and admins.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "user@example.com",
    "phone": "+1234567890",
    "role": "student"
  },
  "redirectUrl": "/student/dashboard"
}
```

---

#### POST `/api/admin/login`
Admin-only login endpoint.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin_password"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Admin login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "admin_id",
    "name": "Admin Name",
    "email": "admin@example.com",
    "role": "admin"
  },
  "redirectUrl": "/admin/dashboard"
}
```

**Error (403):**
```json
{
  "success": false,
  "message": "Access denied - Admin only"
}
```

---

#### GET `/api/universities`
Get all universities (public access).

**Response (200):**
```json
[
  {
    "_id": "university_id",
    "name": "University Name",
    "city": "City",
    "type": "Public/Private",
    "website": "https://example.com",
    "description": "Description",
    "image": "/images/uni.jpg",
    "tuition": "$10,000/year",
    "programs": ["Engineering", "Medicine"],
    "language": "English",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

#### GET `/api/universities/[id]`
Get single university details (public access).

**Response (200):**
```json
{
  "_id": "university_id",
  "name": "University Name",
  "city": "City",
  "type": "Public",
  "website": "https://example.com",
  "description": "Description",
  "image": "/images/uni.jpg",
  "tuition": "$10,000/year",
  "programs": ["Engineering", "Medicine"],
  "language": "English"
}
```

---

### Student Routes (Protected - Student Role Required)

#### GET `/api/student/profile`
Get logged-in student's profile.

**Headers:**
```
Authorization: Bearer <student_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "student_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "student",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

#### GET `/api/student/applications`
Get all applications for the logged-in student.

**Headers:**
```
Authorization: Bearer <student_token>
```

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "application_id",
      "university": {
        "id": "university_id",
        "name": "University Name",
        "city": "City",
        "type": "Public",
        "image": "/images/uni.jpg",
        "tuition": "$10,000/year",
        "programs": ["Engineering"],
        "language": "English"
      },
      "status": "pending",
      "notes": "Application under review",
      "appliedAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### POST `/api/student/apply`
Submit a new university application.

**Headers:**
```
Authorization: Bearer <student_token>
```

**Request Body:**
```json
{
  "universityId": "university_id"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "id": "application_id",
    "universityName": "University Name",
    "status": "pending",
    "appliedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "You have already applied to this university"
}
```

---

### Admin Routes (Protected - Admin Role Required)

#### GET `/api/admin/universities`
Get all universities (admin view).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
[
  {
    "_id": "university_id",
    "name": "University Name",
    "city": "City",
    "type": "Public",
    "website": "https://example.com",
    "description": "Description",
    "image": "/images/uni.jpg",
    "tuition": "$10,000/year",
    "programs": ["Engineering", "Medicine"],
    "language": "English",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

#### POST `/api/admin/universities`
Create a new university.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "New University",
  "city": "City",
  "type": "Public",
  "website": "https://example.com",
  "description": "Description",
  "image": "/images/uni.jpg",
  "tuition": "$10,000/year",
  "programs": ["Engineering", "Medicine"],
  "language": "English"
}
```

**Response (201):**
```json
{
  "_id": "new_university_id",
  "name": "New University",
  ...
}
```

---

#### GET `/api/admin/universities/[id]`
Get single university (admin view).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "_id": "university_id",
  "name": "University Name",
  ...
}
```

---

#### PUT `/api/admin/universities/[id]`
Update a university.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "tuition": "$12,000/year"
}
```

**Response (200):**
```json
{
  "_id": "university_id",
  "name": "Updated Name",
  "tuition": "$12,000/year",
  ...
}
```

---

#### DELETE `/api/admin/universities/[id]`
Delete a university.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "message": "Deleted"
}
```

---

#### GET `/api/admin/applications`
Get all student applications.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": "application_id",
      "student": {
        "id": "student_id",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890"
      },
      "university": {
        "id": "university_id",
        "name": "University Name",
        "city": "City",
        "type": "Public"
      },
      "status": "pending",
      "notes": "Application notes",
      "appliedAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### POST `/api/admin/applications`
Create a new application (admin can create for any student).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "studentId": "student_id",
  "universityId": "university_id",
  "status": "pending",
  "notes": "Initial notes"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Application created successfully",
  "data": {
    "_id": "application_id",
    "studentId": "student_id",
    "universityId": "university_id",
    "status": "pending",
    "notes": "Initial notes"
  }
}
```

---

#### GET `/api/admin/applications/[id]`
Get single application details.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "application_id",
    "student": {
      "id": "student_id",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890"
    },
    "university": {
      "id": "university_id",
      "name": "University Name",
      "city": "City",
      "type": "Public",
      "tuition": "$10,000/year",
      "programs": ["Engineering"],
      "language": "English"
    },
    "status": "pending",
    "notes": "Application notes",
    "appliedAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

#### PUT `/api/admin/applications/[id]`
Update application status and notes.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "status": "accepted",
  "notes": "Congratulations! You have been accepted."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Application updated successfully",
  "data": {
    "id": "application_id",
    "status": "accepted",
    "notes": "Congratulations! You have been accepted.",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

---

#### DELETE `/api/admin/applications/[id]`
Delete an application.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Application deleted successfully"
}
```

---

#### GET `/api/admin/students`
Get all students with their applications.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": "student_id",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "registeredAt": "2024-01-01T00:00:00.000Z",
      "applicationsCount": 2,
      "applications": [
        {
          "id": "application_id",
          "university": {
            "id": "university_id",
            "name": "University Name",
            "city": "City",
            "type": "Public"
          },
          "status": "pending",
          "notes": "Under review",
          "appliedAt": "2024-01-01T00:00:00.000Z",
          "updatedAt": "2024-01-01T00:00:00.000Z"
        }
      ]
    }
  ]
}
```

---

### Mixed Access Routes (Protected - Any Authenticated User)

#### GET `/api/applications`
Get applications based on user role.
- **Admin**: Returns all applications
- **Student**: Returns only their own applications

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "application_id",
      "studentId": {
        "_id": "student_id",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "universityId": {
        "_id": "university_id",
        "name": "University Name",
        ...
      },
      "status": "pending",
      "notes": "Notes",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### POST `/api/applications`
Create application (students only).

**Headers:**
```
Authorization: Bearer <student_token>
```

**Request Body:**
```json
{
  "universityId": "university_id",
  "universityName": "University Name"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Application created successfully",
  "data": {
    "_id": "application_id",
    "studentId": "student_id",
    "universityId": "university_id",
    "status": "pending"
  }
}
```

---

## 🔒 Authorization Summary

| Route | Access Level | Description |
|-------|-------------|-------------|
| `/api/auth/register` | Public | Student registration |
| `/api/auth/login` | Public | Student/Admin login |
| `/api/admin/login` | Public | Admin-only login |
| `/api/universities` | Public | View universities |
| `/api/universities/[id]` | Public | View university details |
| `/api/student/*` | Student Only | Student dashboard routes |
| `/api/admin/*` | Admin Only | Admin management routes |
| `/api/applications` | Authenticated | Role-based access |

---

## 🎯 Application Status Values

- `pending` - Application submitted, awaiting review
- `accepted` - Application accepted
- `rejected` - Application rejected
- `missing_documents` - Additional documents required

---

## ⚠️ Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `400` - Bad Request (missing/invalid data)
- `401` - Unauthorized (not logged in)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `405` - Method Not Allowed
- `500` - Server Error

---

## 🚀 Getting Started

### 1. Environment Variables
Create a `.env.local` file:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
```

### 2. Create Admin User
Run the script to create an admin:
```bash
node scripts/make-admin.js
```

### 3. Test the API
Use tools like Postman or curl to test the endpoints.

---

## 📝 Notes

1. All passwords are hashed using bcrypt before storage
2. JWT tokens expire after 7 days
3. All timestamps are in ISO 8601 format
4. The `studentId` in applications is automatically set from the JWT token for students
5. Admins can create applications for any student
6. Students can only view and create their own applications
7. All protected routes require valid JWT token in Authorization header

---

## 🔧 Middleware Files

- `src/lib/authMiddleware.js` - Main authentication middleware
- `src/lib/adminAuthCheck.js` - Admin verification utilities
- `src/lib/studentAuth.js` - Student verification utilities
- `src/lib/auth.js` - JWT token generation
- `src/lib/db.js` - MongoDB connection

---

**Backend Implementation Complete! ✅**
