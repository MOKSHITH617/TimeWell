const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: [true, 'Please specify category (mattress or sofa)'],
    enum: ['mattress', 'sofa']
  },
  description: {
    type: String,
    required: [true, 'Please add a detailed description']
  },
  shortDescription: {
    type: String,
    required: [true, 'Please add a short description']
  },
  basePrice: {
    type: Number,
    required: [true, 'Please add a starting/base price']
  },
  retailMultiplier: {
    type: Number,
    default: 2.0
  },
  images: {
    type: [String],
    default: []
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  specifications: {
    type: Map,
    of: String,
    default: {}
  },
  benefits: {
    type: [String],
    default: []
  },
  ratings: {
    type: Number,
    default: 4.8
  },
  reviewsCount: {
    type: Number,
    default: 50
  },
  // Mattress specific attributes
  mattressCoreType: {
    type: String,
    enum: ['ortho', 'latex', 'spring', 'dual', 'coir', 'none'],
    default: 'none'
  },
  // Sofa specific attributes
  sofaCategory: {
    type: String,
    enum: ['l-shape', 'recliner', '2-seater', '3-seater', 'corner', 'custom', 'none'],
    default: 'none'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
