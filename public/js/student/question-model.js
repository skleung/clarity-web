(function(window, document, undefined) {
  var QuestionModel = {};

  var QUESTIONS_URL = '/student/questions';
  var STATUS_OK = 200;

  QuestionModel.connectSocket = function(createCallback, archiveCallback, upvoteCallback) {
    var socket = io();
    socket.on('create-question', function(question) {
      createCallback(question);
    });
    socket.on('archive-question', function(question) {
      archiveCallback(question);
    });
    socket.on('upvote-question', function(question) {
      upvoteCallback(question);
    });
  }

  /* Loads questions from the database */
  QuestionModel.loadAll = function(callback) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      if (request.status === STATUS_OK) {
        callback(null, JSON.parse(request.responseText));
      } else {
        callback(request.responseText);
      }
    });

    request.open('GET', QUESTIONS_URL, true);
    request.send();
  };

  /* Adds the given question to the list of questions. The question must *not* have
   * an _id associated with it.
   *
   * Calls: callback(error, question)
   *  error -- the error that occurred or null if no error occurred
   *  question -- the question added, with an _id attribute
   */
  QuestionModel.add = function(question, callback) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      if (request.status === STATUS_OK) {
        callback(null, JSON.parse(request.responseText));
      } else {
        callback(request.responseText);
      }
    });

    request.open('POST', QUESTIONS_URL, true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(question));
  };

  /* Upvotes the question with the given id.
   *
   * Calls: callback(error)
   *  error -- the error that occurred or null if no error occurred
   */
  QuestionModel.upvote = function(id, callback) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      if (request.status === STATUS_OK) {
        callback(JSON.parse(request.responseText));
      } else {
        callback(request.responseText);
      }
    });

    request.open('POST', QUESTIONS_URL  + '/upvote', true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify({ id: id }));
  };

  /* Downvotes the question with the given id.
   *
   * Calls: callback(error)
   *  error -- the error that occurred or null if no error occurred
   */
  QuestionModel.downvote = function(id, callback) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      if (request.status === STATUS_OK) {
        callback(JSON.parse(request.responseText));
      } else {
        callback(request.responseText);
      }
    });

    request.open('POST', QUESTIONS_URL  + '/downvote', true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify({ id: id }));
  };

  window.QuestionModel = QuestionModel;
})(this, this.document);
