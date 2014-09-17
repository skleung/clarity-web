(function(window, document, undefined) {
  var SearchModel = {};

  var SEARCH_URL = '/search';
  var STATUS_OK = 200;

  SearchModel.search = function(query, callback) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      if (request.status === STATUS_OK) {
        var results = JSON.parse(request.responseText);
        callback(null, results);
      } else {
        callback(request.responseText);
      }
    });
    request.open('GET', SEARCH_URL + '?q=' + encodeURIComponent(query), true);
    request.send();
  }

  window.SearchModel = SearchModel;
})(this, this.document);
