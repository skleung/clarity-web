var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  src: String,
  upvotes: Number
});

module.exports = mongoose.model('Post', postSchema);
