(function(window, document, undefined) {
  var MainView = {};

  /* Renders the question into the given $question element. */
  MainView.render = function($body) {
    QuestionsView.render($body);
    BarometerView.render($body);
  };

  window.MainView = MainView;
})(this, this.document);
