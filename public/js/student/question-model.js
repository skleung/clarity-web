(function(window, document, undefined) {
  var QuestionModel = {};

  var POST_URL= '/questions';
  var STATUS_OK = 200;

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

    request.open('POST', POST_URL, true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(question));
  };

  /* Removes the question with the given id.
   *
   * Calls: callback(error)
   *  error -- the error that occurred or null if no error occurred
   */
  QuestionModel.remove = function(id, callback) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      if (request.status === STATUS_OK) {
        callback(null);
      } else {
        callback(request.responseText);
      }
    });

    request.open('POST', POST_URL + '/delete', true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify({ id: id }));
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

    request.open('POST', POST_URL  + '/upvote', true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify({ id: id }));
  };

  window.QuestionModel = QuestionModel;
})(this, this.document);
