// Test script for new psychometric test engine

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api';
const TEST_USER = {
  email: 'test@example.com',
  password: 'Test@123'
};

let authToken = '';

// Helper function to make authenticated requests
async function apiRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
    ...options.headers
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  const data = await response.json();
  return { status: response.status, data };
}

// Step 1: Login
async function login() {
  console.log('\n📝 Step 1: Logging in...');
  const { status, data } = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(TEST_USER)
  });

  if (status === 200 && data.token) {
    authToken = data.token;
    console.log('✅ Login successful');
    console.log('Token:', authToken.substring(0, 20) + '...');
    return true;
  } else {
    console.log('❌ Login failed:', data.message);
    return false;
  }
}

// Step 2: Fetch questions
async function fetchQuestions() {
  console.log('\n📝 Step 2: Fetching test questions...');
  const { status, data } = await apiRequest('/test/questions');

  if (status === 200) {
    console.log(`✅ Fetched ${data.data.length} questions`);
    
    // Show breakdown by section
    const sections = {};
    data.data.forEach(q => {
      if (!sections[q.section]) {
        sections[q.section] = { count: 0, subsections: {} };
      }
      sections[q.section].count++;
      if (!sections[q.section].subsections[q.subsection]) {
        sections[q.section].subsections[q.subsection] = 0;
      }
      sections[q.section].subsections[q.subsection]++;
    });

    console.log('\nQuestions by section:');
    Object.entries(sections).forEach(([section, info]) => {
      console.log(`  ${section}: ${info.count} questions`);
      Object.entries(info.subsections).forEach(([subsection, count]) => {
        console.log(`    - ${subsection}: ${count}`);
      });
    });

    return data.data;
  } else {
    console.log('❌ Failed to fetch questions:', data.message);
    return null;
  }
}

// Step 3: Submit test with sample answers
async function submitTest(questions) {
  console.log('\n📝 Step 3: Submitting test answers...');

  // Create sample answers
  const answers = {};
  questions.forEach(q => {
    // For objective questions (with correct answers), randomly pick
    // For subjective (Likert), pick a value between 0-4
    if (q.section === 'SECTION_1') {
      // Aptitude - objective questions (0-3 for options)
      answers[q.id] = Math.floor(Math.random() * 4);
    } else {
      // Interest/subjective - Likert scale (0-4)
      answers[q.id] = Math.floor(Math.random() * 5);
    }
  });

  console.log(`Generated ${Object.keys(answers).length} sample answers`);

  const { status, data } = await apiRequest('/test/submit', {
    method: 'POST',
    body: JSON.stringify({ answers })
  });

  if (status === 201) {
    console.log('✅ Test submitted successfully');
    console.log('\n📊 Test Results:');
    console.log('Test ID:', data.data.testId);
    
    console.log('\n🎯 Best Subsections:');
    Object.entries(data.data.bestSubsections).forEach(([section, subsection]) => {
      console.log(`  ${section}: ${subsection}`);
    });

    console.log('\n📈 Scores:');
    Object.entries(data.data.scores).forEach(([key, score]) => {
      console.log(`  ${key}:`, JSON.stringify(score, null, 2));
    });

    console.log('\n📋 Report Summary:');
    if (data.data.report && data.data.report.reportSummary) {
      console.log('  Sections analyzed:', data.data.report.reportSummary.totalSections);
      console.log('  Generated at:', data.data.report.reportSummary.generatedAt);
    }

    return data.data;
  } else {
    console.log('❌ Test submission failed:', data.message);
    console.log('Error details:', JSON.stringify(data, null, 2));
    return null;
  }
}

// Step 4: Retrieve latest report
async function getLatestReport() {
  console.log('\n📝 Step 4: Retrieving latest report...');
  
  const { status, data } = await apiRequest('/test/report');

  if (status === 200) {
    console.log('✅ Report retrieved successfully');
    console.log('\n📊 Report Details:');
    console.log('Test ID:', data.data.testId);
    console.log('Completed at:', data.data.completedAt);
    
    console.log('\n🎯 Best Subsections:');
    Object.entries(data.data.bestSubsections).forEach(([section, subsection]) => {
      console.log(`  ${section}: ${subsection}`);
    });

    console.log('\n📋 Section Reports Available:');
    if (data.data.report && data.data.report.sectionReports) {
      Object.keys(data.data.report.sectionReports).forEach(section => {
        console.log(`  ✓ ${section}`);
      });
    }

    return data.data;
  } else {
    console.log('❌ Failed to retrieve report:', data.message);
    return null;
  }
}

// Step 5: Get test history
async function getTestHistory() {
  console.log('\n📝 Step 5: Retrieving test history...');
  
  const { status, data } = await apiRequest('/test/history');

  if (status === 200) {
    console.log(`✅ Found ${data.data.length} test attempts`);
    
    data.data.forEach((test, index) => {
      console.log(`\n  Test ${index + 1}:`);
      console.log(`    ID: ${test._id}`);
      console.log(`    Completed: ${test.completedAt}`);
      console.log(`    Best subsections:`, test.bestSubsections);
    });

    return data.data;
  } else {
    console.log('❌ Failed to retrieve history:', data.message);
    return null;
  }
}

// Main test flow
async function runTests() {
  console.log('🚀 Starting New Test Engine Validation\n');
  console.log('=' .repeat(60));

  try {
    // Step 1: Login
    const loginSuccess = await login();
    if (!loginSuccess) {
      console.log('\n❌ Test failed: Could not login');
      return;
    }

    // Step 2: Fetch questions
    const questions = await fetchQuestions();
    if (!questions) {
      console.log('\n❌ Test failed: Could not fetch questions');
      return;
    }

    // Step 3: Submit test
    const testResult = await submitTest(questions);
    if (!testResult) {
      console.log('\n❌ Test failed: Could not submit test');
      return;
    }

    // Step 4: Get latest report
    const report = await getLatestReport();
    if (!report) {
      console.log('\n❌ Test failed: Could not retrieve report');
      return;
    }

    // Step 5: Get test history
    const history = await getTestHistory();
    if (!history) {
      console.log('\n❌ Test failed: Could not retrieve history');
      return;
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ ALL TESTS PASSED! New test engine is working correctly.');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('\n❌ Test failed with error:', error.message);
    console.error(error.stack);
  }
}

// Run the tests
runTests();
