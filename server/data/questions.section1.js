// Section 1: Aptitude & Reasoning Questions

export const section1Questions = [
  // NUMERICAL Subsection (10 questions)
  {
    id: 's1_num_1',
    section: 'SECTION_1',
    subsection: 'NUMERICAL',
    question: 'If 5x + 3 = 18, what is the value of x?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1 // index 1 = '3'
  },
  {
    id: 's1_num_2',
    section: 'SECTION_1',
    subsection: 'NUMERICAL',
    question: 'What is 15% of 200?',
    options: ['25', '30', '35', '40'],
    correctAnswer: 1 // 30
  },
  {
    id: 's1_num_3',
    section: 'SECTION_1',
    subsection: 'NUMERICAL',
    question: 'A train travels 120 km in 2 hours. What is its speed?',
    options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'],
    correctAnswer: 1 // 60 km/h
  },
  {
    id: 's1_num_4',
    section: 'SECTION_1',
    subsection: 'NUMERICAL',
    question: 'What is the next number in the sequence: 2, 4, 8, 16, ?',
    options: ['24', '28', '32', '36'],
    correctAnswer: 2 // 32
  },
  {
    id: 's1_num_5',
    section: 'SECTION_1',
    subsection: 'NUMERICAL',
    question: 'If a product costs ₹500 and gets a 20% discount, what is the final price?',
    options: ['₹400', '₹420', '₹450', '₹480'],
    correctAnswer: 0 // ₹400
  },
  {
    id: 's1_num_6',
    section: 'SECTION_1',
    subsection: 'NUMERICAL',
    question: 'What is the square root of 144?',
    options: ['10', '11', '12', '13'],
    correctAnswer: 2 // 12
  },
  {
    id: 's1_num_7',
    section: 'SECTION_1',
    subsection: 'NUMERICAL',
    question: 'If 3 books cost ₹150, how much do 7 books cost?',
    options: ['₹300', '₹325', '₹350', '₹375'],
    correctAnswer: 2 // ₹350
  },
  {
    id: 's1_num_8',
    section: 'SECTION_1',
    subsection: 'NUMERICAL',
    question: 'What is 25% of 80?',
    options: ['15', '20', '25', '30'],
    correctAnswer: 1 // 20
  },
  {
    id: 's1_num_9',
    section: 'SECTION_1',
    subsection: 'NUMERICAL',
    question: 'A rectangle has length 10cm and width 5cm. What is its area?',
    options: ['40 cm²', '45 cm²', '50 cm²', '55 cm²'],
    correctAnswer: 2 // 50 cm²
  },
  {
    id: 's1_num_10',
    section: 'SECTION_1',
    subsection: 'NUMERICAL',
    question: 'If x = 5, what is 3x + 2?',
    options: ['15', '16', '17', '18'],
    correctAnswer: 2 // 17
  },

  // LOGICAL Subsection (10 questions)
  {
    id: 's1_log_1',
    section: 'SECTION_1',
    subsection: 'LOGICAL',
    question: 'All roses are flowers. Some flowers fade quickly. Therefore:',
    options: [
      'All roses fade quickly',
      'Some roses may fade quickly',
      'No roses fade quickly',
      'Cannot be determined'
    ],
    correctAnswer: 1
  },
  {
    id: 's1_log_2',
    section: 'SECTION_1',
    subsection: 'LOGICAL',
    question: 'If A > B and B > C, then:',
    options: ['A < C', 'A = C', 'A > C', 'Cannot determine'],
    correctAnswer: 2
  },
  {
    id: 's1_log_3',
    section: 'SECTION_1',
    subsection: 'LOGICAL',
    question: 'Which word does not belong: Apple, Banana, Carrot, Mango?',
    options: ['Apple', 'Banana', 'Carrot', 'Mango'],
    correctAnswer: 2 // Carrot (vegetable)
  },
  {
    id: 's1_log_4',
    section: 'SECTION_1',
    subsection: 'LOGICAL',
    question: 'If today is Monday, what day will it be 10 days from now?',
    options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    correctAnswer: 3 // Thursday
  },
  {
    id: 's1_log_5',
    section: 'SECTION_1',
    subsection: 'LOGICAL',
    question: 'Complete the analogy: Doctor : Hospital :: Teacher : ?',
    options: ['Student', 'School', 'Book', 'Classroom'],
    correctAnswer: 1 // School
  },
  {
    id: 's1_log_6',
    section: 'SECTION_1',
    subsection: 'LOGICAL',
    question: 'If CODE is written as DPEF, how is MIND written?',
    options: ['NIND', 'MJOE', 'NJOE', 'MINE'],
    correctAnswer: 2 // NJOE
  },
  {
    id: 's1_log_7',
    section: 'SECTION_1',
    subsection: 'LOGICAL',
    question: 'Which number completes the pattern: 1, 4, 9, 16, ?',
    options: ['20', '24', '25', '30'],
    correctAnswer: 2 // 25 (squares)
  },
  {
    id: 's1_log_8',
    section: 'SECTION_1',
    subsection: 'LOGICAL',
    question: 'If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies.',
    options: ['True', 'False', 'Cannot determine', 'Sometimes true'],
    correctAnswer: 0 // True
  },
  {
    id: 's1_log_9',
    section: 'SECTION_1',
    subsection: 'LOGICAL',
    question: 'Find the odd one out: 3, 5, 11, 14, 17, 21',
    options: ['3', '11', '14', '21'],
    correctAnswer: 2 // 14 (not prime)
  },
  {
    id: 's1_log_10',
    section: 'SECTION_1',
    subsection: 'LOGICAL',
    question: 'If P is taller than Q, and Q is taller than R, who is the shortest?',
    options: ['P', 'Q', 'R', 'Cannot determine'],
    correctAnswer: 2 // R
  },

  // VERBAL Subsection (10 questions)
  {
    id: 's1_ver_1',
    section: 'SECTION_1',
    subsection: 'VERBAL',
    question: 'Choose the synonym of "Benevolent":',
    options: ['Cruel', 'Kind', 'Angry', 'Sad'],
    correctAnswer: 1 // Kind
  },
  {
    id: 's1_ver_2',
    section: 'SECTION_1',
    subsection: 'VERBAL',
    question: 'Choose the antonym of "Ancient":',
    options: ['Old', 'Modern', 'Historic', 'Traditional'],
    correctAnswer: 1 // Modern
  },
  {
    id: 's1_ver_3',
    section: 'SECTION_1',
    subsection: 'VERBAL',
    question: 'Complete the sentence: Neither the students __ the teacher was present.',
    options: ['or', 'nor', 'and', 'but'],
    correctAnswer: 1 // nor
  },
  {
    id: 's1_ver_4',
    section: 'SECTION_1',
    subsection: 'VERBAL',
    question: 'What does "Procrastinate" mean?',
    options: ['To delay', 'To hurry', 'To complete', 'To organize'],
    correctAnswer: 0 // To delay
  },
  {
    id: 's1_ver_5',
    section: 'SECTION_1',
    subsection: 'VERBAL',
    question: 'Choose the correctly spelled word:',
    options: ['Accomodate', 'Accommodate', 'Acomodate', 'Acommodate'],
    correctAnswer: 1 // Accommodate
  },
  {
    id: 's1_ver_6',
    section: 'SECTION_1',
    subsection: 'VERBAL',
    question: 'What is the meaning of "Ephemeral"?',
    options: ['Permanent', 'Short-lived', 'Beautiful', 'Expensive'],
    correctAnswer: 1 // Short-lived
  },
  {
    id: 's1_ver_7',
    section: 'SECTION_1',
    subsection: 'VERBAL',
    question: 'Choose the correct phrase: He is good __ mathematics.',
    options: ['in', 'at', 'on', 'with'],
    correctAnswer: 1 // at
  },
  {
    id: 's1_ver_8',
    section: 'SECTION_1',
    subsection: 'VERBAL',
    question: 'What is the plural of "Analysis"?',
    options: ['Analysises', 'Analyses', 'Analysis', 'Analyzis'],
    correctAnswer: 1 // Analyses
  },
  {
    id: 's1_ver_9',
    section: 'SECTION_1',
    subsection: 'VERBAL',
    question: 'Choose the synonym of "Ambiguous":',
    options: ['Clear', 'Vague', 'Obvious', 'Simple'],
    correctAnswer: 1 // Vague
  },
  {
    id: 's1_ver_10',
    section: 'SECTION_1',
    subsection: 'VERBAL',
    question: 'Identify the figure of speech: "The classroom was a zoo."',
    options: ['Simile', 'Metaphor', 'Personification', 'Hyperbole'],
    correctAnswer: 1 // Metaphor
  }
];
