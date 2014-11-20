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

  /* Renders faux-student view */
  app.get('/student', function(request, response) {
    response.render('student.html');
  });

  /* Handles student post content */
  app.post('/student/posts', function() {
    if (!request.body.content) {
      response.send(422, 'Must provide content.');
    }

    var post = new Post({
      content: request.body.content,
      active: true,
      upvotes: 0
    });

    post.save(function(error, post) {
      if (error) {
        throw error;
      } else {
        response.json(200, post);
      }
    });

    // socket.io ping teacher socket
  });

  /* Handles instructor archive student post */
  app.post('/student/posts/archive', function() {

  });

  /* rendering start page */
  app.get('/start', function(request, response) {
    response.render('start.html');
  });
}
