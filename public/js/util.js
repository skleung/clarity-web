(function(window, document, undefined) {
  var Util = {};

  var $newsfeedTemplate = $('#newsfeed-template');
  Util.renderNewsfeed = Handlebars.compile($newsfeedTemplate.html());

  var $searchResultsTemplate = $('#search-results-template');
  Util.renderSearchResults = Handlebars.compile($searchResultsTemplate.html());

  window.Util = Util;
})(this, this.document);
