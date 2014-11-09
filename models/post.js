var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: String,
  source: String,
  upvotes: Number
});

module.exports = mongoose.model('Post', postSchema);
