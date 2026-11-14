import mongoose from 'mongoose';

const SkillItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, default: 85 }
});

const SkillCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String, default: 'Code' },
  skills: [SkillItemSchema]
});

export const SkillCategory = mongoose.models.SkillCategory || mongoose.model('SkillCategory', SkillCategorySchema);
