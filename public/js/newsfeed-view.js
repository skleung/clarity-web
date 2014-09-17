(function(window, document, undefined) {
  var NewsfeedView = {};

  NewsfeedView.render = function($newsfeed) {
    NewsfeedModel.loadAllPosts(function(error, newsfeedPosts) {
      if (error) {
        // Util.displayError('Failed loading posts.');
      } else {
        $newsfeed.html(Util.renderNewsfeed({ posts: newsfeedPosts }));
        $newsfeed.find('.post');
      }
    });
  }

  window.NewsfeedView = NewsfeedView;
})(this, this.document);
