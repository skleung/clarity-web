(function(window, document, undefined) {
  var PendingPostView = {};

  PendingPostView.render = function($body, post) {
    $newsfeed = $body.find('#newsfeed');
    $pendingPost = $(Util.renderNewsfeedPost({ post: post, pending: true })).prependTo($newsfeed);

    // Event listener for Submit
    $pendingPost.bind('submit', function(event) {
      event.preventDefault();
      NewsfeedModel.addPost(post, function(error, content) {
        console.log(content);
        if (error) {
          Util.displayError('Failed to add post.');
        } else {
          $newsfeed.find('#pending-form').remove();
          NewsfeedView.renderPost(content, false);
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
