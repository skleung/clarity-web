(function(window, document, undefined) {
  // Retrieve and compile the Handlebars template for rendering questions
  var $questionTemplate = $('#question-template');
  var templates = {
    renderQuestion: Handlebars.compile($questionTemplate.html())
  };

  var MainView = {};

  /* Renders the question into the given $question element. */
  MainView.render = function($body) {
    $questions = $body.find('#questions')
    QuestionModel.loadAll(function(error, questions) {
      if (error) {
        $('.error').text('Failed loading questions.');
      } else {
        questions.forEach(function(question) {
          MainView.renderQuestion($questions, question);
        });
      }
    });
  };

  /* Given question information, renders a question element into $question. */
  MainView.renderQuestion = function($questions, question) {
    var $question = $(templates.renderQuestion(question));
    if (question.active) {
      $question.prependTo($questions);
    }

    // Delete question when the archive button is clicked
    $question.find('.archive').click(function(event) {
      event.preventDefault();
      QuestionModel.remove(question._id, function() {
        // Remove the question from the ticker list
        $question.slideUp("normal", function() { $(this).remove(); } );
      });
    });
  };

  window.MainView = MainView;
})(this, this.document);
