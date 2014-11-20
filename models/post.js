var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  content: String,
  active: Boolean,
  upvotes: Number
});

module.exports = mongoose.model('Post', postSchema);
