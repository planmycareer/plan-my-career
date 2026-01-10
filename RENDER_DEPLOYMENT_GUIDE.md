# Backend Deployment on Render.com - Quick Guide

## ✅ Steps Completed:
1. Created `.env.production` file for frontend API configuration
2. Created `src/config/api.js` for centralized API endpoint management

---

## 🚀 Deploy Backend to Render

### 1. Create Render Account
- Go to: https://render.com
- Sign up with GitHub

### 2. Create New Web Service
- Click **"New +"** → **"Web Service"**
- Connect repository: `Niraj21-star/CAREER-WEB`
- Click **"Connect"**

### 3. Configuration Settings
```
Name: career-web-backend
Region: Select closest region
Branch: main
Root Directory: (leave empty)
Runtime: Node
Build Command: npm install
Start Command: node server.js
Plan: Free
```

### 4. Environment Variables
Add these variables in Render dashboard:

| Variable | Value | Example |
|----------|-------|---------|
| `MONGODB_URI` | Your MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/career-web` |
| `JWT_SECRET` | Random secret key (use generator) | `abc123xyz456secretkey789` |
| `PORT` | `5000` | `5000` |
| `NODE_ENV` | `production` | `production` |

**Generate JWT Secret:** Use random string generator or run in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 5. MongoDB Atlas Setup (if not done)
1. Go to https://mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user with password
4. Network Access → Add IP: `0.0.0.0/0` (allow all - needed for Render)
5. Get connection string from "Connect" → "Connect your application"

### 6. Deploy
- Click **"Create Web Service"**
- Wait 3-5 minutes
- Get your backend URL: `https://your-app-name.onrender.com`

---

## 🔧 Update Frontend to Use Backend

### Step 1: Update `.env.production`
After backend is deployed, edit `.env.production`:

```env
VITE_API_URL=https://career-web-backend.onrender.com/api
```

(Replace with your actual Render URL)

### Step 2: Add to Cloudflare Pages
In Cloudflare Pages settings:
1. Go to **Settings** → **Environment variables**
2. Add production variable:
   - Name: `VITE_API_URL`
   - Value: `https://career-web-backend.onrender.com/api`

### Step 3: Update CORS in Backend
Make sure `server.js` has proper CORS configuration:

```javascript
const cors = require('cors')
app.use(cors({
  origin: [
    'http://localhost:5173', // Local development
    'https://career-web.pages.dev', // Your Cloudflare Pages URL
    'https://*.pages.dev' // All Cloudflare Pages domains
  ],
  credentials: true
}))
```

### Step 4: Commit and Push
```bash
git add .
git commit -m "Add production environment configuration"
git push origin main
```

This will:
- Trigger Render backend redeploy (if auto-deploy enabled)
- Trigger Cloudflare frontend redeploy

---

## 🧪 Testing After Deployment

### Test Backend
Visit: `https://your-backend-url.onrender.com/api/health` (if you have health endpoint)

Or test login endpoint:
```bash
curl https://your-backend-url.onrender.com/api/auth/login
```

### Test Frontend
1. Visit your Cloudflare Pages URL
2. Try to login/register
3. Check browser console for any API errors

---

## 📊 Monitoring

### Render Dashboard
- View logs in real-time
- Monitor resource usage
- Check deployment status

### Important Notes:
- **Free tier sleeps after 15 min inactivity** (takes 30-60s to wake up)
- First request after sleep will be slow
- Upgrade to paid plan ($7/month) for always-on service

---

## 🔐 Security Checklist

- [ ] MongoDB IP whitelist includes `0.0.0.0/0`
- [ ] Strong JWT_SECRET (at least 32 characters)
- [ ] CORS configured with your frontend domain
- [ ] Environment variables set in Render
- [ ] Database connection string is correct
- [ ] .env files NOT committed to git (should be in .gitignore)

---

## 🐛 Troubleshooting

### Backend Won't Start
- Check Render logs for errors
- Verify environment variables are set
- Ensure MongoDB connection string is correct
- Check if PORT is set to 5000

### Frontend Can't Connect to Backend
- Verify CORS is configured correctly
- Check if backend URL in `.env.production` is correct
- Look at browser console for CORS errors
- Ensure backend is running (visit the URL)

### Database Connection Failed
- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Ensure database user has proper permissions
- Check network access settings in MongoDB Atlas

---

## 📝 Next Steps

1. ✅ Deploy backend to Render
2. ⏳ Get backend URL
3. ⏳ Update `.env.production` with backend URL
4. ⏳ Add VITE_API_URL to Cloudflare environment variables
5. ⏳ Push changes to GitHub
6. ⏳ Test full application

Good luck! 🚀
