import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { questions, generateReport } from '../data/questions'
import TestStep from '../components/TestStep'

export default function CareerTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selectedOption, setSelectedOption] = useState('')
  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)
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

      const response = await fetch('http://localhost:5000/api/payment/check-access/career-test', {
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
    } catch (error) {
      console.error('Error checking access:', error)
      setHasAccess(false)
    } finally {
      setLoading(false)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleOptionSelect = (value) => {
    setSelectedOption(value)
  }

  const handleNext = () => {
    if (!selectedOption) return

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

  const handleSubmit = () => {
    if (!selectedOption) return

    // Save final answer
    const finalAnswers = {
      ...answers,
      [questions[currentQuestion].id]: selectedOption,
    }

    // Generate report
    const report = generateReport(finalAnswers)

    // Store in localStorage
    localStorage.setItem('careerTestAnswers', JSON.stringify(finalAnswers))
    localStorage.setItem('careerReport', JSON.stringify(report))

    // Redirect to report page
    navigate('/report')
  }

  const currentQ = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Checking access...</p>
        </div>
      </div>
    )
  }

  // Show paywall if user doesn't have access
  if (!hasAccess) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-lg">
              🔒
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Career Test - Premium Feature</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Our comprehensive Career Assessment Test is a premium feature that requires payment to access.
            </p>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-8">
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
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white mr-3 flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Lifetime Access</h4>
                    <p className="text-gray-600 text-sm">One-time payment, access forever</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Link
                to="/pricing"
                className="inline-block px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
                  className="text-indigo-600 hover:text-indigo-800 font-semibold underline"
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
    <div className="min-h-[80vh] bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Career Assessment Test</h1>
          <p className="text-xl text-gray-600">Answer honestly for accurate results</p>
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
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm">
            {currentQ.section}
          </span>
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
              disabled={!selectedOption}
              className={`px-8 py-3 font-semibold rounded-lg transition-all ${
                selectedOption
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
              disabled={!selectedOption}
              className={`px-8 py-3 font-semibold rounded-lg transition-all ${
                selectedOption
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

        {/* Progress Steps */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Interests', 'Skills', 'Career Goals'].map((section, idx) => (
            <TestStep
              key={idx}
              number={idx + 1}
              title={section}
              description={`Understanding your ${section.toLowerCase()}`}
              isActive={currentQ.section === section}
              isCompleted={currentQuestion > idx * 3}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
