var soundCloud = require('./lib/soundcloud');
var youTube = require('./lib/youtube')
var spotify = require('./lib/spotify')

var Post = require('./models/post.js');

//  By default upon authentication, the access_token is saved, but you can add it like
module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index');
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
      function(callback) {
        spotify.search(req.query.q, function(error, body) {
          if (error) {
            throw error;
          } else {
            callback(null, body);
          }
        });
      }
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

  app.post('/newsfeed', function(req, res) {
    var post = new Post({ src: req.body.src });
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
    Post.remove({'_id': req.params.id}, function(error, post) {
      if (error) {
        throw error;
      } else {
        res.send(204);
      }
    })
  });

  app.post('/newsfeed/:id/upvote', function(req, res) {
    console.log('upvote!');
    res.send(204);
  });
};
