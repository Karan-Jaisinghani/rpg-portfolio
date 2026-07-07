export interface HeroAttribute {
  name: string;
  value: number;
  max: number;
}

export interface Quest {
  id: string;
  type: 'Epic Quest' | 'Side Quest';
  title: string;
  category: 'Developer Projects' | 'Web Apps' | 'Other';
  description: string;
  difficulty: number; // 1 to 5 stars
  status: 'COMPLETED' | 'IN PROGRESS' | 'NOT STARTED';
  tags: string[];
  challenges: string;
  lessonsLearned: string;
  githubUrl: string;
  demoUrl: string;
  imageUrl?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Languages' | 'Development' | 'Developer Tools' | 'Other';
  level: 'Novice' | 'Intermediate' | 'Advanced' | 'Expert';
  xpPercent: number; // For rendering visual bar
  description: string;
  projects: string[]; // List of project titles using this skill
  icon: string; // Lucide icon name
  equipped: boolean;
}

export interface JourneyMilestone {
  id: string;
  title: string;
  description: string;
  year: string;
  coordinates: { x: number; y: number }; // Percentage position
  status: 'completed' | 'current' | 'future';
  icon: string;
}

export interface Trophy {
  id: string;
  title: string;
  description: string;
  details: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  glowColor: string; // CSS color or gradient
  certificateUrl?: string; // Optional path to certificate PNG/PDF
}

export interface AcademicCertificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  certificateUrl: string;
}

export interface PortfolioData {
  character: {
    name: string;
    title: string;
    class: string;
    avatarText: string;
    description: string;
    stats: {
      level: number;
      questsCompleted: string;
      xpEarned: number;
      xpNextLevel: number;
      power: string;
    };
    attributes: HeroAttribute[];
  };
  quests: Quest[];
  inventory: SkillItem[];
  journey: JourneyMilestone[];
  achievements: Trophy[];
  certifications: AcademicCertificate[];
  finalBoss: {
    title: string;
    subtitle: string;
    description: string;
    difficulty: number;
    rewards: string[];
    contactLinks: {
      github: string;
      linkedin: string;
      email: string;
      resume: string;
    };
  };
}

export const portfolioData: PortfolioData = {
  character: {
    name: "Karan Jaisinghani",
    title: "Software Developer",
    class: "Dev Crusader",
    avatarText: "KJ",
    description: "A proactive Computer Science Engineering student with a strong enthusiasm for Software Engineering and Systems Development. Proven communicator with hands-on project experience and campus leadership, seeking to apply technical analytical skills and strategic thinking to a professional role.",
    stats: {
      level: 21,
      questsCompleted: "5/5",
      xpEarned: 12450,
      xpNextLevel: 20000,
      power: "S-Tier"
    },
    attributes: [
      { name: "Algorithmic Logic (STR)", value: 92, max: 100 },
      { name: "Software Architecture (DEX)", value: 95, max: 100 },
      { name: "System Design (CON)", value: 86, max: 100 },
      { name: "Public Speaking (CHA)", value: 94, max: 100 },
      { name: "Team Leadership (LDR)", value: 91, max: 100 }
    ]
  },
  quests: [
    {
      id: "movie-rec",
      type: "Epic Quest",
      title: "Movie Recommendation System",
      category: "Developer Projects",
      description: "Fetch movies similar to your favourites in one click. Built a dataset of 10,500 movies using the TMDB API; engineered tag vectors and a similarity matrix to generate personalised recommendations.",
      difficulty: 4,
      status: "COMPLETED",
      tags: ["Python", "Pandas", "Scikit-Learn", "NumPy", "Streamlit", "API Integration"],
      challenges: "Structuring tag vector representation and calculating real-time cosine similarity matrix across a large dataset of 10,500 movies efficiently on low-memory servers.",
      lessonsLearned: "Gained expertise in TF-IDF vectorization, recommendation algorithms, cosine similarity distance formulas, Streamlit deployment, and TMDB API data piping.",
      githubUrl: "https://github.com/Karan-Jaisinghani/movie-recommendation-system",
      demoUrl: "https://github.com/Karan-Jaisinghani/movie-recommendation-system"
    },
    {
      id: "predictive-pulse",
      type: "Epic Quest",
      title: "Predictive Pulse",
      category: "Developer Projects",
      description: "Hypertension Intelligence System for blood pressure stage prediction. Deployed Logistic Regression achieving 100% accuracy on 1,825 patient records with 13 clinical parameters.",
      difficulty: 4,
      status: "COMPLETED",
      tags: ["Python", "Tkinter", "Scikit-learn", "HTML5", "CSS3"],
      challenges: "Selecting optimal feature thresholds for 13 clinical parameters, balancing patient classification stages, and deploying the model to a live production server.",
      lessonsLearned: "Learned regression/classification model tuning, confusion matrix analysis, web backend model wrapping using Tkinter, and production deployment on Render.",
      githubUrl: "https://github.com/Karan-Jaisinghani/Predictive-Pulse-Harnessing-Machine-Learning-for-Blood-Pressure-Analysis",
      demoUrl: "https://predictive-pulse-harnessing-machine.onrender.com"
    },
    {
      id: "ayursutra",
      type: "Side Quest",
      title: "SIH Project - AyurSutra",
      category: "Web Apps",
      description: "Ayurvedic appointment and medicine web platform. Contributed to the Software Systems section; trained and deployed a chatbot improving website navigation and query resolution for users.",
      difficulty: 3,
      status: "COMPLETED",
      tags: ["Python", "NLP", "Chatbots", "Streamlit", "Web Development"],
      challenges: "Training NLP classifiers for user intent recognition, matching symptoms to ayurvedic treatments, and designing a fast chat query response route.",
      lessonsLearned: "Gained experience in NLP corpus building, intent mapping, front-end chat widget integration, and hackathon workflow collaboration.",
      githubUrl: "https://github.com/Dhruv78377/AyurSutra",
      demoUrl: "https://github.com/Dhruv78377/AyurSutra"
    },
    {
      id: "dev-suite",
      type: "Side Quest",
      title: "ML Models",
      category: "Developer Projects",
      description: "A bundle of core Software Development models built for diverse domains, including Rock vs Mine Predictor, Plant Disease Classification, and House Price Predictor.",
      difficulty: 2,
      status: "COMPLETED",
      tags: ["Python", "Scikit-learn", "Classification", "Regression", "Computer Vision"],
      challenges: "Handling multi-spectral crop image inputs for plant disease classification, addressing outlier price peaks in house pricing dataset, and validating mine acoustics.",
      lessonsLearned: "Mastered data normalization, train-test splitting validation metrics, convolutional image features, and linear regression pricing algorithms.",
      githubUrl: "https://github.com/karanjaisinghani",
      demoUrl: "https://github.com/karanjaisinghani"
    }
  ],
  inventory: [
    {
      id: "python",
      name: "Python",
      category: "Development",
      level: "Expert",
      xpPercent: 95,
      description: "The primary tool in my Software Development and scripting toolbox. I write efficient, numerical processing pipelines.",
      projects: ["Movie Recommender System", "Predictive Pulse", "AyurSutra", "Systems & Utilities Suite"],
      icon: "Code2",
      equipped: true
    },
    {
      id: "pandas-numpy",
      name: "Pandas & NumPy",
      category: "Development",
      level: "Expert",
      xpPercent: 92,
      description: "Used heavily for data ingestion, cleaning, transformation, and structural mathematical matrix computations.",
      projects: ["Movie Recommender System", "Predictive Pulse", "Systems & Utilities Suite"],
      icon: "Binary",
      equipped: true
    },
    {
      id: "scikit-learn",
      name: "Scikit-Learn",
      category: "Development",
      level: "Expert",
      xpPercent: 90,
      description: "Applied for core classification, regression, clustering, and dataset preprocessing algorithms.",
      projects: ["Movie Recommender System", "Predictive Pulse", "Systems & Utilities Suite"],
      icon: "Cpu",
      equipped: true
    },
    {
      id: "java",
      name: "Java",
      category: "Languages",
      level: "Advanced",
      xpPercent: 85,
      description: "Object-oriented programming, data structures, and algorithms. Solved 200+ coding questions on LeetCode and GFG.",
      projects: ["DSA Problem Solving"],
      icon: "Coffee",
      equipped: true
    },
    {
      id: "streamlit-tkinter",
      name: "Streamlit & Tkinter",
      category: "Developer Tools",
      level: "Advanced",
      xpPercent: 88,
      description: "Building interactive GUI applications and wrapping software utilities inside clean desktop and web dashboards.",
      projects: ["Predictive Pulse", "Movie Recommender System", "AyurSutra"],
      icon: "Monitor",
      equipped: true
    },
    {
      id: "oops",
      name: "OOPs Concepts",
      category: "Languages",
      level: "Expert",
      xpPercent: 90,
      description: "Strong foundation in Object-Oriented Programming principles including Inheritance, Polymorphism, Encapsulation, and Abstraction.",
      projects: ["DSA Problem Solving"],
      icon: "Shield",
      equipped: true
    },
    {
      id: "sql",
      name: "MySQL",
      category: "Languages",
      level: "Advanced",
      xpPercent: 82,
      description: "Designing structured database schemas, writing complex relational queries, and optimizing table joins.",
      projects: ["AyurSutra"],
      icon: "Database",
      equipped: false
    },
    {
      id: "html-css",
      name: "HTML5 & CSS3",
      category: "Languages",
      level: "Advanced",
      xpPercent: 85,
      description: "Designing beautiful, custom styling grids and markup layers for custom web applications.",
      projects: ["Predictive Pulse"],
      icon: "FileCode",
      equipped: true
    },
    {
      id: "git",
      name: "Git & GitHub",
      category: "Developer Tools",
      level: "Advanced",
      xpPercent: 90,
      description: "Managing project states, branching strategies, collaborative pull requests, and version history.",
      projects: ["All Projects"],
      icon: "GitBranch",
      equipped: true
    }
  ],
  journey: [
    {
      id: "lws-10",
      title: "Secondary Education (CBSE)",
      description: "Completed secondary education at Little World School, Jabalpur, M.P. Secured an outstanding score of 93.16%.",
      year: "2020 - 2021",
      coordinates: { x: 15, y: 80 },
      status: "completed",
      icon: "School"
    },
    {
      id: "lws-12",
      title: "Senior Secondary (CBSE)",
      description: "Completed senior secondary school at Little World School, Jabalpur, M.P. Achieved 85.6% in Science stream.",
      year: "2022 - 2023",
      coordinates: { x: 18, y: 52 },
      status: "completed",
      icon: "School"
    },
    {
      id: "lnct-college",
      title: "B.Tech in CSE - LNCT",
      description: "Began Bachelor of Technology (B.Tech) in Computer Science & Engineering at Lakshmi Narain College of Technology, Bhopal. Current CGPA: 8.22.",
      year: "2023 - 2027",
      coordinates: { x: 25, y: 25 },
      status: "completed",
      icon: "GraduationCap"
    },
    {
      id: "sih-participation",
      title: "SIH Participant (AyurSutra)",
      description: "Participated in Smart India Hackathon (SIH) for project 'AyurSutra', an Ayurvedic medicine platform. Deployed symmetric symptoms chatbot.",
      year: "2025",
      coordinates: { x: 45, y: 38 },
      status: "completed",
      icon: "Code"
    },
    {
      id: "orators-anchor",
      title: "Anchor, Orators Club",
      description: "Selected as club anchor. Hosted 3-4 public events, debating panels, and mentored public speakers, building presentation logic.",
      year: "2025",
      coordinates: { x: 50, y: 70 },
      status: "completed",
      icon: "Mic"
    },
    {
      id: "nec-vp",
      title: "Vice President E-Cell - Rank 34 NEC",
      description: "Elected Vice President of Entrepreneurship Cell. Led team to secure Rank 34 in National Entrepreneurship Challenge, affiliated with IIT Bombay.",
      year: "2025",
      coordinates: { x: 68, y: 80 },
      status: "completed",
      icon: "Trophy"
    },
    {
      id: "orators-lead",
      title: "Event Management Lead",
      description: "Appointed Event Management Lead at Orators Club. Managed campus campaigns, speaker logistics, and promotional timelines.",
      year: "2026",
      coordinates: { x: 78, y: 55 },
      status: "completed",
      icon: "Award"
    },
    {
      id: "next-quest",
      title: "Next Destination",
      description: "Ready for the next epic challenge in Software Engineering and Systems Development. Loading next quest...",
      year: "Future",
      coordinates: { x: 85, y: 30 },
      status: "current",
      icon: "ShieldAlert"
    }
  ],
  achievements: [
    {
      id: "nec-trophy",
      title: "NEC Finalist (Rank 34)",
      description: "National Rank 34, IIT Bombay E-Summit",
      details: "Co-led E-Cell LNCT as Vice President in securing Rank 34 at the National Entrepreneurship Challenge. Validated business plans and pitched to VCs.",
      rarity: "Legendary",
      glowColor: "rgba(234, 179, 8, 0.6)", // Gold glow
      certificateUrl: "/certificates/nec_finalist.png"
    },
    {
      id: "ecell-vp",
      title: "Vice President",
      description: "E-Cell LNCT",
      details: "Awarded Vice President status for leading startup coordination, managing a student team of 40+, and coordinating technical events, workshops, and business plan bootcamps.",
      rarity: "Legendary",
      glowColor: "rgba(234, 179, 8, 0.6)", // Gold glow
      certificateUrl: "/certificates/vp_ecell.png"
    },
    {
      id: "orators-lead-trophy",
      title: "Event Management Lead",
      description: "Orators Club Executive",
      details: "Led campus public speaking events, debates, and speaker recruitment drives. Awarded for leadership, scheduling logistics, and public engagement.",
      rarity: "Epic",
      glowColor: "rgba(168, 85, 247, 0.6)", // Purple glow
      certificateUrl: "/certificates/orators_lead.png"
    },
    {
      id: "leetcode",
      title: "200+ Coding Questions",
      description: "Java Algorithm Solver",
      details: "Solved over 200 coding problems across arrays, trees, stacks, dynamic programming, and binary search on LeetCode and GeeksForGeeks.",
      rarity: "Rare",
      glowColor: "rgba(249, 115, 22, 0.6)", // Orange glow
      certificateUrl: "/certificates/leetcode_solved.png"
    }
  ],
    certifications: [
    {
      id: "apply-ai--analyze-customer-reviews-certificate-iamkaranjaisinghani05-gmail-com-cc75e2e4-67be-43b5-a868-ad1d4f6f6b7c",
      title: "Applied AI: Analyze Customer Reviews",
      issuer: "Cisco",
      date: "2024",
      description: "Verified professional credential in Applied AI: Analyze Customer Reviews issued by Cisco.",
      certificateUrl: "/Certificates/Cisco/Apply_AI-_Analyze_Customer_Reviews_certificate_iamkaranjaisinghani05-gmail-com_cc75e2e4-67be-43b5-a868-ad1d4f6f6b7c.pdf"
    },
    {
      id: "ccna--enterprise-networking--security--and-automation-certificate",
      title: "CCNA Enterprise Networking Security And Automation Certificate",
      issuer: "Cisco",
      date: "2024",
      description: "Verified professional credential in CCNA Enterprise Networking Security And Automation Certificate issued by Cisco.",
      certificateUrl: "/Certificates/Cisco/CCNA-_Enterprise_Networking-_Security-_and_Automation_certificate.pdf"
    },
    {
      id: "ccna--introduction-to-networks-certificate",
      title: "CCNA Introduction To Networks Certificate",
      issuer: "Cisco",
      date: "2024",
      description: "Verified professional credential in CCNA Introduction To Networks Certificate issued by Cisco.",
      certificateUrl: "/Certificates/Cisco/CCNA-_Introduction_to_Networks_certificate.pdf"
    },
    {
      id: "ccna--switching--routing--and-wireless-essentials",
      title: "CCNA Switching Routing And Wireless Essentials",
      issuer: "Cisco",
      date: "2024",
      description: "Verified professional credential in CCNA Switching Routing And Wireless Essentials issued by Cisco.",
      certificateUrl: "/Certificates/Cisco/CCNA-_Switching-_Routing-_and_Wireless_Essentials.pdf"
    },
    {
      id: "data-analytics-essentials-certificate",
      title: "Data Analytics Essentials Certificate",
      issuer: "Cisco",
      date: "2024",
      description: "Verified professional credential in Data Analytics Essentials Certificate issued by Cisco.",
      certificateUrl: "/Certificates/Cisco/Data Analytics Essentials Certificate.pdf"
    },
    {
      id: "english-it-certificate",
      title: "English It Certificate",
      issuer: "Cisco",
      date: "2024",
      description: "Verified professional credential in English It Certificate issued by Cisco.",
      certificateUrl: "/Certificates/Cisco/English_IT_Certificate.pdf"
    },
    {
      id: "intro-to-iot-cisco",
      title: "Intro To IoT Cisco",
      issuer: "Cisco",
      date: "2024",
      description: "Verified professional credential in Intro To IoT Cisco issued by Cisco.",
      certificateUrl: "/Certificates/Cisco/Intro to IOT Cisco.pdf"
    },
    {
      id: "introduction-to-modern-ai-certificate",
      title: "Introduction To Modern Ai Certificate",
      issuer: "Cisco",
      date: "2024",
      description: "Verified professional credential in Introduction To Modern Ai Certificate issued by Cisco.",
      certificateUrl: "/Certificates/Cisco/Introduction to Modern AI certificate.pdf"
    },
    {
      id: "introduction-to-data-science-certificate",
      title: "Introduction To Data Science Certificate",
      issuer: "Cisco",
      date: "2024",
      description: "Verified professional credential in Introduction To Data Science Certificate issued by Cisco.",
      certificateUrl: "/Certificates/Cisco/Introduction_to_Data_Science_certificate.pdf"
    },
    {
      id: "junior-cybersecurity-analyst-career-path-certificate",
      title: "Junior Cybersecurity Analyst Career Path Certificate",
      issuer: "Cisco",
      date: "2024",
      description: "Verified professional credential in Junior Cybersecurity Analyst Career Path Certificate issued by Cisco.",
      certificateUrl: "/Certificates/Cisco/Junior_Cybersecurity_Analyst_Career_Path_certificate.pdf"
    },
    {
      id: "python-essentials-1-certificate",
      title: "Python Essentials 1 Certificate",
      issuer: "Cisco",
      date: "2024",
      description: "Verified professional credential in Python Essentials 1 Certificate issued by Cisco.",
      certificateUrl: "/Certificates/Cisco/Python_Essentials_1_certificate.pdf"
    },
    {
      id: "python-essentials-2-certificate",
      title: "Python Essentials 2 Certificate",
      issuer: "Cisco",
      date: "2024",
      description: "Verified professional credential in Python Essentials 2 Certificate issued by Cisco.",
      certificateUrl: "/Certificates/Cisco/Python_Essentials_2_certificate.pdf"
    },
    {
      id: "ml1certificate",
      title: "Machine Learning Specialization",
      issuer: "Coursera",
      date: "2024",
      description: "Verified professional credential in Machine Learning Specialization issued by Coursera.",
      certificateUrl: "/Certificates/Coursera/Ml1Certificate.pdf"
    },
    {
      id: "agile-scrum-in-practice-certificate",
      title: "Agile Scrum In Practice Certificate",
      issuer: "Infosys Springboard",
      date: "2025",
      description: "Verified professional credential in Agile Scrum In Practice Certificate issued by Infosys VI.",
      certificateUrl: "/Certificates/Infosys VI/Agile Scrum in Practice Certificate.pdf"
    },
    {
      id: "ai-primer-certificate",
      title: "Ai Primer Certificate",
      issuer: "Infosys Springboard",
      date: "2025",
      description: "Verified professional credential in Ai Primer Certificate issued by Infosys VI.",
      certificateUrl: "/Certificates/Infosys VI/AI Primer Certificate.pdf"
    },
    {
      id: "computer-vision-certificate",
      title: "Computer Vision Certificate",
      issuer: "Infosys Springboard",
      date: "2025",
      description: "Verified professional credential in Computer Vision Certificate issued by Infosys VI.",
      certificateUrl: "/Certificates/Infosys VI/Computer Vision Certificate.pdf"
    },
    {
      id: "deep-learning-certificate",
      title: "Deep Learning Certificate",
      issuer: "Infosys Springboard",
      date: "2025",
      description: "Verified professional credential in Deep Learning Certificate issued by Infosys VI.",
      certificateUrl: "/Certificates/Infosys VI/Deep Learning Certificate.pdf"
    },
    {
      id: "gen-models-certificate",
      title: "Gen Models Certificate",
      issuer: "Infosys Springboard",
      date: "2025",
      description: "Verified professional credential in Gen Models Certificate issued by Infosys VI.",
      certificateUrl: "/Certificates/Infosys VI/Gen Models Certificate.pdf"
    },
    {
      id: "generative-ai-unleashing-certificate",
      title: "Generative Ai Unleashing Certificate",
      issuer: "Infosys Springboard",
      date: "2025",
      description: "Verified professional credential in Generative Ai Unleashing Certificate issued by Infosys VI.",
      certificateUrl: "/Certificates/Infosys VI/Generative AI Unleashing Certificate.pdf"
    },
    {
      id: "intro-to-ai-certificate-1",
      title: "Intro To Ai Certificate (1)",
      issuer: "Infosys Springboard",
      date: "2025",
      description: "Verified professional credential in Intro To Ai Certificate (1) issued by Infosys VI.",
      certificateUrl: "/Certificates/Infosys VI/Intro to AI Certificate (1).pdf"
    },
    {
      id: "intro-to-ai-certificate",
      title: "Intro To Ai Certificate",
      issuer: "Infosys Springboard",
      date: "2025",
      description: "Verified professional credential in Intro To Ai Certificate issued by Infosys VI.",
      certificateUrl: "/Certificates/Infosys VI/Intro to AI Certificate.pdf"
    },
    {
      id: "intro-to-dl-certificate",
      title: "Intro To Deep Learning Certificate",
      issuer: "Infosys Springboard",
      date: "2025",
      description: "Verified professional credential in Intro To Deep Learning Certificate issued by Infosys VI.",
      certificateUrl: "/Certificates/Infosys VI/Intro to DL Certificate.pdf"
    },
    {
      id: "intro-to-ds-certificate-1",
      title: "Intro To Data Science Certificate (1)",
      issuer: "Infosys Springboard",
      date: "2025",
      description: "Verified professional credential in Intro To Data Science Certificate (1) issued by Infosys VI.",
      certificateUrl: "/Certificates/Infosys VI/Intro to DS Certificate (1).pdf"
    },
    {
      id: "intro-to-nlp-certificate",
      title: "Intro To NLP Certificate",
      issuer: "Infosys Springboard",
      date: "2025",
      description: "Verified professional credential in Intro To NLP Certificate issued by Infosys VI.",
      certificateUrl: "/Certificates/Infosys VI/Intro to NLP Certificate.pdf"
    },
    {
      id: "intro-to-openai-gpt-models-automation-certificate",
      title: "Intro To OpenAI GPT Models Automation Certificate",
      issuer: "Infosys Springboard",
      date: "2025",
      description: "Verified professional credential in Intro To OpenAI GPT Models Automation Certificate issued by Infosys VI.",
      certificateUrl: "/Certificates/Infosys VI/Intro to OpenAI GPT Models Automation Certificate.pdf"
    },
    {
      id: "intro-to-robotic-process-automation-certificate",
      title: "Intro To Robotic Process Automation Certificate",
      issuer: "Infosys Springboard",
      date: "2025",
      description: "Verified professional credential in Intro To Robotic Process Automation Certificate issued by Infosys VI.",
      certificateUrl: "/Certificates/Infosys VI/Intro to Robotic Process Automation Certificate.pdf"
    },
    {
      id: "openai-generative-pre-trained-transformer-3-certificate",
      title: "OpenAI Generative Pre Trained Transformer 3 Certificate",
      issuer: "Infosys Springboard",
      date: "2025",
      description: "Verified professional credential in OpenAI Generative Pre Trained Transformer 3 Certificate issued by Infosys VI.",
      certificateUrl: "/Certificates/Infosys VI/OpenAI Generative Pre-trained Transformer 3 Certificate.pdf"
    },
    {
      id: "principles-of-gen-ai-certificate",
      title: "Principles Of Gen Ai Certificate",
      issuer: "Infosys Springboard",
      date: "2025",
      description: "Verified professional credential in Principles Of Gen Ai Certificate issued by Infosys VI.",
      certificateUrl: "/Certificates/Infosys VI/Principles of Gen AI Certificate.pdf"
    },
    {
      id: "prompt-engineering-certificate",
      title: "Prompt Engineering Certificate",
      issuer: "Infosys Springboard",
      date: "2025",
      description: "Verified professional credential in Prompt Engineering Certificate issued by Infosys VI.",
      certificateUrl: "/Certificates/Infosys VI/Prompt Engineering Certificate.pdf"
    },
    {
      id: "introduction-to-iot-and-digital-transformation-certificate-nasscom",
      title: "Introduction To IoT And Digital Transformation Certificate Nasscom",
      issuer: "Nasscom",
      date: "2025",
      description: "Verified professional credential in Introduction To IoT And Digital Transformation Certificate Nasscom issued by Nasscom.",
      certificateUrl: "/Certificates/Nasscom/Introduction to IoT and Digital Transformation Certificate NASSCOM.pdf"
    },
    {
      id: "cert-20260224-8064000",
      title: "Wipro Training Completion Certificate",
      issuer: "Wipro",
      date: "2025",
      description: "Verified professional credential in Wipro Training Completion Certificate issued by Wipro.",
      certificateUrl: "/Certificates/Wipro/CERT-20260224-8064000.pdf"
    },
    {
      id: "power-bi-certificate",
      title: "Power BI Certification",
      issuer: "Wipro",
      date: "2025",
      description: "Verified professional credential in Power BI Certification issued by Wipro.",
      certificateUrl: "/Certificates/Wipro/Power Bi Certificate.pdf"
    }
  ],
  finalBoss: {
    title: "The Kingdom Needs A Developer",
    subtitle: "Let's Build Something Legendary Together!",
    description: "I'm always open to new quests, adventures, and full-time/internship roles in Software Development, AI, or Web Development.",
    difficulty: 5,
    rewards: [
      "Dedicated Engineer",
      "Problem Solver",
      "Fast Learner"
    ],
    contactLinks: {
      github: "https://github.com/Karan-Jaisinghani",
      linkedin: "https://www.linkedin.com/in/karan-jaisinghani-ml/",
      email: "mailto:karan.emailme@gmail.com",
      resume: "/resume.pdf"
    }
  }
};
