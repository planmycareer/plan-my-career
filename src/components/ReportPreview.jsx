import { Link } from 'react-router-dom'

export default function ReportPreview({ report }) {
  return (
    <div className="card max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Career Assessment Report</h2>
        <p className="text-gray-600">AI-Generated Personalized Career Guidance</p>
      </div>

      {/* Personality Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
          Personality Summary
        </h3>
        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
          {report?.personalitySummary || "Your personality traits indicate a strong analytical mind with creative thinking abilities..."}
        </p>
      </div>

      {/* Top Strengths */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Top Strengths
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(report?.strengths || ['Problem Solving', 'Creative Thinking', 'Communication', 'Leadership']).map((strength, index) => (
            <div key={index} className="flex items-center space-x-2 bg-green-50 p-3 rounded-lg">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-800 font-medium">{strength}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Streams */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
          Suggested Career Streams
        </h3>
        <div className="space-y-2">
          {(report?.streams || ['Science (PCM)', 'Engineering', 'Technology']).map((stream, index) => (
            <div key={index} className="bg-primary/5 border border-primary/20 p-3 rounded-lg">
              <span className="text-primary font-semibold">{stream}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
        <Link to="/report" className="btn-primary flex-1 text-center">
          View Full Report
        </Link>
        <Link to="/book-session" className="btn-secondary flex-1 text-center">
          Book Counselling
        </Link>
      </div>
    </div>
  )
}
