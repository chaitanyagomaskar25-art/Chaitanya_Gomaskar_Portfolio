import { Project } from '../models/Project.js';
import { isConnectedToMongo, fallbackStore, saveFallbackStore } from '../config/db.js';

export const getProjects = async (req, res) => {
  try {
    const { category, search, featured } = req.query;

    if (isConnectedToMongo) {
      let query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      if (featured === 'true') {
        query.featured = true;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { technologies: { $in: [new RegExp(search, 'i')] } }
        ];
      }
      const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
      return res.json({ success: true, count: projects.length, data: projects });
    } else {
      let filtered = [...fallbackStore.projects];
      if (category && category !== 'All') {
        filtered = filtered.filter((p) => p.category === category);
      }
      if (featured === 'true') {
        filtered = filtered.filter((p) => p.featured === true);
      }
      if (search) {
        const term = search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.technologies.some((t) => t.toLowerCase().includes(term))
        );
      }
      return res.json({ success: true, count: filtered.length, data: filtered });
    }
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving projects.' });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    if (isConnectedToMongo) {
      const project = await Project.findById(id);
      if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
      return res.json({ success: true, data: project });
    } else {
      const project = fallbackStore.projects.find((p) => p.id === Number(id) || p._id === id);
      if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
      return res.json({ success: true, data: project });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const likeProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (isConnectedToMongo) {
      const project = await Project.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
      if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
      return res.json({ success: true, likes: project.likes, data: project });
    } else {
      const project = fallbackStore.projects.find((p) => p.id === Number(id) || p._id === id);
      if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
      project.likes = (project.likes || 0) + 1;
      fallbackStore.analytics.projectLikes = (fallbackStore.analytics.projectLikes || 0) + 1;
      saveFallbackStore();
      return res.json({ success: true, likes: project.likes, data: project });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const viewProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (isConnectedToMongo) {
      const project = await Project.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
      if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
      return res.json({ success: true, views: project.views });
    } else {
      const project = fallbackStore.projects.find((p) => p.id === Number(id) || p._id === id);
      if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
      project.views = (project.views || 0) + 1;
      saveFallbackStore();
      return res.json({ success: true, views: project.views });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
