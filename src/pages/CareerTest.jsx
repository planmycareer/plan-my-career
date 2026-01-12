import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { API_ENDPOINTS } from '../config/api'
import TestStep from '../components/TestStep'

export default function CareerTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selectedOption, setSelectedOption] = useState('')
  const [hasAccess, setHasAccess] = useState(false)
  const [testStarted, setTestStarted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const [loadingQuestions, setLoadingQuestions] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (!userData) {
      navigate('/login')
      return
    }

    // Check if user has paid for career test
    checkServiceAccess()
  }, [navigate])

  const checkServiceAccess = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setHasAccess(false)
        setLoading(false)
        return
      }

      const response = await fetch(`${API_ENDPOINTS.PAYMENT.CHECK_ACCESS('career-test')}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        console.error('Access check failed:', response.status)
        setHasAccess(false)
        setLoading(false)
        return
      }

      const result = await response.json()
      console.log('Access check response:', result)
      
      // The API returns { success: true, data: { hasAccess: true/false } }
      const hasAccessValue = result.data?.hasAccess || result.hasAccess || false
      setHasAccess(hasAccessValue)

  // Access just means user purchased. Don't auto-start the test.
  setTestStarted(false)
      
      // If user has access, fetch questions
      if (hasAccessValue) {
        await fetchQuestions(token)
      }
    } catch (error) {
      console.error('Error checking access:', error)
      setHasAccess(false)
    } finally {
      setLoading(false)
    }
  }

  const fetchQuestions = async (token) => {
    try {
      setLoadingQuestions(true)
      const response = await fetch(API_ENDPOINTS.TEST.QUESTIONS, {
        headers: {
          'Authorization': `Bearer ${token || localStorage.getItem('token')}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch questions')
      }

      const result = await response.json()
      console.log('Fetched questions:', result.data.length)
      
      // Transform API questions to match the frontend format
      const transformedQuestions = result.data.map(q => ({
        id: q.id,
        section: q.section,
        subsection: q.subsection,
        question: q.question,
        options: q.options.map((opt, idx) => ({
          value: idx,
          label: opt
        }))
      }))
      
      setQuestions(transformedQuestions)
    } catch (error) {
      console.error('Error fetching questions:', error)
      alert('Failed to load questions. Please try again.')
    } finally {
      setLoadingQuestions(false)
    }
  }

  const handleOptionSelect = (value) => {
    setSelectedOption(value)
  }

  const handleNext = () => {
    // Check if an option is selected (including 0)
    if (selectedOption === '' || selectedOption === null || selectedOption === undefined) return

    // Save answer
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: selectedOption,
    })

    setSelectedOption('')

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      // Load previous answer if exists
      const prevAnswer = answers[questions[currentQuestion - 1].id]
      setSelectedOption(prevAnswer || '')
    }
  }

  const handleSubmit = async () => {
    // Check if an option is selected (including 0)
    if (selectedOption === '' || selectedOption === null || selectedOption === undefined) return

    // Save final answer
    const finalAnswers = {
      ...answers,
      [questions[currentQuestion].id]: selectedOption,
    }

    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      // Submit test to new API
      const response = await fetch(API_ENDPOINTS.TEST.SUBMIT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ answers: finalAnswers })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to submit test')
      }

      const result = await response.json()
      console.log('Test submitted:', result)

      // Store report data
      localStorage.setItem('careerTestAnswers', JSON.stringify(finalAnswers))
      localStorage.setItem('careerReport', JSON.stringify(result.data.report))
      // Persist latest test id separately (report payload doesn't include Report _id)
      if (result.data.testId) {
        localStorage.setItem('testId', result.data.testId)
      }
      localStorage.setItem('testId', result.data.testId)

      // Redirect to report page
      navigate('/report')
    } catch (error) {
      console.error('Error submitting test:', error)
      alert('Failed to submit test: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const currentQ = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0

  // ===== Timer (120 minutes) =====
  const TEST_DURATION_SECONDS = 120 * 60
  const TIMER_KEY = 'careerTest_timerStartedAt'

  const [timeLeft, setTimeLeft] = useState(TEST_DURATION_SECONDS)
  const timerRef = useRef(null);
  const hasStartedRef = useRef(false);

  const formatTime = (totalSeconds) => {
    const s = Math.max(0, totalSeconds);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    const two = (n) => String(n).padStart(2, "0");
    return h > 0 ? `${two(h)}:${two(m)}:${two(sec)}` : `${two(m)}:${two(sec)}`;
  };

  const startTimer = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Persist the start time so refresh doesn't reset the timer
    const existing = localStorage.getItem(TIMER_KEY)
    const startedAtMs = existing ? Number(existing) : Date.now()
    if (!existing) localStorage.setItem(TIMER_KEY, String(startedAtMs))

    // Initialize timeLeft immediately (no 1s delay)
    const initialLeft = Math.max(0, TEST_DURATION_SECONDS - Math.floor((Date.now() - startedAtMs) / 1000))
    setTimeLeft(initialLeft)

    timerRef.current = setInterval(() => {
      const startedAt = Number(localStorage.getItem(TIMER_KEY) || startedAtMs)
      const left = Math.max(0, TEST_DURATION_SECONDS - Math.floor((Date.now() - startedAt) / 1000))
      setTimeLeft(left)
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  // Start timer when test is ready (questions are loaded and access allowed)
  useEffect(() => {
    const isReady = Array.isArray(questions) && questions.length > 0 && !loading && !loadingQuestions && hasAccess === true && testStarted === true
    if (isReady) startTimer()
  }, [questions.length, loading, loadingQuestions, hasAccess, testStarted])

  // Stop timer if user hasn't started the test yet (or if they leave the test UI)
  useEffect(() => {
    if (!testStarted) {
      stopTimer()
      hasStartedRef.current = false
      // Ensure a fresh 120:00 when they eventually start
      localStorage.removeItem(TIMER_KEY)
      setTimeLeft(TEST_DURATION_SECONDS)
    }
  }, [testStarted])

  // Auto-submit when time reaches 0
  useEffect(() => {
    if (!hasStartedRef.current) return;
    if (timeLeft !== 0) return;

    stopTimer();

  // Clear persisted timer
  localStorage.removeItem(TIMER_KEY)

    // Prefer submit if exists, otherwise just lock UI
    if (typeof handleSubmit === "function") {
      handleSubmit();
    }
  }, [timeLeft]);

  // Stop timer when component unmounts
  useEffect(() => {
    return () => stopTimer();
  }, []);

  // Show loading state
  if (loading || loadingQuestions) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            {loadingQuestions ? 'Loading questions...' : 'Checking access...'}
          </p>
        </div>
      </div>
    )
  }

  // Show message if questions not loaded yet
  if (hasAccess && questions.length === 0) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-gray-600 text-lg">No questions available. Please contact support.</p>
        </div>
      </div>
    )
  }

  // Access granted but user hasn't started the test yet
  if (hasAccess && questions.length > 0 && !testStarted) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-lg">
              ✅
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">You're all set!</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your purchase is active. When you're ready, click <span className="font-semibold">Start Test</span>.
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-8 text-left max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <div className="text-2xl">⏱️</div>
                <div>
                  <div className="font-semibold text-gray-900">Time limit</div>
                  <div className="text-gray-600 text-sm">120 minutes (timer starts after you click Start Test)</div>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <div className="text-2xl">📝</div>
                <div>
                  <div className="font-semibold text-gray-900">Questions</div>
                  <div className="text-gray-600 text-sm">{questions.length} questions</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setCurrentQuestion(0)
                  setAnswers({})
                  setSelectedOption('')
                  setTestStarted(true)
                }}
                className="inline-block px-10 py-4 bg-gradient-to-r from-blue-800 to-blue-800 text-white font-bold text-lg rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Test →
              </button>

              <Link
                to="/pricing"
                className="inline-block px-10 py-4 bg-gray-100 text-gray-800 font-bold text-lg rounded-full hover:bg-gray-200 transition-all duration-300"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show paywall if user doesn't have access
  if (!hasAccess) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-lg">
              🔒
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Career Test - Premium Feature</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Our comprehensive Career Assessment Test is a premium feature that requires payment to access.
            </p>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-50 rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What You'll Get:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white mr-3 flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">7-Section Assessment</h4>
                    <p className="text-gray-600 text-sm">Comprehensive evaluation covering all aspects</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white mr-3 flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Detailed Report</h4>
                    <p className="text-gray-600 text-sm">Personalized career recommendations</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white mr-3 flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Aptitude Analysis</h4>
                    <p className="text-gray-600 text-sm">Identify your strengths and skills</p>
                  </div>
                </div>
                <div className="flex items-start">
                 
                 
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Link
                to="/pricing"
                className="inline-block px-10 py-4 bg-gradient-to-r from-blue-800 to-blue-800 text-white font-bold text-lg rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                View Pricing & Purchase
              </Link>
              <div className="text-gray-500 space-y-2">
                <p className="text-sm">Already purchased? The test should be accessible now.</p>
                <button
                  onClick={() => {
                    setLoading(true)
                    checkServiceAccess()
                  }}
                  className="text-blue-600 hover:text-blue-800 font-semibold underline"
                >
                  Click here to check access again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Career Assessment Test</h1>
          <p className="text-xl text-gray-600">Answer honestly for accurate results</p>
        </div>

        {/* Timer Bar */}
        <div className="max-w-4xl mx-auto px-4 mb-4">
          <div className="flex items-center justify-between rounded-xl border bg-white/80 backdrop-blur px-4 py-3">
            <div className="text-sm font-medium text-gray-700">
              Time Remaining
            </div>

            <div
              className={`text-sm font-semibold ${
                timeLeft <= 5 * 60 ? "text-red-600" : "text-gray-900"
              }`}
            >
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-purple-600 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Section Badge */}
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="inline-block px-4 py-2 bg-blue-800/10 text-blue-800 font-semibold rounded-full text-sm">
            {currentQ.section}
          </span>
          {currentQ.subsection && (
            <span className="inline-block px-4 py-2 bg-purple-600/10 text-purple-600 font-semibold rounded-full text-sm">
              {currentQ.subsection}
            </span>
          )}
        </div>

        {/* Question Card */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentQ.question}</h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedOption === option.value
                    ? 'border-primary bg-primary/10 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center flex-shrink-0 ${
                      selectedOption === option.value
                        ? 'border-primary bg-primary'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedOption === option.value && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-800 font-medium">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 font-semibold rounded-lg transition-all ${
              currentQuestion === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === '' || selectedOption === null || selectedOption === undefined}
              className={`px-8 py-3 font-semibold rounded-lg transition-all ${
                (selectedOption !== '' && selectedOption !== null && selectedOption !== undefined)
                  ? 'btn-primary'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Submit & Get Report
              <svg className="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={selectedOption === '' || selectedOption === null || selectedOption === undefined}
              className={`px-8 py-3 font-semibold rounded-lg transition-all ${
                (selectedOption !== '' && selectedOption !== null && selectedOption !== undefined)
                  ? 'btn-primary'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
              <svg className="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

       
      </div>
    </div>
  )
}
