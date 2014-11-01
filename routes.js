var flickr = require('./lib/flickr');
var soundCloud = require('./lib/soundcloud');
var youTube = require('./lib/youtube');


var mongoose = require('mongoose');

var Post = require('./models/post.js');

//  By default upon authentication, the access_token is saved, but you can add it like
module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  app.get('/search', function(req, res) {
    fns = [
      function(callback) {
        youTube.search(req.query.q, function(error, body) {
          if (error) {
            throw error;
          } else {
            callback(null, body);
          }
        });
      },
      function(callback) {
        soundCloud.search(req.query.q, function(error, body) {
          if (error) {
            throw error;
          } else {
            callback(null, body);
          }
        });
      },
      // function(callback) {
      //   flickr.search(req.query.q, function(error, body) {
      //     if (error) {
      //       throw error;
      //     } else {
      //       callback(null, body);
      //     }
      //   });
      // }
    ];

    counter = 0;
    results = []
    fns.forEach(function(fn) {
      fn(function(error, searchResults) {
        counter += 1;
        var parsedSearchResults = JSON.parse(searchResults);
        if (parsedSearchResults[0]) {
          results.push(parsedSearchResults[0]);
        }
        if (counter == fns.length) {
          res.send(200, JSON.stringify(results));
        }
      });
    });
  });

  app.get('/flickr', function(req, res) {
    flickr.search(req.query.q, function(error, body) {
      if (error) {
        throw error;
      } else {
        callback(null, body);
      }
    });
  });

  app.post('/newsfeed', function(req, res) {
    var post = new Post({
      src: req.body.src,
      upvotes: 0
    });
    post.save(function(error, post) {
      if (error) {
        throw error;
      } else {
        res.send(post);
      }
    });
  });

  app.get('/newsfeed', function(req, res) {
    Post.find(function(error, posts) {
      if (error) {
        throw error;
      } else {
        res.send(posts);
      }
    });
  });

  app.post('/newsfeed/:id/remove', function(req, res) {
    Post.remove({ _id: req.params.id }, function(error, post) {
      if (error) {
        throw error;
      } else {
        res.send(204);
      }
    })
  });

  app.post('/newsfeed/:id/upvote', function(req, res) {
    var postId = mongoose.Types.ObjectId(req.params.id);
    var result = Post.findOneAndUpdate(
      { _id: postId },
      { '$inc': { upvotes: 1 } },
      function(error, post) {
        res.send(post);
      }
    );
  });
};
