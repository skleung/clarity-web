(function(window, document, undefined) {
  // Retrieve and compile the Handlebars template for rendering the search results
  var $searchResultsTemplate = $('#search-results-template');
  var templates = {
    renderSearch: Handlebars.compile($searchResultsTemplate.html())
  };

  var SearchView = {};

  SearchView.render = function($search) {
    $search.find('#search-form').submit(function(event) {
      event.preventDefault();
      var query = $search.find('#search-form input[name="query"]').val();
      renderResults($search, query);
    });

    // If the search results are visible and the user clicks on something other than
    // a search result, hide the search menu.
    $(window).on('click', function(event) {
      var $target = $(event.target);
      if ($target.closest('.result').size() === 0) {
        $('#search-menu').hide();
      }
    });
  };

  function renderResults($search, query) {
    var $searchMenu = $search.find('#search-menu');

    SearchModel.search(query, function(error, results) {
      if (error) {
        $('.error').text('Failed to load search results.');
      } else {
        $searchMenu.html(templates.renderSearch({ results: results }));
        $searchMenu.find('.result').on('click', '.result', function(event) {
          var $result = $(event.currentTarget);
          selectSearchResult($search, $result);
        });

        $searchMenu.show();
      }
    });
  }

  function selectSearchResult($search, $result) {
    var newPost = {
      api: $result.attr('data-api'),
      source: $result.attr('data-source'),
      title: $result.attr('data-title')
    };
    var $searchMenu = $search.find('#search-menu');
    $searchMenu.hide();
    $search.find('#search-form input[name="query"]').val('');

    Post.add(newPost, function(error, post) {
      if (error) {
        $('.error').text('Failed to add post.');
      } else {
        NewsfeedView.renderPost($newsfeed, post);
      }
    });
  }

  window.SearchView = SearchView;
})(this, this.document);
