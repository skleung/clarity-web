(function(window, document, undefined) {
  var Post = {};

  var POST_URL= '/posts';
  var STATUS_OK = 200;

  /**
   * Loads all newsfeed posts from the server.
   *
   * Calls: callback(error, posts)
   *  error -- the error that occurred or NULL if no error occurred
   *  results -- an array of newsfeed posts
   */
  Post.loadAll = function(callback) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      if (request.status === STATUS_OK) {
        callback(null, JSON.parse(request.responseText));
      } else {
        callback(request.responseText);
      }
    });
    request.open('GET', POST_URL, true);
    request.send();
  };

  /* Adds the given post to the list of posts. The post must *not* have
   * an id associated with it.
   *
   * Calls: callback(error, post)
   *  error -- the error that occurred or NULL if no error occurred
   *  post -- the post added, with an id attribute
   */
  Post.add = function(post, callback) {
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
    request.send(JSON.stringify(post));
  };

  /* Removes the post with the given id.
   *
   * Calls: callback(error)
   *  error -- the error that occurred or NULL if no error occurred
   */
  Post.remove = function(id, callback) {
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

  /* Upvotes the post with the given id.
   *
   * Calls: callback(error)
   *  error -- the error that occurred or NULL if no error occurred
   */
  Post.upvote = function(id, callback) {
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

  window.Post = Post;
})(this, this.document);
