(function(window, document, undefined) {
  var NewsfeedView = {};

  NewsfeedView.render = function($body) {
    $newsfeed = $body.find('#newsfeed');
    NewsfeedModel.loadAllPosts(function(error, newsfeedPosts) {
      if (error) {
        Util.displayError('Failed loading posts.');
      } else {
        newsfeedPosts.forEach(function(post) {
          NewsfeedView.renderPost(post, false);
        });
      }
    });
  }

  NewsfeedView.renderPost = function(post, pending) {
    var $newsfeedPost = $(Util.renderNewsfeedPost({ post: post, pending: pending })).prependTo($newsfeed);
    $newsfeedPost.find('input[name="upvote"]').bind('click', function(event) {
      event.preventDefault();
      console.log('clicked upvote!');
    });
    $newsfeedPost.find('input[name="remove"]').bind('click', function(event) {
      event.preventDefault();
      NewsfeedModel.removePost(post._id, function() {
        $newsfeedPost.remove();
      });
    });
  }

  window.NewsfeedView = NewsfeedView;
})(this, this.document);
