export default function TestStep({ number, title, description, isActive, isCompleted }) {
  return (
    <div className={`flex items-start space-x-4 p-6 rounded-xl transition-all duration-300 ${
      isActive ? 'bg-primary/10 border-2 border-primary' : 
      isCompleted ? 'bg-green-50 border-2 border-green-300' : 
      'bg-white border-2 border-gray-200'
    }`}>
      {/* Step Number/Status */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
        isCompleted ? 'bg-green-500 text-white' :
        isActive ? 'bg-primary text-white' :
        'bg-gray-200 text-gray-600'
      }`}>
        {isCompleted ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          number
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className={`text-lg font-semibold mb-2 ${
          isActive ? 'text-primary' : 
          isCompleted ? 'text-green-700' : 
          'text-gray-700'
        }`}>
          {title}
        </h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  )
}
