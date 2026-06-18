const MattressConfig = require('../models/MattressConfig');
const SofaConfig = require('../models/SofaConfig');

// @desc    Get mattress config, dimensions, multipliers, and layers
// @route   GET /api/configs/mattress
// @access  Public
const getMattressConfig = async (req, res) => {
  try {
    const config = await MattressConfig.findOne();
    if (!config) {
      return res.status(404).json({ success: false, message: 'Mattress configuration not found. Run db seed script first.' });
    }
    return res.json({ success: true, config });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update mattress configurations and multipliers
// @route   PUT /api/configs/mattress
// @access  Private (Admin)
const updateMattressConfig = async (req, res) => {
  try {
    let config = await MattressConfig.findOne();
    if (!config) {
      config = new MattressConfig(req.body);
    } else {
      Object.assign(config, req.body);
    }
    await config.save();
    return res.json({ success: true, message: 'Mattress configuration updated', config });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get sofa configuration variables, fabrics, colors, and sizes
// @route   GET /api/configs/sofa
// @access  Public
const getSofaConfig = async (req, res) => {
  try {
    const config = await SofaConfig.findOne();
    if (!config) {
      return res.status(404).json({ success: false, message: 'Sofa configuration not found. Run db seed script first.' });
    }
    return res.json({ success: true, config });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update sofa configuration details and pricing modifiers
// @route   PUT /api/configs/sofa
// @access  Private (Admin)
const updateSofaConfig = async (req, res) => {
  try {
    let config = await SofaConfig.findOne();
    if (!config) {
      config = new SofaConfig(req.body);
    } else {
      Object.assign(config, req.body);
    }
    await config.save();
    return res.json({ success: true, message: 'Sofa configuration updated', config });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getMattressConfig,
  updateMattressConfig,
  getSofaConfig,
  updateSofaConfig
};
