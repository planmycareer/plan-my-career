// Section 2: Interest Areas - Expert Reports
// Reports for each interest subsection
// Each report corresponds to one of the 5 subsections

export const reports = [
  {
    subsection: 'SCIENCE_TECH',
    title: 'Strong Interest in Science & Technology',
    summary: 'The interest assessment indicates a strong inclination towards Science & Technology. The student shows curiosity for scientific concepts, technology-based systems, and logical exploration. This suggests suitability for science-oriented academic streams and technology-driven career paths. Further guidance should integrate aptitude, academic performance, and personality traits for final decision-making.',
    
    whatItMeans: {
      description: 'A high score in Science & Technology indicates that the student:',
      traits: [
        'Is naturally curious about how things work',
        'Enjoys understanding scientific concepts and technical systems',
        'Likes experimenting, testing, and logical exploration',
        'Prefers concept-based learning over rote memorization',
        'Feels comfortable with technology, machines, or scientific tools'
      ],
      note: 'This interest is intrinsic, meaning the student is likely to stay motivated and engaged in science and technology-related learning environments.'
    },

    learningStyle: {
      description: 'The student is likely to learn best through:',
      methods: [
        'Practical examples and real-world applications',
        'Experiments, demonstrations, and hands-on activities',
        'Logical explanations and cause-effect relationships',
        'Visual aids like diagrams, models, and simulations'
      ],
      note: 'Traditional rote learning methods may be less effective compared to conceptual and application-based learning.'
    },

    strengths: [
      'Curiosity-driven mindset',
      'Problem-solving orientation',
      'Logical and analytical thinking approach',
      'Ability to work patiently on complex tasks',
      'Comfort with structured and technical environments'
    ],

    suitableAcademicStreams: {
      description: 'Based on strong interest in Science & Technology, the following academic paths are recommended (subject to aptitude & academics):',
      highPriority: {
        stream: 'Science Stream',
        options: [
          'Science with Mathematics (PCM)',
          'Science with Biology (PCB), if biology interest also exists'
        ],
        exploration: [
          'Physics, Chemistry, Mathematics / Biology',
          'Core scientific principles and applications'
        ]
      }
    },

    careerPaths: [
      {
        title: 'Engineering & Technology',
        description: 'Design, develop, and innovate in technical fields.',
        options: [
          'Computer Engineering',
          'Mechanical Engineering',
          'Electrical / Electronics Engineering',
          'Civil Engineering',
          'AI, Robotics, and Emerging Technologies'
        ],
        growthPotential: '85-90%',
        averageSalary: '₹6-20 LPA'
      },
      {
        title: 'Information Technology & Computing',
        description: 'Work with software, data, and digital systems.',
        options: [
          'Software Development',
          'Computer Science',
          'Data Science & Analytics',
          'Cyber Security'
        ],
        growthPotential: '90-95%',
        averageSalary: '₹6-25 LPA'
      },
      {
        title: 'Scientific & Research-Based Careers',
        description: 'Conduct research and work in laboratory environments.',
        options: [
          'Research Scientist',
          'Laboratory-based careers',
          'Applied sciences'
        ],
        growthPotential: '70-80%',
        averageSalary: '₹5-18 LPA'
      },
      {
        title: 'Technical & Applied Fields',
        description: 'Work in industrial and technical operations.',
        options: [
          'Industrial technology',
          'Technical operations',
          'Engineering support roles'
        ],
        growthPotential: '75-85%',
        averageSalary: '₹4-15 LPA'
      }
    ],

    recommendations: [
      'Choose Science Stream (PCM or PCB) after 10th for maximum opportunities',
      'Build practical skills through experiments and hands-on projects',
      'Develop strong foundation in Mathematics and core sciences',
      'Explore programming and technical tools early',
      'Balance technical skills with communication abilities',
      'Consider coaching or mentorship for competitive exams (JEE, NEET)',
      'Stay updated with emerging technologies and innovations'
    ],

    developmentAreas: [
      'Enhance communication and soft skills',
      'Develop teamwork and collaboration abilities',
      'Practice explaining technical concepts in simple language',
      'Balance technical focus with expression and presentation',
      'Build interpersonal skills for better career prospects'
    ],

    possibleChallenges: {
      note: 'Students inclined towards Science & Technology may sometimes:',
      challenges: [
        'Ignore communication or soft skills',
        'Focus heavily on concepts and less on expression'
      ],
      recommendation: 'Balanced development of communication skills, teamwork and presentation abilities will enhance long-term career success.'
    }
  },

  {
    subsection: 'COMMERCE_BUSINESS',
    title: 'Strong Interest in Commerce & Business',
    summary: 'The interest assessment reveals a strong inclination towards Commerce & Business. The student demonstrates practical thinking, financial awareness, and an interest in business operations and management-related activities. This suggests suitability for the Commerce stream and business-oriented career pathways. Final recommendations should be made after integrating aptitude, academic performance, and personality assessment results.',
    
    whatItMeans: {
      description: 'A high score in Commerce & Business suggests that the student:',
      traits: [
        'Enjoys understanding how money, markets, and businesses work',
        'Shows curiosity about trade, finance, profits, and decision-making',
        'Likes planning, organizing, and managing activities',
        'Is comfortable with numbers, data, and practical outcomes',
        'Thinks in terms of growth, efficiency, and results'
      ],
      note: 'This reflects a practical, outcome-oriented mindset, well-suited for commercial and managerial environments.'
    },

    learningStyle: {
      description: 'Based on this interest dominance, the student is likely to learn best through:',
      methods: [
        'Real-life examples and case studies',
        'Practical applications rather than pure theory',
        'Discussions on current affairs, business news, and trends',
        'Problem-solving related to money, management, and operations'
      ],
      note: 'The student may prefer application-based and decision-driven learning over abstract or purely theoretical subjects.'
    },

    strengths: [
      'Practical and realistic thinking',
      'Decision-making ability',
      'Financial awareness',
      'Organizational and planning skills',
      'Goal-oriented and result-focused mindset'
    ],

    suitableAcademicStreams: {
      description: 'Recommended Academic Streams (After 10th)',
      topPriority: {
        stream: 'Commerce Stream',
        subjects: [
          'Accountancy',
          'Economics',
          'Business Studies',
          'Mathematics / Statistics (if aptitude supports it)'
        ],
        foundation: [
          'Financial understanding',
          'Business operations',
          'Economic decision-making'
        ]
      }
    },

    careerPaths: [
      {
        title: 'Business & Management Careers',
        description: 'Lead and manage business operations, focusing on growth and efficiency.',
        options: [
          'Business Management',
          'Entrepreneurship',
          'Operations Management',
          'Supply Chain & Logistics'
        ],
        growthPotential: '80-85%',
        averageSalary: '₹5-20 LPA'
      },
      {
        title: 'Finance & Commerce-Oriented Careers',
        description: 'Work in financial planning, accounting, and economic analysis.',
        options: [
          'Chartered Accountant (CA)',
          'Company Secretary (CS)',
          'Cost & Management Accountant (CMA)',
          'Banking & Financial Services'
        ],
        growthPotential: '85-90%',
        averageSalary: '₹6-25 LPA'
      },
      {
        title: 'Corporate & Professional Roles',
        description: 'Work in corporate environments with focus on strategy and growth.',
        options: [
          'Marketing & Sales',
          'Human Resource Management',
          'Business Analytics',
          'Retail & Corporate Management'
        ],
        growthPotential: '75-85%',
        averageSalary: '₹4-18 LPA'
      },
      {
        title: 'Trade & Entrepreneurial Fields',
        description: 'Start and manage your own business ventures.',
        options: [
          'Family Business Management',
          'Startups and Small Enterprises',
          'Trading and Commercial Ventures'
        ],
        growthPotential: '70-90%',
        averageSalary: '₹Variable (High potential)'
      }
    ],

    recommendations: [
      'Choose Commerce Stream after 10th for maximum business opportunities',
      'Focus on Accountancy, Economics, and Business Studies',
      'Consider Mathematics/Statistics if aptitude is strong',
      'Build practical skills through internships and real-world projects',
      'Stay updated with current affairs and business news',
      'Develop leadership and decision-making abilities',
      'Consider professional courses like CA, CS, or CMA after 12th',
      'Balance practical focus with analytical depth'
    ],

    developmentAreas: [
      'Enhance analytical depth beyond practical outcomes',
      'Develop ethical understanding in business contexts',
      'Improve communication and leadership skills',
      'Balance result-focus with conceptual understanding',
      'Work on abstract thinking alongside practical applications'
    ],

    possibleChallenges: {
      note: 'Students with strong Commerce & Business interest may sometimes:',
      challenges: [
        'Focus more on results than concepts',
        'Avoid highly theoretical or abstract subjects'
      ],
      recommendation: 'Balanced development of analytical depth, ethical understanding, and communication & leadership skills will ensure long-term professional growth.'
    }
  },

  {
    subsection: 'ARTS_HUMANITIES',
    title: 'Strong Interest in Arts & Humanities',
    summary: 'The interest assessment indicates a strong inclination towards Arts & Humanities. The student shows interest in language, culture, society, and human behaviour, along with good expressive and reflective abilities. This suggests suitability for the Arts stream and humanities-based career pathways. Final career decisions should be made after integrating aptitude, academic performance, and personality assessment results.',
    
    whatItMeans: {
      description: 'A high score in Arts & Humanities suggests that the student:',
      traits: [
        'Enjoys reading, writing, and expressing ideas',
        'Is interested in history, culture, society, and human values',
        'Likes understanding people, emotions, and social issues',
        'Has a reflective, thoughtful, and empathetic mindset',
        'Prefers subjects involving interpretation, discussion, and creativity'
      ],
      note: 'This shows a people-centric and thought-driven orientation, rather than a purely technical or numerical one.'
    },

    learningStyle: {
      description: 'Students with strong Arts & Humanities interest generally learn best through:',
      methods: [
        'Reading, writing, and discussion-based learning',
        'Storytelling, debates, and open-ended questions',
        'Conceptual understanding rather than fixed answers',
        'Connecting topics to real-life social and cultural contexts'
      ],
      note: 'They usually perform well in subjects that encourage critical thinking, interpretation, and expression.'
    },

    strengths: [
      'Strong communication and expression skills',
      'Empathy and emotional awareness',
      'Critical and independent thinking',
      'Ability to analyse social situations',
      'Interest in people, culture, and ideas'
    ],

    suitableAcademicStreams: {
      description: 'Based on the interest profile, the following academic streams are recommended:',
      topPriority: {
        stream: 'Arts / Humanities Stream',
        subjects: [
          'Languages (English, Marathi, Hindi, Foreign Languages)',
          'History',
          'Political Science',
          'Sociology / Psychology',
          'Geography / Philosophy'
        ],
        options: 'This stream provides a strong base for communication, society, and culture-oriented careers.',
        foundation: 'Strong emphasis on critical thinking, interpretation, and expression',
        exploration: 'Opportunities in journalism, law, civil services, teaching, and social work'
      }
    },

    careerPaths: [
      {
        title: 'Language, Communication & Media',
        description: 'Work in fields involving written and verbal communication, storytelling, and content creation.',
        options: [
          'Journalism',
          'Content Writing',
          'Editing & Publishing',
          'Media & Mass Communication'
        ],
        growthPotential: '75-85%',
        averageSalary: '₹4-15 LPA'
      },
      {
        title: 'Humanities & Social Sciences',
        description: 'Academic and research-oriented careers in understanding human behavior and society.',
        options: [
          'Psychology',
          'Sociology',
          'Political Science',
          'History & Cultural Studies'
        ],
        growthPotential: '70-80%',
        averageSalary: '₹5-18 LPA'
      },
      {
        title: 'Law, Civil Services & Public Policy',
        description: 'Careers focused on justice, governance, and public administration.',
        options: [
          'Law (LLB)',
          'Civil Services (UPSC / State PSC)',
          'Public Administration',
          'Policy Research'
        ],
        growthPotential: '80-90%',
        averageSalary: '₹6-25 LPA'
      },
      {
        title: 'Education & Academics',
        description: 'Teaching, research, and curriculum development in educational institutions.',
        options: [
          'Teaching & Lectureship',
          'Academic Research',
          'Curriculum Development',
          'Educational Administration'
        ],
        growthPotential: '75-85%',
        averageSalary: '₹4-15 LPA'
      },
      {
        title: 'Social & Cultural Fields',
        description: 'Work in community development, social welfare, and cultural preservation.',
        options: [
          'NGOs & Social Organizations',
          'Community Development',
          'Cultural Institutions',
          'Social Work & Counselling'
        ],
        growthPotential: '70-80%',
        averageSalary: '₹3-12 LPA'
      }
    ],

    recommendations: [
      'Focus on developing strong reading and writing habits',
      'Engage in debates, discussions, and public speaking activities',
      'Read widely across literature, current affairs, and social issues',
      'Develop critical thinking through analysis of historical and social events',
      'Consider pursuing additional languages to broaden career opportunities',
      'Participate in essay competitions, MUNs, or literary events',
      'Develop basic analytical and logical skills to complement humanities strength',
      'Build confidence through structured planning and goal-setting'
    ],

    developmentAreas: [
      'Building confidence in technical or numerical subjects',
      'Avoiding overthinking or being overly emotionally influenced',
      'Developing structured problem-solving approaches',
      'Balancing emotional sensitivity with practical decision-making',
      'Improving quantitative and data interpretation skills'
    ],

    possibleChallenges: {
      note: 'Students with Arts & Humanities dominance may sometimes:',
      challenges: [
        'Feel less confident in highly technical or numerical subjects',
        'Be overly influenced by emotions in decision-making'
      ],
      recommendation: 'Developing basic analytical and logical skills, along with confidence and structured planning, will help in building a balanced career profile.'
    }
  },

  {
    subsection: 'CREATIVE',
    title: 'Strong Interest in Creative Fields',
    summary: 'The interest assessment indicates a strong inclination towards Creative Fields. The student demonstrates originality, imagination, and a preference for creative expression and innovation. This suggests suitability for creative and design-oriented academic streams and career paths. Final recommendations should be made after integrating aptitude, academic performance, and personality assessment results.',
    
    whatItMeans: {
      description: 'A high score in Creative Fields suggests that the student:',
      traits: [
        'Enjoys creativity, imagination, and original thinking',
        'Likes expressing ideas through art, design, visuals, writing, or performance',
        'Prefers non-routine and flexible work environments',
        'Is attracted to aesthetics, innovation, and originality',
        'Learns better through hands-on and experiential activities'
      ],
      note: 'This reflects a creative, expressive, and innovation-driven personality.'
    },

    learningStyle: {
      description: 'Students with strong creative interest usually:',
      methods: [
        'Learn best through practice, experimentation, and projects',
        'Prefer visual, audio, or experiential learning methods',
        'Think in ideas, images, concepts, and emotions',
        'Enjoy freedom, flexibility, and variety in tasks'
      ],
      note: 'They may not enjoy highly rigid, repetitive, or purely theoretical learning systems.'
    },

    strengths: [
      'Original and innovative thinking',
      'Strong imagination and visualization skills',
      'Emotional expression and sensitivity',
      'Ability to think differently',
      'Passion-driven motivation'
    ],

    suitableAcademicStreams: {
      description: 'Based on the interest profile, the following academic streams are recommended:',
      topPriority: {
        stream: 'Arts Stream with Creative Focus',
        subjects: [
          'Fine Arts / Applied Arts',
          'Design-oriented subjects',
          'Media Studies',
          'Performing Arts',
          'Optional subjects that encourage creativity and expression'
        ],
        options: 'Exact subject availability depends on the board and institution.',
        foundation: 'Focus on developing creative skills through hands-on practice and portfolio building',
        exploration: 'Opportunities in design, media, entertainment, and creative entrepreneurship'
      }
    },

    careerPaths: [
      {
        title: 'Design & Visual Arts',
        description: 'Create visual solutions and aesthetic designs across various mediums.',
        options: [
          'Graphic Design',
          'Fashion Design',
          'Interior Design',
          'Animation & Multimedia',
          'UI / UX Design'
        ],
        growthPotential: '80-90%',
        averageSalary: '₹4-18 LPA'
      },
      {
        title: 'Media, Entertainment & Communication',
        description: 'Work in dynamic creative industries involving visual storytelling and content creation.',
        options: [
          'Film & Video Production',
          'Photography',
          'Content Creation',
          'Digital Media',
          'Advertising & Branding'
        ],
        growthPotential: '85-95%',
        averageSalary: '₹5-25 LPA'
      },
      {
        title: 'Writing & Creative Expression',
        description: 'Express creativity through written content and storytelling.',
        options: [
          'Creative Writing',
          'Scriptwriting',
          'Blogging',
          'Copywriting'
        ],
        growthPotential: '75-85%',
        averageSalary: '₹4-15 LPA'
      },
      {
        title: 'Performing Arts',
        description: 'Express creativity through live performance and artistic expression.',
        options: [
          'Music',
          'Dance',
          'Theatre & Acting',
          'Voice & Dubbing'
        ],
        growthPotential: '70-80%',
        averageSalary: '₹3-20 LPA (Variable)'
      },
      {
        title: 'Emerging Creative Careers',
        description: 'Explore new-age creative opportunities in digital and innovative spaces.',
        options: [
          'Digital Creator / Influencer',
          'Game Design',
          'Creative Entrepreneurship',
          '3D Modeling & VFX'
        ],
        growthPotential: '90-95%',
        averageSalary: '₹5-30 LPA (Variable)'
      }
    ],

    recommendations: [
      'Build a strong portfolio showcasing creative work',
      'Engage in hands-on projects and experimentation',
      'Practice time management and meet deadlines consistently',
      'Develop basic technical skills relevant to chosen creative field',
      'Stay updated with current trends in design, media, and arts',
      'Balance creative freedom with professional discipline',
      'Learn from feedback and iterate on creative work',
      'Develop basic business and marketing skills for creative entrepreneurship'
    ],

    developmentAreas: [
      'Time management and meeting deadlines',
      'Dealing with strict discipline or rigid structures',
      'Maintaining consistency and motivation in routine tasks',
      'Developing basic analytical and technical skills',
      'Building professional discipline alongside creativity'
    ],

    possibleChallenges: {
      note: 'Creative-oriented students may sometimes:',
      challenges: [
        'Struggle with strict discipline or rigid structures',
        'Lose interest in routine or repetitive tasks',
        'Require motivation for consistency'
      ],
      recommendation: 'Developing time management, basic analytical skills, and professional discipline will help convert creativity into successful and sustainable careers.'
    }
  },

  {
    subsection: 'SOCIAL_HELPING',
    title: 'Strong Interest in Social & Helping Professions',
    summary: 'The interest assessment indicates a strong inclination towards Social & Helping Professions. The student demonstrates empathy, social awareness, and a desire to support and serve others. This suggests suitability for people-oriented academic streams and service-based career pathways. Final career recommendations should be made after integrating aptitude, academic performance, and personality assessment results.',
    
    whatItMeans: {
      description: 'A high score in this area suggests that the student:',
      traits: [
        'Enjoys helping, supporting, or guiding other people',
        'Is sensitive to social issues and human problems',
        'Feels satisfaction in making a positive difference in others\' lives',
        'Values empathy, care, and social responsibility',
        'Is motivated by purpose more than profit'
      ],
      note: 'This reflects a people-centric, compassionate, and service-oriented mindset.'
    },

    learningStyle: {
      description: 'Students with dominant Social & Helping interest typically:',
      methods: [
        'Learn best through interaction and real-life experiences',
        'Prefer practical exposure, fieldwork, and case studies',
        'Are comfortable working with people from diverse backgrounds',
        'Respond well to emotional and social learning environments'
      ],
      note: 'They usually perform better in human-interaction-based and socially meaningful roles rather than isolated or purely technical tasks.'
    },

    strengths: [
      'Empathy and emotional intelligence',
      'Good listening and communication skills',
      'Patience and compassion',
      'Strong sense of responsibility',
      'Desire to contribute to society'
    ],

    suitableAcademicStreams: {
      description: 'Based on the interest profile, the following academic streams are recommended:',
      topPriority: {
        stream: 'Arts Stream with Social Science Focus',
        subjects: [
          'Psychology',
          'Sociology',
          'Political Science',
          'Social Work-related subjects',
          'Human Development / Home Science'
        ],
        options: 'These subjects help build a strong foundation in human behaviour, society, and social systems.',
        foundation: 'Strong emphasis on understanding human behavior, social systems, and community welfare',
        exploration: 'Science stream may also be considered for healthcare-oriented helping professions, depending on aptitude.'
      }
    },

    careerPaths: [
      {
        title: 'Health, Care & Counselling',
        description: 'Work in mental health, counselling, and therapeutic services.',
        options: [
          'Psychologist',
          'Counsellor',
          'Mental Health Professional',
          'Therapist (with required qualifications)'
        ],
        growthPotential: '80-90%',
        averageSalary: '₹4-18 LPA'
      },
      {
        title: 'Healthcare & Support Services',
        description: 'Provide direct healthcare and rehabilitation services to patients.',
        options: [
          'Nursing',
          'Physiotherapy',
          'Occupational Therapy',
          'Community Health Worker'
        ],
        growthPotential: '85-95%',
        averageSalary: '₹3-15 LPA'
      },
      {
        title: 'Social Service & Development',
        description: 'Work in community development, social welfare, and NGO sectors.',
        options: [
          'Social Worker',
          'NGO Professional',
          'Community Development Officer',
          'Rehabilitation Specialist'
        ],
        growthPotential: '75-85%',
        averageSalary: '₹3-12 LPA'
      },
      {
        title: 'Education & Guidance',
        description: 'Teaching, special education, and developmental guidance roles.',
        options: [
          'Teacher',
          'Special Educator',
          'Career Counsellor',
          'Child Development Specialist'
        ],
        growthPotential: '75-85%',
        averageSalary: '₹4-15 LPA'
      },
      {
        title: 'Public Service & Welfare',
        description: 'Government and policy roles focused on social welfare and development.',
        options: [
          'Civil Services (Social Sector roles)',
          'Public Welfare Departments',
          'Policy & Social Research',
          'Human Rights & Advocacy'
        ],
        growthPotential: '80-90%',
        averageSalary: '₹5-20 LPA'
      }
    ],

    recommendations: [
      'Develop strong interpersonal and communication skills',
      'Gain practical exposure through volunteering and fieldwork',
      'Build emotional intelligence and empathy through diverse experiences',
      'Learn stress management and self-care techniques',
      'Understand professional boundaries in helping relationships',
      'Develop active listening and counselling skills',
      'Stay informed about social issues and community needs',
      'Balance emotional involvement with professional objectivity'
    ],

    developmentAreas: [
      'Managing emotional over-involvement with clients/beneficiaries',
      'Dealing with stress from others\' problems',
      'Maintaining personal boundaries and self-care',
      'Balancing empathy with professional detachment',
      'Building resilience against emotional burnout'
    ],

    possibleChallenges: {
      note: 'Such students may sometimes:',
      challenges: [
        'Become emotionally over-involved',
        'Feel stressed by others\' problems',
        'Ignore personal boundaries or self-care'
      ],
      recommendation: 'Developing emotional balance, stress management skills, and professional boundaries is essential for long-term success and well-being in helping professions.'
    }
  }
];

