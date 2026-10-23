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
    description:
      'A full-stack collaboration platform that helps developers discover projects, connect with teammates, and turn ideas into working projects. Features include project discovery, team join requests, real-time messaging, and secure user authentication, bringing essential collaboration tools into one platform.',
    image: Collabsphere,
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', "JWT Authentication","Google Gemini API", "Markdown", "Vercel"],
    githubUrl: 'https://github.com/chaitanyagomaskar25-art/FS_CollabSphere',
    liveDemoUrl: 'https://fs-collab-sphere-mqut.vercel.app/',
  },
  {
    id: 2,
    title: 'Gemini AI README Generator',
    description:
      'Generate professional GitHub README documentation with the power of Google Gemini AI. Simplify project documentation by turning repository information into clear, structured, and developer-friendly Markdown content.',
    image: Readme_Generator,
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', "Google Gemini API", "GitHub API", "Markdown"],
    githubUrl: 'https://github.com/chaitanyagomaskar25-art/Gemini_Powered_Readme_Generator',
    liveDemoUrl: '',
  },
  {
    id: 3,
    title: 'Student Feedback Management System',
    description:
      'A full-stack web application designed to streamline student feedback collection and management. It provides an organized interface for submitting feedback and managing feedback records, with persistent data storage for reliable access.',
    image: Feedback_Manager,
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', "Vercel"],
    githubUrl: 'https://github.com/chaitanyagomaskar25-art/Feedback_Manager_FS',
    liveDemoUrl: 'https://feedback-manager-fs-9dcq.vercel.app',
  },
  {
    id: 4,
    title: 'Open Library — Digital Book Explorer',
    description:
      'Explore a digital library through a clean, user-friendly interface designed to make discovering books easier. Browse book collections, explore titles, and find books through an intuitive catalog experience.',
    image: Open_Library,
    technologies: ['React',"Tailwind CSS", 'Open Library API',"Responsive UI","Vercel"],
    githubUrl: 'https://github.com/chaitanyagomaskar25-art/Open_Library_Clone',
    liveDemoUrl: 'https://open-library-clone.vercel.app/',
  },
  {
    id: 5,
    title: 'Agile Issue Tracker',
    description:
      'A web application designed to streamline issue tracking and project organization. Manage development tasks, monitor issue statuses, and keep work organized through a centralized interface built for efficient project workflows.',
    image: Agile,
    technologies: ["React", "Tanstack Query", "Tailwind CSS"],
    githubUrl: 'https://github.com/chaitanyagomaskar25-art/Agile_Issue_Tracker',
    liveDemoUrl: 'https://agile-issue-tracker-siwx.vercel.app/',
  },
  {
    id: 6,
    title: 'Nexus E-commerce', 
    description:
      'A web application built to address a practical problem through an intuitive user interface and structured application workflows. Developed as a capstone project, it demonstrates practical software development, application design, and deployment skills.',
    image: Eccomerce,
    technologies: ["React", "Tanstack Query", "Tailwind CSS"],
    githubUrl: 'https://github.com/chaitanyagomaskar25-art/Capstone_Project',
    liveDemoUrl: 'https://capstone-project-five-kappa.vercel.app/login',
  },
  // {
  //   id: 7,
  //   title: 'Gallary App',
  //   description:
  //     'A product catalog with search, filtering, cart functionality, and a checkout flow integrated with a payment gateway.',
  //   image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
  //   technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
  //   githubUrl: 'https://github.com/chaitanyagomaskar25-art/Gallary_App',
  //   liveDemoUrl: '',
  // },
  
];
