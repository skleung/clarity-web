(function(window, document, undefined) {
  var SearchView = {};

  SearchView.render = function($body) {
    $('#search-form').bind('submit', function(event) {
      event.preventDefault();
      var query = $('#search-form input[name="query"]').val();
      SearchView.renderSearchMenu($body, query, function($body, post) {
        PendingPostView.render($body, post);
      });
    });
  }

  SearchView.renderSearchMenu = function($body, query, callback) {
    $searchMenu = $body.find('#search-menu');

    SearchModel.search(query, function(error, searchResults) {
      if (error) {
        Util.displayError('Failed to load search results.');
      } else {

        // if (searchResults.length === 0) // No search results available.

        $searchMenu.html(Util.renderSearchResults({ results: searchResults }));

        // Iterates through the results (identified by elements with the class
        // name '.result') and binds a click event to each result to 1) enqueue
        // a pending post and 2) hide the search menu

        $searchMenu.find('.result').each(function(index, value) {
          var $result = $(value);
          $result.bind('click', function(event) {
            var postContent = {
              api: $result.attr('api'),
              src: $result.attr('src'),
              title: $result.attr('title')
            }
            $searchMenu.hide();
            console.log(postContent);
            callback($body, postContent);
          });
        });

        // Binds a click event to hide search menu
        $(document.body).bind('click', function(event) {
          if ($(event.target).closest('.result').length === 0) {
            $searchMenu.hide();
          }
        });
        $searchMenu.show();
      }
    });
  }

  window.SearchView = SearchView;
})(this, this.document);
