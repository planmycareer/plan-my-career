import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { API_BASE_URL } from '../config/api'

export default function Report() {
  const [report, setReport] = useState(null)
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState({ loading: true, error: '' })
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const asString = (val) => (typeof val === 'string' ? val : '')
  const asStringArray = (val) => (Array.isArray(val) ? val.filter((x) => typeof x === 'string') : [])
  const asObjectArray = (val) => (Array.isArray(val) ? val.filter((x) => x && typeof x === 'object') : [])

  const getAuthToken = () => {
    // Some builds may store token under different keys; try the common ones.
    return (
      localStorage.getItem('token') ||
      localStorage.getItem('authToken') ||
      localStorage.getItem('accessToken') ||
      localStorage.getItem('jwt')
    )
  }

  const getReportIdFromStorage = (parsedReport) => {
    // Support different response shapes
    return (
      parsedReport?._id ||
      parsedReport?.id ||
      parsedReport?.reportId ||
      parsedReport?.report?._id ||
      localStorage.getItem('reportId') ||
      localStorage.getItem('latestReportId')
    )
  }

  const resolveLatestBackendReportId = async (token) => {
    // Backend has a real Report model with _id; the test submission payload doesn't include it.
    const res = await fetch(`${API_BASE_URL}/report/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error(data?.message || 'Failed to load reports')
    }
    const latest = Array.isArray(data?.reports) ? data.reports[0] : null
    const backendReportId = latest?._id
    if (backendReportId) {
      localStorage.setItem('reportId', backendReportId)
    }
    return backendReportId
  }

  useEffect(() => {
    let cancelled = false

    const boot = async () => {
      setStatus({ loading: true, error: '' })

      // Check if user is logged in
      const userData = localStorage.getItem('user')
      if (!userData) {
        navigate('/login')
        return
      }
      try {
        const parsedUser = JSON.parse(userData)
        if (!cancelled) setUser(parsedUser)
      } catch {
        // Corrupted user storage; force re-login
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/login')
        return
      }

      const token = getAuthToken()
      if (!token) {
        if (!cancelled) setStatus({ loading: false, error: 'Login required. Please login again.' })
        return
      }

      // If a testId is provided (from redirect after submit), fetch that exact test report.
      const testId = searchParams.get('testId')
      if (testId) {
        try {
          const res = await fetch(`${API_BASE_URL}/test/${encodeURIComponent(testId)}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          const data = await res.json().catch(() => ({}))
          const backendReport = data?.data?.report
          if (!res.ok || !backendReport) {
            throw new Error(data?.message || 'Failed to load report for this test')
          }
          if (!cancelled) {
            localStorage.setItem('careerReport', JSON.stringify(backendReport))
            setReport(backendReport)
            setStatus({ loading: false, error: '' })
          }
          return
        } catch (e) {
          if (!cancelled) {
            setReport(null)
            setStatus({ loading: false, error: e?.message || 'Failed to load report' })
          }
          return
        }
      }

      // Try localStorage first.
      const reportData = localStorage.getItem('careerReport')
      if (reportData) {
        try {
          const parsedReport = JSON.parse(reportData)
          if (parsedReport && typeof parsedReport === 'object') {
            if (import.meta.env.DEV) console.log('Report structure:', parsedReport)
            if (!cancelled) {
              setReport(parsedReport)
              setStatus({ loading: false, error: '' })
            }
            return
          }
        } catch {
          // Fall through to backend fetch.
        }
      }

      // Fallback: fetch latest test report.
      try {
        const res = await fetch(`${API_BASE_URL}/test/report`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json().catch(() => ({}))
        const backendReport = data?.data?.report
        if (!res.ok || !backendReport) {
          throw new Error(data?.message || 'No report found yet. Please complete the test.' )
        }
        if (!cancelled) {
          localStorage.setItem('careerReport', JSON.stringify(backendReport))
          setReport(backendReport)
          setStatus({ loading: false, error: '' })
        }
      } catch (e) {
        if (!cancelled) {
          setReport(null)
          setStatus({ loading: false, error: e?.message || 'Failed to load report' })
        }
      }
    }

    boot()
    return () => {
      cancelled = true
    }
  }, [navigate, searchParams])

  // Dev helper: paste the report JSON into the browser console:
  // window.__setCareerReport(<paste-json-here>)
  // Then open /report.
  if (typeof window !== 'undefined' && typeof window.__setCareerReport !== 'function') {
    window.__setCareerReport = (obj) => {
      try {
        localStorage.setItem('careerReport', JSON.stringify(obj))
        // Trigger render if this page is open
        setReport(obj)
        return true
      } catch {
        return false
      }
    }
  }

  const openPdfUrl = (pdfUrl) => {
    if (!pdfUrl) return
    const absolute = pdfUrl.startsWith('http') ? pdfUrl : `${API_BASE_URL.replace(/\/api$/, '')}${pdfUrl}`
    window.open(absolute, '_blank', 'noopener,noreferrer')
  }

  const fetchPdf = async (section = null) => {
    const token = getAuthToken()
    let reportId = getReportIdFromStorage(report)
    if (!token) {
      alert('Login required. Please login again to download the PDF.')
      navigate('/login')
      return
    }

    if (!reportId) {
      try {
        reportId = await resolveLatestBackendReportId(token)
      } catch (e) {
        alert(e?.message || 'Unable to find your report. Please try again.')
        return
      }

      if (!reportId) {
        alert('No report found for your account yet. Please finish the test again.')
        navigate('/career-test')
        return
      }
    }

    const url = section
      ? `${API_BASE_URL}/report/${reportId}/pdf/${encodeURIComponent(section)}`
      : `${API_BASE_URL}/report/${reportId}/pdf`

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok || !data?.pdfUrl) {
      alert(data?.message || 'Failed to generate PDF. Please try again.')
      return
    }

    openPdfUrl(data.pdfUrl)
  }

  const handleDownloadPDF = () => fetchPdf()
  const handleDownloadSectionPDF = (section) => fetchPdf(section)

  if (status.loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">Loading your report…</p>
          <p className="text-gray-500 text-sm mt-2">This may take a few seconds.</p>
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-xl w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Report not available</h1>
          <p className="text-gray-600 mb-6">{status.error || 'We could not load your report. Please try again.'}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/career-test" className="btn-primary">Retake Test</Link>
            <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
          </div>
        </div>
      </div>
    )
  }

  // Handle both old and new report formats
  const isNewFormat = report.sectionReports && report.reportSummary
  
  if (isNewFormat) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold mb-4">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Report Generated Successfully
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Career Assessment Report</h1>
            <p className="text-xl text-gray-600">Comprehensive {report.reportSummary?.completedSections || 0}-Section Analysis</p>
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

            <button
              onClick={() => handleDownloadSectionPDF('aptitude')}
              className="btn-secondary"
              type="button"
            >
              Download Section 1 PDF
            </button>

            <button
              onClick={() => handleDownloadSectionPDF('interest')}
              className="btn-secondary"
              type="button"
            >
              Download Section 2 PDF
            </button>

            <button
              onClick={() => handleDownloadSectionPDF('personality')}
              className="btn-secondary"
              type="button"
            >
              Download Section 3 PDF
            </button>
            <Link to="/book-session" className="btn-secondary">
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Counselling Session
            </Link>
          </div>

          {/* Overall Strengths Summary */}
          {Array.isArray(report.reportSummary?.overallStrengths) && report.reportSummary.overallStrengths.length > 0 && (
            <div className="card mb-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Your Top Strengths</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {asStringArray(report.reportSummary.overallStrengths).map((strength, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-green-50 p-4 rounded-lg border border-green-200">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-900 font-medium">{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Career Recommendations */}
          {Array.isArray(report.reportSummary?.topCareerRecommendations) && report.reportSummary.topCareerRecommendations.length > 0 && (
            <div className="card mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Top Career Recommendations</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {asObjectArray(report.reportSummary.topCareerRecommendations).map((career, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{career.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{career.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-900 font-semibold">Growth: {career.growthPotential}</span>
                      <span className="text-purple-800 font-semibold">{career.averageSalary}</span>
                    </div>
                    {career.source && (
                      <div className="mt-2 text-xs text-gray-500">
                        Based on: {career.source}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section-by-Section Reports */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Detailed Section Analysis</h2>
            
            {Object.entries(report.sectionReports || {}).map(([sectionId, sectionData]) => (
              <div key={sectionId} className="card">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{sectionData.sectionName}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-900 text-sm font-semibold rounded-full">
                        {sectionData.bestSubsection}
                      </span>
                      {sectionData.performanceLevel && (
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                          sectionData.performanceLevel === 'Excellent' ? 'bg-green-100 text-green-800' :
                          sectionData.performanceLevel === 'Good' ? 'bg-blue-100 text-blue-900' :
                          sectionData.performanceLevel === 'Average' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {sectionData.performanceLevel}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-blue-900">{sectionData.percentage?.toFixed(0) || 0}%</div>
                    <div className="text-sm text-gray-600">{sectionData.score}/{sectionData.totalQuestions} correct</div>
                  </div>
                </div>

                {sectionData.report && (
                  <>
                    {/* Summary */}
                    {sectionData.report.summary && (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
                        <h4 className="font-bold text-gray-900 mb-2">Summary</h4>
                        <p className="text-gray-700 leading-relaxed">{sectionData.report.summary}</p>
                      </div>
                    )}

                    {/* Strengths */}
                    {(Array.isArray(sectionData.report.strengths) ? sectionData.report.strengths.length > 0 : Boolean(sectionData.report.strengths)) && (
                      <div className="mb-6">
                        <h4 className="font-bold text-gray-900 mb-3">Key Strengths</h4>
                        {Array.isArray(sectionData.report.strengths) ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {asStringArray(sectionData.report.strengths).map((strength, idx) => (
                              <div key={idx} className="flex items-start space-x-2 bg-green-50 p-3 rounded-lg">
                                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-800">{strength}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{asString(sectionData.report.strengths)}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Career Paths */}
                    {Array.isArray(sectionData.report.careerPaths) && sectionData.report.careerPaths.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-bold text-gray-900 mb-3">Recommended Career Paths</h4>
                        <div className="space-y-3">
                          {asObjectArray(sectionData.report.careerPaths).map((career, idx) => (
                            <div key={idx} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                              <h5 className="font-bold text-gray-900 mb-1">{career.title}</h5>
                              <p className="text-gray-700 text-sm mb-2">{career.description}</p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-blue-900 font-semibold">
                                  📈 Growth: {career.growthPotential}
                                </span>
                                <span className="text-purple-800 font-semibold">
                                  💰 {career.averageSalary}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommendations */}
                    {(Array.isArray(sectionData.report.recommendations) ? sectionData.report.recommendations.length > 0 : Boolean(sectionData.report.recommendations)) && (
                      <div className="mb-6">
                        <h4 className="font-bold text-gray-900 mb-3">Recommendations</h4>
                        {Array.isArray(sectionData.report.recommendations) ? (
                          <ul className="space-y-2">
                            {asStringArray(sectionData.report.recommendations).map((rec, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <span className="text-blue-900 font-bold">•</span>
                                <span className="text-gray-700">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{asString(sectionData.report.recommendations)}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Development Areas */}
                    {(Array.isArray(sectionData.report.developmentAreas) ? sectionData.report.developmentAreas.length > 0 : Boolean(sectionData.report.developmentAreas)) && (
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Areas for Development</h4>
                        {Array.isArray(sectionData.report.developmentAreas) ? (
                          <ul className="space-y-2">
                            {asStringArray(sectionData.report.developmentAreas).map((area, idx) => (
                              <li key={idx} className="flex items-start space-x-2 text-gray-700">
                                <span className="text-orange-600 font-bold">→</span>
                                <span>{area}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{asString(sectionData.report.developmentAreas)}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-900 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Take the Next Step?</h3>
            <p className="text-xl mb-6 text-blue-100">
              Book a one-on-one counselling session with our expert career counsellors
            </p>
            <Link
              to="/book-session"
              className="inline-block px-8 py-4 bg-white text-blue-900 font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg"
            >
              Schedule Your Counselling Session
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // OLD FORMAT - Keep for backward compatibility  
  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Career Assessment Report</h1>
          <p className="text-xl text-gray-600">Old format - please retake the test for detailed analysis</p>
        </div>
        
        <div className="card">
          <p className="text-gray-700">
            This report uses an older format. Please retake the career test to get a comprehensive 
            multi-section analysis with detailed career recommendations.
          </p>
          <div className="mt-6">
            <Link to="/career-test" className="btn-primary">
              Retake Career Test
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
