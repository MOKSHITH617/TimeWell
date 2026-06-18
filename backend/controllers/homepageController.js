const HomepageContent = require('../models/HomepageContent');

// @desc    Get homepage copy content
// @route   GET /api/homepage
// @access  Public
const getHomepageContent = async (req, res) => {
  try {
    let content = await HomepageContent.findOne();
    if (!content) {
      // Create and return default model instance if not found
      content = new HomepageContent();
    }
    return res.json({ success: true, content });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update homepage headlines and copy values
// @route   PUT /api/homepage
// @access  Private (Admin)
const updateHomepageContent = async (req, res) => {
  try {
    let content = await HomepageContent.findOne();
    if (!content) {
      content = new HomepageContent(req.body);
    } else {
      Object.assign(content, req.body);
    }
    await content.save();
    return res.json({ success: true, message: 'Homepage copy content updated successfully', content });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getHomepageContent,
  updateHomepageContent
};
