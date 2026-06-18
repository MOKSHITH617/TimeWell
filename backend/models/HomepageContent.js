const mongoose = require('mongoose');

const HomepageContentSchema = new mongoose.Schema({
  heroSubheading: {
    type: String,
    default: 'Direct Manufacturer Advantage'
  },
  heroTitle: {
    type: String,
    default: 'Deep Sleep. Direct From The Factory.'
  },
  heroSubtitle: {
    type: String,
    default: 'Why pay 2x at retail showrooms? We manufacture high-end orthopaedic, organic latex, and hybrid spring mattresses tailored to your exact measurements. Better sleep, handcrafted for you.'
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
