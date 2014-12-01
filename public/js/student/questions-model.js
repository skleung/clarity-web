(function(window, document, undefined) {
  var QuestionsModel = {};

  var QUESTIONS_URL = '/student/questions';
  var STATUS_OK = 200;

  QuestionsModel.connectSocket = function(callbacks) {
    var socket = io();
    socket.on('create-question', function(question) {
      callbacks.createQuestion(question);
    });
    socket.on('archive-question', function(id) {
      callbacks.archiveQuestion(id);
    });
    socket.on('upvote-question', function(question) {
      callbacks.upvoteQuestion(question);
    });
  }

  /* Loads questions from the database */
  QuestionsModel.loadAll = function(callback) {
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
  QuestionsModel.add = function(question, callback) {
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
  QuestionsModel.upvote = function(id, callback) {
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
  QuestionsModel.downvote = function(id, callback) {
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

  /* Removes/archives the question with the given id.
   *
   * Calls: callback(error)
   *  error -- the error that occurred or null if no error occurred
   */
  QuestionsModel.remove = function(id, callback) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      if (request.status === STATUS_OK) {
        callback(null);
      } else {
        callback(request.responseText);
      }
    });
    request.open('POST', '/teacher/questions/delete', true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify({ id: id }));
  };

  window.QuestionsModel = QuestionsModel;
})(this, this.document);
