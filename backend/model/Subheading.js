const mongoose = require('mongoose');

const SubheadingSchema = new mongoose.Schema({
  topicName: { type: String, required: true },
  leetcodeLink: String,
  youtubeLink: String,
  articleLink: String,
  level: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true }
});

module.exports = SubheadingSchema;
