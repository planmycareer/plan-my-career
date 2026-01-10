import HeroSection from '../components/HeroSection'
import ServiceCard from '../components/ServiceCard'
import { services, howItWorksSteps, testimonials } from '../data/services'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      

      {/* About Us Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Background Logo Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img 
            src="logo1 jpg.jpg" 
            alt="Background Logo" 
            className="w-96 h-96 object-contain opacity-10"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About PlanMyCareer</h2>
          </div>

          {/* Description Box */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16 border-l-4 border-indigo-600">
            <p className="text-xl text-gray-700 leading-relaxed">
              PlanMyCareer is a professional Career Counselling and Admission Guidance Center dedicated to helping students after 10th and 12th make the right Academic and Career Decisions.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mt-4">
              We understand that confusion, peer pressure, and lack of proper information often lead students to choose the wrong career path. Our goal is to eliminate this confusion by providing Expert Counselling, Aptitude-based Analysis, and Step-by-Step Admission Support.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Left: Our Story */}
            <div className="space-y-10">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-18 h-20  rounded-full flex items-center justify-center text-5xl mr-3">
                    🎯  
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-xl text-gray-700 leading-relaxed">
                  At PlanMyCareer, we believe that every student deserves personalized guidance to discover their true potential. 
                  Our mission is to bridge the gap between students' aspirations and their ideal career paths through 
                  data-driven insights, expert counseling, and cutting-edge technology.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-18 h-20  rounded-full flex items-center justify-center text-5xl mr-3">
                    👁️
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-xl text-gray-700 leading-relaxed">
                  To become India's most trusted career guidance platform, helping millions of students make confident, 
                  informed decisions about their future. We envision a world where every student has access to 
                  personalized career counseling, accurate college predictions, and comprehensive assessment tools.
                </p>
              </div>
            </div>

            {/* Right: Key Stats */}
            <div className="space-y-12">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="w-8 h-7 bg-white/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Comprehensive Psychometric Tests</h4>
                      <p className="text-sm opacity-90">7-section scientific assessment covering aptitude, interests, personality, and skills</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">AI-Powered College Predictor</h4>
                      <p className="text-sm opacity-90">Accurate predictions with 50,000+ cutoff data points for JEE & NEET</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Expert Career Counselors</h4>
                      <p className="text-sm opacity-90">One-on-one sessions with experienced professionals</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Personalized Reports</h4>
                      <p className="text-sm opacity-90">Detailed career recommendations based on your unique profile</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Round-wise Predictions</h4>
                      <p className="text-sm opacity-90">Track college cutoffs across multiple counseling rounds</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">50K+</div>
                  <div className="text-gray-600 text-sm">Cutoff Data Points</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">7+</div>
                  <div className="text-gray-600 text-sm">Assessment Sections</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-4xl font-bold text-pink-600 mb-2">100%</div>
                  <div className="text-gray-600 text-sm">Scientific Approach</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-gray-600 text-sm">Platform Access</div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
                  🎓
                </div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">Excellence</h4>
                <p className="text-gray-600 text-sm">Committed to delivering the highest quality guidance and insights</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
                  🤝
                </div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">Trust</h4>
                <p className="text-gray-600 text-sm">Building relationships based on transparency and reliability</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
                  💡
                </div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">Innovation</h4>
                <p className="text-gray-600 text-sm">Leveraging technology to revolutionize career counseling</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
                  ❤️
                </div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">Empathy</h4>
                <p className="text-gray-600 text-sm">Understanding each student's unique journey and challenges</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Logo Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img 
            src="logo1 jpg.jpg" 
            alt="Background Logo" 
            className="w-96 h-96 object-contain opacity-10"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive career guidance solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background Logo Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img 
            src="logo1 jpg.jpg" 
            alt="Background Logo" 
            className="w-96 h-96 object-contain opacity-10"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-3xl text-gray-600 max-w-2xl mx-auto">Our Counselling Process Flow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {howItWorksSteps.map((step, index) => (
              <div key={step.id} className="relative flex flex-col items-center">
                {/* Connector Arrow for desktop */}
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-[60%] w-[80%] h-0.5 z-0">
                    <div className="w-full h-full bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-pink-300"></div>
                  </div>
                )}
                
                <div className="relative bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full h-full min-h-[280px] flex flex-col justify-center z-10">
                  {/* Step Number Badge */}
                  <div className="absolute -top-5 -right-5 w-14 h-14 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg border-4 border-white">
                    {step.id}
                  </div>
                  
                 

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 px-4">{step.title}</h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-base leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link 
              to="/career-test" 
              className="inline-block px-12 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Your Journey Today →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose PlanMyCareer Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Logo Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img 
            src="logo1 jpg.jpg" 
            alt="Background Logo" 
            className="w-[600px] h-[600px] object-contain opacity-10"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose PlanMyCareer?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 border-l-4 border-indigo-600 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Student & Parent-Friendly Counselling</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed ml-14">
                At PlanMyCareer, counselling is designed to be comfortable and understandable for both students and parents. We ensure that parents are actively involved in the decision-making process and clearly explain every option, opportunity, and risk. This creates confidence, trust, and clarity for the entire family while choosing the right career path.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 border-l-4 border-purple-600 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Practical and Honest Guidance</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed ml-14">
                We believe in honest counselling based on real facts, not false promises. Our guidance is completely practical and aligned with students' marks, ranks, interests, and real admission possibilities. We help students make smart and realistic choices that lead to long-term success, not disappointment.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-lg p-8 border-l-4 border-green-600 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Updated Admission Knowledge</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed ml-14">
                Admission processes like CET, JEE, NEET, and CAP rounds change frequently. At PlanMyCareer, we stay updated with the latest admission rules, cut-off trends, college preferences, and government guidelines. This ensures students always receive accurate and up-to-date information.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-8 border-l-4 border-yellow-600 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Personalized Attention</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed ml-14">
                Every student is unique, and so is their career journey. We provide one-to-one personalized counselling instead of generic advice. Each student receives a customized career plan based on their academic background, strengths, interests, and future goals.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl shadow-lg p-8 border-l-4 border-red-600 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Transparent Process</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed ml-14">
                Transparency is at the core of our services. We clearly explain the counselling process, admission steps, timelines, and fee structure. There are no hidden charges or misleading information. Students and parents know exactly what to expect at every stage.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl shadow-lg p-8 border-l-4 border-cyan-600 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Long-Term Career Focus</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed ml-14">
                Our goal is not just to secure admission but to build a strong and successful career foundation. We focus on long-term growth, career stability, job opportunities, and future prospects while suggesting courses and colleges.
              </p>
            </div>
          </div>

          {/* Our Promise */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-12 text-center text-white">
            <div className="text-6xl mb-6">🎯</div>
            <h3 className="text-3xl font-bold mb-4">Our Promise</h3>
            <p className="text-xl leading-relaxed max-w-3xl mx-auto">
              At PlanMyCareer, we don't just guide students towards admission — we help them choose the right direction for a successful future.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Students Say</h2>
            <p className="text-xl text-gray-600">Real stories from students who found their path</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full mr-4 border-2 border-primary"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.grade}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Discover Your Perfect Career?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Take the first step towards your dream career with our AI-powered assessment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/career-test" className="px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
              Take The Career Test
            </Link>
            <Link to="/book-session" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-primary transition-all">
              Book Counselling Session
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
