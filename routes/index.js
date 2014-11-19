var passport = require('passport');

module.exports = function(app) {
  /* Renders the newsfeed landing page. */
  app.get('/', function(request, response) {
    response.render('index.html');
  });

  app.get('/auth/google', passport.authenticate('google'));

  // Google will redirect the user to this URL after authentication.  Finish
  // the process by verifying the assertion.  If valid, the user will be
  // logged in.  Otherwise, authentication has failed.
  app.get('/auth/google/return', 
    passport.authenticate('google', { successRedirect: '/',
                                      failureRedirect: '/login' }));
}