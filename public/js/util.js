(function(window, document, undefined) {
  var Util = {};

  var $searchResultsTemplate = $('#search-results-template');
  Util.renderSearchPanel = Handlebars.compile($searchResultsTemplate.html());

  var $newsfeedPostTemplate = $('#newsfeed-post-template');
  Util.renderNewsfeedPost = Handlebars.compile($newsfeedPostTemplate.html());

  /**
   * Displays a notification message with the given text.
   */

  Util.displayError = function(text) {
    $('.error').text(text);
  };


  window.Util = Util;
})(this, this.document);
