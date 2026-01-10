# Cloudflare Pages Deployment Guide

## Overview
This guide will help you deploy the Career Web frontend to Cloudflare Pages for testing.

## Prerequisites
- GitHub account (✅ Already set up: Niraj21-star/CAREER-WEB)
- Cloudflare account (free tier available)

---

## Option 1: Deploy via Cloudflare Dashboard (Recommended - Easiest)

### Step 1: Sign Up / Login to Cloudflare
1. Go to https://dash.cloudflare.com/
2. Sign up or log in with your account

### Step 2: Create a New Pages Project
1. In the Cloudflare dashboard, click **"Workers & Pages"** in the left sidebar
2. Click **"Create application"**
3. Select **"Pages"** tab
4. Click **"Connect to Git"**

### Step 3: Connect Your GitHub Repository
1. Click **"Connect GitHub"**
2. Authorize Cloudflare to access your GitHub
3. Select the repository: **"Niraj21-star/CAREER-WEB"**
4. Click **"Begin setup"**

### Step 4: Configure Build Settings
Use these exact settings:

```
Production branch: main
Build command: npm run build
Build output directory: dist
Root directory: /
Node version: 18
```

**Environment Variables (Add these in "Environment variables" section):**
```
NODE_VERSION=18
```

### Step 5: Deploy
1. Click **"Save and Deploy"**
2. Wait 2-5 minutes for the build to complete
3. Your site will be live at: `https://career-web-xxx.pages.dev`

---

## Option 2: Deploy via Wrangler CLI (Advanced)

### Step 1: Install Wrangler
```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare
```bash
wrangler login
```

### Step 3: Build Your Project
```bash
npm run build
```

### Step 4: Deploy to Cloudflare Pages
```bash
wrangler pages deploy dist --project-name=career-web
```

---

## Important Notes

### ⚠️ Backend API
Your project has a Node.js backend that **cannot** be hosted on Cloudflare Pages (Pages is for static sites only).

**For Full Functionality, You Have 3 Options:**

#### Option A: Keep Backend Local (For Testing)
1. Keep MongoDB and Node.js server running locally
2. Update frontend API URLs to point to `http://localhost:5000`
3. Frontend will be on Cloudflare, backend on your local machine
4. **Limitation**: Only works when your local server is running

#### Option B: Deploy Backend Separately (Recommended for Production)
Deploy the backend to one of these services:
- **Render.com** (Free tier available)
- **Railway.app** (Free tier available)
- **Heroku** (Paid plans)
- **DigitalOcean App Platform**
- **AWS/Azure/GCP**

Then update the API base URL in your frontend code.

#### Option C: Use Cloudflare Workers (Advanced)
Rewrite your Express backend as Cloudflare Workers (requires significant code changes).

---

## Update API URLs for Production

### Current Configuration
Your frontend currently uses: `http://localhost:5000/api/`

### For Cloudflare Deployment
You need to update all API calls to use your production backend URL.

**Files to Update:**
- `src/pages/Login.jsx`
- `src/pages/Register.jsx`
- `src/pages/CareerTest.jsx`
- `src/pages/CollegePredictor.jsx`
- `src/pages/Pricing.jsx`
- `src/pages/BookSession.jsx`
- `src/pages/Dashboard.jsx`

**Create an environment variable:**

1. Create `.env.production` file:
```env
VITE_API_URL=https://your-backend-url.com/api
```

2. Update API calls to use:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
```

---

## Quick Testing Setup (Frontend Only)

If you just want to test the UI/UX without backend:

1. Deploy to Cloudflare Pages (Steps above)
2. The frontend will load, but features requiring backend won't work:
   - ❌ Login/Register
   - ❌ Career Test
   - ❌ College Predictor
   - ❌ Payment System
   - ✅ Home page UI
   - ✅ Pricing page UI
   - ✅ About Us sections
   - ✅ Navigation

---

## Recommended Full Deployment Strategy

### Step 1: Deploy Backend to Render.com (Free)
1. Go to https://render.com
2. Sign up with GitHub
3. Create a "New Web Service"
4. Connect your CAREER-WEB repository
5. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment**: Node
   - **Add Environment Variables**:
     ```
     MONGODB_URI=your_mongodb_atlas_uri
     JWT_SECRET=your_secret_key
     ```
6. Deploy - You'll get a URL like: `https://career-web-backend.onrender.com`

### Step 2: Update Frontend Environment Variables
Create `.env.production`:
```env
VITE_API_URL=https://career-web-backend.onrender.com/api
```

### Step 3: Deploy Frontend to Cloudflare Pages
Follow "Option 1" steps above.

---

## MongoDB Setup

Your backend needs MongoDB. For production:

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Add to backend environment variables

---

## Custom Domain (Optional)

After deploying to Cloudflare Pages:
1. Go to your Pages project
2. Click "Custom domains"
3. Add your domain
4. Update DNS settings as instructed

---

## Troubleshooting

### Build Fails
- Check Node version is 18 or higher
- Ensure all dependencies are in `package.json`
- Check build logs in Cloudflare dashboard

### API Calls Fail
- Check CORS settings in backend
- Verify API URL is correct
- Check browser console for errors

### Images Not Loading
- Ensure images are in `public` folder or imported correctly
- Check file paths are relative

---

## Support

For issues:
- Cloudflare Pages: https://developers.cloudflare.com/pages/
- Community: https://discord.gg/cloudflaredev

---

## Next Steps

1. ✅ Code pushed to GitHub
2. ⏳ Create Cloudflare account
3. ⏳ Deploy frontend to Cloudflare Pages
4. ⏳ Deploy backend to Render/Railway
5. ⏳ Update API URLs
6. ⏳ Test full functionality

Good luck! 🚀
