var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  src: String
});

// mongoose.model('Post', postSchema) will define collection name 'posts'
// mongoose.model('WxYz', postSchema) will define collection name 'wxYzs'
var Post = module.exports = mongoose.model('Post', postSchema);
