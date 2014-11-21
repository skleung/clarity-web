(function(window, document, undefined) {
  // Retrieve and compile the Handlebars template for rendering questions
  var $questionTemplate = $('#question-template');
  var $understandingTemplate = $('#understanding-template');
  var templates = {
    renderQuestion: Handlebars.compile($questionTemplate.html()),
    renderUnderstanding: Handlebars.compile($understandingTemplate.html())
  };

  var MainView = {};

  MainView.renderCreate = function(question) {
    MainView.renderQuestion($("#questions"), question);
  }

  /* Renders the question into the given $question element. */
  MainView.render = function($body) {
    QuestionModel.connectSocket(MainView.renderCreate);

    //render all the questions
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

    // Render understanding bar
    $bar = $body.find("#bar");
    BarModel.loadUnderstanding(function(error, response) {
      if (error) {
        throw error;
      } else {
        MainView.renderUnderstanding($bar, response)
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

  MainView.renderUnderstanding = function($bar, understanding) {
    var $understanding = $(templates.renderUnderstanding(understanding));
    $bar.html($understanding);
  }

  window.MainView = MainView;
})(this, this.document);
