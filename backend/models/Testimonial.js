const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  avatar: {
    type: String,
    default: '' // Can store initials or custom avatar link
  },
  location: {
    type: String,
    required: [true, 'Please add a location (e.g. "Delhi")'],
    trim: true,
    default: 'India'
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating'],
    min: 1,
    max: 5,
    default: 5
  },
  dateText: {
    type: String,
    required: [true, 'Please add date text (e.g., "2 weeks ago")']
  },
  text: {
    type: String,
    required: [true, 'Please add the testimonial review content']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
