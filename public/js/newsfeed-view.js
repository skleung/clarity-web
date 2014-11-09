(function(window, document, undefined) {
  // Retrieve and compile the Handlebars template for rendering posts
  var $postTemplate = $('#newsfeed-post-template');
  var templates = {
    renderPost: Handlebars.compile($postTemplate.html())
  };

  var NewsfeedView = {};

  /* Renders the newsfeed into the given $newsfeed element. */
  NewsfeedView.render = function($newsfeed) {
    Post.loadAll(function(error, posts) {
      if (error) {
        $('.error').text('Failed loading posts.');
      } else {
        posts.forEach(function(post) {
          NewsfeedView.renderPost($newsfeed, post, false);
        });

        $newsfeed.imagesLoaded(function() {
          $newsfeed.masonry({
            columnWidth: '.post',
            itemSelector: '.post'
          });
        });
      }
    });
  };

  /* Given post information, renders a post element into the newsfeed. */
  NewsfeedView.renderPost = function($newsfeed, post, updateMasonry) {
    var $post = $(templates.renderPost(post));
    $post.prependTo($newsfeed);

    // Delete post when the remove button is clicked
    $post.find('.remove').click(function(event) {
      event.preventDefault();
      Post.remove(post._id, function() {
        $newsfeed.masonry('remove', $post);
        $newsfeed.masonry();
      });
    });

    // Vote up the post when the remove button is upvoted
    $post.find('.upvote').click(function(event) {
      event.preventDefault();
      Post.upvote(post._id, function(post) {
        $post.find('.upvote-count').text(post.upvotes);
      });
    });

    if (updateMasonry) {
      $newsfeed.imagesLoaded(function() {
        $newsfeed.masonry('prepended', $post);
      });
    }
  };

  window.NewsfeedView = NewsfeedView;
})(this, this.document);
