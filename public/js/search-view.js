(function(window, document, undefined) {
  // Retrieve and compile the Handlebars template for rendering the search results
  var $searchResultsTemplate = $('#search-results-template');
  var templates = {
    renderSearch: Handlebars.compile($searchResultsTemplate.html())
  };

  var SearchView = {};

  /* Renders the search results into the given $search element. */
  SearchView.render = function($search) {
    $search.find('#search-form').submit(function(event) {
      event.preventDefault();
      var $searchInput = $search.find('#search-form input[name="query"]');
      renderResults($search, $searchInput.val());
    });

    // If the search results are visible and the user clicks on something other than
    // a search result, hide the search results.
    $(window).on('click', function(event) {
      var $target = $(event.target);
      if ($target.closest('.result').size() === 0) {
        $('#search-results').hide();
      }
    });
  };

  /* Searches the different APIs with the provided query and renders the results */
  function renderResults($search, query) {
    var $searchResults = $search.find('#search-results');

    SearchModel.search(query, function(error, results) {
      if (error) {
        $('.error').text('Failed to load search results.');
      } else {
        $searchResults.html(templates.renderSearch({ results: results }));
        $search.find('.result').each(function(index, resultElement) {
            $(resultElement).click(function() {
                selectSearchResult($search, results[index]);
            });
        });

        $searchResults.show();
      }
    });
  }

  /* Creates a new post in the newsfeed from the selected search result information */
  function selectSearchResult($search, result) {
    $search.find('#search-results').hide();
    $search.find('#search-form input[name="query"]').val('');

    Post.add(result, function(error, post) {
      if (error) {
        $('.error').text('Failed to add the post.');
      } else {
        NewsfeedView.renderPost($('#newsfeed'), post);
      }
    });
  }

  window.SearchView = SearchView;
})(this, this.document);
