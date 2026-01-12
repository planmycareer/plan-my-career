import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_ENDPOINTS } from '../config/api'

function CollegePredictor() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    exam: 'JEE',
    rank: '',
    category: 'General',
    state: '',
    quota: 'AI',
    round: '1',
    gender: 'Gender-Neutral',
  })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasAccess, setHasAccess] = useState(null)
  const [accessLoading, setAccessLoading] = useState(true)

  // Check authentication and payment access on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (!token || !user) {
      setError('Please login to use the college predictor')
      setAccessLoading(false)
      const timer = setTimeout(() => navigate('/login'), 2000)
      return () => clearTimeout(timer)
    }

    // Check if user has paid for this service
    checkServiceAccess(token)
  }, [navigate])

  const checkServiceAccess = async (token) => {
    try {
  const response = await fetch(API_ENDPOINTS.PAYMENT.CHECK_ACCESS('college-predictor'), {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.message || 'Failed to check access')
  }

  setHasAccess(data.data)
      setAccessLoading(false)
    } catch (error) {
      console.error('Error checking access:', error)
  setError(error?.message || 'Unable to check access. Please try again.')
      setAccessLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.rank || formData.rank <= 0) {
      setError('Please enter a valid rank')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Check if user is logged in
      const token = localStorage.getItem('token')
      if (!token) {
        setError('Please login to use the college predictor')
        setTimeout(() => navigate('/login'), 2000)
        return
      }

      // Prepare data with proper types
      const requestData = {
        exam: formData.exam,
        rank: parseInt(formData.rank),
        category: formData.category,
        quota: formData.quota,
        round: parseInt(formData.round),
        gender: formData.gender,
      }

      // Only add state if provided
      if (formData.state && formData.state.trim() !== '') {
        requestData.state = formData.state
      }

  const response = await fetch(`${API_ENDPOINTS.BASE}/predictor/college`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          setError('Session expired. Please login again.')
          localStorage.clear()
          setTimeout(() => navigate('/login'), 2000)
          return
        }
        throw new Error(data.message || 'Failed to predict colleges')
      }

      setResults(data)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      exam: 'JEE',
      rank: '',
      category: 'General',
      state: '',
      quota: 'AI',
    })
    setResults(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🎓 College Predictor
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Predict your college admission chances based on JEE/NEET rank, category, and quota
          </p>
        </div>

        {/* Loading Access Check */}
        {accessLoading && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Checking access...</p>
          </div>
        )}

        {/* Paywall - No Access */}
        {!accessLoading && hasAccess && !hasAccess.hasAccess && (
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-12 text-white text-center">
            <div className="text-6xl mb-6">🔒</div>
            <h2 className="text-3xl font-bold mb-4">Premium Feature</h2>
            <p className="text-xl mb-6 opacity-90">
              College Predictor is a premium service. Get accurate predictions for your college admissions!
            </p>
            <div className="bg-white/20 rounded-xl p-6 mb-8">
              <div className="flex items-baseline justify-center gap-3 mb-2">
                {hasAccess.originalPrice && Number(hasAccess.originalPrice) > Number(hasAccess.price) ? (
                  <span className="text-lg opacity-80 line-through">{hasAccess.originalPrice}</span>
                ) : null}
                <span className="text-2xl font-bold">{hasAccess.price}</span>
              </div>
              <p className="text-sm opacity-90">Valid for {hasAccess.validity ?? hasAccess.validityDays ?? 'N/A'} days</p>
            </div>
            <button
              onClick={() => navigate('/pricing')}
              className="bg-white text-blue-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Purchase Now →
            </button>
            <p className="mt-6 text-sm opacity-75">
              ✓ JEE & NEET predictions • ✓ Round-wise cutoffs • ✓ Gender-specific data
            </p>
          </div>
        )}

        {/* Access Granted - Show Predictor */}
        {!accessLoading && hasAccess && hasAccess.hasAccess && (
          <>
            {/* Access Info Banner */}
            <div className="max-w-2xl mx-auto bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">✅</span>
                  <div>
                    <p className="text-green-800 font-semibold">Active Subscription</p>
                    <p className="text-green-600 text-sm">
                      Expires in {hasAccess.daysRemaining} days ({new Date(hasAccess.expiresAt).toLocaleDateString()})
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Predictor Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Exam Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Entrance Exam *
              </label>
              <select
                name="exam"
                value={formData.exam}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="JEE">JEE (Engineering)</option>
                <option value="NEET">NEET (Medical)</option>
              </select>
            </div>

            {/* Rank Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Rank *
              </label>
              <input
                type="number"
                name="rank"
                value={formData.rank}
                onChange={handleChange}
                placeholder="Enter your rank (e.g., 5000)"
                className="input-field"
                required
                min="1"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="General">General</option>
                <option value="OBC">OBC (Non-Creamy Layer)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
                <option value="EWS">EWS (Economically Weaker Section)</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Home State (Optional)
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="e.g., Delhi, Maharashtra"
                className="input-field"
              />
              <p className="text-xs text-gray-500 mt-1">
                Required for state quota predictions
              </p>
            </div>

            {/* Quota */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quota
              </label>
              <select
                name="quota"
                value={formData.quota}
                onChange={handleChange}
                className="input-field"
              >
                <option value="AI">All India (AI)</option>
                <option value="HS">Home State (HS)</option>
                <option value="OS">Other State (OS)</option>
                <option value="GO">Goa (GO)</option>
                <option value="JK">Jammu & Kashmir (JK)</option>
                <option value="LA">Ladakh (LA)</option>
              </select>
            </div>

            {/* Round */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Counselling Round
              </label>
              <select
                name="round"
                value={formData.round}
                onChange={handleChange}
                className="input-field"
              >
                <option value="1">Round 1</option>
                <option value="2">Round 2</option>
                <option value="3">Round 3</option>
                <option value="4">Round 4</option>
                <option value="5">Round 5</option>
                <option value="6">Round 6 (Final)</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gender Preference
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-field"
              >
                <option value="Gender-Neutral">Gender-Neutral</option>
                <option value="Female-only">Female-only</option>
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                ⚠️ {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '🔍 Predicting...' : '🎯 Predict My Colleges'}
              </button>
              {results && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-secondary"
                >
                  🔄 Reset
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Results Section */}
        {results && (
          <div className="max-w-6xl mx-auto">
            {/* Summary */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                📊 Prediction Summary
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                  <p className="text-sm text-green-700 font-semibold">Your Rank</p>
                  <p className="text-2xl font-bold text-green-900">{results.rank}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                  <p className="text-sm text-blue-700 font-semibold">Category</p>
                  <p className="text-2xl font-bold text-blue-900">{results.category}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                  <p className="text-sm text-purple-700 font-semibold">State</p>
                  <p className="text-2xl font-bold text-purple-900">{results.state || 'All India'}</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
                  <p className="text-sm text-orange-700 font-semibold">Analyzed</p>
                  <p className="text-2xl font-bold text-orange-900">{results.totalCollegesAnalyzed}</p>
                </div>
              </div>
            </div>

            {/* High Chance Colleges */}
            {results.highChance && results.highChance.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">🎯</span>
                  <h3 className="text-2xl font-bold text-green-700">
                    High Chance ({results.highChance.length})
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">
                  You have a <strong>strong probability</strong> of getting admission in these colleges based on previous year cutoffs.
                </p>
                <div className="space-y-4">
                  {results.highChance.map((college, idx) => (
                    <div
                      key={idx}
                      className="border border-green-200 bg-green-50 rounded-xl p-5 hover:shadow-lg transition-all"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg text-gray-900">
                          {college.collegeName}
                        </h4>
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {college.college_type}
                        </span>
                      </div>
                      <p className="text-gray-700 font-medium mb-2">{college.branchName}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>📊 Closing Rank: <strong>{college.closing_rank}</strong></span>
                        <span>💰 Fees: <strong>{college.fees}</strong></span>
                        <span className="text-green-600 font-semibold">✅ High Chance</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Medium Chance Colleges */}
            {results.mediumChance && results.mediumChance.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">⚡</span>
                  <h3 className="text-2xl font-bold text-yellow-700">
                    Medium Chance ({results.mediumChance.length})
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">
                  You have a <strong>moderate probability</strong> - these colleges are within your reach with the right choice filling strategy.
                </p>
                <div className="space-y-4">
                  {results.mediumChance.map((college, idx) => (
                    <div
                      key={idx}
                      className="border border-yellow-200 bg-yellow-50 rounded-xl p-5 hover:shadow-lg transition-all"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg text-gray-900">
                          {college.collegeName}
                        </h4>
                        <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {college.college_type}
                        </span>
                      </div>
                      <p className="text-gray-700 font-medium mb-2">{college.branchName}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>📊 Closing Rank: <strong>{college.closing_rank}</strong></span>
                        <span>💰 Fees: <strong>{college.fees}</strong></span>
                        <span className="text-yellow-600 font-semibold">⚡ Medium Chance</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dream Colleges */}
            {results.dreamColleges && results.dreamColleges.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">⭐</span>
                  <h3 className="text-2xl font-bold text-purple-700">
                    Dream Colleges ({results.dreamColleges.length})
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">
                  These are <strong>aspirational colleges</strong> - require improvement or luck in spot rounds/later rounds.
                </p>
                <div className="space-y-4">
                  {results.dreamColleges.map((college, idx) => (
                    <div
                      key={idx}
                      className="border border-purple-200 bg-purple-50 rounded-xl p-5 hover:shadow-lg transition-all"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg text-gray-900">
                          {college.collegeName}
                        </h4>
                        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {college.college_type}
                        </span>
                      </div>
                      <p className="text-gray-700 font-medium mb-2">{college.branchName}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>📊 Closing Rank: <strong>{college.closing_rank}</strong></span>
                        <span>💰 Fees: <strong>{college.fees}</strong></span>
                        <span className="text-purple-600 font-semibold">⭐ Dream</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {results.highChance?.length === 0 && 
             results.mediumChance?.length === 0 && 
             results.dreamColleges?.length === 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <p className="text-xl text-gray-600">
                  {results.message || 'No colleges found matching your criteria. Try adjusting your filters.'}
                </p>
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Important Disclaimer:</strong> {results.disclaimer}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => navigate('/book-session')}
                className="btn-primary"
              >
                📞 Book Counselling Session
              </button>
              <button
                onClick={() => window.print()}
                className="btn-secondary"
              >
                🖨️ Print Results
              </button>
            </div>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  )
}

export default CollegePredictor
