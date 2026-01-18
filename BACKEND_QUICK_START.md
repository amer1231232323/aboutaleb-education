# Backend Quick Start Guide

## 🚀 Quick Setup

### 1. Environment Variables
Create `.env.local` in the root directory:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-super-secret-key-min-32-characters
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Admin User
```bash
node scripts/make-admin.js
```
Follow the prompts to create your admin account.

---

## 🔑 Quick API Reference

### Base URL
```
http://localhost:3000/api
```

### Authentication Header
```
Authorization: Bearer <your_jwt_token>
```

---

## 📋 Common API Calls

### Student Registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

### Student Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Admin Login
```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin_password"
  }'
```

### Get Student Profile
```bash
curl -X GET http://localhost:3000/api/student/profile \
  -H "Authorization: Bearer <student_token>"
```

### Get Student Applications
```bash
curl -X GET http://localhost:3000/api/student/applications \
  -H "Authorization: Bearer <student_token>"
```

### Submit Application
```bash
curl -X POST http://localhost:3000/api/student/apply \
  -H "Authorization: Bearer <student_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "universityId": "university_id_here"
  }'
```

### Get All Students (Admin)
```bash
curl -X GET http://localhost:3000/api/admin/students \
  -H "Authorization: Bearer <admin_token>"
```

### Get All Applications (Admin)
```bash
curl -X GET http://localhost:3000/api/admin/applications \
  -H "Authorization: Bearer <admin_token>"
```

### Update Application Status (Admin)
```bash
curl -X PUT http://localhost:3000/api/admin/applications/<application_id> \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "accepted",
    "notes": "Congratulations! You have been accepted."
  }'
```

### Create University (Admin)
```bash
curl -X POST http://localhost:3000/api/admin/universities \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Harvard University",
    "city": "Cambridge",
    "type": "Private",
    "website": "https://harvard.edu",
    "description": "Top university",
    "tuition": "$50,000/year",
    "programs": ["Engineering", "Medicine", "Law"],
    "language": "English"
  }'
```

---

## 📊 Application Status Values

| Status | Description |
|--------|-------------|
| `pending` | Application submitted, awaiting review |
| `accepted` | Application accepted |
| `rejected` | Application rejected |
| `missing_documents` | Additional documents required |

---

## 🔐 User Roles

| Role | Access Level |
|------|-------------|
| `student` | Can view own profile and applications, submit applications |
| `admin` | Full access to all data, can manage universities and applications |

---

## 📁 Key Files

### Models
- `src/models/User.js` - User schema
- `src/models/University.js` - University schema
- `src/models/Application.js` - Application schema

### Authentication
- `src/lib/authMiddleware.js` - Main auth middleware
- `src/lib/studentAuth.js` - Student auth utilities
- `src/lib/adminAuthCheck.js` - Admin auth utilities

### API Routes
- `src/pages/api/auth/` - Authentication routes
- `src/pages/api/student/` - Student routes
- `src/pages/api/admin/` - Admin routes

---

## 🧪 Testing Flow

### Test Student Flow
1. Register a student account
2. Login and get token
3. View profile
4. Get list of universities
5. Submit application
6. View applications

### Test Admin Flow
1. Login as admin
2. View all students
3. View all applications
4. Update application status
5. Create/edit universities

---

## ⚠️ Common Issues

### Issue: "Unauthorized" Error
**Solution:** Make sure you're including the JWT token in the Authorization header:
```
Authorization: Bearer <your_token>
```

### Issue: "Forbidden - Admin access required"
**Solution:** You're trying to access an admin route with a student token. Use admin credentials.

### Issue: "Email already registered"
**Solution:** The email is already in use. Try a different email or login instead.

### Issue: "You have already applied to this university"
**Solution:** Students can only apply once per university. Check existing applications.

---

## 📚 Full Documentation

For complete API documentation, see:
- **BACKEND_API_DOCUMENTATION.md** - Complete API reference
- **BACKEND_IMPLEMENTATION_SUMMARY.md** - Implementation details

---

## 🎯 Quick Tips

1. **Always use HTTPS in production**
2. **Keep JWT_SECRET secure and never commit it**
3. **Tokens expire after 7 days**
4. **All passwords are automatically hashed**
5. **Students can only see their own data**
6. **Admins have full visibility**

---

## 🚀 Start Development Server

```bash
npm run dev
```

Server will start at: `http://localhost:3000`

---

## ✅ Checklist Before Going Live

- [ ] Set strong JWT_SECRET
- [ ] Configure production MongoDB URI
- [ ] Create admin account
- [ ] Test all API endpoints
- [ ] Enable HTTPS
- [ ] Set up proper CORS
- [ ] Add rate limiting
- [ ] Set up monitoring
- [ ] Configure backups

---

**Need Help?** Check the full documentation in BACKEND_API_DOCUMENTATION.md
