(function(window, document, undefined) {
  var PendingPostView = {};

  PendingPostView.render = function($body, post) {
    $newsfeed = $body.find('#newsfeed');
    $newsfeed.prepend(Util.renderNewsfeedPost({ post: post, pending: true }));

    $newsfeed.find('#pending-form').bind('submit', function(event) {
      event.preventDefault();
      NewsfeedModel.addPost(post, function(error, content) {
        if (error) {
          Util.displayError('Failed to add post.');
        } else {
          $newsfeed.find('#pending-form').remove();
          $newsfeed.prepend(Util.renderNewsfeedPost({ post: post, pending: false }));
        }
      });
    });
  }

  window.PendingPostView = PendingPostView;
})(this, this.document);
