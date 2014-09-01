var soundCloud = require('./lib/sound-cloud');
var youTube    = require('./lib/you-tube')
var spotify    = require('./lib/spotify')

var Post = require('./models/post.js');

//  By default upon authentication, the access_token is saved, but you can add it like
module.exports = function(app, nconf) {
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/search', function(req, res) {
    console.log('Searching YouTube and Spotify [not SoundCloud] for %s', req.query.q);

  });

  app.post('/postContent', function(req, res) {
    console.log('Posting content for "%s"', req.body.src);
    var postContent = new Post({ src: req.body.src });
    postContent.save(function(err, postContent) {
      if (err) return console.error(err);
    });
  });

  app.get('/getContent', function(req, res) {
    Post.find(function(err, posts) {
      res.send(posts);
    });
  });


  app.get('/searchSoundCloud', function(req, res) {
    console.log('Searching SoundCloud for "%s"', req.query.q);
    soundCloud.search(req.query.q, function(error, body) {
      if (error) {
        throw error;
      } else {
        res.send(200, body);
      }
    });
  });

  app.get('/searchYouTube', function(req, res) {
    console.log('Searching YouTube for "%s"',  req.query.q);
    youTube.search(req.query.q, function(error, body) {
      if (error) {
        throw error;
      } else {
        res.send(200, body);
      }
    });
  });

  app.get('/searchSpotify', function(req, res) {
    console.log('Searching Spotify for "%s"', req.query.q);
    spotify.search(req.query.q, function(error, body) {
      if (error) {
        throw error;
      } else {
        res.send(200, body);
      }
    });
  });
};
