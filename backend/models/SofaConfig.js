const mongoose = require('mongoose');

const SofaConfigSchema = new mongoose.Schema({
  sofaTypes: [{
    name: { type: String, required: true }, // L Shape, Recliner, 2 Seater, 3 Seater, Corner, Custom
    multiplier: { type: Number, required: true }
  }],
  materials: [{
    name: { type: String, required: true }, // Leatherette, Fabric, Velvet, Genuine Leather
    priceModifier: { type: Number, required: true }
  }],
  fabrics: [{
    name: { type: String, required: true }, // Cotton Blend, Jute Finish, Suede, Chenille
    priceModifier: { type: Number, required: true }
  }],
  colors: [{
    name: { type: String, required: true }, // Charcoal Grey, Royal Blue, Forest Green, Classic Brown
    colorCode: { type: String, required: true } // hex color code
  }],
  seatingCapacities: [{
    capacity: { type: Number, required: true }, // 2, 3, 5, 6, 7
    multiplier: { type: Number, required: true }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('SofaConfig', SofaConfigSchema);
