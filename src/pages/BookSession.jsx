import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BookingCard from '../components/BookingCard'
import { sessionPackages, timeSlots } from '../data/services'

export default function BookSession() {
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (!userData) {
      navigate('/login')
      return
    }
    
    // Pre-fill form with user data
    const user = JSON.parse(userData)
    setFormData({
      ...formData,
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
    })

    // Set default date to tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setSelectedDate(tomorrow.toISOString().split('T')[0])
  }, [navigate])

  const handlePackageSelect = (type) => {
    setSelectedPackage(type)
  }

  const handleTimeSelect = (slot) => {
    if (slot.available) {
      setSelectedTime(slot)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!selectedPackage || !selectedTime) {
      alert('Please select a package and time slot')
      return
    }

    // Show success modal
    setShowModal(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setShowModal(false)
      navigate('/dashboard')
    }, 3000)
  }

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Book Counselling Session</h1>
          <p className="text-xl text-gray-600">Get personalized guidance from expert career counsellors</p>
        </div>

        {/* Step 1: Select Package */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-lg">1</span>
            Choose Session Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
            {sessionPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`transition-all h-full min-h-80 ${selectedPackage === pkg.type ? 'ring-4 ring-primary' : ''}`}
              >
                <div className="h-full flex flex-col">
                  <div className="flex-1">
                    <BookingCard
                      type={pkg.type}
                      price={pkg.price}
                      features={pkg.features}
                      isPopular={pkg.isPopular}
                      onSelect={handlePackageSelect}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Select Date & Time */}
        {selectedPackage && (
          <div className="mb-12 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-lg">2</span>
              Select Date & Time
            </h2>
            <div className="card">
              {/* Date Picker */}
              <div className="mb-6">
                <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="input-field max-w-xs"
                />
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Available Time Slots
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleTimeSelect(slot)}
                      disabled={!slot.available}
                      className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                        selectedTime?.id === slot.id
                          ? 'bg-primary text-white shadow-md'
                          : slot.available
                          ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          : 'bg-gray-50 text-gray-400 cursor-not-allowed line-through'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  * Unavailable slots are shown with strikethrough
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Contact Details */}
        {selectedPackage && selectedTime && (
          <div className="mb-12 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-lg">3</span>
              Confirm Details
            </h2>
            <div className="card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Booking Summary
                    </label>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-1 text-sm">
                      <p><strong>Package:</strong> {selectedPackage}</p>
                      <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {selectedTime.time}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Any specific topics or questions you'd like to discuss..."
                  ></textarea>
                </div>

                <button type="submit" className="w-full btn-primary text-lg">
                  Confirm Booking
                  <svg className="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Info Banner */}
        {!selectedPackage && (
          <div className="card bg-blue-50 border-2 border-blue-200">
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">What to Expect?</h3>
                <ul className="text-blue-900 space-y-1 text-sm">
                  <li>• Detailed discussion of your career assessment report</li>
                  <li>• Personalized stream and course recommendations</li>
                  <li>• College selection guidance and entrance exam preparation tips</li>
                  <li>• Career roadmap creation with actionable steps</li>
                  <li>• Follow-up support via email</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fadeIn">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-600 mb-4">
                Your counselling session has been successfully booked.
              </p>
              <p className="text-sm text-gray-500">
                Confirmation email will be sent shortly. Redirecting to dashboard...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
