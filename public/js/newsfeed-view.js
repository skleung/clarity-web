(function(window, document, undefined) {
  // Retrieve and compile the Handlebars template for rendering posts
  var $postTemplate = $('#newsfeed-post-template');
  var templates = {
    renderPost: Handlebars.compile($postTemplate.html())
  };

  var NewsfeedView = {};

  // TODO: comment the render
  NewsfeedView.render = function($newsfeed) {
    Post.loadAll(function(error, posts) {
      if (error) {
        $('.error').text('Failed loading posts.');
      } else {
        posts.forEach(function(post) {
          renderPost($newsfeed, post);
        });
      }
    });
  };

  function renderPost($newsfeed, post) {
    $newsfeed.html(templates.renderPost(post) + $newsfeed.html());

    // Delete post when the remove button is clicked
    $post.find('.remove').click(function(event) {
      event.preventDefault();
      Post.remove(post._id, function() {
        $post.remove();
      });
    });

    // Vote up the post when the remove button is upvoted
    $post.find('.upvote').click(function(event) {
      event.preventDefault();
      Post.upvote(post._id, function(post) {
        $post.find('.upvotes').html(post.upvotes);
      });
    });
  }

  window.NewsfeedView = NewsfeedView;
})(this, this.document);
