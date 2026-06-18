const mongoose = require('mongoose');

const LayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  height: { type: String, required: true }, // e.g., '35px' or '70px'
  color: { type: String, required: true }   // CSS color gradient or hex
});

const CoreSchema = new mongoose.Schema({
  type: { type: String, required: true }, // ortho, latex, spring, dual, coir
  name: { type: String, required: true },
  basePrice: { type: Number, required: true },
  retailMultiplier: { type: Number, default: 2.0 },
  desc: { type: String, required: true },
  layers: [LayerSchema]
});

const MattressConfigSchema = new mongoose.Schema({
  cores: [CoreSchema],
  sizes: [{
    name: { type: String, required: true }, // e.g., 'Single (72 x 36)'
    multiplier: { type: Number, required: true }
  }],
  thicknesses: [{
    name: { type: String, required: true }, // e.g., '5-inch'
    multiplier: { type: Number, required: true }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('MattressConfig', MattressConfigSchema);
