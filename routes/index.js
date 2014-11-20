var Question = require('../models/question');

module.exports = function(app, io) {
  io.on('connection', function(socket) {
    console.log('a user connected');
  });

  /* Renders the index and landing page. */
  app.get('/', function(request, response) {
    response.render('index.html');
  });

  /* rendering login page */
  app.get('/login', function(request, response) {
    response.render('login.html');
  });

  /*
   * Teachers
   */

  /* rendering dashboard page */
  app.get('/teacher/dashboard', function(request, response) {
    response.render('teacher/teacher-dashboard.html');
  });

  /* rendering start page */
  app.get('/start', function(request, response) {
    response.render('teacher/start.html');
  });


  /*
   * Students
   */

  /* Renders faux-student view */
  app.get('/student/dashboard', function(request, response) {
    response.render('student/student-dashboard.html');
  });

  /* Handles student question content */
  app.post('/student/questions', function(request, response) {
    if (!request.body.content) {
      response.send(422, 'Must provide content.');
    }

    var question = new Question({
      content: request.body.content,
      active: true,
      upvotes: 0
    });

    question.save(function(error, question) {
      if (error) {
        throw error;
      } else {
        response.json(200, question);
      }
    });

    // socket.io ping teacher socket
  });

  /* Handles instructor archive student question */
  app.post('/student/questions/archive', function() {

  });
}
