module.exports = function(app, nconf) {
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.post('/search', function(req, res) {
    debugger;
    console.log(req);
    
  });
};
