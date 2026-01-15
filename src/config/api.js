// API Configuration
// Automatically uses production or development URL based on environment

// Check if running on localhost
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
// Prefer environment variable (Vercel/Vite) for the API base URL in production
export const API_BASE_URL = isLocalhost
  ? 'http://localhost:5000/api'
  : (import.meta.env.VITE_API_URL || 'https://api.planmycareerindia.com/api')

export const API_ENDPOINTS = {
  // Base URL
  BASE: API_BASE_URL,
  
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
  },
  
  // Payment endpoints
  PAYMENT: {
    CREATE_ORDER: `${API_BASE_URL}/payment/create-order`,
    VERIFY: `${API_BASE_URL}/payment/verify`,
    CHECK_ACCESS: (service) => `${API_BASE_URL}/payment/check-access/${service}`,
    HISTORY: `${API_BASE_URL}/payment/history`,
    SUBSCRIPTIONS: `${API_BASE_URL}/payment/subscriptions`,
    PRICING: `${API_BASE_URL}/payment/pricing`,
  },
  
  // Test endpoints
  TEST: {
    QUESTIONS: `${API_BASE_URL}/test/questions`,
    SUBMIT: `${API_BASE_URL}/test/submit`,
  },
  
  // Predictor endpoints
  PREDICTOR: {
    PREDICT: `${API_BASE_URL}/predictor/predict`,
  },
  
  // Booking endpoints
  BOOKING: {
    CREATE: `${API_BASE_URL}/bookings`,
    MY_BOOKINGS: `${API_BASE_URL}/bookings/my-bookings`,
  },
  
  // Dashboard endpoints
  DASHBOARD: {
    STATS: `${API_BASE_URL}/dashboard/stats`,
    RECENT: `${API_BASE_URL}/dashboard/recent`,
  },
}

// Keep existing imports working: default export the endpoints object
export default API_ENDPOINTS
