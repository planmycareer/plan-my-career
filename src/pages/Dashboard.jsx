import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [testCompleted, setTestCompleted] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (!userData) {
      navigate('/login')
      return
    }
    setUser(JSON.parse(userData))

    // Check if test is completed
    const testData = localStorage.getItem('careerTestAnswers')
    setTestCompleted(!!testData)
  }, [navigate])

  if (!user) return null

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Continue your career discovery journey
          </p>
        </div>

        {/* Status Banner */}
        <div className={`card mb-8 ${testCompleted ? 'bg-green-50 border-2 border-green-200' : 'bg-blue-50 border-2 border-blue-200'}`}>
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
              testCompleted ? 'bg-green-500' : 'bg-blue-500'
            }`}>
              {testCompleted ? (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-semibold mb-1 ${testCompleted ? 'text-green-900' : 'text-blue-900'}`}>
                {testCompleted ? 'Career Assessment (Phase 1) Completed!' : 'Get Started with Career Assessment (Phase 1)'}
              </h3>
              <p className={testCompleted ? 'text-green-700' : 'text-blue-700'}>
                {testCompleted
                  ? 'Your personalized career report is ready. View detailed insights and recommendations.'
                  : 'Take our Phase 1 assessment to discover your ideal career path.'}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Career Test Card */}
          <Link
            to="/career-test"
            className="card hover:scale-105 transition-transform duration-300 group"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {testCompleted ? 'Retake Phase 1 Test' : 'Career Assessment Test (Phase 1)'}
            </h3>
            <p className="text-gray-600 mb-4">
              {testCompleted
                ? 'Want to reassess? Take the test again.'
                : 'Discover your strengths and ideal career paths.'}
            </p>
            <div className="flex items-center text-primary font-semibold">
              <span>{testCompleted ? 'Start Again' : 'Start Now'}</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            {!testCompleted && (
              <div className="mt-4 px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-semibold inline-block">
                Not Started
              </div>
            )}
          </Link>

          {/* Report Card */}
          <Link
            to="/report"
            className={`card hover:scale-105 transition-transform duration-300 group ${
              !testCompleted ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''
            }`}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">View Career Report</h3>
            <p className="text-gray-600 mb-4">
              Access your AI-generated career insights and recommendations.
            </p>
            <div className="flex items-center text-green-600 font-semibold">
              <span>View Report</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            {testCompleted && (
              <div className="mt-4 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold inline-block">
                ✓ Available
              </div>
            )}
          </Link>

          {/* College Predictor Card */}
          <Link
            to="/college-predictor"
            className="card hover:scale-105 transition-transform duration-300 group"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">College Predictor (Beta)</h3>
            <p className="text-gray-600 mb-4">
              Find colleges based on your JEE/NEET rank and category.
            </p>
            <div className="flex items-center text-orange-600 font-semibold">
              <span>Predict Now</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <div className="mt-4 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold inline-block">
              🔥 New
            </div>
          </Link>

          {/* Book Session Card */}
          <Link
            to="/book-session"
            className="card hover:scale-105 transition-transform duration-300 group"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Book Counselling</h3>
            <p className="text-gray-600 mb-4">
              Get personalized guidance from expert career counsellors.
            </p>
            <div className="flex items-center text-purple-600 font-semibold">
              <span>Schedule Now</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Progress Card */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Your Progress
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Career Assessment</span>
                <span className={`font-semibold ${testCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                  {testCompleted ? 'Completed ✓' : 'Pending'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: testCompleted ? '100%' : '0%' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Quick Tips Card */}
          <div className="card bg-gradient-to-br from-primary/10 to-purple-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Quick Tip
            </h3>
            <p className="text-gray-700">
              {testCompleted
                ? 'Book a counselling session to discuss your report in detail and create an action plan for your career goals.'
                : 'Sit aside 120 minutes in a quiet environment to take the career test for best results.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
