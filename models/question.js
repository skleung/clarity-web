var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
  content: String,
  active: Boolean,
  created_at: Date,
  upvotes: Number
});

module.exports = mongoose.model('Question', questionSchema);
