const mongoose = require('mongoose');

const resumeDataSchema = new mongoose.Schema({
  personalInfo: {
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' }
  },
  education: [{
    degree: { type: String, default: '' },
    institution: { type: String, default: '' },
    year: { type: String, default: '' },
    gpa: { type: String, default: '' }
  }],
  experience: [{
    role: { type: String, default: '' },
    company: { type: String, default: '' },
    duration: { type: String, default: '' },
    description: { type: String, default: '' }
  }],
  projects: [{
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    techUsed: { type: String, default: '' },
    link: { type: String, default: '' }
  }],
  skills: [{ type: String }],
  summary: { type: String, default: '' },
  certifications: [{ type: String }],
  achievements: [{ type: String }]
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  resumeData: {
    type: resumeDataSchema,
    default: () => ({
      personalInfo: {},
      education: [],
      experience: [],
      projects: [],
      skills: [],
      summary: '',
      certifications: [],
      achievements: []
    })
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
