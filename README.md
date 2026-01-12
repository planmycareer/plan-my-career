# 🎓 Career Counselling Platform

> **AI-Powered Career Guidance for Students After 10th & 12th**

A production-ready React frontend for a career counselling platform built with modern web technologies. This is a **client demo** showcasing professional UI/UX, scalable architecture, and clean code practices.

![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.1-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan)

---

## ✨ Features

### 🏠 **Landing Page**
- Hero section with compelling CTA
- How It Works (3-step process)
- Career streams overview
- Services showcase
- Student testimonials
- WhatsApp integration

### 🔐 **Authentication**
- Login & Registration with validation
- Demo mode (no backend required)
- LocalStorage-based auth

### 📊 **Dashboard**
- Personalized welcome
- Quick action cards
- Progress tracking
- Status indicators

### 🧠 **Career Test**
- 10-question multi-step assessment
- Progress bar & navigation
- Answer tracking
- Section-wise categorization

### 📈 **AI Report**
- Personality summary
- Top strengths analysis
- Recommended career streams
- Course suggestions
- Career path insights with salary data
- Mock PDF download

### 📅 **Booking System**
- Session type selection (Online/Offline)
- Date & time slot picker
- Booking confirmation modal
- Form pre-fill from user data

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18.3** | UI framework |
| **Vite 5.1** | Build tool & dev server |
| **React Router 6** | Client-side routing |
| **Tailwind CSS 3.4** | Utility-first styling |
| **LocalStorage** | Demo data persistence |

---

## 📁 Project Structure

```
career-counselling-platform/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Navigation with auth state
│   │   ├── Footer.jsx       # Footer with WhatsApp CTA
│   │   ├── HeroSection.jsx  # Landing hero
│   │   ├── ServiceCard.jsx  # Service display card
│   │   ├── TestStep.jsx     # Test progress indicator
│   │   ├── ReportPreview.jsx# Report summary card
│   │   └── BookingCard.jsx  # Session package card
│   │
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Landing page
│   │   ├── Login.jsx       # Login form
│   │   ├── Register.jsx    # Registration form
│   │   ├── Dashboard.jsx   # User dashboard
│   │   ├── CareerTest.jsx  # Multi-step test
│   │   ├── Report.jsx      # AI career report
│   │   └── BookSession.jsx # Booking flow
│   │
│   ├── data/              # Dummy data modules
│   │   ├── questions.js   # Test questions
│   │   └── services.js    # Services, streams, testimonials
│   │
│   ├── App.jsx            # Main app with routing
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles + Tailwind
│
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind customization
├── postcss.config.js      # PostCSS config
└── README.md             # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn installed

### Installation

1. **Clone or extract the project**

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Start development server**
   ```powershell
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`

### Build for Production

```powershell
npm run build
```

The optimized build will be in the `dist/` folder.

### Preview Production Build

```powershell
npm run preview
```

---

## 🎯 Demo Usage Guide

### 1️⃣ **Register/Login**
- Use **any email** and **password (min 6 chars)** to create an account
- Data is stored in browser's LocalStorage
- No backend validation

### 2️⃣ **Take Career Test**
- Navigate to "Take Career Test" from Dashboard or Navbar
- Answer all 10 questions
- Submit to generate AI report

### 3️⃣ **View Report**
- Accessible after completing the test
- Shows personality summary, strengths, streams, courses, and careers
- Mock PDF download available

### 4️⃣ **Book Session**
- Select Online or Offline package
- Choose date and time slot
- Fill contact details (pre-filled from profile)
- Confirmation modal appears

---

## 🎨 Design Highlights

- **Color Scheme**: Primary (blue), Secondary (Green), Accent (Amber)
- **Typography**: Inter font family
- **Components**: Card-based, shadow effects, smooth transitions
- **Responsive**: Mobile-first design (breakpoints: sm, md, lg)
- **Animations**: Hover states, fade-ins, scale transforms
- **Icons**: SVG icons throughout (no external icon library)

---

## 🧩 Key Components

### `Navbar.jsx`
- Responsive with mobile menu
- Auth state detection
- Dynamic user greeting

### `CareerTest.jsx`
- Multi-step form with progress bar
- Answer validation
- LocalStorage persistence

### `Report.jsx`
- AI-styled sections
- Dynamic data rendering
- CTA for booking

### `BookSession.jsx`
- 3-step booking flow
- Time slot selection
- Success modal

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.22.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.1.4"
  }
}
```

---

## 🔧 Configuration Files

### `tailwind.config.js`
- Custom color palette
- Extended theme
- Content paths configured

### `vite.config.js`
- React plugin
- Dev server settings

---

## 🚀 Backend Integration (Future)

This is a **frontend-only demo**. To connect a backend:

1. **API Endpoints Needed:**
   - `POST /api/auth/register` - User registration
   - `POST /api/auth/login` - User authentication
   - `POST /api/test/submit` - Submit test answers
   - `GET /api/report/:userId` - Fetch career report
   - `POST /api/booking` - Book counselling session

2. **Replace LocalStorage with:**
   - JWT tokens for auth
   - API calls using `fetch` or `axios`
   - State management (Redux/Context)

3. **Add Features:**
   - Real PDF generation (server-side)
   - Payment integration
   - Email notifications
   - Admin dashboard

---

## 📝 Code Quality

- ✅ Clean, readable code with comments
- ✅ Component-based architecture
- ✅ Reusable components
- ✅ Consistent naming conventions
- ✅ Form validation
- ✅ Error handling
- ✅ Responsive design
- ✅ No console errors
- ✅ Accessible UI (semantic HTML)

---

## 🎯 Client Demo Checklist

- [x] Professional landing page
- [x] Complete auth flow
- [x] Multi-step career test
- [x] AI-styled report generation
- [x] Booking system with confirmation
- [x] Responsive design
- [x] Smooth animations
- [x] WhatsApp integration
- [x] LocalStorage demo mode
- [x] Clean code & comments

---

## 📄 License

This is a demo project for client presentation.

---

## 👨‍💻 Developer Notes

### Customization Points:
- **Colors**: Modify `tailwind.config.js` theme
- **Questions**: Edit `src/data/questions.js`
- **Services**: Update `src/data/services.js`
- **Branding**: Replace logo/name in `Navbar` and `Footer`

### Performance:
- Vite provides fast HMR (Hot Module Replacement)
- Production build is optimized and minified
- Tailwind CSS purges unused styles

---

**Built with ❤️ for Career Compass**

For questions or support, contact: info@careercompass.com
