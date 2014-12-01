(function(window, document, undefined) {
  var MainView = {};

  MainView.render = function($body) {
    QuestionsView.render($body);
  };

  window.MainView = MainView;
})(this, this.document);
