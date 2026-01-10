# 🔄 Multi-Round JEE Cutoff Import Guide

## 📊 Overview

Your platform now supports **round-wise cutoff filtering**, allowing students to see predictions for different counselling rounds (Round 1-6).

---

## 🚀 How to Import Multiple Rounds

### Step 1: Prepare Your CSV Files

Organize your CSV files by round:
```
Round1_cutoffs.csv
Round2_cutoffs.csv
Round3_cutoffs.csv
Round4_cutoffs.csv
Round5_cutoffs.csv
Round6_cutoffs.csv (Final Round)
```

### Step 2: Import Each Round

Run the import command for each round:

```bash
# Import Round 1
node importJEECutoffs.js "Round1_cutoffs.csv" 1

# Import Round 2
node importJEECutoffs.js "Round2_cutoffs.csv" 2

# Import Round 3
node importJEECutoffs.js "Round3_cutoffs.csv" 3

# Import Round 4
node importJEECutoffs.js "Round4_cutoffs.csv" 4

# Import Round 5
node importJEECutoffs.js "Round5_cutoffs.csv" 5

# Import Round 6 (Final)
node importJEECutoffs.js "Round6_cutoffs.csv" 6
```

**Syntax:**
```
node importJEECutoffs.js <csv-file-path> <round-number>
```

---

## 📋 Example: Complete Multi-Round Import

```bash
cd "C:\Users\Niraj Karnawat\Desktop\CAREER WEB"

# Import all rounds (assuming files are in project folder)
node importJEECutoffs.js "cutoffs_round1.csv" 1
node importJEECutoffs.js "cutoffs_round2.csv" 2
node importJEECutoffs.js "cutoffs_round3.csv" 3
node importJEECutoffs.js "cutoffs_round4.csv" 4
node importJEECutoffs.js "cutoffs_round5.csv" 5

# Expected total: ~60,000 cutoffs (if each round has ~12,000)
```

---

## 🔍 Verify Import

After importing all rounds, check the database:

```bash
# Count total cutoffs
mongo
use career-web
db.collegecutoffs.find().count()

# Count by round
db.collegecutoffs.aggregate([
  { $group: { _id: "$round", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])

# Expected output:
# { "_id" : 1, "count" : 11557 }
# { "_id" : 2, "count" : 11200 }
# { "_id" : 3, "count" : 10800 }
# etc.

exit
```

---

## 🎯 How Students Use Round Filter

### In College Predictor:

1. Go to: http://localhost:5173/college-predictor
2. Fill in:
   - **Exam:** JEE
   - **Rank:** 5000
   - **Category:** General
   - **Quota:** AI
   - **Counselling Round:** Select Round 1-6 ← **NEW**
   - **Gender Preference:** Gender-Neutral or Female-only ← **NEW**
3. Click "Predict Colleges"

### Round Strategy Recommendations:

- **Round 1:** Most options available, but seats may fill quickly
- **Round 2-3:** Some seats filled, new options may open
- **Round 4-5:** Fewer options, but spot rounds may have surprises
- **Round 6 (Final):** Limited options, last chance

---

## 💡 Advanced: Import with Custom Names

If your files have different names or are in different locations:

```bash
# With absolute paths
node importJEECutoffs.js "C:\Downloads\JoSAA_Round1.csv" 1
node importJEECutoffs.js "C:\Downloads\JoSAA_Round2.csv" 2

# With relative paths
node importJEECutoffs.js "../cutoff_data/round1.csv" 1
node importJEECutoffs.js "../cutoff_data/round2.csv" 2
```

---

## 🗑️ Clear Specific Round (Optional)

If you need to re-import a specific round:

```bash
# The import script automatically clears that round before importing
# So you can just re-run:
node importJEECutoffs.js "Round3_cutoffs.csv" 3

# Or manually clear from MongoDB:
mongo
use career-web
db.collegecutoffs.deleteMany({ round: 3 })
exit
```

---

## 📊 Expected Database Size

| Rounds Imported | Approximate Size | Total Cutoffs |
|-----------------|------------------|---------------|
| 1 round | ~50 MB | ~12,000 |
| 3 rounds | ~150 MB | ~36,000 |
| 5 rounds | ~250 MB | ~60,000 |
| All 6 rounds | ~300 MB | ~72,000 |

**MongoDB Atlas Free Tier (M0):** 512 MB ✅ Sufficient for all rounds!

---

## 🎯 Next Steps

1. **Import all your rounds** using the commands above
2. **Verify imports** with MongoDB queries
3. **Test predictor** with different rounds
4. **Share with students** - they can now see round-wise predictions!

---

## 🔥 Pro Tip: Batch Import Script

Create a batch script to import all rounds at once:

**Windows (import_all_rounds.bat):**
```bat
@echo off
node importJEECutoffs.js "Round1_cutoffs.csv" 1
node importJEECutoffs.js "Round2_cutoffs.csv" 2
node importJEECutoffs.js "Round3_cutoffs.csv" 3
node importJEECutoffs.js "Round4_cutoffs.csv" 4
node importJEECutoffs.js "Round5_cutoffs.csv" 5
echo All rounds imported successfully!
pause
```

Then just run:
```bash
import_all_rounds.bat
```

---

**Your College Predictor now supports round-wise filtering! 🎉**
