const express = require('express');
const router = express.Router();
const {
  getMattressConfig,
  updateMattressConfig,
  getSofaConfig,
  updateSofaConfig
} = require('../controllers/configController');
const { protect } = require('../middleware/authMiddleware');

router.route('/mattress')
  .get(getMattressConfig)
  .put(protect, updateMattressConfig);

router.route('/sofa')
  .get(getSofaConfig)
  .put(protect, updateSofaConfig);

module.exports = router;
