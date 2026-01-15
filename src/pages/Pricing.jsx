import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const Pricing = () => {
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.PAYMENT.PRICING);
      setPricing(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pricing:', error);
      setLoading(false);
    }
  };

  const handlePurchase = async (service) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Please login to purchase');
      navigate('/login');
      return;
    }

    // Avoid noisy logs in production
    if (import.meta.env.DEV) {
      console.log('Token found:', token ? 'Yes' : 'No');
      console.log('Token preview:', token ? `${token.substring(0, 20)}...` : 'N/A');
    }

    setSelectedService(service);
    setProcessing(true);

    try {
  // Create payment order
  if (import.meta.env.DEV) console.log('Creating payment order for:', service.service);
      const response = await axios.post(
        API_ENDPOINTS.PAYMENT.CREATE_ORDER,
        { service: service.service },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

  const order = response.data.data;
  if (import.meta.env.DEV) console.log('Order created:', order);

      // In production, integrate with Razorpay/Stripe
      // For now, simulate payment
      const confirmPayment = window.confirm(
        `Purchase ${service.service} for ₹${service.price}?\n\nValidity: ${service.validityText}\n\n(This is a demo - no actual payment will be processed)`
      );

      if (confirmPayment) {
        // Simulate payment verification
        await axios.post(
          API_ENDPOINTS.PAYMENT.VERIFY,
          {
            orderId: order.orderId,
            transactionId: `TXN_${Date.now()}`,
            paymentDetails: { method: 'demo', status: 'success' }
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        alert(`✅ Payment successful! You now have access to ${service.service}`);
        
        // Redirect based on service
        if (service.service === 'college-predictor') {
          navigate('/college-predictor');
        } else if (service.service === 'career-test') {
          navigate('/career-test');
        } else if (service.service === 'counselling-session') {
          navigate('/book-session');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      if (error.response?.status === 401) {
        alert('Your session has expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        alert(error.response?.data?.message || 'Payment failed. Please try again.');
      }
    } finally {
      setProcessing(false);
      setSelectedService(null);
    }
  };

  const serviceInfo = {
    'career-test': {
      title: 'Career Assessment Test',
      description: 'Comprehensive psychometric test to discover your ideal career path',
      features: [
        '7-section assessment test',
        'Aptitude, Interest, Personality analysis',
        'Detailed career report',
        'Strengths & weaknesses analysis',
        'Career recommendations'
      ],
      icon: '📊'
    },
    'counselling-session': {
      title: 'Counselling Session',
      description: 'One-on-one session with expert career counsellor',
      features: [
        '30 days validity',
        '45-minute personal session',
        'Expert career guidance',
        'College selection advice',
        'Stream selection help',
        'Career roadmap'
      ],
      icon: '👨‍🏫'
    },
    'college-predictor': {
      title: 'College Predictor',
      description: 'Get accurate college predictions based on your JEE/NEET/CET rank',
      features: [
        'Predict colleges for JEE,NEET&CET',
        'Filter by category, quota, state',
        'Round-wise predictions',
        'Gender-specific cutoffs',
        'High/Medium/Dream categorization'
      ],
      icon: '🎓'
    },
    
    
    'full-access': {
      title: 'Full Access Plan',
      description: 'Complete access to all services',
      features: [
        'College Predictor (unlimited)',
        'Career Assessment Test',
        'One Counselling Session',
        'Priority support',
        '30 days validity'
      ],
      icon: '⭐',
      badge: 'BEST VALUE'
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading pricing...</div>
      </div>
    );
  }

  // Desired display order for plans
  const desiredOrder = ['career-test', 'counselling-session', 'college-predictor', 'full-access'];
  const orderedPricing = [];
  desiredOrder.forEach((key) => {
    const it = pricing.find((p) => p.service === key);
    if (it) orderedPricing.push(it);
  });
  const remaining = pricing.filter((p) => !desiredOrder.includes(p.service));
  const displayPricing = [...orderedPricing, ...remaining];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600">Invest in your future. Get expert guidance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayPricing.map((item) => {
            const info = serviceInfo[item.service];
            return (
              <div
                key={item.service}
                className={`bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300 ${
                  item.service === 'full-access' ? 'ring-4 ring-blue-500' : ''
                }`}
              >
                {info.badge && (
                  <div className="bg-blue-900 text-white text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                    {info.badge}
                  </div>
                )}

                <div className="text-6xl mb-4">{info.icon}</div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{info.title}</h3>
                <p className="text-gray-600 mb-4">{info.description}</p>

                <div className="mb-6">
                  <div className="flex items-end gap-2">
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="text-lg text-gray-400 line-through">₹{item.originalPrice}</span>
                    )}
                    <span className="text-4xl font-bold text-blue-600">₹{item.price}</span>
                  </div>
                  <span className="text-gray-500 ml-2">/ {item.validityText}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {info.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePurchase(item)}
                  disabled={processing && selectedService?.service === item.service}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    item.service === 'full-access'
                      ? 'bg-blue-900 hover:bg-blue-900 text-white'
                      : 'bg-blue-900 hover:bg-blue-900 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {processing && selectedService?.service === item.service
                    ? 'Processing...'
                    : 'Purchase Now'}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p className="mb-2">💳 Secure payments powered by Razorpay</p>
          <p className="text-sm">All payments are encrypted and secure. Money-back guarantee.</p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
