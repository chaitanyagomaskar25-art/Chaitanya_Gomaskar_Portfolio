import { isConnectedToMongo, fallbackStore, saveFallbackStore } from '../config/db.js';
import { Testimonial } from '../models/Testimonial.js';
import { Analytics } from '../models/Analytics.js';

export const getProfile = (req, res) => {
  res.json({
    success: true,
    data: fallbackStore.profile
  });
};

export const getSkills = (req, res) => {
  res.json({
    success: true,
    data: fallbackStore.skills
  });
};

export const getCertificates = (req, res) => {
  res.json({
    success: true,
    count: fallbackStore.certificates.length,
    data: fallbackStore.certificates
  });
};

export const getEducation = (req, res) => {
  res.json({
    success: true,
    data: fallbackStore.education
  });
};

export const getTestimonials = async (req, res) => {
  try {
    if (isConnectedToMongo) {
      const items = await Testimonial.find({ approved: true }).sort({ createdAt: -1 });
      return res.json({ success: true, count: items.length, data: items });
    }
    const approved = fallbackStore.testimonials.filter((t) => t.approved);
    res.json({ success: true, count: approved.length, data: approved });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitTestimonial = async (req, res) => {
  try {
    const { name, role, company, text, rating } = req.body;
    if (!name || !text || text.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Name and a recommendation of at least 10 characters are required.'
      });
    }

    const newTestimonial = {
      name: name.trim(),
      role: role ? role.trim() : 'Software Colleague',
      company: company ? company.trim() : 'Tech Community',
      text: text.trim(),
      rating: Number(rating) || 5,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      approved: true, // auto-approve so visitor sees their recommendation immediately
      createdAt: new Date().toISOString()
    };

    if (isConnectedToMongo) {
      const created = await Testimonial.create(newTestimonial);
      return res.status(201).json({ success: true, message: 'Thank you for your recommendation!', data: created });
    } else {
      const item = { id: Date.now(), ...newTestimonial };
      fallbackStore.testimonials.unshift(item);
      saveFallbackStore();
      return res.status(201).json({ success: true, message: 'Thank you for your recommendation!', data: item });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    let stats = { ...fallbackStore.analytics };
    stats.totalProjects = fallbackStore.projects.length;
    stats.totalCertificates = fallbackStore.certificates.length;
    stats.totalSkills = fallbackStore.skills.reduce((acc, cat) => acc + cat.skills.length, 0);
    stats.totalContacts = fallbackStore.contacts.length;
    stats.isDbConnected = isConnectedToMongo;

    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const trackPageView = (req, res) => {
  fallbackStore.analytics.pageViews = (fallbackStore.analytics.pageViews || 0) + 1;
  fallbackStore.analytics.lastVisit = new Date().toISOString();
  saveFallbackStore();
  res.json({ success: true, pageViews: fallbackStore.analytics.pageViews });
};

export const getHealth = (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: {
      provider: 'MERN Stack (MongoDB / Express / React / Node)',
      connected: isConnectedToMongo,
      mode: isConnectedToMongo ? 'MongoDB Live Connection' : 'High-Speed Fallback Store (Active & Synced)'
    },
    environment: process.env.NODE_ENV || 'development'
  });
};
