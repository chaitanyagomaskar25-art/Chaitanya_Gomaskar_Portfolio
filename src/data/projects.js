import Collabsphere from "../assets/Collabsphere.png"
import Feedback_Manager from "../assets/Feedback_Managemer.jpeg"
import Readme_Generator from "../assets/Readme_Generator.jpeg"
import Open_Library from "../assets/Ope _Library.png"
import Agile from "../assets/Agile_Issue_Tracker.jpeg"
import Eccomerce from "../assets/E-commerce.png"

export const projects = [
  {
    id: 1,
    title: 'CollabSphere — Real-Time Developer Collaboration Platform',
    category: 'Full-Stack MERN',
    featured: true,
    tagline: 'Flagship MERN & Gemini Platform',
    description:
      'A full-stack collaboration platform that helps developers discover projects, connect with teammates, and turn ideas into working projects. Features include project discovery, team join requests, real-time messaging, and secure user authentication, bringing essential collaboration tools into one platform.',
    image: Collabsphere,
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT Authentication', 'Google Gemini API', 'Markdown', 'Vercel'],
    githubUrl: 'https://github.com/chaitanyagomaskar25-art/FS_CollabSphere',
    liveDemoUrl: 'https://fs-collab-sphere-mqut.vercel.app/',
    likes: 43,
    views: 310,
    metrics: ['Real-time Chat', 'JWT Auth', 'Gemini AI Assistant', 'MongoDB Aggregation'],
  },
  {
    id: 2,
    title: 'Gemini AI README Generator',
    category: 'AI & APIs',
    featured: true,
    tagline: 'AI Documentation Automation',
    description:
      'Generate professional GitHub README documentation with the power of Google Gemini AI. Simplify project documentation by turning repository information into clear, structured, and developer-friendly Markdown content.',
    image: Readme_Generator,
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Google Gemini API', 'GitHub API', 'Markdown'],
    githubUrl: 'https://github.com/chaitanyagomaskar25-art/Gemini_Powered_Readme_Generator',
    liveDemoUrl: '',
    likes: 29,
    views: 185,
    metrics: ['Gemini 1.5 Pro', 'GitHub API Sync', 'Markdown Parser', 'Full Export'],
  },
  {
    id: 3,
    title: 'Student Feedback Management System',
    category: 'Full-Stack MERN',
    featured: false,
    tagline: 'Academic Feedback Workflow',
    description:
      'A full-stack web application designed to streamline student feedback collection and management. It provides an organized interface for submitting feedback and managing feedback records, with persistent data storage for reliable access.',
    image: Feedback_Manager,
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'REST API', 'Vercel'],
    githubUrl: 'https://github.com/chaitanyagomaskar25-art/Feedback_Manager_FS',
    liveDemoUrl: 'https://feedback-manager-fs-9dcq.vercel.app',
    likes: 35,
    views: 240,
    metrics: ['Full CRUD Ops', 'Mongoose Schemas', 'Role Access', 'Vercel Deployment'],
  },
  {
    id: 4,
    title: 'Open Library — Digital Book Explorer',
    category: 'Frontend & UI',
    featured: false,
    tagline: 'Interactive Catalog Explorer',
    description:
      'Explore a digital library through a clean, user-friendly interface designed to make discovering books easier. Browse book collections, explore titles, and find books through an intuitive catalog experience.',
    image: Open_Library,
    technologies: ['React', 'Tailwind CSS', 'Open Library API', 'Responsive UI', 'Vercel'],
    githubUrl: 'https://github.com/chaitanyagomaskar25-art/Open_Library_Clone',
    liveDemoUrl: 'https://open-library-clone.vercel.app/',
    likes: 19,
    views: 142,
    metrics: ['Open Library API', 'Dynamic Search', 'Debounced Input', 'Zero Lag'],
  },
  {
    id: 5,
    title: 'Agile Issue Tracker',
    category: 'Frontend & UI',
    featured: false,
    tagline: 'Kanban & Workflow Management',
    description:
      'A web application designed to streamline issue tracking and project organization. Manage development tasks, monitor issue statuses, and keep work organized through a centralized interface built for efficient project workflows.',
    image: Agile,
    technologies: ['React', 'Tanstack Query', 'Tailwind CSS', 'State Management'],
    githubUrl: 'https://github.com/chaitanyagomaskar25-art/Agile_Issue_Tracker',
    liveDemoUrl: 'https://agile-issue-tracker-siwx.vercel.app/',
    likes: 23,
    views: 160,
    metrics: ['Tanstack Query Cache', 'Optimistic UI', 'Status Workflow', 'Modular Design'],
  },
  {
    id: 6,
    title: 'Nexus E-commerce',
    category: 'Full-Stack MERN',
    featured: true,
    tagline: 'Full-Featured Capstone Platform',
    description:
      'A full-featured commerce platform with catalog exploration, product filtering, shopping cart state management, and streamlined checkout UX. Developed as an advanced capstone demonstrating enterprise application design.',
    image: Eccomerce,
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tanstack Query', 'Tailwind CSS'],
    githubUrl: 'https://github.com/chaitanyagomaskar25-art/Capstone_Project',
    liveDemoUrl: 'https://capstone-project-five-kappa.vercel.app/login',
    likes: 38,
    views: 290,
    metrics: ['Cart Reducer', 'Auth Flow', 'Filter & Sorting', 'Modern UX'],
  },
];

