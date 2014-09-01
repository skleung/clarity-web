var soundCloud = require('./lib/sound-cloud');
var youTube = require('./lib/you-tube')
var spotify = require('./lib/spotify')

//  By default upon authentication, the access_token is saved, but you can add it like
module.exports = function(app, nconf) {
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/search', function(req, res) {
    console.log('Search YouTube and Spotify [not SoundCloud] for %s', req.query.q);

  })

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
