var soundCloud = require('./lib/sound-cloud');
var youTube = require('./lib/you-tube')
var spotify = require('./lib/spotify')

//  By default upon authentication, the access_token is saved, but you can add it like
module.exports = function(app, nconf) {
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/search', function(req, res) {
    console.log("Searching soundcloud for  "+req.query.title);
    soundCloud.search(req.query.title, function(error, body) {
      if (error) {
          throw error;
      } else {
          res.send(200, body);
      }
    });
  });

  app.get('/searchYoutube', function(req, res) {
    console.log("Searching youtube for  "+req.query.title);
    youTube.search(req.query.title, function(error, body) {
      if (error) {
          throw error;
      } else {
          res.send(200, body);
      }
    });
  });

  app.get('/searchSpotify', function(req, res) {
    console.log("Searching spotify for  "+req.query.title);
    spotify.search(req.query.title, function(error, body) {
      if (error) {
          throw error;
      } else {
          res.send(200, body);
      }
    });
  });
};
