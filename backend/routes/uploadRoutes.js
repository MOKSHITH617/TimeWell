const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

// @desc    Upload multiple images (max 5)
// @route   POST /api/upload
// @access  Private (Admin)
router.post('/', protect, upload.array('images', 6), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'Please upload files' });
    }

    const urls = req.files.map(file => {
      // Cloudinary multer storage sets file.path
      if (file.path) {
        return file.path;
      }
      // Local multer disk storage fallback sets file.filename
      // We will serve the backend uploads folder statically at /uploads/
      return `/uploads/${file.filename}`;
    });

    return res.json({
      success: true,
      message: 'Images uploaded successfully',
      urls
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
