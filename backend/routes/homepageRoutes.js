const express = require('express');
const router = express.Router();
const { getHomepageContent, updateHomepageContent } = require('../controllers/homepageController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getHomepageContent)
  .put(protect, updateHomepageContent);

module.exports = router;
