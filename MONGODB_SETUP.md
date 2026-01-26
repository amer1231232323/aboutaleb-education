# MongoDB Production Setup Guide

## ✅ Setup Complete

Your project now has a **production-ready MongoDB connection** that works both locally and on Vercel!

---

## 📋 What Was Fixed

### 1. **Database Connection** (`src/lib/db.js`)
- ✅ Connection pooling for serverless (Vercel-compatible)
- ✅ Connection caching to prevent multiple connections
- ✅ Proper error handling and logging
- ✅ Configurable connection options
- ✅ Utility functions: `connectDB()`, `disconnectDB()`, `getConnectionStatus()`

### 2. **MongoDB Models** (Improved)
- ✅ **User Model** (`src/models/User.js`)
  - Added email validation and lowercase/trim
  - Explicit collection name
  - Hot-reload safe
  
- ✅ **University Model** (`src/models/University.js`)
  - Better field validation
  - Trim for string fields
  - Explicit collection name
  
- ✅ **Application Model** (`src/models/Application.js`)
  - Added indexes for faster queries
  - Compound index on studentId + universityId
  - Better reference handling

### 3. **API Routes** (Fixed Error Handling)
Fixed critical routes missing try/catch:
- ✅ `src/pages/api/admin/add-university.js`
- ✅ `src/pages/api/admin/universities/[id].js`
- ✅ `src/pages/api/universities/index.js`

All routes now have:
- Proper error handling
- Validation
- Consistent response format
- Development vs production error messages

---

## 🔐 Required Environment Variables

Create or update your `.env.local` file:

```env
# ========================================
# MONGODB DATABASE CONNECTION (Required)
# ========================================
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/abou-taleb?retryWrites=true&w=majority

# ========================================
# JWT AUTHENTICATION (Required)
# ========================================
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long

# ========================================
# CLOUDINARY (Required for uploads)
# ========================================
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ========================================
# NEXT.JS PUBLIC (Optional)
# ========================================
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 🚀 How to Get MongoDB URI

### Option 1: MongoDB Atlas (Recommended)

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com/
2. **Sign up** or **Log in**
3. **Create a Cluster**:
   - Click "Build a Database"
   - Choose "Free" tier (M0)
   - Select a region close to your users
   - Click "Create Cluster"

4. **Create Database User**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Set username and password
   - Set privileges to "Read and write to any database"
   - Click "Add User"

5. **Whitelist IP Addresses**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

6. **Get Connection String**:
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<database>` with `abou-taleb`

Example:
```
mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/abou-taleb?retryWrites=true&w=majority
```

---

## 🌐 Vercel Deployment Setup

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add production-ready MongoDB setup"
git push origin main
```

### Step 2: Configure Vercel Environment Variables

Go to your Vercel project:
1. **Settings** → **Environment Variables**
2. Add these variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `MONGODB_URI` | Your MongoDB connection string | Production, Preview, Development |
| `JWT_SECRET` | Your JWT secret key | Production, Preview, Development |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name | Production, Preview, Development |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key | Production, Preview, Development |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret | Production, Preview, Development |

3. Click **Save**
4. **Redeploy** your project

---

## 🧪 Testing the Connection

### Test Locally

1. **Start the dev server**:
   ```bash
   npm run dev
   ```

2. **Test an API endpoint**:
   ```bash
   curl http://localhost:3000/api/universities
   ```

3. **Check the console**: You should see:
   ```
   ✅ MongoDB connected successfully
   ```

### Test Database Operations

Try registering a user:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 📊 Database Schema

### Collections

1. **users**
   - `name` (String)
   - `email` (String, unique, required)
   - `password` (String, hashed, required)
   - `phone` (String)
   - `role` (String: "student" | "admin")
   - `createdAt`, `updatedAt` (Timestamps)

2. **universities**
   - `name` (String, required)
   - `city` (String)
   - `type` (String)
   - `website` (String)
   - `description` (String)
   - `image` (String)
   - `tuition` (String)
   - `programs` (Array of Strings)
   - `language` (String)
   - `createdAt`, `updatedAt` (Timestamps)

3. **applications**
   - `studentId` (ObjectId → User)
   - `universityId` (ObjectId → University)
   - `universityName` (String)
   - `status` (String: "pending" | "accepted" | "rejected" | "missing_documents")
   - `notes` (String)
   - `createdAt`, `updatedAt` (Timestamps)

---

## 🔍 Connection Features

### Connection Pooling
```javascript
maxPoolSize: 10        // Max 10 connections
minPoolSize: 2         // Min 2 connections
serverSelectionTimeoutMS: 5000   // 5 sec timeout
socketTimeoutMS: 45000           // 45 sec socket timeout
```

### Caching (Serverless)
- Connections are cached in `global.mongoose`
- Reused across serverless function invocations
- Prevents "too many connections" error on Vercel

### Error Handling
- Development: Shows full error messages
- Production: Hides sensitive error details
- All errors logged server-side

---

## 🛠️ Troubleshooting

### Error: "Please define the MONGODB_URI environment variable"
**Solution**: Add `MONGODB_URI` to your `.env.local` file or Vercel dashboard

### Error: "MongoServerError: Authentication failed"
**Solution**: 
1. Check username and password in connection string
2. Verify database user exists in MongoDB Atlas
3. Ensure password is URL-encoded (no special characters)

### Error: "MongoServerError: IP not in whitelist"
**Solution**: 
1. Go to MongoDB Atlas → Network Access
2. Add IP: 0.0.0.0/0 (Allow from anywhere)
3. Wait 1-2 minutes for changes to apply

### Error: "Connection timeout"
**Solution**:
1. Check your internet connection
2. Verify cluster is running in MongoDB Atlas
3. Try a different region for your cluster

### Vercel Build Error
**Solution**:
1. Ensure all environment variables are set in Vercel
2. Check build logs for specific error messages
3. Verify `MONGODB_URI` doesn't have syntax errors

---

## 📝 Best Practices

✅ **Never commit `.env.local`** to Git (already in .gitignore)
✅ **Use strong JWT_SECRET** (32+ random characters)
✅ **Rotate secrets regularly** in production
✅ **Use MongoDB Atlas** for production (don't self-host)
✅ **Monitor connection pool** in MongoDB Atlas dashboard
✅ **Set up database backups** in MongoDB Atlas
✅ **Use indexes** for frequently queried fields

---

## 🎯 Next Steps

1. ✅ Deploy to Vercel with environment variables
2. ✅ Test all API endpoints in production
3. ✅ Create initial admin user
4. ✅ Set up MongoDB Atlas monitoring alerts
5. ✅ Configure database backups

---

## 📞 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Check MongoDB Atlas logs (Database → Metrics)
3. Verify all environment variables are set correctly
4. Test locally first before debugging production

---

## 🎉 Summary

✅ **MongoDB connection** is production-ready
✅ **Works locally** and on **Vercel**
✅ **Connection pooling** configured
✅ **Error handling** implemented
✅ **Models** optimized with indexes
✅ **API routes** secured with proper validation

**Your database is ready for production!** 🚀
