import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Report() {
  const [report, setReport] = useState(null)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (!userData) {
      navigate('/login')
      return
    }
    setUser(JSON.parse(userData))

    // Get report from localStorage
    const reportData = localStorage.getItem('careerReport')
    if (!reportData) {
      navigate('/dashboard')
      return
    }
    setReport(JSON.parse(reportData))
  }, [navigate])

  const handleDownloadPDF = () => {
    // Mock PDF download
    alert('PDF download functionality will be implemented with backend integration. Your report has been prepared!')
  }

  if (!report) return null

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold mb-4">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Report Generated Successfully
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Career Assessment Report</h1>
          <p className="text-xl text-gray-600">AI-Powered Personalized Career Guidance</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={handleDownloadPDF}
            className="btn-primary"
          >
            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF Report
          </button>
          <Link to="/book-session" className="btn-secondary">
            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book Counselling Session
          </Link>
        </div>

        {/* Report Content */}
        <div className="space-y-6">
          {/* Personality Summary */}
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Personality Summary</h2>
            </div>
            <div className="bg-gradient-to-r from-primary/5 to-purple-50 p-6 rounded-lg">
              <p className="text-gray-800 leading-relaxed text-lg">{report.personalitySummary}</p>
            </div>
          </div>

          {/* Top Strengths */}
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Your Top Strengths</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.strengths.map((strength, index) => (
                <div key={index} className="flex items-center space-x-3 bg-green-50 p-4 rounded-lg border border-green-200">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-900 font-semibold">{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Streams */}
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Suggested Career Streams</h2>
            </div>
            <div className="space-y-3">
              {report.streams.map((stream, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-primary/10 to-purple-50 border-l-4 border-primary rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{index + 1}.</span>
                    <span className="text-lg font-semibold text-gray-900">{stream}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Courses */}
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Recommended Courses</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.courses.map((course, index) => (
                <div key={index} className="card hover:shadow-xl transition-shadow border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{course.name}</h3>
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold">
                      {course.type}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Duration: {course.duration}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Career Paths */}
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Top Career Paths for You</h2>
            </div>
            <div className="space-y-4">
              {report.careerPaths.map((career, index) => (
                <div key={index} className="p-5 bg-white border-2 border-gray-200 rounded-lg hover:border-primary transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-2 sm:mb-0">
                      <h3 className="text-xl font-bold text-gray-900">{career.title}</h3>
                      <p className="text-gray-600">Expected Salary: <span className="font-semibold text-green-600">{career.salary}</span></p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        career.demand === 'Very High' ? 'bg-green-100 text-green-700' :
                        career.demand === 'High' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {career.demand} Demand
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 card bg-gradient-to-r from-primary to-indigo-700 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Take the Next Step?</h3>
            <p className="text-indigo-100 mb-6">
              Book a counselling session with our experts to create a personalized action plan
            </p>
            <Link to="/book-session" className="inline-block px-8 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg">
              Book Session Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
