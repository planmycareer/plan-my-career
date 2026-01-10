# 🔄 CLIENT DEPLOYMENT MIGRATION GUIDE

## Overview
This guide helps the client migrate from your testing MongoDB Atlas to their own production database.

---

## 📋 Pre-Deployment Checklist

### Client Responsibilities:
1. ✅ Create MongoDB Atlas account (free tier or paid)
2. ✅ Create production cluster (M0 free or higher)
3. ✅ Set up database user with strong password
4. ✅ Configure network access (production IPs only)
5. ✅ Get connection string from Atlas
6. ✅ Generate strong JWT secret (32+ characters)

---

## 🚀 Step-by-Step Migration

### Step 1: Client Creates MongoDB Atlas Cluster

**Client Instructions:**
```
1. Go to https://cloud.mongodb.com/
2. Sign up or log in
3. Create New Project: "Career Counselling Platform"
4. Build a Database → M0 FREE (or M10+ for production scale)
5. Cloud Provider: AWS (recommended) or Google Cloud
6. Region: Choose closest to deployment location
```

### Step 2: Configure Database Access

**Database Access:**
```
1. Go to "Database Access" → Add New Database User
2. Username: career-admin (or client's choice)
3. Password: Generate strong password (save securely!)
4. Built-in Role: Atlas admin (or "Read and write to any database")
```

**Network Access:**
```
1. Go to "Network Access" → Add IP Address
2. For Testing: Add 0.0.0.0/0 (allow from anywhere)
3. For Production: Add specific server IP addresses only
```

### Step 3: Get Connection String

```
1. Go to "Database" → Click "Connect"
2. Choose "Connect your application"
3. Driver: Node.js, Version: 5.5 or later
4. Copy connection string:
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Step 4: Update Client's `.env` File

**Client's Production `.env`:**
```bash
PORT=5000
MONGO_URI=mongodb+srv://career-admin:<PASSWORD>@cluster0.xxxxx.mongodb.net/career-web-production?retryWrites=true&w=majority
JWT_SECRET=<GENERATE_32_CHAR_SECRET>
JWT_EXPIRES_IN=7d
NODE_ENV=production
```

**Replace:**
- `<PASSWORD>` with actual database password
- `<GENERATE_32_CHAR_SECRET>` with strong random string

**Generate JWT Secret (run in terminal):**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Seed Client's Database

**Run these commands on client's production server:**
```bash
# 1. Install dependencies
npm install

# 2. Seed questions (100+ questions for 7 sections)
node seedQuestions.js

# 3. Seed college cutoffs (JEE/NEET data)
node seedCutoffs.js

# 4. Verify seeding
# MongoDB Atlas → Browse Collections → Check:
# - questions collection (should have 100+ documents)
# - collegecutoffs collection (should have sample data)
```

### Step 6: Test Production Database

```bash
# Start server
npm start

# Test endpoints:
curl http://localhost:5000/api/auth/register
# Should see: "success": false, "message": "Validation errors"
```

---

## 🔐 Security Best Practices

### 1. Environment Variables
- ✅ Never commit `.env` to Git
- ✅ Use different secrets for dev/production
- ✅ Store production secrets in secure vault (AWS Secrets Manager, etc.)

### 2. MongoDB Atlas Security
- ✅ Use strong passwords (20+ characters)
- ✅ Restrict network access to production IPs only
- ✅ Enable database monitoring and alerts
- ✅ Set up automated backups
- ✅ Use separate databases for production/staging/test

### 3. JWT Configuration
- ✅ Use strong, random JWT_SECRET (minimum 32 characters)
- ✅ Set appropriate expiration (7 days recommended)
- ✅ Rotate secrets periodically

---

## 📊 Data Migration (If Testing Data Exists)

If you have testing data to migrate:

### Option 1: Export/Import via MongoDB Compass
```bash
1. Connect to your test database with MongoDB Compass
2. Export collections as JSON
3. Connect to client's production database
4. Import JSON files
```

### Option 2: Export/Import via CLI
```bash
# Export from test database
mongodump --uri="mongodb+srv://test..." --db=career-web-test --out=./backup

# Import to production database
mongorestore --uri="mongodb+srv://prod..." --db=career-web-production ./backup/career-web-test
```

### Option 3: Fresh Start (Recommended for Clean Deployment)
```bash
# Simply run seeders on production database
node seedQuestions.js
node seedCutoffs.js
# No student data migration needed for fresh deployment
```

---

## 🧪 Testing After Migration

### 1. Connection Test
```bash
npm start
# Should see: "MongoDB connected" in console
```

### 2. API Health Check
```bash
curl http://localhost:5000/api/auth/register -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"test123","class":"12th"}'
```

### 3. Database Verification
```
1. Open MongoDB Atlas → Browse Collections
2. Check collections exist:
   - users
   - questions
   - tests
   - reports
   - collegecutoffs
   - bookings
   - services
```

---

## 🔄 Environment Switching Strategy

### Development Environment (Your Testing)
```
Database: career-web-test
Purpose: Development and testing
Access: Open (0.0.0.0/0)
Data: Test data, can be wiped
```

### Staging Environment (Client Testing)
```
Database: career-web-staging
Purpose: Client UAT and testing
Access: Restricted to client IPs
Data: Sample production-like data
```

### Production Environment (Live)
```
Database: career-web-production
Purpose: Live student data
Access: Very restricted (production servers only)
Data: Real student data, backed up
```

---

## 💰 Cost Considerations

### MongoDB Atlas Pricing:
- **M0 (Free Tier)**: 512MB storage, shared RAM
  - Good for: Testing, MVP, < 100 active users
  
- **M10 (Paid - $0.08/hr)**: 10GB storage, 2GB RAM
  - Good for: Production, 100-1000 users
  
- **M20+ (Paid)**: Scalable
  - Good for: Large scale (1000+ users)

**Recommendation for Client:**
- Start with **M0 Free** for initial launch
- Monitor usage via Atlas dashboard
- Upgrade to M10 when approaching limits

---

## 📞 Support Contact

**For Migration Issues:**
- Check MongoDB Atlas documentation: https://docs.atlas.mongodb.com/
- MongoDB support: https://support.mongodb.com/
- Platform technical support: [Your Contact]

---

## ✅ Post-Migration Checklist

After client migration, verify:

- [ ] MongoDB Atlas cluster created and accessible
- [ ] Connection string working
- [ ] Database seeded with questions and cutoffs
- [ ] Server starts without errors
- [ ] API endpoints responding
- [ ] JWT authentication working
- [ ] Admin login functional
- [ ] Student registration working
- [ ] Test submission working
- [ ] Report generation working
- [ ] College predictor working
- [ ] Monitoring and alerts configured
- [ ] Backups enabled
- [ ] Network access restricted appropriately

---

**Migration Estimated Time:** 30-45 minutes  
**Difficulty:** Easy (following this guide)  
**Zero Downtime:** Yes (new database setup)
