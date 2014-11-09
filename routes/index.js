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

    youtube.search(request.query.query, function(error, localResults) {
      if (error) {
        throw error;
      } else {
        var firstResult = localResults[0];
        firstResult.api = 'youtube';
        aggregateResults(firstResult);
      }
    });

    soundcloud.search(request.query.query, function(error, localResults) {
      if (error) {
        throw error;
      } else {
        var firstResult = localResults[0];
        firstResult.api = 'soundcloud';
        aggregateResults(firstResult);
      }
    });

    flickr.search(request.query.query, function(error, localResults) {
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
  app.post('/posts', function(request, response) {
    var post = new Post({
      title: request.body.title,
      source: request.body.source,
      upvotes: 0
    });
    post.save(function(error, post) {
      if (error) {
        throw error;
      } else {
        response.json(200, post);
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
        response.json(200, posts);
      }
    });
  });

  /*
   * Deletes an existing post by removing the informaton from MongoDB
   */
  app.post('/posts/delete', function(request, response) {
    Post.findByIdAndRemove(request.body.id, function(error, post) {
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
  app.post('/posts/upvote', function(request, response) {
    Post.findById(request.body.id, function(error, post) {
      if (error) {
        throw error;
      } else {
        post.upvotes += 1;
        post.save(function(error) {
          if (error) {
            throw error;
          }

          response.json(200, post);
        });
      }
    });
  });
};
