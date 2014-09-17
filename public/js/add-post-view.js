(function(window, document, undefined) {
  var AddPostView = {};

  AddPostView.render = function($pendingPost, postContent, $newsfeed) {
    $pendingPost.html(Util.renderPendingPost({ post: postContent }));
    $pendingPost.show();

    $pendingPost.find('.post-btn').bind('click', function() {
      NewsfeedModel.addPost(postContent, function(error, newsfeedPostAdded) {
        if (error) {
          // Util.displayError('Failed loading posts.');
        } else {
          NewsfeedView.render($newsfeed, null);
        }
      });
      $pendingPost.html('');
      $pendingPost.hide();
    });

  }

  window.AddPostView = AddPostView;
})(this, this.document);
