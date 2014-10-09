(function(window, document, undefined) {
  var PendingPostView = {};

  PendingPostView.render = function($body, post) {
    var $newsfeed = $body.find('#newsfeed');
    var $pendingNewsfeed = $body.find('#pending-newsfeed');
    var $pendingPost = $(Util.renderNewsfeedPost({ post: post, pending: true })).prependTo($pendingNewsfeed);

    // Event listener for Submit
    $pendingPost.bind('submit', function(event) {
      event.preventDefault();
      NewsfeedModel.addPost(post, function(error, content) {
        if (error) {
          Util.displayError('Failed to add post.');
        } else {
          $(event.target).closest('.pending-post')[0].remove()
          NewsfeedView.renderPost($newsfeed, content, false);
        }
      });
    });

    $pendingPost.find('input[name="cancel"]').bind('click', function(event) {
      event.preventDefault();
      $pendingPost.remove();
    });
  }

  window.PendingPostView = PendingPostView;
})(this, this.document);
