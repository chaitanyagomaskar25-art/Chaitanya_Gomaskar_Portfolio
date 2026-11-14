import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      default: 'Full-Stack MERN'
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    technologies: {
      type: [String],
      default: []
    },
    githubUrl: {
      type: String,
      default: ''
    },
    liveDemoUrl: {
      type: String,
      default: ''
    },
    featured: {
      type: Boolean,
      default: false
    },
    likes: {
      type: Number,
      default: 0
    },
    views: {
      type: Number,
      default: 0
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
