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


  // for passport authentication, signin with google
  app.get('/auth/google', passport.authenticate('google'));

  // Google will redirect the user to this URL after authentication.  Finish
  // the process by verifying the assertion.  If valid, the user will be
  // logged in.  Otherwise, authentication has failed.
  app.get('/auth/google/return', 
    passport.authenticate('google', { successRedirect: '/',
                                      failureRedirect: '/login' }));
}