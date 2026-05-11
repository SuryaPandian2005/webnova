const mongoose = require('mongoose');
const { WEBSITE_TYPES, PAGES, COLOR_THEMES, BUDGETS, TIMELINES,
  FRONTEND_STACKS, BACKEND_STACKS, DATABASES, DEPLOYMENTS,
  PROJECT_STATUSES, PRIORITIES } = require('../config/constants');

const featuresSchema = new mongoose.Schema({
  adminPanel: { type: Boolean, default: false },
  authSystem: { type: Boolean, default: false },
  paymentGateway: { type: Boolean, default: false },
  seoOptimization: { type: Boolean, default: false },
  animations: { type: Boolean, default: false },
  darkMode: { type: Boolean, default: false },
  multiLanguage: { type: Boolean, default: false },
  analytics: { type: Boolean, default: false },
  chatbot: { type: Boolean, default: false },
  newsletter: { type: Boolean, default: false },
}, { _id: false });

const techStackSchema = new mongoose.Schema({
  frontend: { type: String, enum: FRONTEND_STACKS },
  backend: { type: String, enum: BACKEND_STACKS },
  database: { type: String, enum: DATABASES },
  deployment: { type: String, enum: DEPLOYMENTS },
}, { _id: false });

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  websiteType: {
    type: String,
    enum: WEBSITE_TYPES,
    required: [true, 'Website type is required'],
  },
  projectName: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    maxlength: [100],
  },
  description: {
    type: String,
    maxlength: [1000],
    default: '',
  },
  colorTheme: {
    type: String,
    enum: COLOR_THEMES,
    default: 'Purple & Indigo',
  },
  customColor: { type: String, default: '' },
  pages: [{
    type: String,
    enum: PAGES,
  }],
  features: { type: featuresSchema, default: () => ({}) },
  techStack: { type: techStackSchema, default: () => ({}) },
  budget: { type: String, enum: BUDGETS },
  timeline: { type: String, enum: TIMELINES },
  additionalNotes: { type: String, maxlength: [2000], default: '' },
  status: {
    type: String,
    enum: PROJECT_STATUSES,
    default: 'Pending',
  },
  priority: {
    type: String,
    enum: PRIORITIES,
    default: 'Medium',
  },
  adminNotes: { type: String, default: '' },
  estimatedCost: { type: Number },
  templateUsed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template',
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Indexes
projectSchema.index({ user: 1, createdAt: -1 });
projectSchema.index({ status: 1 });
projectSchema.index({ websiteType: 1 });

module.exports = mongoose.model('Project', projectSchema);