# 💳 Payment System Implementation Guide

## Overview

The College Predictor is now a **PAID FEATURE**. Users must purchase access before they can use it.

---

## 🎯 Features Implemented

### Backend (Node.js + Express + MongoDB)

1. **Payment Model** (`server/models/Payment.js`)
   - Tracks all payment transactions
   - Stores service, amount, validity, transaction IDs
   - Methods to check access validity

2. **Payment Service** (`server/services/paymentService.js`)
   - `createPaymentOrder()` - Creates payment order
   - `verifyPayment()` - Verifies payment after gateway confirms
   - `checkAccess()` - Checks if user has access to a service
   - `getPaymentHistory()` - User's payment history
   - `getActiveSubscriptions()` - Active subscriptions

3. **Payment Controller** (`server/controllers/paymentController.js`)
   - Handles all payment-related HTTP requests

4. **Payment Middleware** (`server/middleware/paymentMiddleware.js`)
   - `requirePayment(service)` - Blocks access if not paid
   - Applied to College Predictor route

5. **Payment Routes** (`server/routes/paymentRoutes.js`)
   - `POST /api/payment/create-order` - Create payment order
   - `POST /api/payment/verify` - Verify payment
   - `GET /api/payment/check-access/:service` - Check access
   - `GET /api/payment/pricing` - Get pricing info
   - `GET /api/payment/history` - Payment history
   - `GET /api/payment/subscriptions` - Active subscriptions

### Frontend (React)

1. **Pricing Page** (`src/pages/Pricing.jsx`)
   - Beautiful pricing cards for all services
   - Purchase buttons
   - Demo payment integration

2. **CollegePredictor Paywall** (Updated `src/pages/CollegePredictor.jsx`)
   - Checks payment access before showing form
   - Shows beautiful paywall if not paid
   - Displays subscription expiry info if paid

---

## 💰 Service Pricing

| Service | Price | Validity |
|---------|-------|----------|
| **College Predictor** | ₹299 | 30 days |
| **Career Test** | ₹499 | Lifetime |
| **Counselling Session** | ₹999 | 90 days |
| **Full Access** | ₹1499 | 90 days (all services) |

---

## 🔄 Payment Flow

### Step 1: User Visits College Predictor
```
User clicks "College Predictor" 
→ Frontend checks: GET /api/payment/check-access/college-predictor
→ If NO ACCESS → Show Paywall with "Purchase Now" button
→ If HAS ACCESS → Show Predictor Form
```

### Step 2: User Clicks "Purchase Now"
```
Redirect to /pricing page
→ Shows all 4 service plans
→ User selects a plan
→ Clicks "Purchase Now"
```

### Step 3: Payment Order Creation
```
Frontend → POST /api/payment/create-order { service: "college-predictor" }
Backend → Creates Payment record with status: 'pending'
Backend → Returns orderId, amount, expiresAt
```

### Step 4: Payment Gateway Integration (TO BE IMPLEMENTED)
```
Frontend → Opens Razorpay/Stripe modal
User → Completes payment on gateway
Gateway → Sends callback with transactionId
```

### Step 5: Payment Verification
```
Frontend → POST /api/payment/verify { orderId, transactionId, paymentDetails }
Backend → Updates Payment status to 'completed'
Backend → Adds service to user's purchasedServices array
Frontend → Redirects to College Predictor (now accessible!)
```

---

## 🚀 Testing (Demo Mode)

Currently, payment is in **DEMO MODE**:

1. Go to http://localhost:5173/pricing
2. Click "Purchase Now" on any service
3. Click "OK" on confirmation dialog (simulates payment)
4. Payment is automatically verified
5. User gets instant access

**No actual payment processing** - This is for testing the flow!

---

## 🔧 How It Works

### Backend Protection

```javascript
// In server/routes/predictorRoutes.js
router.post('/college', 
  auth,                            // Must be logged in
  requirePayment('college-predictor'), // Must have paid
  predict
)
```

### Frontend Check

```javascript
// In CollegePredictor.jsx
useEffect(() => {
  checkServiceAccess(token)
}, [])

const checkServiceAccess = async (token) => {
  const response = await fetch('/api/payment/check-access/college-predictor', {
    headers: { Authorization: `Bearer ${token}` }
  })
  const data = await response.json()
  
  if (!data.hasAccess) {
    // Show paywall
  } else {
    // Show predictor
  }
}
```

---

## 📊 Database Schema

### Payment Model

```javascript
{
  user: ObjectId,              // Reference to User
  service: String,             // 'college-predictor', 'career-test', etc.
  amount: Number,              // Price paid
  currency: String,            // 'INR'
  status: String,              // 'pending', 'completed', 'failed'
  paymentMethod: String,       // 'razorpay', 'stripe', etc.
  transactionId: String,       // From payment gateway
  orderId: String,             // Our order ID
  paymentDetails: Mixed,       // Gateway response
  expiresAt: Date,             // When access expires
  isActive: Boolean,           // Can be manually deactivated
  createdAt: Date,
  updatedAt: Date
}
```

### Updated User Model

```javascript
{
  // ... existing fields
  purchasedServices: [String], // ['college-predictor', 'career-test']
}
```

---

## 🔌 Payment Gateway Integration

### For Production, integrate Razorpay:

#### 1. Install Razorpay SDK

```bash
npm install razorpay
```

#### 2. Update `.env`

```env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

#### 3. Update `paymentService.js`

```javascript
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

export async function createPaymentOrder(userId, service) {
  // ... existing code
  
  // Create Razorpay order
  const razorpayOrder = await razorpay.orders.create({
    amount: amount * 100, // Convert to paise
    currency: 'INR',
    receipt: orderId
  })
  
  return {
    ...payment,
    razorpayOrderId: razorpayOrder.id
  }
}
```

#### 4. Update Frontend (`Pricing.jsx`)

```javascript
const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

const handlePurchase = async (service) => {
  const res = await loadRazorpay()
  
  if (!res) {
    alert('Razorpay SDK failed to load')
    return
  }

  // Create order
  const response = await axios.post('/api/payment/create-order', { service })
  const { razorpayOrderId, amount } = response.data.data

  // Open Razorpay checkout
  const options = {
    key: 'YOUR_RAZORPAY_KEY_ID',
    amount: amount * 100,
    currency: 'INR',
    name: 'Career Counselling Platform',
    description: service,
    order_id: razorpayOrderId,
    handler: async (response) => {
      // Verify payment
      await axios.post('/api/payment/verify', {
        orderId: razorpayOrderId,
        transactionId: response.razorpay_payment_id,
        paymentDetails: response
      })
      alert('Payment successful!')
    },
    prefill: {
      name: user.name,
      email: user.email
    }
  }

  const paymentObject = new window.Razorpay(options)
  paymentObject.open()
}
```

---

## 🎨 Frontend Features

### Paywall UI
- Beautiful lock icon 🔒
- Service details
- Pricing
- Purchase button
- Feature list

### Access Granted UI
- Green success banner ✅
- Shows expiry date
- Days remaining counter
- Full access to predictor

### Pricing Page
- 4 service cards
- Hover effects
- Feature lists
- Purchase buttons
- "BEST VALUE" badge for Full Access

---

## 🧪 Testing Checklist

- [ ] Visit `/pricing` without login → Shows pricing
- [ ] Login → Visit `/pricing` → Can purchase
- [ ] Purchase service → Shows confirmation
- [ ] Visit `/college-predictor` after purchase → Access granted
- [ ] Check expiry info → Shows correct date
- [ ] Try after expiry → Shows paywall again
- [ ] Admin can view all payments → GET `/api/payment/admin/all`

---

## 🔐 Security Features

1. **JWT Authentication** - All payment routes require auth
2. **Payment Verification** - Server-side verification of transactions
3. **Expiry Checks** - Automatic access expiration
4. **Status Tracking** - Payment status (pending/completed/failed)
5. **Transaction IDs** - Unique transaction tracking
6. **Middleware Protection** - `requirePayment()` blocks unpaid access

---

## 📝 Admin Features

### View All Payments

```
GET /api/payment/admin/all?status=completed&service=college-predictor
```

Returns:
- All payments
- User details (populated)
- Filter by status, service
- Sortedby date

---

## 🎯 Next Steps

1. **Integrate Real Payment Gateway** (Razorpay/Stripe)
2. **Add Webhooks** for automatic payment confirmation
3. **Send Email Receipts** after successful payment
4. **Add Refund Functionality**
5. **Create Admin Dashboard** to manage payments
6. **Add Payment Analytics** (revenue, conversions)
7. **Implement Subscription Auto-Renewal**
8. **Add Coupon/Discount Codes**

---

## ✅ Summary

**College Predictor is now PAID!** 💰

- ✅ Backend payment system complete
- ✅ Frontend paywall implemented
- ✅ Pricing page created
- ✅ Access control working
- ✅ Demo mode for testing
- ⏳ Real payment gateway integration needed

**Users must purchase before accessing the College Predictor!** 🎓
