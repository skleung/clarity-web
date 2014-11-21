(function(window, document, undefined) {

  var $questionTemplate = $('#question-template');
  var templates = {
    renderQuestion: Handlebars.compile($questionTemplate.html())
  };

  var MainView = {};

  MainView.render = function($body) {
    StudentView.render($body.find('#question-form'));

    //render the questions
    $questions = $body.find("#questions")
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
    $question.find('.remove').click(function(event) {
      event.preventDefault();
      QuestionModel.remove(question._id, function() {
        // Remove the question from the ticker list
        $question.slideUp("normal", function() { $(this).remove(); } );
      });
    });

    // Delete question when the archive button is clicked
    $question.find('#up').click(function(event) {
      event.preventDefault();
      QuestionModel.upvote(question._id, function(question) {
        // rerender list to display upvotes?
        $question.find('.upvote-count').text(question.upvotes);
      });
    });

    // Delete question when the archive button is clicked
    $question.find('#down').click(function(event) {
      event.preventDefault();
      QuestionModel.downvote(question._id, function(question) {
        // rerender list to display upvotes?
        $question.find('.upvote-count').text(question.upvotes);
      });
    });
  };
  window.MainView = MainView;
})(this, this.document);
