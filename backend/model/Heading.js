const mongoose = require('mongoose');
const SubheadingSchema = require('./Subheading');

const HeadingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subheadings: [SubheadingSchema]
});

module.exports = mongoose.model('Heading', HeadingSchema);
