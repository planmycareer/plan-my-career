# 🚀 GETTING STARTED - Complete Setup Guide

Welcome! This guide will take you from **zero to deployed** in under 1 hour.

---

## 📋 Prerequisites

### Required
- ✅ **Node.js v16+** installed ([Download](https://nodejs.org/))
- ✅ **Git** installed
- ✅ **Code editor** (VS Code recommended)
- ✅ **MongoDB Atlas account** (free - we'll set this up)

### Optional but Recommended
- ✅ **Postman** (for API testing)
- ✅ **GitHub account** (for deployment)

---

## ⚡ FASTEST PATH TO WORKING APP (20 Minutes)

### Step 1: Clone & Install (2 minutes)
```powershell
cd "c:\Users\Niraj Karnawat\Desktop\CAREER WEB"
npm install
```

### Step 2: Setup MongoDB Atlas (5 minutes)
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up (free)
3. Create **M0 Free Cluster** (512MB)
4. Create database user: `admin` / `[YOUR_PASSWORD]`
5. Network Access: Add IP `0.0.0.0/0` (allow all)
6. Get connection string: `mongodb+s
```

### Step 4: Seed Database (2 minutes)
```powershell
npm run seed:questions  # 35 questions
npm run seed:cutoffs    # 25 colleges
```

Expected output:
```
✅ Inserted 35 questions
✅ Inserted 25 college cutoffs
```

### Step 5: Start Backend (1 minute)
```powershell
npm run dev:server
```

Expected output:
```
✅ MongoDB connected
🚀 Server running on port 5000
```

### Step 6: Test with Postman (5 minutes)
**Register:**
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "Test Student",
  "email": "test@test.com",
  "password": "test123",
  "class": "12th"
}
```

**Get Questions:**
```
GET http://localhost:5000/api/test/questions
Headers: Authorization: Bearer [TOKEN_FROM_REGISTER]
```

### Step 7: Start Frontend (1 minute)
```powershell
# In a NEW terminal
npm run dev:client
```

Open http://localhost:5173

### Step 8: Test Full Flow (3 minutes)
1. Register/Login
2. Go to Dashboard
3. Take Career Test
4. View Report
5. Try College Predictor

**🎉 SUCCESS! Your app is working!**

---

## 📚 DETAILED SETUP OPTIONS

### Option A: Backend Only (Testing APIs)
Perfect for: API testing, backend development, Postman workflows

**Time:** 10 minutes  
**Steps:**
1. Complete Steps 1-5 above
2. Skip frontend for now
3. Test all APIs with Postman
4. See: `BACKEND_API_DOCS.md` for full API reference

### Option B: Full Stack (Frontend + Backend)
Perfect for: Complete app testing, demo preparation, full development

**Time:** 20 minutes  
**Steps:**
1. Complete all Steps 1-8 above
2. Both frontend and backend running
3. Full end-to-end testing
4. See: `DEPLOYMENT_GUIDE.md` for production deployment

### Option C: Production Deployment
Perfect for: Live deployment, client demos, real users

**Time:** 30 minutes  
**Steps:**
1. Complete Option B first
2. Deploy backend to Render.com
3. Deploy frontend to Vercel
4. See: `DEPLOYMENT_GUIDE.md` Section "Production Deployment"

---

## 🗂️ PROJECT STRUCTURE

```
CAREER WEB/
├── 📁 src/                      # Frontend React code
│   ├── components/              # 7 reusable components
│   ├── pages/                   # 7 main pages
│   ├── data/                    # Static data
│   └── api/                     # API client (to be created)
│
├── 📁 server/                   # Backend Node.js code
│   ├── models/                  # 7 MongoDB schemas
│   ├── services/                # 5 business logic modules
│   ├── controllers/             # 5 request handlers
│   ├── routes/                  # 6 API route files
│   ├── middleware/              # 3 middleware functions
│   └── utils/                   # 3 core engines
│
├── 📄 server.js                 # Backend entry point
├── 📄 seedQuestions.js          # Question seeder
├── 📄 seedCutoffs.js            # College cutoff seeder
├── 📄 package.json              # Dependencies
├── 📄 .env                      # Environment variables
│
└── 📚 Documentation/            # 8 comprehensive guides
    ├── README.md                # Main overview
    ├── QUICK_START_BACKEND.md   # 5-min backend setup
    ├── DEPLOYMENT_GUIDE.md      # Detailed deployment
    ├── BACKEND_API_DOCS.md      # Complete API reference
    ├── UPGRADE_STATUS.md        # Implementation progress
    ├── TRANSFORMATION_SUMMARY.md # What was built
    ├── PROJECT_ROADMAP.md       # Future phases
    └── EXECUTIVE_SUMMARY.md     # Business overview
```

---

## 🔧 TROUBLESHOOTING

### Issue: MongoDB Connection Failed
**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions:**
1. Check internet connection
2. Verify MONGO_URI in `.env`
3. Ensure password has no special characters (URL encode)
4. Confirm Network Access whitelist includes your IP

### Issue: JWT Token Invalid
**Error:** `401 Unauthorized`

**Solutions:**
1. Check JWT_SECRET is set in `.env`
2. Verify token format: `Authorization: Bearer TOKEN`
3. Token might be expired (default 7 days)
4. Re-login to get fresh token

### Issue: Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`

**Solutions:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID [PID_NUMBER] /F

# Or change port in .env
PORT=5001
```

### Issue: Questions Not Loading
**Error:** Empty questions array or 0 questions

**Solutions:**
1. Run seeder again: `npm run seed:questions`
2. Check MongoDB Atlas connection
3. Verify data in Atlas dashboard
4. Check server logs for errors

### Issue: CORS Error (Frontend → Backend)
**Error:** `Access to XMLHttpRequest blocked by CORS`

**Solutions:**
1. Backend already has CORS enabled (check server.js)
2. If issue persists, update CORS origin:
   ```javascript
   // In server.js
   app.use(cors({ origin: 'http://localhost:5173' }))
   ```

---

## 📖 LEARNING PATH

### 1. Understand the Backend (30 minutes)
- Read: `BACKEND_API_DOCS.md` → Complete API reference
- Read: `UPGRADE_STATUS.md` → What was built
- Study: `server/` folder structure

### 2. Test the APIs (30 minutes)
- Use Postman to test all endpoints
- Follow: `QUICK_START_BACKEND.md`
- Save requests in Postman collection

### 3. Explore Frontend (30 minutes)
- Review: `src/pages/` components
- Study: Existing UI flow
- Check: `src/data/` for static data

### 4. Integrate Frontend-Backend (2 hours)
- Create: `src/api/client.js`
- Update: Login/Register to use APIs
- Connect: Test submission to backend
- Display: Real report data
- Add: Charts with recharts

### 5. Deploy to Production (30 minutes)
- Follow: `DEPLOYMENT_GUIDE.md`
- Backend → Render.com
- Frontend → Vercel
- Test live URLs

---

## 🎯 WHAT YOU'LL GET

### After 20 Minutes
- ✅ Working backend with 20+ APIs
- ✅ Database with 60 records
- ✅ Frontend UI running
- ✅ Complete local development environment

### After 3 Hours (with frontend integration)
- ✅ Full-stack app working end-to-end
- ✅ Real psychometric test (35 questions)
- ✅ Personalized career reports
- ✅ College predictor (JEE + NEET)
- ✅ Charts and visualizations

### After 4 Hours (with deployment)
- ✅ Live on the internet
- ✅ Accessible from anywhere
- ✅ Ready for real users
- ✅ Shareable demo link
- ✅ Investor-pitch ready

---

## 🚀 QUICK COMMANDS REFERENCE

### Development
```powershell
npm run dev              # Run both frontend + backend
npm run dev:client       # Frontend only (port 5173)
npm run dev:server       # Backend only (port 5000)
```

### Database
```powershell
npm run seed:questions   # Seed 35 questions
npm run seed:cutoffs     # Seed 25 colleges
npm run seed:all         # Seed everything
```

### Production
```powershell
npm run build            # Build frontend for production
npm start                # Start backend (production mode)
```

---

## 📞 NEED HELP?

### Quick References
| Need | File | Time |
|------|------|------|
| Quick backend setup | `QUICK_START_BACKEND.md` | 5 min |
| Detailed deployment | `DEPLOYMENT_GUIDE.md` | 30 min |
| API testing | `BACKEND_API_DOCS.md` | Reference |
| Progress tracking | `UPGRADE_STATUS.md` | Overview |
| Business context | `EXECUTIVE_SUMMARY.md` | Big picture |

### Common Workflows

**Just want to test APIs?**
→ `QUICK_START_BACKEND.md`

**Need to deploy to production?**
→ `DEPLOYMENT_GUIDE.md`

**Want to understand the system?**
→ `TRANSFORMATION_SUMMARY.md`

**Looking for business value?**
→ `EXECUTIVE_SUMMARY.md`

**Tracking what's done?**
→ `UPGRADE_STATUS.md`

---

## 🎉 SUCCESS INDICATORS

You know it's working when:
1. ✅ Backend starts without errors
2. ✅ MongoDB shows "connected"
3. ✅ Postman returns 200 OK
4. ✅ Frontend loads at localhost:5173
5. ✅ Login works and returns JWT
6. ✅ Questions load (35 total)
7. ✅ Test submission returns scores
8. ✅ Report shows section analysis
9. ✅ Predictor categorizes colleges
10. ✅ Charts render correctly

---

## 💡 PRO TIPS

1. **Keep MongoDB Atlas dashboard open** - Watch data being inserted in real-time
2. **Use Postman Collections** - Save all requests for quick testing
3. **Check browser DevTools** - Monitor network requests and console logs
4. **Run seeders multiple times** - They clear old data first (safe to re-run)
5. **Test admin routes** - Create user with `"role": "admin"` to test admin APIs
6. **Read terminal output** - Error messages are very helpful
7. **Use environment variables** - Never hardcode secrets
8. **Git commit frequently** - Save your progress often

---

## 🏆 MILESTONES

### ✅ Milestone 1: Backend Running (10 min)
- MongoDB connected
- Server running on port 5000
- No errors in terminal

### ✅ Milestone 2: Database Seeded (12 min)
- 35 questions in database
- 25 colleges in database
- Visible in MongoDB Atlas

### ✅ Milestone 3: APIs Working (20 min)
- Register returns JWT token
- Questions endpoint returns 35 items
- Test submission calculates scores

### ⏳ Milestone 4: Frontend Integrated (3 hours)
- Login uses real API
- Test connects to backend
- Report shows real data

### ⏳ Milestone 5: Deployed to Production (4 hours)
- Backend live on Render
- Frontend live on Vercel
- Accessible via public URL

---

**🎯 Ready to start? Run these commands:**

```powershell
npm install
npm run seed:all
npm run dev
```

**⏱️ Your first API response: 10 minutes away!**

**🚀 Your live deployment: 4 hours away!**

**💪 Let's build something amazing!**
