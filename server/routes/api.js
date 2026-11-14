import express from 'express';
import {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact
} from '../controllers/contactController.js';
import {
  getProjects,
  getProjectById,
  likeProject,
  viewProject
} from '../controllers/projectController.js';
import {
  getProfile,
  getSkills,
  getCertificates,
  getEducation,
  getTestimonials,
  submitTestimonial,
  getAnalytics,
  trackPageView,
  getHealth
} from '../controllers/dataController.js';

const router = express.Router();

// Health
router.get('/health', getHealth);

// Profile
router.get('/profile', getProfile);

// Projects
router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.post('/projects/:id/like', likeProject);
router.post('/projects/:id/view', viewProject);

// Skills, Certificates, Education
router.get('/skills', getSkills);
router.get('/certificates', getCertificates);
router.get('/education', getEducation);

// Testimonials
router.get('/testimonials', getTestimonials);
router.post('/testimonials', submitTestimonial);

// Analytics
router.get('/analytics', getAnalytics);
router.post('/analytics/view', trackPageView);

// Contacts & Admin Messages
router.post('/contact', submitContact);
router.get('/contact/messages', getContacts);
router.patch('/contact/messages/:id', updateContactStatus);
router.delete('/contact/messages/:id', deleteContact);

export default router;
