import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  seedProfile,
  seedProjects,
  seedSkills,
  seedCertificates,
  seedEducation,
  seedTestimonials
} from '../data/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/store.json');

// In-memory / JSON store fallback for zero-downtime resilience
export const fallbackStore = {
  profile: { ...seedProfile },
  projects: [...seedProjects],
  skills: [...seedSkills],
  certificates: [...seedCertificates],
  education: [...seedEducation],
  testimonials: [...seedTestimonials],
  contacts: [
    {
      _id: 'sample-msg-1',
      name: 'Sarah Jenkins',
      email: 'sarah.j@enterprise.io',
      subject: 'Interview for Full-Stack Developer position',
      message: 'Hi Chaitanya, we were very impressed by your CollabSphere and MERN projects. Would love to schedule a technical chat this week!',
      status: 'unread',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
    }
  ],
  analytics: {
    pageViews: 1420,
    projectLikes: 186,
    contactSubmissions: 12,
    lastVisit: new Date().toISOString()
  }
};

// Load persistent local store if exists
export function loadFallbackStore() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      Object.assign(fallbackStore, data);
    }
  } catch (err) {
    console.warn('Could not read existing fallback store, initializing default seed.');
  }
}

export function saveFallbackStore() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(fallbackStore, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Failed to persist fallback store:', err.message);
  }
}

export let isConnectedToMongo = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
  loadFallbackStore();

  // Prevent Mongoose from crashing process on connection errors
  mongoose.connection.on('error', (err) => {
    isConnectedToMongo = false;
  });

  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 1500,
    });
    isConnectedToMongo = true;
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
    return true;
  } catch (error) {
    isConnectedToMongo = false;
    console.warn(`⚠️ MongoDB connection attempt failed (${error.message}).`);
    console.log('⚡ Active Fallback Engine: High-performance Persistent MERN Data Store activated.');
    return false;
  }
}
