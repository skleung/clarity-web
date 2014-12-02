(function(window, document, undefined) {

  /* Render the MainView, which handles application logic. */
  MainView.render($(document.body));

  var toggleOn = function() {
    $("#toggle-understanding-off").show();
    $("#toggle-understanding-on").hide();
  }

  var toggleOff = function() {
    $("#toggle-understanding-on").show();
    $("#toggle-understanding-off").hide();
  }
  // toggle logic for the switch
  $("#toggle-understanding-on").click(function() {
    toggleOn();
  })

  $("#toggle-understanding-off").click(function() {
    toggleOff();
  })

})(this, this.document);
