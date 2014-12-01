var Question = require('../models/question');

module.exports = function(app, io) {
  /* Renders the index and landing page. */
  app.get('/', function(request, response) {
    response.render('index.html');
  });

  /* rendering login page */
  app.get('/login', function(request, response) {
    response.render('login.html');
  });

  app.get('/login-post', function(request, response) {
    if (request.body.account === "teacher") {
      response.writeHead(301,
        { Location: '/teacher/dashboard'}
      );
      response.send();
    } else {
      response.writeHead(301,
        { Location: '/student/dashboard'}
      );
      response.send();
    }
  });

  /*
   * Teachers
   */

  /* rendering dashboard page */
  app.get('/teacher/dashboard', function(request, response) {
    response.render('teacher/teacher-dashboard.html');
  });

  /* Loads all questions from MongoDB. */
  app.get('/teacher/questions', function(request, response) {
    Question.find(function(error, questions) {
      if (error) {
        throw error;
      } else {
        response.json(200, questions);
      }
    });
  });

  /* Archives an existing question by removing it from MongoDB. */
  app.post('/teacher/questions/delete', function(request, response) {
    var id = request.body.id;
    if (!id) {
      response.send(422, 'Must provide an id.');
      return;
    }

    Question.findByIdAndRemove(id, function(error, question) {
      if (error) {
        throw error;
      } else {
        response.send(200);
        io.emit('archive-question', id); // io.emit abstracts out JSON encoding
      }
    });
  });

  /* rendering start page */
  app.get('/start', function(request, response) {
    response.render('teacher/start.html');
  });


  /*
   * Students
   */

  /* Renders faux-student view */
  /* Loads all questions from MongoDB. */
  app.get('/student/questions', function(request, response) {
    Question.find(function(error, questions) {
      if (error) {
        throw error;
      } else {
        response.json(200, questions);
      }
    });
  });

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
        io.emit('create-question', question); // io.emit abstracts out JSON encoding
        response.json(200, question);
      }
    });

    // socket.io ping teacher socket
  });


  /* Upvotes an existing question by retrieving it, incrementing the vote count,
   * and saving it to MongoDB. */
  app.post('/student/questions/upvote', function(request, response) {
    if (!request.body.id) {
      response.send(422, 'Must provide an id.');
      return;
    }

    Question.findById(request.body.id, function(error, question) {
      if (error) {
        throw error;
      }

      question.upvotes += 1;
      question.save(function(error) {
        if (error) {
          throw error;
        }
        io.emit('upvote-question', question);
        response.json(200, question);
      });
    });
  });

  /* Upvotes an existing question by retrieving it, incrementing the vote count,
   * and saving it to MongoDB. */
  app.post('/student/questions/downvote', function(request, response) {
    if (!request.body.id) {
      response.send(422, 'Must provide an id.');
      return;
    }

    Question.findById(request.body.id, function(error, question) {
      if (error) {
        throw error;
      }

      question.upvotes -= 1;
      question.save(function(error) {
        if (error) {
          throw error;
        }
        response.json(200, question);
      });
    });
  });

  app.get('/bars', function(request, response) {
    var understanding = 55+Math.random()*10;
    response.json(200, {"understanding": understanding});
  });

  /* Handles instructor archive student question */
  app.post('/student/questions/archive', function() {

  });
}
