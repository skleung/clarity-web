(function(window, document, undefined) {
  var SearchView = {};

  SearchView.renderSearchResults = function($searchDropdown, query, callback) {
    SearchModel.search(query, function(error, searchResults) {
      if (error) {
        // Util.displayError('Failed loading search results.');
      } else {
        // if (searchResults.length === 0) // No search results available.
        $searchDropdown.html(Util.renderSearchResults({ results: searchResults }));

        // Iterate through results, bind click event to queue post
        $searchDropdown.find('.result').each(function(index, value) {
          var $result = $(value);
          callback($result);
        });
        $searchDropdown.show();
      }
    });
  }

  window.SearchView = SearchView;
})(this, this.document);
