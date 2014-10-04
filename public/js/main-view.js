(function(window, document, undefined) {
  var MainView = {};

  MainView.render = function($body) {
    NewsfeedView.render($body);
    SearchView.render($body);
  };

  window.MainView = MainView;
})(this, this.document);
