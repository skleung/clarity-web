(function(window, document, undefined) {
  var QuestionsModel = {};

  var QUESTIONS_URL = '/teacher/questions';
  var STATUS_OK = 200;

  QuestionsModel.connectSocket = function(callbacks) {
    var socket = io();
    socket.on('create-question', function(question) {
      callbacks.createQuestion(question);
    });
    socket.on('archive-question', function(question) {
      callbacks.archiveQuestion(question);
    });
    socket.on('upvote-question', function(question) {
      callbacks.upvoteQuestion(question);
    });
  }

  /* Adds the given question to the list of questions. The question must *not* have
   * an _id associated with it.
   *
   * Calls: callback(error, question)
   *  error -- the error that occurred or null if no error occurred
   *  question -- the question added, with an _id attribute
   */
  QuestionsModel.loadAll = function(callback) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      if (request.status === STATUS_OK) {
        callback(null, JSON.parse(request.responseText));
      } else {
        callback(request.responseText);
      }
    });

    request.open('GET', QUESTIONS_URL , true);
    request.send();
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
    request.open('POST', QUESTIONS_URL  + '/delete', true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify({ id: id }));
  };

  window.QuestionsModel = QuestionsModel;
})(this, this.document);
