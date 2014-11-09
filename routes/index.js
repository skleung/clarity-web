var flickr = require('../lib/flickr');
var soundcloud = require('../lib/soundcloud');
var youtube = require('../lib/youtube');

var mongoose = require('mongoose');
var Post = require('../models/post');

var NUM_APIS = 3;

module.exports = function(app) {
  app.get('/', function(request, response) {
    response.render('index.html');
  });

  /*
   * Calls each of the APIs in parallel, aggregates the results, and
   * sends it back to the client.
   */
  app.get('/search', function(request, response) {
    var results = [];
    var apisProcessed = 0;

    // TODO: make the parameter `q` more well-defined
    youTube.search(request.query.q, function(error, localResults) {
      if (error) {
        throw error;
      } else {
        var firstResult = localResults[0];
        firstResult.api = 'youtube';
        aggregateResults(firstResult);
      }
    });

    soundCloud.search(request.query.q, function(error, localResults) {
      if (error) {
        throw error;
      } else {
        var firstResult = localResults[0];
        firstResult.api = 'soundcloud';
        aggregateResults(firstResult);
      }
    });

    flickr.search(request.query.q, function(error, localResults) {
      if (error) {
        throw error;
      } else {
        var firstResult = localResults[0];
        firstResult.api = 'flickr';
        aggregateResults(firstResult);
      }
    });

    function aggregateResults(firstResult) {
      apisProcessed += 1;

      if (firstResult) {
        results.push(firstResult);
      }

      if (apisProcessed === NUM_APIS) {
        response.json(200, results);
      }
    }
  });


  /*
   * Creates a new post by saving the informaton to MongoDB
   */
  app.post('/posts', function(request, res) {
    var post = new Post({
      source: request.body.source,
      upvotes: 0
    });
    post.save(function(error, post) {
      if (error) {
        throw error;
      } else {
        response.json(post);
      }
    });
  });

  /*
   * Loads all the posts from MongoDB
   */
  app.get('/posts', function(request, response) {
    Post.find(function(error, posts) {
      if (error) {
        throw error;
      } else {
        response.json(posts);
      }
    });
  });

  /*
   * Deletes an existing post by removing the informaton from MongoDB
   */
  app.post('/posts/:id/delete', function(request, response) {
    Post.findByIdAndRemove(request.params.id, function(error, post) {
      if (error) {
        throw error;
      } else {
        response.send(200);
      }
    });
  });

  /*
   * Upvotes an existing post by retrieving the post, incrementing the vote count,
   * and re-saving the information to MongoDB
   */
  app.post('/posts/:id/upvote', function(request, response) {
    Post.findById(request.params.id, function(error, post) {
      if (error) {
        throw error;
      } else {
        post.upvotes += 1;
        post.save(function(error) {
          if (error) {
            throw error;
          }

          response.json(post);
        });
      }
    });
  });
};
