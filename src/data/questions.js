// Career Test Questions - Multi-step questionnaire
export const questions = [
  // Section 1: Interests & Preferences
  {
    id: 1,
    section: 'Interests',
    question: 'What type of activities do you enjoy the most?',
    options: [
      { value: 'creative', label: 'Creative activities like drawing, writing, designing' },
      { value: 'analytical', label: 'Solving puzzles, math problems, logical challenges' },
      { value: 'social', label: 'Meeting people, organizing events, teamwork' },
      { value: 'technical', label: 'Building things, coding, working with technology' },
    ],
  },
  {
    id: 2,
    section: 'Interests',
    question: 'Which subject do you find most interesting?',
    options: [
      { value: 'science', label: 'Science (Physics, Chemistry, Biology)' },
      { value: 'math', label: 'Mathematics' },
      { value: 'arts', label: 'Arts & Humanities (Literature, History, Psychology)' },
      { value: 'commerce', label: 'Commerce & Economics' },
    ],
  },
  {
    id: 3,
    section: 'Interests',
    question: 'How do you prefer to spend your free time?',
    options: [
      { value: 'reading', label: 'Reading books or articles' },
      { value: 'sports', label: 'Playing sports or outdoor activities' },
      { value: 'tech', label: 'Exploring gadgets or learning new tech' },
      { value: 'creative', label: 'Painting, music, or other creative hobbies' },
    ],
  },

  // Section 2: Skills & Strengths
  {
    id: 4,
    section: 'Skills',
    question: 'What are you naturally good at?',
    options: [
      { value: 'communication', label: 'Communication & public speaking' },
      { value: 'problem_solving', label: 'Problem-solving & critical thinking' },
      { value: 'creativity', label: 'Creative thinking & innovation' },
      { value: 'leadership', label: 'Leadership & team management' },
    ],
  },
  {
    id: 5,
    section: 'Skills',
    question: 'Which skill would you like to develop further?',
    options: [
      { value: 'technical', label: 'Technical skills (coding, engineering)' },
      { value: 'business', label: 'Business & entrepreneurship' },
      { value: 'artistic', label: 'Artistic & design skills' },
      { value: 'scientific', label: 'Scientific research & analysis' },
    ],
  },

  // Section 3: Career Preferences
  {
    id: 6,
    section: 'Career Goals',
    question: 'What kind of work environment appeals to you?',
    options: [
      { value: 'corporate', label: 'Corporate office with structured roles' },
      { value: 'startup', label: 'Dynamic startup environment' },
      { value: 'freelance', label: 'Freelancing or independent work' },
      { value: 'research', label: 'Research labs or academic institutions' },
    ],
  },
  {
    id: 7,
    section: 'Career Goals',
    question: 'What motivates you the most in a career?',
    options: [
      { value: 'money', label: 'High salary & financial stability' },
      { value: 'impact', label: 'Making a positive impact on society' },
      { value: 'creativity', label: 'Freedom to be creative & innovative' },
      { value: 'growth', label: 'Continuous learning & career growth' },
    ],
  },
  {
    id: 8,
    section: 'Career Goals',
    question: 'Which career path sounds most exciting to you?',
    options: [
      { value: 'engineering', label: 'Engineering & Technology' },
      { value: 'medicine', label: 'Medicine & Healthcare' },
      { value: 'business', label: 'Business & Management' },
      { value: 'creative', label: 'Design, Arts & Media' },
    ],
  },

  // Section 4: Personality
  {
    id: 9,
    section: 'Personality',
    question: 'How would your friends describe you?',
    options: [
      { value: 'logical', label: 'Logical & analytical thinker' },
      { value: 'creative', label: 'Creative & imaginative' },
      { value: 'empathetic', label: 'Caring & empathetic' },
      { value: 'ambitious', label: 'Ambitious & goal-oriented' },
    ],
  },
  {
    id: 10,
    section: 'Personality',
    question: 'Do you prefer working alone or in teams?',
    options: [
      { value: 'alone', label: 'I prefer working independently' },
      { value: 'team', label: 'I thrive in team environments' },
      { value: 'both', label: 'I am comfortable with both' },
      { value: 'leading', label: 'I prefer leading teams' },
    ],
  },
]

// Helper function to calculate career recommendations based on answers
export function generateReport(answers) {
  // Simple scoring logic for demo purposes
  const scoreMap = {
    creative: { streams: ['Arts & Design', 'Media & Communication', 'Architecture'], personality: 'Creative Thinker' },
    analytical: { streams: ['Science (PCM)', 'Engineering', 'Data Science'], personality: 'Analytical Mind' },
    social: { streams: ['Psychology', 'Social Work', 'Human Resources'], personality: 'People Person' },
    technical: { streams: ['Computer Science', 'Mechanical Engineering', 'Electronics'], personality: 'Technical Expert' },
  }

  // For demo, return a static report with some variation
  return {
    personalitySummary: 'You demonstrate strong analytical and problem-solving abilities with a keen interest in technology. Your responses indicate a balanced personality with both creative and logical thinking patterns.',
    strengths: ['Critical Thinking', 'Problem Solving', 'Adaptability', 'Technical Aptitude', 'Communication Skills'],
    streams: ['Science (PCM)', 'Computer Science & Engineering', 'Information Technology', 'Electronics Engineering'],
    courses: [
      { name: 'B.Tech in Computer Science', duration: '4 years', type: 'Degree' },
      { name: 'B.Sc in Mathematics', duration: '3 years', type: 'Degree' },
      { name: 'Diploma in Programming', duration: '1 year', type: 'Certification' },
      { name: 'Data Science Bootcamp', duration: '6 months', type: 'Certification' },
    ],
    careerPaths: [
      { title: 'Software Engineer', demand: 'High', salary: '₹6-15 LPA' },
      { title: 'Data Scientist', demand: 'Very High', salary: '₹8-20 LPA' },
      { title: 'Product Manager', demand: 'High', salary: '₹10-25 LPA' },
      { title: 'Research Scientist', demand: 'Medium', salary: '₹7-18 LPA' },
    ],
  }
}
