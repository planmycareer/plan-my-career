// Quick script to create a test user and get a valid token
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

async function createTestUser() {
  console.log('Creating test user...\n');
  
  // Register new user
  try {
    const registerResponse = await axios.post(`${API_BASE}/auth/register`, {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Test@123',
      role: 'student',
      class: '12th',
      stream: 'Science'
    });
    
    console.log('✅ Registration successful!');
    console.log('Token:', registerResponse.data.token);
    console.log('\n📋 Copy this token and paste it in your browser console:');
    console.log(`localStorage.setItem('token', '${registerResponse.data.token}')`);
    console.log(`localStorage.setItem('user', '${JSON.stringify(registerResponse.data.user)}')`);
    console.log('\nOr simply refresh the page and login with:');
    console.log('Email: test@example.com');
    console.log('Password: Test@123');
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.message?.includes('already exists')) {
      console.log('User already exists, trying to login...\n');
      
      // Login with existing user
      try {
        const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
          email: 'test@example.com',
          password: 'Test@123'
        });
        
        console.log('✅ Login successful!');
        console.log('Token:', loginResponse.data.token);
        console.log('\n📋 Run these commands in your browser console (F12):');
        console.log(`localStorage.setItem('token', '${loginResponse.data.token}')`);
        console.log(`localStorage.setItem('user', '${JSON.stringify(loginResponse.data.user)}')`);
        console.log('\nThen refresh the page.');
      } catch (loginError) {
        console.error('❌ Login failed:', loginError.response?.data || loginError.message);
      }
    } else {
      console.error('❌ Registration failed:', error.response?.data || error.message);
    }
  }
}

createTestUser();
