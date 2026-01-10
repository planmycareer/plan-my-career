# 🧪 API TESTING GUIDE

## Backend is Running on: http://localhost:5000
## Frontend is Running on: http://localhost:5173

---

## ✅ Quick Test Endpoints

### 1. Test Server Health
```bash
curl http://localhost:5000/api/test/questions
```
**Expected:** 401 Unauthorized (needs auth)

---

### 2. Register a New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@test.com\",\"password\":\"test123\",\"class\":\"12th\",\"category\":\"General\"}"
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "_id": "...",
    "name": "Test User",
    "email": "test@test.com",
    "role": "student"
  }
}
```

---

### 3. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@test.com\",\"password\":\"test123\"}"
```

---

### 4. Get Test Questions (Requires Token)
```bash
curl http://localhost:5000/api/test/questions \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected:** 35 questions across 7 sections

---

### 5. Submit Test
```bash
curl -X POST http://localhost:5000/api/test/submit \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d "{\"answers\":[{\"question_id\":\"APT_001\",\"selected_option\":\"Strongly Agree\"}]}"
```

---

### 6. Generate Report
```bash
curl -X POST http://localhost:5000/api/report/generate \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### 7. Predict Colleges (JEE/NEET)
```bash
curl -X POST http://localhost:5000/api/predictor/college \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d "{\"exam\":\"JEE\",\"rank\":5000,\"category\":\"General\",\"state\":\"Delhi\",\"quota\":\"AI\"}"
```

---

## 🎯 TESTING IN BROWSER

### Option 1: Use Frontend
1. Open: http://localhost:5173
2. Register new account
3. Login
4. Take the career test
5. View report
6. Use college predictor
7. Book session

### Option 2: Use Postman
1. Import the API endpoints above
2. Test each endpoint sequentially
3. Save the JWT token from login
4. Use it in Authorization header for protected routes

---

## 📊 Database Contents

Run these to check what's in MongoDB:

```bash
# Connect to MongoDB
mongo

# Use the database
use career-web

# Check collections
show collections

# View questions
db.questions.find().count()
# Expected: 35 questions

# View cutoffs
db.collegecutoffs.find().count()
# Expected: 26 colleges

# View users (after registration)
db.users.find()

# View tests (after submission)
db.tests.find()

# View reports (after generation)
db.reports.find()
```

---

## 🚀 NEXT STEPS

1. **Test Registration & Login** via frontend (http://localhost:5173)
2. **Take the 7-section test** (35 questions)
3. **View comprehensive report** with charts
4. **Test college predictor** with your JEE/NEET rank
5. **Book counselling session**

---

## 🎉 SUCCESS METRICS

✅ MongoDB connected with 35 questions + 26 cutoffs  
✅ Backend API running on port 5000  
✅ Frontend React app running on port 5173  
✅ JWT authentication working  
✅ 7-section psychometric test ready  
✅ Report fusion engine ready  
✅ College predictor ready (JEE + NEET)  
✅ Booking system ready  

---

**Your production-grade Career Counselling Platform is LIVE! 🚀**
