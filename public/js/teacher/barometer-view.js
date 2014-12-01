(function(window, document, undefined) {
  var BarometerView = {};

  // Retrieve and compile the Handlebars template for rendering questions
  var $understandingTemplate = $('#understanding-template');
  var templates = {
    renderUnderstanding: Handlebars.compile($understandingTemplate.html())
  };

  /* Renders the question into the given $question element. */
  BarometerView.render = function($body) {
    // Render understanding bar
    $bar = $body.find("#bar");
    BarometerModel.loadUnderstanding(function(error, response) {
      if (error) {
        throw error;
      } else {
        BarometerView.renderUnderstanding($bar, response)
      }
    });
  };

  BarometerView.renderUnderstanding = function($bar, understanding) {
    var $understanding = $(templates.renderUnderstanding(understanding));
    $bar.html($understanding);
  }

  window.BarometerView = BarometerView;
})(this, this.document);
