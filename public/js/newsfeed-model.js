(function(window, document, undefined) {
  var NewsfeedModel = {};

  var NEWSFEED_URL = '/newsfeed';
  var STATUS_OK = 200;

  /**
   * Loads all newsfeed posts from the server.
   *
   * Calls: callback(error, newsfeedPosts)
   *  error -- the error that occurred or NULL if no error occurred
   *  newsfeedPosts -- an array of newsfeed posts
   */

  NewsfeedModel.loadAllPosts = function(callback) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      if (request.status === STATUS_OK) {
        var newsfeedPosts = JSON.parse(request.responseText);
        callback(null, newsfeedPosts);
      } else {
        callback(request.responseText);
      }
    });
    request.open('GET', NEWSFEED_URL, true);
    request.send();
  }

  /* Adds the given post to the list of posts. The post must *not* have
   * an id associated with it.
   *
   * Calls: callback(error, post)
   *  error -- the error that occurred or NULL if no error occurred
   *  post -- the post added, with an id attribute
   */

  NewsfeedModel.addPost = function(post, callback) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      if (request.status === STATUS_OK) {
        var newsfeedPostAdded = JSON.parse(request.responseText);
        callback(null, newsfeedPostAdded);
      } else {
        callback(request.responseText);
      }
    });
    request.open('POST', NEWSFEED_URL, true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(post));
  };

  /* Removes the post with the given id.
   *
   * Calls: callback(error)
   *  error -- the error that occurred or NULL if no error occurred
   */

  NewsfeedModel.removePost = function(id, callback) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      if (request.status === STATUS_OK) {
        callback(null);
      } else {
        callback(request.responseText);
      }
    });
    request.open('POST', 'newsfeed/' + id + '/remove', true);
    request.send();
    // request.open('POST', NEWSFEED_URL + '/remove', true);
    // request.setRequestHeader('Content-type', 'application/json');
    // request.send(JSON.stringify(id));
  };

  window.NewsfeedModel = NewsfeedModel;
})(this, this.document);
