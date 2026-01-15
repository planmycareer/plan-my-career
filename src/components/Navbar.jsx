import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Check if user is logged in on mount and whenever location changes
    checkLoginStatus()
  }, [location])

  const checkLoginStatus = () => {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    
    if (user && token) {
      try {
        const userData = JSON.parse(user)
        setIsLoggedIn(true)
        setUserName(userData.name)
      } catch (error) {
        console.error('Error parsing user data:', error)
        // Clear invalid data
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        setUserName('')
      }
    } else {
      setIsLoggedIn(false)
      setUserName('')
    }
  }

  const handleLogout = () => {
    // Remove all auth data
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('careerTestAnswers')
    localStorage.removeItem('careerReport')
    
    setIsLoggedIn(false)
    setUserName('')
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-20 h-20 bg-gradient-to-br from-white to-white-600 rounded-lg flex items-center justify-center">
              <img src="/logo.jpg" alt="Logo" className="w-18 h-16 object-contain" />
            </div>
            <span className="text-xl font-bold text-blue-950 hidden sm:block" style={{ fontFamily: "'Geometr415 Blk BT Black', sans-serif" }}>PlanMyCareer</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Dashboard
                </Link>
                <Link to="/career-test" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Career Test      (Phase 1)
                </Link>
                <Link to="/college-predictor" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  College Predictor (Beta)
                </Link>
                <Link to="/book-session" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Book Session
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Hi, {userName}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Home
              </Link>
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-primary transition-colors font-medium">
                    Dashboard
                  </Link>
                  <Link to="/career-test" className="text-gray-700 hover:text-primary transition-colors font-medium">
                    Career Assessment Test (Phase 1)
                  </Link>
                  <Link to="/college-predictor" className="text-gray-700 hover:text-primary transition-colors font-medium">
                    College Predictor (Beta)
                  </Link>
                  <Link to="/book-session" className="text-gray-700 hover:text-primary transition-colors font-medium">
                    Book Session
                  </Link>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-gray-600 mb-2">Hi, {userName}</p>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-primary transition-colors font-medium">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary text-center">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
