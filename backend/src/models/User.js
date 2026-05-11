const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const loginHistorySchema = new mongoose.Schema({
  ip: { type: String, default: 'unknown' },
  userAgent: { type: String, default: 'unknown' },
  timestamp: { type: Date, default: Date.now },
  success: { type: Boolean, default: true },
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  avatar: {
    type: String,
    default: function() {
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.email}`;
    },
  },
  bio: { type: String, maxlength: [200, 'Bio cannot exceed 200 characters'], default: '' },
  company: { type: String, maxlength: [100], default: '' },
  website: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  projectCount: { type: Number, default: 0 },
  loginHistory: { type: [loginHistorySchema], default: [] },
  lastLogin: { type: Date },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Hash password before save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Add login history entry
userSchema.methods.addLoginHistory = function(ip, userAgent, success = true) {
  this.loginHistory.unshift({ ip, userAgent, success, timestamp: new Date() });
  if (this.loginHistory.length > 10) {
    this.loginHistory = this.loginHistory.slice(0, 10);
  }
  if (success) this.lastLogin = new Date();
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });

module.exports = mongoose.model('User', userSchema);