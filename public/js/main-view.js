(function(window, document, undefined) {
  var MainView = {};

  MainView.render = function($body) {
    NewsfeedView.render($body.find('#newsfeed'));
    SearchView.render($body.find('#search-wrapper'));
  };

  window.MainView = MainView;
})(this, this.document);
