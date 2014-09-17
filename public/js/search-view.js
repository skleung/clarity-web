(function(window, document, undefined) {
  var SearchView = {};

  SearchView.renderSearchResults = function($searchDropdown, query) {
    SearchModel.search(query, function(error, searchResults) {
      if (error) {
        // Util.displayError('Failed loading search results.');
      } else {
        $searchDropdown.html(Util.renderSearchResults({
          results: searchResults
        }));
        $searchDropdown.find('.result');
        $searchDropdown.show();
      }
    });
  }

  window.SearchView = SearchView;
})(this, this.document);
