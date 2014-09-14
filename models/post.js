var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  src: String
});

module.exports = mongoose.model('Post', postSchema);
