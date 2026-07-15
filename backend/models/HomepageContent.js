const mongoose = require('mongoose');

const HomepageContentSchema = new mongoose.Schema({
  heroSubheading: {
    type: String,
    default: 'Sleepora'
  },
  heroTitle: {
    type: String,
    default: 'Perfect Sleep, Perfect Life.'
  },
  heroSubtitle: {
    type: String,
    default: 'Premium mattresses and handcrafted sofas, engineered for comfort and built to last.'
  },
  ctaTitle: {
    type: String,
    default: 'Ready for Better Sleep?'
  },
  ctaSubtitle: {
    type: String,
    default: 'Talk directly with the factory owner on WhatsApp to get custom sizes and the best prices instantly.'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('HomepageContent', HomepageContentSchema);
