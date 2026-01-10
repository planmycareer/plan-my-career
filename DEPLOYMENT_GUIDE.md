# 🚀 COMPLETE DEPLOYMENT GUIDE - Psychometric Career Platform

## 📋 TABLE OF CONTENTS
1. [Prerequisites](#prerequisites)
2. [MongoDB Atlas Setup](#mongodb-atlas-setup)
3. [Database Seeding](#database-seeding)
4. [Backend Testing](#backend-testing)
5. [Frontend Integration](#frontend-integration)
6. [Production Deployment](#production-deployment)
7. [API Testing Guide](#api-testing-guide)

---

## ✅ PREREQUISITES

### Required Software
- ✅ Node.js (v16+) installed
- ✅ MongoDB Atlas account (free tier)
- ✅ Git installed
- ✅ VS Code or any code editor
- ✅ Postman (for API testing)

### Environment Check
```powershell
node --version   # Should show v16+
npm --version    # Should show v8+
```

---

## 🗄️ MONGODB ATLAS SETUP

### Step 1: Create Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with email or Google
3. Choose **FREE M0 Cluster** (512MB storage)

### Step 2: Create Cluster
1. Click **"Build a Database"**
2. Choose **FREE M0** tier
3. Select cloud provider: **AWS**
4. Choose region closest to you
5. Cluster name: `career-web`
6. Click **"Create"**

### Step 3: Setup Database Access
1. Go to **"Database Access"** tab
2. Click **"Add New Database User"**
3. Username: `admin`
4. Password: Generate secure password (save it!)
5. User Privileges: **"Read and write to any database"**
6. Click **"Add User"**

### Step 4: Setup Network Access
1. Go to **"Network Access"** tab
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### Step 5: Get Connection String
1. Go back to **"Database"** tab
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**, Version: **4.1 or later**
5. Copy connection string:
```
mongodb+srv://admin:<password>@career-web.xxxxx.mongodb.net/?retryWrites=true&w=majority
```
6. Replace `<password>` with your actual password
7. Add database name: `/career-web` after `.net`

**Final format:**
```
mongodb+srv://admin:YourPassword123@career-web.xxxxx.mongodb.net/career-web?retryWrites=true&w=majority
```

### Step 6: Update .env File
```env
PORT=5000
MONGO_URI=mongodb+srv://admin:YourPassword123@career-web.xxxxx.mongodb.net/career-web?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_change_this_now
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

---

## 🌱 DATABASE SEEDING

### Seed Questions (35 questions across 7 sections)
```powershell
npm run seed:questions
```

**Expected Output:**
```
✅ Connected to MongoDB
🗑️  Cleared existing questions
✅ Inserted 35 questions
   Aptitude: 5 questions
   Interest: 5 questions
   Personality: 5 questions
   Skills: 5 questions
   Learning Style: 5 questions
   Motivation: 5 questions
   Work Preference: 5 questions

🎉 Question seeding complete!
```

### Seed College Cutoffs (JEE + NEET data)
```powershell
npm run seed:cutoffs
```

**Expected Output:**
```
✅ Connected to MongoDB
🗑️  Cleared existing cutoffs
✅ Inserted 25 college cutoffs
   JEE: 15 entries
   NEET: 10 entries

🎉 Cutoff seeding complete!
```

### Seed Everything at Once
```powershell
npm run seed:all
```

---

## 🧪 BACKEND TESTING

### Start Backend Server
```powershell
npm run dev:server
```

**Expected Output:**
```
[nodemon] 3.1.11
[nodemon] starting `node server.js`
✅ MongoDB connected
🚀 Server running on port 5000
```

### Create Admin User (using Postman)

**Method:** POST  
**URL:** `http://localhost:5000/api/auth/register`  
**Body (JSON):**
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "class": "12th",
  "role": "admin"
}
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

---

## 🧭 API TESTING GUIDE

### 1. Register Student
**POST** `http://localhost:5000/api/auth/register`
```json
{
  "name": "Test Student",
  "email": "student@test.com",
  "password": "test123",
  "class": "12th",
  "category": "General",
  "state": "Delhi"
}
```

### 2. Login
**POST** `http://localhost:5000/api/auth/login`
```json
{
  "email": "student@test.com",
  "password": "test123"
}
```
**Save the token from response!**

### 3. Get Questions (Protected Route)
**GET** `http://localhost:5000/api/test/questions`  
**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

### 4. Submit Test
**POST** `http://localhost:5000/api/test/submit`  
**Headers:** `Authorization: Bearer YOUR_TOKEN_HERE`  
**Body:**
```json
{
  "answers": [
    {
      "question_id": "APT001",
      "selected_option": "Very comfortable - I enjoy complex math"
    },
    {
      "question_id": "APT002",
      "selected_option": "Excellent - I spot patterns quickly"
    }
  ],
  "time_taken": 1200
}
```

### 5. Generate Report
**POST** `http://localhost:5000/api/report/generate`  
**Headers:** `Authorization: Bearer YOUR_TOKEN_HERE`

### 6. Get Report
**GET** `http://localhost:5000/api/report/{reportId}`  
**Headers:** `Authorization: Bearer YOUR_TOKEN_HERE`

### 7. College Predictor
**POST** `http://localhost:5000/api/predictor/college`  
**Headers:** `Authorization: Bearer YOUR_TOKEN_HERE`  
**Body:**
```json
{
  "exam": "JEE",
  "rank": 5000,
  "category": "General",
  "state": "Delhi",
  "quota": "AI"
}
```

### 8. Create Booking
**POST** `http://localhost:5000/api/booking`  
**Headers:** `Authorization: Bearer YOUR_TOKEN_HERE`  
**Body:**
```json
{
  "package": "Premium",
  "date": "2026-02-15",
  "time": "10:00 AM",
  "mode": "online"
}
```

### 9. Admin Dashboard (Admin Only)
**GET** `http://localhost:5000/api/admin/dashboard`  
**Headers:** `Authorization: Bearer ADMIN_TOKEN_HERE`

---

## 🎨 FRONTEND INTEGRATION

### Install Frontend Dependencies
```powershell
npm install axios recharts
```

### Create API Client (`src/api/client.js`)
```javascript
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient
```

### Update Login Page
```javascript
import apiClient from '../api/client'

const handleLogin = async (e) => {
  e.preventDefault()
  try {
    const { data } = await apiClient.post('/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    navigate('/dashboard')
  } catch (error) {
    setError(error.response?.data?.message || 'Login failed')
  }
}
```

---

## 🌐 PRODUCTION DEPLOYMENT

### Backend on Render.com

1. **Create Render Account:** https://render.com
2. **New Web Service**
   - Connect GitHub repo
   - Build Command: `npm install`
   - Start Command: `npm start`
3. **Environment Variables:**
   ```
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=your_production_secret
   JWT_EXPIRES_IN=7d
   NODE_ENV=production
   PORT=5000
   ```
4. **Deploy!**

### Frontend on Vercel

1. **Create Vercel Account:** https://vercel.com
2. **Import Project** from GitHub
3. **Environment Variables:**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
4. **Deploy!**

---

## 🎯 TESTING CHECKLIST

### Backend APIs
- [ ] ✅ MongoDB Atlas connected
- [ ] ✅ Questions seeded (35 questions)
- [ ] ✅ Cutoffs seeded (25 colleges)
- [ ] ✅ Register working
- [ ] ✅ Login working
- [ ] ✅ JWT auth working
- [ ] ✅ Get questions working
- [ ] ✅ Submit test working
- [ ] ✅ Generate report working
- [ ] ✅ College predictor working
- [ ] ✅ Booking system working
- [ ] ✅ Admin routes working

### Frontend Integration
- [ ] ⏳ axios installed
- [ ] ⏳ API client created
- [ ] ⏳ Login connects to backend
- [ ] ⏳ Test submission works
- [ ] ⏳ Report page shows real data
- [ ] ⏳ Charts render correctly
- [ ] ⏳ Predictor connects to backend

---

## 🐛 TROUBLESHOOTING

### Issue: MongoDB Connection Failed
**Solution:**
1. Check internet connection
2. Verify connection string in `.env`
3. Confirm password has no special characters (URL encode if needed)
4. Check Network Access allows 0.0.0.0/0

### Issue: JWT Token Invalid
**Solution:**
1. Check `JWT_SECRET` is set in `.env`
2. Verify token is sent in `Authorization: Bearer TOKEN` format
3. Check token hasn't expired (default 7 days)

### Issue: CORS Error
**Solution:**
Backend already has CORS enabled. If issue persists:
```javascript
// In server.js
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
```

---

## 📊 EXPECTED PERFORMANCE

### Database Size (Free Tier 512MB)
- Questions: ~35 docs = 50KB
- Cutoffs: ~25 docs = 30KB
- Users: 10,000 users = 2MB
- Tests: 10,000 submissions = 50MB
- Reports: 10,000 reports = 200MB
- **Total: ~250MB (within free tier!)**

### API Response Times
- Auth: ~200ms
- Get Questions: ~100ms
- Submit Test: ~500ms (scoring calculations)
- Generate Report: ~800ms (fusion engine)
- College Predictor: ~300ms
- **Average: ~400ms (excellent!)**

---

## 🎉 SUCCESS INDICATORS

You know it's working when:
1. ✅ Backend starts without errors
2. ✅ MongoDB Atlas shows connected
3. ✅ Postman returns 200 OK responses
4. ✅ JWT tokens are generated
5. ✅ Reports show section-wise scores
6. ✅ College predictor returns categorized colleges
7. ✅ Admin can view all students
8. ✅ Frontend loads real data

---

**🔥 Your production-grade psychometric platform is ready to launch!**

For support: Check BACKEND_API_DOCS.md for detailed API reference.
