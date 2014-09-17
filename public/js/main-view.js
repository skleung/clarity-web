(function(window, document, undefined) {
  /*
   * Renders the main area, showing newsfeed.
   */

  var MainView = {};

  MainView.render = function($body) {
    var $newsfeed = $body.find('#newsfeed');
    NewsfeedView.render($newsfeed, null);

    var $searchDropdown = $body.find('#search-dropdown');
    var $pendingPost = $body.find('#pending-post');
    $('#search-form').bind('submit', function(event) {
      event.preventDefault();
      var query = $('#search-form input[name="query"]').val();
      SearchView.renderSearchResults($searchDropdown, query, function($result) {
        $result.bind('click', function(event) {
          var pendingPostContent = {
            api: $result.attr('api'),
            src: $result.attr('src'),
            title: $result.attr('title')
          }
          $searchDropdown.hide();
          AddPostView.render($pendingPost, pendingPostContent, $newsfeed);
        });
      });
    });
  };

  window.MainView = MainView;
})(this, this.document);
