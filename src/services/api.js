import { profile as localProfile, aboutHighlights as localHighlights } from '@/data/profile';
import { projects as localProjects } from '@/data/projects';
import { skillCategories as localSkills } from '@/data/skills';
import { certificates as localCertificates } from '@/data/certificates';
import { education as localEducation } from '@/data/education';

const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json();
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    console.warn(`[API] Network error requesting ${endpoint}:`, err.message);
    return { ok: false, error: err.message, data: null };
  }
}

export const api = {
  // Health
  async getHealth() {
    const res = await request('/health');
    if (res.ok && res.data) return res.data;
    return {
      status: 'offline',
      database: { connected: false, mode: 'Frontend Standalone Mode' }
    };
  },

  // Profile
  async getProfile() {
    const res = await request('/profile');
    if (res.ok && res.data?.data) return res.data.data;
    return localProfile;
  },

  // Projects
  async getProjects(params = {}) {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.featured) query.append('featured', 'true');

    const res = await request(`/projects?${query.toString()}`);
    if (res.ok && res.data?.data) return res.data.data;

    // Fallback to local
    let list = [...localProjects];
    if (params.category && params.category !== 'All') {
      list = list.filter((p) => p.category === params.category || (p.technologies && p.technologies.includes(params.category)));
    }
    if (params.search) {
      const term = params.search.toLowerCase();
      list = list.filter((p) =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.technologies.some((t) => t.toLowerCase().includes(term))
      );
    }
    return list;
  },

  // Like Project
  async likeProject(id) {
    const res = await request(`/projects/${id}/like`, { method: 'POST' });
    if (res.ok && res.data) return res.data;
    return { success: false };
  },

  // Track Project View
  async viewProject(id) {
    return request(`/projects/${id}/view`, { method: 'POST' });
  },

  // Skills
  async getSkills() {
    const res = await request('/skills');
    if (res.ok && res.data?.data) return res.data.data;
    return localSkills;
  },

  // Certificates
  async getCertificates() {
    const res = await request('/certificates');
    if (res.ok && res.data?.data) return res.data.data;
    return localCertificates;
  },

  // Education
  async getEducation() {
    const res = await request('/education');
    if (res.ok && res.data?.data) return res.data.data;
    return localEducation;
  },

  // Testimonials
  async getTestimonials() {
    const res = await request('/testimonials');
    if (res.ok && res.data?.data) return res.data.data;
    return [
      {
        id: 1,
        name: 'Aarav Sharma',
        role: 'Lead Full-Stack Architect',
        company: 'TechSphere Labs',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: 'Chaitanya has a natural grasp of both React frontend aesthetics and Express/MongoDB backend architecture. His CollabSphere project demonstrates a profound ability to build real-world collaborative platforms.',
        rating: 5,
      },
      {
        id: 2,
        name: 'Priya Patel',
        role: 'Senior Software Engineer',
        company: 'DevFlow Network',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        text: 'Working with Chaitanya on full-stack workflows is a breeze. His code is clean, well-commented, and he is relentless when it comes to performance optimization and user experience responsiveness.',
        rating: 5,
      },
      {
        id: 3,
        name: 'Rohan Deshmukh',
        role: 'Product Lead',
        company: 'InnoStack Solutions',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        text: 'Exceptional dedication to clean UI, robust REST endpoints, and rapid problem-solving. Chaitanya consistently delivers production-quality MERN code well ahead of deadlines.',
        rating: 5,
      }
    ];
  },

  // Submit Testimonial
  async submitTestimonial(data) {
    const res = await request('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res;
  },

  // Contact Form Submission
  async submitContact(data) {
    const res = await request('/contact', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res;
  },

  // Admin: Get Messages
  async getMessages(adminKey) {
    const res = await request('/contact/messages', {
      headers: { 'x-admin-key': adminKey }
    });
    return res;
  },

  // Admin: Update Message Status
  async updateMessageStatus(id, status, adminKey) {
    const res = await request(`/contact/messages/${id}`, {
      method: 'PATCH',
      headers: { 'x-admin-key': adminKey },
      body: JSON.stringify({ status })
    });
    return res;
  },

  // Admin: Delete Message
  async deleteMessage(id, adminKey) {
    const res = await request(`/contact/messages/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-key': adminKey }
    });
    return res;
  },

  // Analytics
  async getAnalytics() {
    const res = await request('/analytics');
    if (res.ok && res.data?.data) return res.data.data;
    return {
      pageViews: 1420,
      projectLikes: 187,
      contactSubmissions: 12,
      totalProjects: 6,
      totalCertificates: 8,
      totalSkills: 26,
      isDbConnected: false
    };
  },

  // Track Page View
  async trackPageView() {
    return request('/analytics/view', { method: 'POST' });
  }
};
