var soundCloud = require('./lib/sound-cloud');
// var client = new soundcloudAPI('74ba83c79d166b1c2a1fb7d2d2e780c1', '4764d4fcc0823b84eb31d53420508b48', 'localhost:3000')

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
};
