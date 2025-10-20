const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const { generateResumeSummary } = require('../utils/aiGenerator');

const router = express.Router();

// @route   POST /api/resume/save
// @desc    Save or update user's resume data
// @access  Private
router.post('/save', authMiddleware, async (req, res) => {
  try {
    const { resumeData } = req.body;

    if (!resumeData) {
      return res.status(400).json({ 
        success: false, 
        message: 'Resume data is required' 
      });
    }

    // Find user and update resume data
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Update resume data
    user.resumeData = {
      ...user.resumeData,
      ...resumeData
    };

    await user.save();

    res.json({
      success: true,
      message: 'Resume saved successfully',
      resumeData: user.resumeData
    });
  } catch (error) {
    console.error('Save resume error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while saving resume' 
    });
  }
});

// @route   GET /api/resume/get
// @desc    Get user's saved resume data
// @access  Private
router.get('/get', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      resumeData: user.resumeData || {
        personalInfo: {},
        education: [],
        experience: [],
        projects: [],
        skills: [],
        summary: '',
        certifications: [],
        achievements: []
      }
    });
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching resume' 
    });
  }
});

// @route   DELETE /api/resume/delete
// @desc    Delete user's resume data
// @access  Private
router.delete('/delete', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Reset resume data to default
    user.resumeData = {
      personalInfo: {},
      education: [],
      experience: [],
      projects: [],
      skills: [],
      summary: '',
      certifications: [],
      achievements: []
    };

    await user.save();

    res.json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while deleting resume' 
    });
  }
});

// @route   POST /api/resume/generate-summary
// @desc    Generate AI-powered resume summary
// @access  Public (can be used without authentication)
router.post('/generate-summary', async (req, res) => {
  try {
    const { resumeData } = req.body;

    if (!resumeData) {
      return res.status(400).json({ 
        success: false, 
        message: 'Resume data is required' 
      });
    }

    // Prepare data for AI generator (name not required)
    const userData = {
      role: resumeData.experience?.[0]?.role || '',
      skills: resumeData.skills || [],
      experience: resumeData.experience || [],
      projects: resumeData.projects || [],
      education: resumeData.education || []
    };

    // Generate summary using AI
    const summary = await generateResumeSummary(userData);

    res.json({
      success: true,
      summary
    });
  } catch (error) {
    console.error('Generate summary error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while generating summary',
      error: error.message 
    });
  }
});

module.exports = router;
