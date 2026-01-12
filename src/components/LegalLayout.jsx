import { Link } from 'react-router-dom'

export default function LegalLayout({ title, updatedAt, children }) {
  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
            {updatedAt ? (
              <p className="text-sm text-gray-500 mt-2">Last updated: {updatedAt}</p>
            ) : null}
          </div>

          <div className="prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700">
            {children}
          </div>

          <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row gap-3 justify-between">
            <Link to="/" className="text-blue-700 hover:underline font-semibold">
              ← Back to Home
            </Link>
            <div className="flex gap-4 text-sm">
              <Link to="/privacy-policy" className="text-gray-600 hover:underline">Privacy</Link>
              <Link to="/terms" className="text-gray-600 hover:underline">Terms</Link>
              <Link to="/disclaimer" className="text-gray-600 hover:underline">Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
