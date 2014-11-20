(function(window, document, undefined) {
  var MainView = {};

  MainView.render = function($body) {
    StudentView.render($body.find('#question-form'));
  };

  window.MainView = MainView;
})(this, this.document);
