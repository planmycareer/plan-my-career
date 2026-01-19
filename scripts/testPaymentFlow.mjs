#!/usr/bin/env node
import axios from 'axios'
import crypto from 'crypto'

const API_BASE = process.env.API_BASE || 'http://localhost:5000/api'

async function run() {
  try {
    const email = `test+${Date.now()}@example.com`
    const password = 'password123'
    console.log('Registering test user', email)
    const reg = await axios.post(`${API_BASE}/auth/register`, { name: 'Test User', email, password })
    const token = reg.data.token
    console.log('Registered. Token:', !!token)

    // Create order
    console.log('Creating order for college-predictor')
    const orderRes = await axios.post(`${API_BASE}/payment/create-order`, { service: 'college-predictor' }, { headers: { Authorization: `Bearer ${token}` } })
    console.log('Order created:', orderRes.data.data)
    const orderId = orderRes.data.data.orderId

    // Verify payment
    console.log('Verifying payment (simulated)')
    const verifyRes = await axios.post(`${API_BASE}/payment/verify`, { orderId, transactionId: `TXN_${Date.now()}`, paymentDetails: { simulated: true } }, { headers: { Authorization: `Bearer ${token}` } })
    console.log('Verify response:', verifyRes.data)

    // Check access
    console.log('Checking access')
    const accessRes = await axios.get(`${API_BASE}/payment/check-access/college-predictor`, { headers: { Authorization: `Bearer ${token}` } })
    console.log('Access response:', accessRes.data)

    // Also fetch user to check services
    const userRes = await axios.get(`${API_BASE}/user/me`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => null)
    console.log('User services:', userRes?.data?.user?.services)

  } catch (err) {
    console.error('Test flow error', err.response?.data || err.message)
    process.exit(1)
  }
}

run()
