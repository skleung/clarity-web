(function(window, document, undefined) {
  var NewsfeedView = {};

  NewsfeedView.render = function($body) {
    $newsfeed = $body.find('#newsfeed');
    NewsfeedModel.loadAllPosts(function(error, newsfeedPosts) {
      if (error) {
        Util.displayError('Failed loading posts.');
      } else {
        newsfeedPosts.forEach(function(post) {
          $newsfeed.prepend(Util.renderNewsfeedPost({ post: post, pending: false }));
        });
      }
    });
  }

  window.NewsfeedView = NewsfeedView;
})(this, this.document);
