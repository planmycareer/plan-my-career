# 📊 CSV Import Guide for College Cutoffs

## 📋 CSV Format Required

Your CSV file should have these columns (in any order):

| Column Name | Type | Required | Example | Description |
|-------------|------|----------|---------|-------------|
| `collegeName` or `college_name` | String | Yes | IIT Delhi | Name of the college |
| `branchName` or `branch_name` | String | Yes | Computer Science | Branch/Department name |
| `exam` | String | Yes | JEE or NEET | Entrance exam type |
| `state` | String | No | Delhi | State name (optional) |
| `quota` | String | No | AI, HS, OS | AI=All India, HS=Home State, OS=Other State |
| `category` | String | Yes | General, OBC, SC, ST, EWS | Reservation category |
| `year` | Number | Yes | 2024 | Year of cutoff data |
| `opening_rank` | Number | Yes | 100 | Opening rank |
| `closing_rank` | Number | Yes | 500 | Closing rank |
| `college_type` | String | Yes | IIT, NIT, IIIT, GFTI, Private, Government, Medical | Type of college |
| `fees` | String | No | ₹2,00,000 | Annual fees (optional) |

---

## 📝 Sample CSV Format

```csv
collegeName,branchName,exam,state,quota,category,year,opening_rank,closing_rank,college_type,fees
IIT Delhi,Computer Science and Engineering,JEE,Delhi,AI,General,2024,1,100,IIT,₹2,00,000
IIT Delhi,Computer Science and Engineering,JEE,Delhi,AI,OBC,2024,50,300,IIT,₹2,00,000
IIT Bombay,Computer Science and Engineering,JEE,Maharashtra,AI,General,2024,1,90,IIT,₹2,00,000
NIT Trichy,Computer Science and Engineering,JEE,Tamil Nadu,HS,General,2024,500,2000,NIT,₹1,50,000
AIIMS Delhi,MBBS,NEET,Delhi,AI,General,2024,1,50,Medical,₹1,40,000
```

---

## 🚀 How to Import Your CSV

### Step 1: Prepare Your CSV File

1. Make sure your CSV has the required columns
2. Save it in the project folder or note the full path
3. Example locations:
   - `C:\Users\Niraj Karnawat\Desktop\CAREER WEB\cutoffs.csv`
   - `./my_cutoffs.csv`

### Step 2: Clear Existing Cutoffs (Optional)

If you want to replace the seeded test data:

```bash
# Open MongoDB shell
mongo

# Use the database
use career-web

# Clear existing cutoffs
db.collegecutoffs.deleteMany({})

# Exit
exit
```

### Step 3: Import Your CSV

Run the import command:

```bash
# From project root directory
node importCutoffs.js "path/to/your/cutoffs.csv"

# Example with file in project folder
node importCutoffs.js cutoffs.csv

# Example with absolute path
node importCutoffs.js "C:\Users\Niraj Karnawat\Desktop\cutoffs.csv"
```

### Step 4: Verify Import

```bash
# Check how many cutoffs were imported
mongo

use career-web

db.collegecutoffs.find().count()
# Should show the number of rows from your CSV

# View sample data
db.collegecutoffs.find().limit(5).pretty()

exit
```

---

## 🔍 Example: Complete Import Process

```bash
# 1. Navigate to project folder
cd "C:\Users\Niraj Karnawat\Desktop\CAREER WEB"

# 2. Place your CSV file here (or use full path)
# cutoffs.csv

# 3. Run import
node importCutoffs.js cutoffs.csv

# Expected output:
# ✅ Connected to MongoDB
# 📂 Reading CSV from: C:\Users\Niraj Karnawat\Desktop\CAREER WEB\cutoffs.csv
# ✅ CSV import successful
# 📊 Imported 500 college cutoffs
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: "Cannot find CSV file"
**Solution:** Use absolute path
```bash
node importCutoffs.js "C:\Users\Niraj Karnawat\Desktop\cutoffs.csv"
```

### Issue 2: "Column not found"
**Solution:** Check your CSV header names match the format above. The script accepts both formats:
- `collegeName` OR `college_name`
- `branchName` OR `branch_name`

### Issue 3: "Duplicate key error"
**Solution:** Some entries already exist. Either:
1. Clear existing data first (see Step 2)
2. Or remove duplicates from your CSV

### Issue 4: "Invalid year/rank"
**Solution:** Make sure `year`, `opening_rank`, and `closing_rank` are numbers (not text)

---

## 📊 After Import: Test College Predictor

1. Go to: http://localhost:5173/college-predictor
2. Enter:
   - Exam: JEE or NEET (matching your CSV data)
   - Rank: A rank from your data range
   - Category: General/OBC/SC/ST/EWS
   - State: (if applicable)
3. Click **"Predict Colleges"**
4. You should see predictions based on your real cutoff data! 🎉

---

## 💡 Tips for Best Results

1. **Include Multiple Years**: Import data from 2-3 years for better predictions
2. **Cover All Categories**: Include General, OBC, SC, ST, EWS cutoffs
3. **Add Quotas**: Include AI (All India), HS (Home State), OS (Other State) where applicable
4. **Verify Ranks**: Make sure opening_rank < closing_rank
5. **College Types**: Use standard types (IIT, NIT, IIIT, GFTI, Private, Government, Medical)

---

## 🎯 What Happens After Import?

Your CSV data will be:
- ✅ Stored in MongoDB (`collegecutoffs` collection)
- ✅ Indexed for fast queries (by exam, state, category, rank)
- ✅ Used by College Predictor API
- ✅ Available for students to get predictions
- ✅ Replaceable anytime (just import new CSV)

---

**Ready to import? Place your CSV file and run the command!** 🚀
