var passport = require('passport');

module.exports = function(app) {
  /* Renders the index and landing page. */
  app.get('/', function(request, response) {
    response.render('index.html');
  });

  /* rendering login page */
  app.get('/login', function(request, response) {
    response.render('login.html');
  });

  /* rendering dashboard page */
  app.get('/dashboard', function(request, response) {
    response.render('dashboard.html');
  });

  /* rendering start page */
  app.get('/start', function(request, response) {
    response.render('start.html');
  });

  app.post('/questions', function(request, response))
}