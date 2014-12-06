(function(window, document, undefined) {

  /* Render the MainView, which handles application logic. */
  MainView.render($(document.body));
  $("#presentation").height($(window).height() - 140);
})(this, this.document);
