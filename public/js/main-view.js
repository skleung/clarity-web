(function(window, document, undefined) {
  /*
   * Renders the main area, showing newsfeed.
   */

  var MainView = {};

  MainView.render = function($body) {
    var $newsfeed = $body.find('#newsfeed');
    NewsfeedView.render($newsfeed, null);

    var $searchDropdown = $body.find('#search-dropdown');
    $('#search-form').bind('submit', function(event) {
      event.preventDefault();
      var query = $('#search-form input[name="query"]').val();
      SearchView.renderSearchResults($searchDropdown, query);
    })
  };

  window.MainView = MainView;
})(this, this.document);
