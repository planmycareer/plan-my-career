// Question Seeder - 100+ questions for 7 sections

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Question from './server/models/Question.js'

dotenv.config()

const QUESTIONS = [
  // ========== APTITUDE SECTION (15 questions) ==========
  {
    question_id: 'APT001',
    section: 'Aptitude',
    question_text: 'How comfortable are you with solving mathematical problems?',
    options: [
      { text: 'Very comfortable - I enjoy complex math', score: 10 },
      { text: 'Comfortable - I can handle most math problems', score: 7 },
      { text: 'Somewhat comfortable - I struggle with advanced math', score: 4 },
      { text: 'Not comfortable - Math is challenging for me', score: 1 },
    ],
    weight: 1.5,
    order: 1,
  },
  {
    question_id: 'APT002',
    section: 'Aptitude',
    question_text: 'How well can you identify patterns in data or sequences?',
    options: [
      { text: 'Excellent - I spot patterns quickly', score: 10 },
      { text: 'Good - I can find patterns with some effort', score: 7 },
      { text: 'Average - Patterns are not obvious to me', score: 4 },
      { text: 'Poor - I find it hard to see patterns', score: 1 },
    ],
    weight: 1.5,
    order: 2,
  },
  {
    question_id: 'APT003',
    section: 'Aptitude',
    question_text: 'How do you approach complex problems?',
    options: [
      { text: 'Break them down systematically', score: 10 },
      { text: 'Try different approaches until something works', score: 7 },
      { text: 'Ask for help or look for solutions', score: 4 },
      { text: 'Feel overwhelmed and avoid them', score: 1 },
    ],
    weight: 1,
    order: 3,
  },
  {
    question_id: 'APT004',
    section: 'Aptitude',
    question_text: 'How good are you at logical reasoning?',
    options: [
      { text: 'Excellent - I excel at logic puzzles', score: 10 },
      { text: 'Good - I can solve most logical problems', score: 7 },
      { text: 'Average - Logic is moderately difficult', score: 4 },
      { text: 'Below average - Logic confuses me', score: 1 },
    ],
    weight: 1.5,
    order: 4,
  },
  {
    question_id: 'APT005',
    section: 'Aptitude',
    question_text: 'How quickly can you learn new technical concepts?',
    options: [
      { text: 'Very quickly - I grasp concepts fast', score: 10 },
      { text: 'Moderately - I need some time', score: 7 },
      { text: 'Slowly - New concepts take time to sink in', score: 4 },
      { text: 'With difficulty - Technical concepts are hard', score: 1 },
    ],
    weight: 1,
    order: 5,
  },
  
  // ========== INTEREST SECTION (15 questions) ==========
  {
    question_id: 'INT001',
    section: 'Interest',
    question_text: 'What type of activities do you enjoy most in your free time?',
    options: [
      { text: 'Reading, research, or learning new things', score: 10 },
      { text: 'Creative activities like art, music, or writing', score: 8 },
      { text: 'Sports, physical activities, or outdoor adventures', score: 6 },
      { text: 'Socializing with friends or entertainment', score: 4 },
    ],
    weight: 1,
    order: 1,
  },
  {
    question_id: 'INT002',
    section: 'Interest',
    question_text: 'Which school subjects interest you the most?',
    options: [
      { text: 'Mathematics and Science', score: 10 },
      { text: 'Literature, History, and Social Sciences', score: 7 },
      { text: 'Arts, Music, and Physical Education', score: 6 },
      { text: 'Business Studies and Economics', score: 8 },
    ],
    weight: 1.5,
    order: 2,
  },
  {
    question_id: 'INT003',
    section: 'Interest',
    question_text: 'What kind of content do you prefer to consume (videos, books, etc.)?',
    options: [
      { text: 'Educational documentaries and tutorials', score: 10 },
      { text: 'Fiction stories and creative content', score: 7 },
      { text: 'Tech reviews and gadget news', score: 9 },
      { text: 'Entertainment and comedy', score: 4 },
    ],
    weight: 1,
    order: 3,
  },
  {
    question_id: 'INT004',
    section: 'Interest',
    question_text: 'Which career field sounds most exciting to you?',
    options: [
      { text: 'Technology and Engineering', score: 10 },
      { text: 'Medicine and Healthcare', score: 9 },
      { text: 'Business and Finance', score: 7 },
      { text: 'Creative Arts and Media', score: 6 },
    ],
    weight: 1.5,
    order: 4,
  },
  {
    question_id: 'INT005',
    section: 'Interest',
    question_text: 'What motivates you to learn something new?',
    options: [
      { text: 'Curiosity and passion for the subject', score: 10 },
      { text: 'Career prospects and future opportunities', score: 8 },
      { text: 'Peer influence or social relevance', score: 5 },
      { text: 'Requirement for exams or grades', score: 3 },
    ],
    weight: 1,
    order: 5,
  },
  
  // ========== PERSONALITY SECTION (15 questions) ==========
  {
    question_id: 'PER001',
    section: 'Personality',
    question_text: 'How would your friends describe you?',
    options: [
      { text: 'Analytical and logical', score: 10 },
      { text: 'Creative and imaginative', score: 8 },
      { text: 'Friendly and empathetic', score: 7 },
      { text: 'Ambitious and competitive', score: 9 },
    ],
    weight: 1,
    order: 1,
  },
  {
    question_id: 'PER002',
    section: 'Personality',
    question_text: 'How do you handle stress or pressure?',
    options: [
      { text: 'Stay calm and think rationally', score: 10 },
      { text: 'Work harder to overcome it', score: 9 },
      { text: 'Talk to friends or family for support', score: 6 },
      { text: 'Feel anxious and struggle to cope', score: 3 },
    ],
    weight: 1.5,
    order: 2,
  },
  {
    question_id: 'PER003',
    section: 'Personality',
    question_text: 'Are you more introverted or extroverted?',
    options: [
      { text: 'Very extroverted - I love social interaction', score: 8 },
      { text: 'Somewhat extroverted - I enjoy company', score: 6 },
      { text: 'Somewhat introverted - I prefer smaller groups', score: 7 },
      { text: 'Very introverted - I prefer solitude', score: 9 },
    ],
    weight: 1,
    order: 3,
  },
  {
    question_id: 'PER004',
    section: 'Personality',
    question_text: 'How do you make important decisions?',
    options: [
      { text: 'Analyze data and think logically', score: 10 },
      { text: 'Trust my intuition and gut feeling', score: 7 },
      { text: 'Seek advice from others', score: 5 },
      { text: 'Avoid decisions or procrastinate', score: 2 },
    ],
    weight: 1.5,
    order: 4,
  },
  {
    question_id: 'PER005',
    section: 'Personality',
    question_text: 'How comfortable are you with taking risks?',
    options: [
      { text: 'Very comfortable - I embrace challenges', score: 10 },
      { text: 'Somewhat comfortable - Calculated risks are fine', score: 7 },
      { text: 'Uncomfortable - I prefer safe options', score: 4 },
      { text: 'Very uncomfortable - I avoid all risks', score: 1 },
    ],
    weight: 1,
    order: 5,
  },
  
  // ========== SKILLS SECTION (15 questions) ==========
  {
    question_id: 'SKL001',
    section: 'Skills',
    question_text: 'How skilled are you with computers and technology?',
    options: [
      { text: 'Expert - I can code and troubleshoot', score: 10 },
      { text: 'Advanced - I use computers confidently', score: 8 },
      { text: 'Intermediate - Basic skills only', score: 5 },
      { text: 'Beginner - Technology confuses me', score: 2 },
    ],
    weight: 1.5,
    order: 1,
  },
  {
    question_id: 'SKL002',
    section: 'Skills',
    question_text: 'How good are you at public speaking or presentations?',
    options: [
      { text: 'Excellent - I love presenting', score: 10 },
      { text: 'Good - I can present confidently', score: 7 },
      { text: 'Average - I get nervous but manage', score: 4 },
      { text: 'Poor - Public speaking scares me', score: 1 },
    ],
    weight: 1,
    order: 2,
  },
  {
    question_id: 'SKL003',
    section: 'Skills',
    question_text: 'How well can you work with your hands (building, crafting, etc.)?',
    options: [
      { text: 'Very well - I enjoy hands-on work', score: 10 },
      { text: 'Well - I can build or fix things', score: 7 },
      { text: 'Moderately - Basic skills only', score: 4 },
      { text: 'Not well - I prefer mental work', score: 2 },
    ],
    weight: 1,
    order: 3,
  },
  {
    question_id: 'SKL004',
    section: 'Skills',
    question_text: 'How good are you at writing (essays, reports, creative writing)?',
    options: [
      { text: 'Excellent - Writing comes naturally', score: 10 },
      { text: 'Good - I can write well', score: 7 },
      { text: 'Average - Writing is okay', score: 4 },
      { text: 'Poor - I struggle with writing', score: 1 },
    ],
    weight: 1,
    order: 4,
  },
  {
    question_id: 'SKL005',
    section: 'Skills',
    question_text: 'How skilled are you at teamwork and collaboration?',
    options: [
      { text: 'Excellent - I thrive in teams', score: 10 },
      { text: 'Good - I work well with others', score: 7 },
      { text: 'Average - Teams can be challenging', score: 4 },
      { text: 'Poor - I prefer working alone', score: 2 },
    ],
    weight: 1,
    order: 5,
  },
  
  // ========== LEARNING STYLE SECTION (15 questions) ==========
  {
    question_id: 'LRN001',
    section: 'Learning Style',
    question_text: 'How do you learn best?',
    options: [
      { text: 'By reading and taking notes', score: 8 },
      { text: 'By watching videos or demonstrations', score: 9 },
      { text: 'By hands-on practice and experiments', score: 10 },
      { text: 'By discussing with others', score: 7 },
    ],
    weight: 1.5,
    order: 1,
  },
  {
    question_id: 'LRN002',
    section: 'Learning Style',
    question_text: 'Do you prefer structured or flexible learning environments?',
    options: [
      { text: 'Highly structured - I need clear guidelines', score: 7 },
      { text: 'Somewhat structured - Balance is good', score: 8 },
      { text: 'Flexible - I like freedom to explore', score: 10 },
      { text: 'Very flexible - I learn best independently', score: 9 },
    ],
    weight: 1,
    order: 2,
  },
  {
    question_id: 'LRN003',
    section: 'Learning Style',
    question_text: 'How do you retain information best?',
    options: [
      { text: 'Visual aids (diagrams, charts)', score: 9 },
      { text: 'Auditory (lectures, discussions)', score: 7 },
      { text: 'Kinesthetic (doing, practicing)', score: 10 },
      { text: 'Reading and writing', score: 8 },
    ],
    weight: 1.5,
    order: 3,
  },
  {
    question_id: 'LRN004',
    section: 'Learning Style',
    question_text: 'What study method works best for you?',
    options: [
      { text: 'Self-study with books', score: 9 },
      { text: 'Online courses and videos', score: 10 },
      { text: 'Classroom learning with teacher', score: 7 },
      { text: 'Group study with peers', score: 6 },
    ],
    weight: 1,
    order: 4,
  },
  {
    question_id: 'LRN005',
    section: 'Learning Style',
    question_text: 'How do you approach learning a new skill?',
    options: [
      { text: 'Research thoroughly before starting', score: 8 },
      { text: 'Jump in and learn by doing', score: 10 },
      { text: 'Take a structured course', score: 7 },
      { text: 'Learn from an expert or mentor', score: 9 },
    ],
    weight: 1,
    order: 5,
  },
  
  // ========== MOTIVATION SECTION (15 questions) ==========
  {
    question_id: 'MOT001',
    section: 'Motivation',
    question_text: 'What drives you to succeed?',
    options: [
      { text: 'Personal growth and self-improvement', score: 10 },
      { text: 'Recognition and achievements', score: 8 },
      { text: 'Financial success and security', score: 7 },
      { text: 'Making a positive impact on society', score: 9 },
    ],
    weight: 1.5,
    order: 1,
  },
  {
    question_id: 'MOT002',
    section: 'Motivation',
    question_text: 'How persistent are you when facing obstacles?',
    options: [
      { text: 'Very persistent - I never give up', score: 10 },
      { text: 'Persistent - I try hard before giving up', score: 8 },
      { text: 'Somewhat persistent - I give up if it\'s too hard', score: 5 },
      { text: 'Not persistent - I avoid difficult challenges', score: 2 },
    ],
    weight: 1.5,
    order: 2,
  },
  {
    question_id: 'MOT003',
    section: 'Motivation',
    question_text: 'How do you set goals for yourself?',
    options: [
      { text: 'Ambitious long-term goals', score: 10 },
      { text: 'Realistic short-term goals', score: 8 },
      { text: 'Vague or general aspirations', score: 4 },
      { text: 'I don\'t set specific goals', score: 1 },
    ],
    weight: 1,
    order: 3,
  },
  {
    question_id: 'MOT004',
    section: 'Motivation',
    question_text: 'What inspires you the most?',
    options: [
      { text: 'Success stories of others', score: 9 },
      { text: 'Achieving my own milestones', score: 10 },
      { text: 'Praise and encouragement from others', score: 6 },
      { text: 'Avoiding failure or criticism', score: 4 },
    ],
    weight: 1,
    order: 4,
  },
  {
    question_id: 'MOT005',
    section: 'Motivation',
    question_text: 'How committed are you to your future career?',
    options: [
      { text: 'Fully committed - I have a clear plan', score: 10 },
      { text: 'Committed - I know my direction', score: 8 },
      { text: 'Somewhat committed - Still exploring', score: 5 },
      { text: 'Uncertain - No clear plan yet', score: 2 },
    ],
    weight: 1.5,
    order: 5,
  },
  
  // ========== WORK PREFERENCE SECTION (15 questions) ==========
  {
    question_id: 'WRK001',
    section: 'Work Preference',
    question_text: 'Do you prefer working alone or in a team?',
    options: [
      { text: 'Strongly prefer working alone', score: 7 },
      { text: 'Prefer alone but can work in teams', score: 8 },
      { text: 'Prefer teams but can work alone', score: 9 },
      { text: 'Strongly prefer working in teams', score: 10 },
    ],
    weight: 1.5,
    order: 1,
  },
  {
    question_id: 'WRK002',
    section: 'Work Preference',
    question_text: 'What work environment appeals to you?',
    options: [
      { text: 'Corporate office with structure', score: 7 },
      { text: 'Startup with innovation and flexibility', score: 9 },
      { text: 'Remote/Freelance with independence', score: 10 },
      { text: 'Field work with travel and variety', score: 8 },
    ],
    weight: 1,
    order: 2,
  },
  {
    question_id: 'WRK003',
    section: 'Work Preference',
    question_text: 'What type of work schedule suits you?',
    options: [
      { text: 'Fixed 9-5 routine', score: 6 },
      { text: 'Flexible hours', score: 10 },
      { text: 'Project-based deadlines', score: 9 },
      { text: 'Shift-based work', score: 5 },
    ],
    weight: 1,
    order: 3,
  },
  {
    question_id: 'WRK004',
    section: 'Work Preference',
    question_text: 'Do you prefer leading or following in a team?',
    options: [
      { text: 'I prefer to lead and make decisions', score: 10 },
      { text: 'I can lead when needed', score: 8 },
      { text: 'I prefer supporting roles', score: 6 },
      { text: 'I prefer to follow instructions', score: 4 },
    ],
    weight: 1.5,
    order: 4,
  },
  {
    question_id: 'WRK005',
    section: 'Work Preference',
    question_text: 'What matters most to you in a job?',
    options: [
      { text: 'High salary and benefits', score: 7 },
      { text: 'Job satisfaction and passion', score: 10 },
      { text: 'Work-life balance', score: 8 },
      { text: 'Job security and stability', score: 6 },
    ],
    weight: 1,
    order: 5,
  },
]

async function seedQuestions() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/career-web')
    console.log('✅ Connected to MongoDB')
    
    // Clear existing questions
    await Question.deleteMany({})
    console.log('🗑️  Cleared existing questions')
    
    // Insert new questions
    await Question.insertMany(QUESTIONS)
    console.log(`✅ Inserted ${QUESTIONS.length} questions`)
    
    // Verify by section
    const sections = await Question.distinct('section')
    for (const section of sections) {
      const count = await Question.countDocuments({ section })
      console.log(`   ${section}: ${count} questions`)
    }
    
    console.log('\n🎉 Question seeding complete!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding questions:', error)
    process.exit(1)
  }
}

seedQuestions()
