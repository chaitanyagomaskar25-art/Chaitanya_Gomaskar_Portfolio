import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, required: true },
  verifyUrl: { type: String, default: '' },
  pdfUrl: { type: String, default: '' }
}, { timestamps: true });

export const Certificate = mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);
