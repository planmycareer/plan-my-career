export default function ServiceCard({ icon, title, description, delay = 0 }) {
  // Split description by line breaks and filter out empty lines
  const descriptionLines = description.split('\n').filter(line => line.trim() !== '')
  
  return (
    <div 
      className="card hover:scale-105 transition-transform duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Icon */}
      <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-900 rounded-lg flex items-center justify-center mb-4 shadow-lg">
        <div className="text-white text-2xl">{icon}</div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>

      {/* Description with bullets */}
      <ul className="text-gray-600 leading-relaxed space-y-2">
        {descriptionLines.map((line, index) => (
          <li key={index} className="flex items-start">
            <span className="text-blue-900 mr-2 flex-shrink-0">•</span>
            <span>{line.trim()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
