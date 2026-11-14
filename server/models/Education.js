import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  startYear: { type: String, required: true },
  endYear: { type: String, required: true },
  location: { type: String, default: '' },
  coursework: { type: String, default: '' },
  cgpa: { type: String, default: '' },
  percentage: { type: String, default: '' },
  description: { type: String, default: '' }
}, { timestamps: true });

export const Education = mongoose.models.Education || mongoose.model('Education', EducationSchema);
