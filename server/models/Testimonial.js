import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, default: '' },
  avatar: { type: String, default: '' },
  text: { type: String, required: true, minlength: 10 },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  approved: { type: Boolean, default: true }
}, { timestamps: true });

export const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
