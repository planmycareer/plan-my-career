export default function BookingCard({ type, price, features, isPopular, onSelect }) {
  return (
    <div className={`relative card hover:scale-105 transition-transform duration-300 ${
      isPopular ? 'border-2 border-primary shadow-xl' : ''
    }`}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      {/* Card Content */}
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{type}</h3>
        <div className="text-4xl font-bold text-primary mb-1">₹{price}</div>
        <p className="text-gray-500 text-sm">per session</p>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Select Button */}
      <button
        onClick={() => onSelect(type)}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
          isPopular
            ? 'bg-primary text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        Select {type}
      </button>
    </div>
  )
}
