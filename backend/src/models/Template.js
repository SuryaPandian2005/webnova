const mongoose = require('mongoose');
const { TEMPLATE_CATEGORIES } = require('../config/constants');

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Template name is required'],
    trim: true,
    maxlength: [100],
  },
  category: {
    type: String,
    enum: TEMPLATE_CATEGORIES,
    required: true,
  },
  description: {
    type: String,
    maxlength: [500],
    default: '',
  },
  previewImage: { type: String, default: '' },
  livePreviewUrl: { type: String, default: '#' },
  colorPalette: [{ type: String }],
  features: [{ type: String }],
  pages: [{ type: String }],
  techStack: [{ type: String }],
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  downloads: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isPremium: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
  tags: [{ type: String }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

templateSchema.index({ category: 1 });
templateSchema.index({ isFeatured: 1 });
templateSchema.index({ isActive: 1 });

module.exports = mongoose.model('Template', templateSchema);