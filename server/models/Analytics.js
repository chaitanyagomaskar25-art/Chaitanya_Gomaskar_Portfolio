import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
  pageViews: { type: Number, default: 0 },
  projectLikes: { type: Number, default: 0 },
  contactSubmissions: { type: Number, default: 0 },
  lastVisit: { type: Date, default: Date.now }
}, { timestamps: true });

export const Analytics = mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema);
