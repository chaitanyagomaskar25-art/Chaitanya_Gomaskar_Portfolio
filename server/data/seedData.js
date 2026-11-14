export const seedProfile = {
  name: 'Chaitanya Gomaskar',
  role: 'Full-Stack Developer',
  headline: 'Building Robust MERN Stack Solutions & Scalable Web Architectures.',
  introduction:
    "I'm a Full-Stack MERN Developer passionate about architecting responsive, high-performance web applications and resilient backend microservices. I specialize in turning complex product visions into high-impact digital experiences using modern JavaScript, React, Node.js, Express, and MongoDB.",
  about:
    "I am an enthusiastic Full-Stack Developer specializing in the MERN (MongoDB, Express.js, React.js, Node.js) ecosystem. My work bridges the gap between sleek, responsive frontend interfaces and secure, scalable backend architectures.\n\nMy core competencies include RESTful API engineering, database schema modeling with Mongoose, state management, JWT authentication workflows, and modern cloud deployment pipelines. I take pride in crafting clean, maintainable code with strict attention to performance and user accessibility.\n\nI continuously expand my engineering depth through hands-on project creation, participating in software hackathons, and solving algorithmic problems on platforms like CodeChef and freeCodeCamp.",
  email: 'chaitanyagomaskar25@navgurukul.org',
  github: 'https://github.com/chaitanyagomaskar25-art',
  linkedin: 'https://www.linkedin.com/in/chaitanya-gomaskar-347189361/?isSelfProfile=true',
  location: 'Gadchiroli, MH, India',
  availability: 'Available for Full-time Roles & Internships',
  resumePath: '/Chaitanya_Gomaskar_FSDI_Resume.pdf',
  resumeAvailable: true,
  profileImage: 'https://avatars.githubusercontent.com/u/224026900?v=4',
  aboutImage: 'https://avatars.githubusercontent.com/u/224026900?v=4',
  stats: [
    { label: 'Projects Built', value: '10+' },
    { label: 'Technologies', value: '15+' },
    { label: 'Certifications', value: '10+' },
    { label: 'Code Quality', value: '100%' }
  ]
};

export const seedProjects = [
  {
    id: 1,
    title: 'CollabSphere — Real-Time Developer Collaboration Platform',
    category: 'Full-Stack MERN',
    description:
      'A full-stack collaboration platform that helps developers discover projects, connect with teammates, and turn ideas into working projects. Features include project discovery, team join requests, real-time messaging, and secure user authentication, bringing essential collaboration tools into one platform.',
    image: '/assets/Collabsphere.png',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT Authentication', 'Google Gemini API', 'Markdown', 'Vercel'],
    githubUrl: 'https://github.com/chaitanyagomaskar25-art/FS_CollabSphere',
    liveDemoUrl: 'https://fs-collab-sphere-mqut.vercel.app/',
    featured: true,
    likes: 42,
    views: 310,
    order: 1
  },
  {
    id: 2,
    title: 'Gemini AI README Generator',
    category: 'AI & APIs',
    description:
      'Generate professional GitHub README documentation with the power of Google Gemini AI. Simplify project documentation by turning repository information into clear, structured, and developer-friendly Markdown content.',
    image: '/assets/Readme_Generator.jpeg',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Google Gemini API', 'GitHub API', 'Markdown'],
    githubUrl: 'https://github.com/chaitanyagomaskar25-art/Gemini_Powered_Readme_Generator',
    liveDemoUrl: '',
    featured: true,
    likes: 29,
    views: 185,
    order: 2
  },
  {
    id: 3,
    title: 'Student Feedback Management System',
    category: 'Full-Stack MERN',
    description:
      'A full-stack web application designed to streamline student feedback collection and management. It provides an organized interface for submitting feedback and managing feedback records, with persistent data storage for reliable access.',
    image: '/assets/Feedback_Managemer.jpeg',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'REST API', 'Vercel'],
    githubUrl: 'https://github.com/chaitanyagomaskar25-art/Feedback_Manager_FS',
    liveDemoUrl: 'https://feedback-manager-fs-9dcq.vercel.app',
    featured: true,
    likes: 35,
    views: 240,
    order: 3
  },
  {
    id: 4,
    title: 'Open Library — Digital Book Explorer',
    category: 'Frontend & UI',
    description:
      'Explore a digital library through a clean, user-friendly interface designed to make discovering books easier. Browse book collections, explore titles, and find books through an intuitive catalog experience.',
    image: '/assets/Ope _Library.png',
    technologies: ['React', 'Tailwind CSS', 'Open Library API', 'Responsive UI', 'Vercel'],
    githubUrl: 'https://github.com/chaitanyagomaskar25-art/Open_Library_Clone',
    liveDemoUrl: 'https://open-library-clone.vercel.app/',
    featured: false,
    likes: 19,
    views: 142,
    order: 4
  },
  {
    id: 5,
    title: 'Agile Issue Tracker',
    category: 'Frontend & UI',
    description:
      'A web application designed to streamline issue tracking and project organization. Manage development tasks, monitor issue statuses, and keep work organized through a centralized interface built for efficient project workflows.',
    image: '/assets/Agile_Issue_Tracker.jpeg',
    technologies: ['React', 'Tanstack Query', 'Tailwind CSS', 'State Management'],
    githubUrl: 'https://github.com/chaitanyagomaskar25-art/Agile_Issue_Tracker',
    liveDemoUrl: 'https://agile-issue-tracker-siwx.vercel.app/',
    featured: false,
    likes: 23,
    views: 160,
    order: 5
  },
  {
    id: 6,
    title: 'Nexus E-commerce',
    category: 'Full-Stack MERN',
    description:
      'A full-featured commerce platform with catalog exploration, product filtering, shopping cart state management, and streamlined checkout UX. Developed as an advanced capstone demonstrating enterprise application design.',
    image: '/assets/E-commerce.png',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tanstack Query', 'Tailwind CSS'],
    githubUrl: 'https://github.com/chaitanyagomaskar25-art/Capstone_Project',
    liveDemoUrl: 'https://capstone-project-five-kappa.vercel.app/login',
    featured: true,
    likes: 38,
    views: 290,
    order: 6
  }
];

export const seedSkills = [
  {
    title: 'Frontend Development',
    icon: 'Layout',
    skills: [
      { name: 'React.js', level: 95 },
      { name: 'JavaScript (ES6+)', level: 92 },
      { name: 'HTML5 & CSS3', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Responsive Web Design', level: 94 },
      { name: 'State Management', level: 88 },
      { name: 'Web Accessibility (a11y)', level: 85 }
    ]
  },
  {
    title: 'Backend Development',
    icon: 'Server',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 92 },
      { name: 'RESTful API Design', level: 94 },
      { name: 'Authentication (JWT / Sessions)', level: 88 },
      { name: 'Python', level: 82 },
      { name: 'Middleware Architecture', level: 89 }
    ]
  },
  {
    title: 'Databases & ORM',
    icon: 'Database',
    skills: [
      { name: 'MongoDB', level: 92 },
      { name: 'Mongoose ODM', level: 90 },
      { name: 'Data Modeling & Aggregation', level: 86 },
      { name: 'SQL Basics', level: 80 }
    ]
  },
  {
    title: 'Tools & Cloud Deployment',
    icon: 'Wrench',
    skills: [
      { name: 'Git & GitHub', level: 92 },
      { name: 'Postman / Insomnia', level: 90 },
      { name: 'Vercel & Cloud Hosting', level: 88 },
      { name: 'npm / Yarn', level: 90 },
      { name: 'VS Code & Chrome DevTools', level: 95 }
    ]
  },
  {
    title: 'Computer Science & Core',
    icon: 'Brain',
    skills: [
      { name: 'Data Structures & Algorithms', level: 85 },
      { name: 'Algorithmic Problem Solving', level: 88 },
      { name: 'System Debugging & Profiling', level: 90 },
      { name: 'Third-Party API Integration', level: 92 }
    ]
  }
];

export const seedCertificates = [
  {
    id: 1,
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    date: 'June 3, 2026',
    description: 'Chaitanya Hivraj Gomaskar earned the JavaScript Algorithms and Data Structures certification from freeCodeCamp.',
    image: '/assets/JS_Certificate.png',
    verifyUrl: 'https://www.freecodecamp.org/certification/chaitanya25/javascript-algorithms-and-data-structures-v8'
  },
  {
    id: 2,
    title: 'Responsive Web Design',
    issuer: 'Navgurukul',
    date: 'Dec 5, 2025',
    description: 'Chaitanya Hivraj Gomaskar earned a Responsive Web Design certification through the freeCodeCamp Navgurukul platform.',
    image: '/assets/Responsive_Web_Desing.png',
    verifyUrl: 'https://fcc.navgurukul.org/certification/fcc1be88b1e-6bef-434d-b24c-adbf4c0006d8/responsive-web-design'
  },
  {
    id: 3,
    title: 'Linked Lists Milestone',
    issuer: 'CodeChef',
    date: 'March 18, 2026',
    description: 'Chaitanya Gomaskar was awarded a CodeChef certificate for completing Linked Lists mastery.',
    image: 'https://cdn.codechef.com/public_certificates/certi_8450bfc.jpeg',
    verifyUrl: 'https://www.codechef.com/certificates/public/8450bfc'
  },
  {
    id: 4,
    title: '500 Difficulty Rating Milestone',
    issuer: 'CodeChef',
    date: 'March 15, 2026',
    description: 'Chaitanya Gomaskar was awarded a CodeChef certificate for completing the 500 difficulty rating milestone.',
    image: 'https://cdn.codechef.com/public_certificates/certi_cfdb3cc.jpeg',
    verifyUrl: 'https://www.codechef.com/certificates/public/cfdb3cc'
  },
  {
    id: 5,
    title: 'Building Backend APIs with Node.js and Express',
    issuer: 'Edureka / Coursera',
    date: 'September 5, 2026',
    description: "Chaitanya Hivraj Gomaskar verified completion of Building Backend APIs with Node.js and Express.",
    image: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~OT3C7AJ2K0N0/CERTIFICATE_LANDING_PAGE~OT3C7AJ2K0N0.jpeg',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/OT3C7AJ2K0N0'
  },
  {
    id: 6,
    title: 'Introduction to Front-End Development',
    issuer: 'Meta / Coursera',
    date: 'June 13, 2026',
    description: "Chaitanya Hivraj Gomaskar verified completion of Meta's Introduction to Front-End Development.",
    image: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~45DC6P3YMHFN/CERTIFICATE_LANDING_PAGE~45DC6P3YMHFN.jpeg',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/45DC6P3YMHFN'
  },
  {
    id: 7,
    title: 'Introduction to HTML, CSS, & JavaScript',
    issuer: 'IBM / Coursera',
    date: 'June 11, 2026',
    description: "Chaitanya Hivraj Gomaskar verified completion of IBM's Web Fundamentals.",
    image: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~8IHTUR0VVHN0/CERTIFICATE_LANDING_PAGE~8IHTUR0VVHN0.jpeg',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/8IHTUR0VVHN0'
  },
  {
    id: 8,
    title: 'Introduction to CSS3',
    issuer: 'Johns Hopkins University',
    date: 'March 12, 2026',
    description: "Chaitanya Hivraj Gomaskar verified completion of Advanced CSS3 styles and layouts.",
    image: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~O46X31PD82S2/CERTIFICATE_LANDING_PAGE~O46X31PD82S2.jpeg',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/O46X31PD82S2'
  }
];

export const seedEducation = [
  {
    id: 1,
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Eternal University',
    startYear: '2025',
    endYear: '2028',
    location: 'Baru Sahib, HP, India',
    coursework: 'Data Structures, Algorithms, Database Management, Web Development, Operating Systems',
    cgpa: '9.5',
    description:
      'Pursuing software engineering excellence, modern web technologies, scalable systems design, and advanced computer science fundamentals.'
  },
  {
    id: 2,
    degree: 'Higher Secondary (Science)',
    institution: 'Shivaji Science College',
    startYear: '2023',
    endYear: '2025',
    location: 'Gadchiroli, MH, India',
    coursework: 'Mathematics, Physics, Computer Science',
    percentage: '60.7',
    description: 'Pre-university foundational education focused on mathematical analysis and computer logic.'
  }
];

export const seedTestimonials = [
  {
    id: 1,
    name: 'Aarav Sharma',
    role: 'Lead Full-Stack Architect',
    company: 'TechSphere Labs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    text: 'Chaitanya has a natural grasp of both React frontend aesthetics and Express/MongoDB backend architecture. His CollabSphere project demonstrates a profound ability to build real-world collaborative platforms.',
    rating: 5,
    approved: true,
    createdAt: new Date('2026-09-15')
  },
  {
    id: 2,
    name: 'Priya Patel',
    role: 'Senior Software Engineer',
    company: 'DevFlow Network',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    text: 'Working with Chaitanya on full-stack workflows is a breeze. His code is clean, well-commented, and he is relentless when it comes to performance optimization and user experience responsiveness.',
    rating: 5,
    approved: true,
    createdAt: new Date('2026-10-02')
  },
  {
    id: 3,
    name: 'Rohan Deshmukh',
    role: 'Product Lead',
    company: 'InnoStack Solutions',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    text: 'Exceptional dedication to clean UI, robust REST endpoints, and rapid problem-solving. Chaitanya consistently delivers production-quality MERN code well ahead of deadlines.',
    rating: 5,
    approved: true,
    createdAt: new Date('2026-10-28')
  }
];
