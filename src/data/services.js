// Services offered by the platform
export const services = [
  {
    id: 1,
    icon: '🧠',
    title: 'Career Counselling',
    description: 'Career Guidance after 10th & 12th \n  Interest, Aptitude & Ability analysis\n\nStream and Course selection',
  },
  {
    id: 2,
    icon: '👨‍🏫',
    title: 'Aptitude / Psychometric Test',
    description: 'Scientific Career Assessment\nStrength & Weakness analysis\nPersonalized Career report',
  },
  {
    id: 3,
    icon: '📊',
    title: 'Admission Guidance',
    description: 'CET / JEE / NEET counselling\nCollege shortlisting\nCourse & branch selection',
  },
  {
    id: 4,
    icon: '🎯',
    title: 'CAP Round Support',
    description: 'CAP round strategy\nOption form filling\nCollege preference guidance',
  },
  {
    id: 5,
    icon: '🏆',
    title: 'College Selection',
    description: 'Engineering, Medical, Pharmacy & other courses\nGovernment & private colleges\nROI-based college selection',
  },
  
]


// How it works steps
export const  howItWorksSteps = [
  {
    id: 1,
    title: 'Initial Discussion',
    description: 'Understand student’s background, marks & interests',
  },
  {
    id: 2,
    title: 'Career Assessment',
    description: 'Aptitude & interest-based evaluation',
    
  },
  {
    id: 3,
    title: 'Career Counselling Session',
    description: 'One-to-one guidance with expert counsellor',
  },
  {
    id: 4,
    title: 'Career Roadmap',
    description: 'Clear plan for course, college & future growth',
  },
  {
    id: 5,
    title: 'Admission Support',
    description: 'CAP rounds, forms & final admission guidance',
  },
]

// Testimonials
export const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    grade: 'Class 10th Student',
    image: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'The career test helped me understand my strengths. I was confused between Science and Commerce, but now I am confident about choosing PCM!',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    grade: 'Class 12th Student',
    image: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
    text: 'The counselling session was super helpful. The counsellor explained all career options in detail and helped me choose the right engineering branch.',
  },
  {
    id: 3,
    name: 'Anjali Patel',
    grade: 'Class 12th Student',
    image: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    text: 'I was worried about my future after 12th. This platform gave me clarity on which courses to pursue and which colleges to target. Highly recommended!',
  },
]

// Counselling session packages
export const sessionPackages = [
  {
    id: 1,
    type: 'Online Session',
    price: '999',
    features: [
      '45-minute video call',
      'Career assessment review',
      'Stream selection guidance',
      'Q&A session',
      'Follow-up email support',
    ],
    isPopular: true,
  },
  {
    id: 2,
    type: 'Offline Session',
    price: '1499',
    features: [
      '1-hour in-person meeting',
      'Detailed career assessment',
      'Parent consultation included',
      'Physical report handover',
      'College visit planning',
    ],
    isPopular: false,
  },
]

// Time slots for booking
export const timeSlots = [
  { id: 1, time: '10:00 AM', available: true },
  { id: 2, time: '11:00 AM', available: true },
  { id: 3, time: '12:00 PM', available: false },
  { id: 4, time: '02:00 PM', available: true },
  { id: 5, time: '03:00 PM', available: true },
  { id: 6, time: '04:00 PM', available: true },
  { id: 7, time: '05:00 PM', available: false },
  { id: 8, time: '06:00 PM', available: true },
]
