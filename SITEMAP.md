# 🗺️ SITE MAP & USER FLOWS

## 📍 SITE STRUCTURE

```
┌─────────────────────────────────────────────────────────────┐
│                         NAVBAR                               │
│  Logo | Home | Login | Get Started (Register)               │
│  (After Login: Dashboard | Career Test | Book Session | Hi, Name | Logout) │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       HOME PAGE                              │
├─────────────────────────────────────────────────────────────┤
│  1. Hero Section                                             │
│     ├── Headline: "Discover the Right Career..."           │
│     ├── CTA: Take Career Test                              │
│     └── CTA: Book Counselling                              │
│                                                              │
│  2. How It Works (3 Steps)                                  │
│     ├── Take Career Test                                    │
│     ├── Get AI Report                                       │
│     └── Book Counselling                                    │
│                                                              │
│  3. Career Streams (5 Cards)                                │
│     ├── Science (PCM)                                       │
│     ├── Science (PCB)                                       │
│     ├── Commerce                                            │
│     ├── Arts & Humanities                                   │
│     └── Vocational & Technical                             │
│                                                              │
│  4. Our Services (6 Cards)                                  │
│     ├── AI Career Assessment                                │
│     ├── Expert Counselling                                  │
│     ├── Detailed Reports                                    │
│     ├── Stream Selection                                    │
│     ├── College Guidance                                    │
│     └── Course Recommendations                              │
│                                                              │
│  5. Testimonials (3 Students)                               │
│  6. CTA Section: Take Free Test / Book Counselling         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         FOOTER                               │
│  Brand | Quick Links | Contact | WhatsApp CTA               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 AUTHENTICATION FLOW

```
┌──────────┐       ┌──────────┐       ┌───────────┐
│  GUEST   │──────▶│  LOGIN   │──────▶│ DASHBOARD │
│  VISITOR │       │   PAGE   │       │           │
└──────────┘       └──────────┘       └───────────┘
     │                   ▲                    ▲
     │                   │                    │
     ▼                   │                    │
┌──────────┐             │                    │
│ REGISTER │─────────────┘                    │
│   PAGE   │                                  │
└──────────┘                                  │
     │                                        │
     └────────────────────────────────────────┘
```

**Flow:**
1. New User → Register → Auto Login → Dashboard
2. Returning User → Login → Dashboard
3. All Protected Pages require Login

---

## 🧭 USER JOURNEY: COMPLETE FLOW

```
START
  │
  ▼
┌─────────────┐
│  Home Page  │ Browse landing page
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Register   │ Create account (name, email, phone, grade, password)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Dashboard  │ See welcome message, test status = pending
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Career Test │ Answer 10 questions (multi-step)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Report    │ View AI-generated career insights
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Book Session│ Choose package, date, time → Confirm
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Dashboard  │ Return to dashboard (test status = completed)
└─────────────┘
  │
  ▼
END
```

---

## 📊 NAVIGATION MAP

```
                    ┌─────────────┐
                    │   NAVBAR    │
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
    ┌─────────┐      ┌─────────┐     ┌─────────┐
    │  Home   │      │  Login  │     │Register │
    └─────────┘      └─────────┘     └─────────┘
                           │                │
                           └────────┬───────┘
                                    │
                                    ▼
                             ┌──────────────┐
                             │  Dashboard   │ (Protected)
                             └──────┬───────┘
                                    │
                ┌───────────────────┼───────────────────┐
                │                   │                   │
                ▼                   ▼                   ▼
         ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
         │Career Test  │    │   Report    │    │Book Session │
         │(Protected)  │    │(Protected)  │    │(Protected)  │
         └─────────────┘    └─────────────┘    └─────────────┘
```

---

## 🎯 PAGE-BY-PAGE BREAKDOWN

### 🏠 **HOME** (`/`)
**Purpose:** Landing page to attract & convert visitors
**Access:** Public

**Sections:**
1. Hero with CTAs
2. How It Works (3 steps)
3. Career Streams (5 cards)
4. Services (6 cards)
5. Testimonials (3 cards)
6. CTA Section
7. Footer

**CTAs:**
- Take Career Test → `/career-test` (requires login)
- Book Counselling → `/book-session` (requires login)
- Get Started → `/register`

---

### 🔐 **LOGIN** (`/login`)
**Purpose:** User authentication
**Access:** Public

**Fields:**
- Email
- Password
- Remember Me (checkbox)

**Actions:**
- Sign In → Dashboard
- Forgot Password (link, non-functional)
- Register Link → `/register`

**Validation:**
- Email format
- Password min 6 chars

---

### 📝 **REGISTER** (`/register`)
**Purpose:** User account creation
**Access:** Public

**Fields:**
- Full Name
- Email
- Phone (10 digits)
- Current Grade (dropdown)
- Password
- Confirm Password
- Terms Checkbox (required)

**Actions:**
- Create Account → Dashboard
- Login Link → `/login`

**Validation:**
- Name min 3 chars
- Email format
- Phone 10 digits
- Password match
- All fields required

---

### 📊 **DASHBOARD** (`/dashboard`)
**Purpose:** User home base
**Access:** Protected (requires login)

**Elements:**
- Welcome Message: "Welcome back, {name}!"
- Status Banner: Test Completed / Not Started
- Quick Action Cards:
  - Take Career Test
  - View Career Report (disabled if test not done)
  - Book Counselling
- Progress Section
- Quick Tip Card

**Navigation:**
- If test not done → Highlight "Take Career Test"
- If test done → Highlight "View Report" + "Book Session"

---

### 🧠 **CAREER TEST** (`/career-test`)
**Purpose:** 10-question assessment
**Access:** Protected

**Features:**
- Progress bar (0-100%)
- Question counter (1/10)
- Section badge (Interests, Skills, Career Goals, Personality)
- Radio button options (4 per question)
- Previous/Next navigation
- Submit button on Q10

**Flow:**
1. Answer question
2. Next button enabled
3. Click Next → Save answer, go to next
4. On Q10 → Submit → Generate report → Redirect to Report

**Data:**
- 10 questions from `questions.js`
- Answers stored in LocalStorage

---

### 📈 **REPORT** (`/report`)
**Purpose:** Display career insights
**Access:** Protected (requires completed test)

**Sections:**
1. **Personality Summary**
   - AI-styled paragraph

2. **Top Strengths** (5 items)
   - Checkmarks, green badges

3. **Suggested Career Streams** (4 items)
   - Numbered list with borders

4. **Recommended Courses** (4 items)
   - Cards with duration & type

5. **Top Career Paths** (4 items)
   - Title, salary, demand indicator

**Actions:**
- Download PDF (mock alert)
- Book Counselling → `/book-session`

---

### 📅 **BOOK SESSION** (`/book-session`)
**Purpose:** Schedule counselling
**Access:** Protected

**3-Step Flow:**

**Step 1: Choose Package**
- Online Session (₹999) - Popular
- Offline Session (₹1499)

**Step 2: Select Date & Time**
- Date picker (tomorrow onwards)
- 8 Time slots (available/booked)

**Step 3: Confirm Details**
- Form (pre-filled from user data)
  - Name
  - Email
  - Phone
  - Message (optional)
- Booking Summary sidebar
- Confirm Button

**Result:**
- Success modal (3 seconds)
- Auto-redirect to Dashboard

---

## 🔄 STATE MANAGEMENT

### **LocalStorage Keys:**

```javascript
// User authentication
localStorage.setItem('user', JSON.stringify({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '9876543210',
  grade: '12th'
}))

// Career test answers
localStorage.setItem('careerTestAnswers', JSON.stringify({
  1: 'analytical',
  2: 'science',
  // ... 10 answers
}))

// Generated report
localStorage.setItem('careerReport', JSON.stringify({
  personalitySummary: '...',
  strengths: [...],
  streams: [...],
  courses: [...],
  careerPaths: [...]
}))
```

---

## 🎨 COMPONENT REUSABILITY

```
Navbar
├── Used in: All pages (App.jsx layout)
└── Props: None (reads from localStorage)

Footer
├── Used in: All pages (App.jsx layout)
└── Props: None

HeroSection
├── Used in: Home
└── Props: None

ServiceCard
├── Used in: Home (6 instances)
└── Props: icon, title, description, delay

TestStep
├── Used in: CareerTest (3 instances)
└── Props: number, title, description, isActive, isCompleted

ReportPreview
├── Used in: (Bonus component, can be used in Dashboard)
└── Props: report

BookingCard
├── Used in: BookSession (2 instances)
└── Props: type, price, features, isPopular, onSelect
```

---

## 🚦 ROUTING LOGIC

```javascript
// Public Routes (no auth required)
/              → Home
/login         → Login
/register      → Register

// Protected Routes (auth required)
/dashboard     → Dashboard
/career-test   → CareerTest
/report        → Report (also requires test completion)
/book-session  → BookSession

// Route Protection
useEffect(() => {
  const user = localStorage.getItem('user')
  if (!user) navigate('/login')
}, [])
```

---

## 📱 RESPONSIVE BREAKPOINTS

```
Mobile:  < 640px   (sm)
Tablet:  640-1024px (md)
Desktop: > 1024px   (lg)

Layout Changes:
┌─────────────────┬──────────────┬────────────┐
│   Component     │   Mobile     │  Desktop   │
├─────────────────┼──────────────┼────────────┤
│ Navbar          │ Hamburger    │ Full menu  │
│ Hero            │ 1 column     │ Centered   │
│ How It Works    │ 1 column     │ 3 columns  │
│ Career Streams  │ 1 column     │ 3 columns  │
│ Services        │ 1 column     │ 3 columns  │
│ Testimonials    │ 1 column     │ 3 columns  │
│ Form fields     │ 1 column     │ 2 columns  │
└─────────────────┴──────────────┴────────────┘
```

---

## 🎯 CONVERSION FUNNEL

```
100 Visitors → HOME
    │
    ├─ 40% Register → REGISTER
    │                    │
    │                    └─ 90% Complete → DASHBOARD
    │
    ├─ 30% Login → LOGIN
    │                 │
    │                 └─ 95% Success → DASHBOARD
    │
    └─ 30% Browse & Leave

FROM DASHBOARD:
    │
    ├─ 80% Take Test → CAREER TEST
    │                       │
    │                       └─ 95% Complete → REPORT
    │
    └─ 20% Book Directly → BOOK SESSION

FROM REPORT:
    │
    └─ 60% Book Session → BOOK SESSION
                              │
                              └─ 85% Confirm → SUCCESS
```

---

## 🎬 DEMO FLOW FOR CLIENT

```
1. HOME (30 sec)
   - Scroll all sections
   - Click "Get Started"

2. REGISTER (20 sec)
   - Fill form
   - Click "Create Account"

3. DASHBOARD (15 sec)
   - Show status: Test pending
   - Click "Take Career Test"

4. CAREER TEST (90 sec)
   - Answer 3 questions (show progress)
   - Skip to Q10
   - Submit

5. REPORT (60 sec)
   - Scroll all sections
   - Click "Download PDF"
   - Click "Book Counselling"

6. BOOK SESSION (45 sec)
   - Select Online
   - Pick date & time
   - Confirm
   - See success modal

TOTAL TIME: ~5 minutes
```

---

**🗺️ SITE MAP COMPLETE**

This document provides a complete visual overview of the application structure, user flows, and navigation patterns for client understanding and future development planning.
