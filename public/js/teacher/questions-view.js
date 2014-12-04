(function(window, document, undefined) {
  var QuestionsView = {};

  // Retrieve and compile the Handlebars template for rendering questions
  var $questionTemplate = $('#question-template');
  var templates = {
    renderQuestion: Handlebars.compile($questionTemplate.html()),
  };

  QuestionsView.createQuestion = function(question) {
    // callback to render the action of creating a question in the view
    QuestionsView.renderQuestion($("#questions"), question);
  }

  QuestionsView.archiveQuestion = function(id) {
    // callback to render the action of archiving a question in the view
  };

  QuestionsView.upvoteQuestion = function(q) {
    $(".question").each(function(index) {
      var curId = $(this).find(".id").val()
      if (curId === q._id) {
        $(this).find('.upvote-count').text(q.upvotes);
        // Get the above question
        var aboveUpvotes = undefined;
        var $aboveQuestion = undefined;
        if (index > 0) {
          $aboveQuestion = $($(".question")[index-1]);
          aboveUpvotes = parseInt($aboveQuestion.find(".upvote-count").html())
        }
        if (aboveUpvotes !== undefined && q.upvotes > aboveUpvotes){
          $aboveQuestion.removeClass('animated bounceIn')
          $aboveQuestion.insertAfter($(this));
          $(this).addClass('animated bounceIn');
        }
      }
    });
  };

  /* Renders the question into the given $question element. */
  QuestionsView.render = function($body) {
    QuestionsModel.connectSocket({
      createQuestion: QuestionsView.createQuestion,
      archiveQuestion: QuestionsView.archiveQuestion,
      upvoteQuestion: QuestionsView.upvoteQuestion
    });

    //render all the questions
    $questions = $body.find('#questions')
    QuestionsModel.loadAll(function(error, questions) {
      if (error) {
        $('.error').text('Failed loading questions.');
      } else {
        questions.forEach(function(question) {
          QuestionsView.renderQuestion($questions, question);
        });
      }
    });
  };

  /* Given question information, renders a question element into $question. */
  QuestionsView.renderQuestion = function($questions, question) {
    var $question = $(templates.renderQuestion(question));
    if (question.active) {
      $question.prependTo($questions);
    }

    $question.find(".archive").click(function(event) {
      $question.find("#archive-confirm").fadeToggle("fast");
    });
    // Delete question when the archive button is clicked
    $question.find('#archive-confirm').click(function(event) {
      event.preventDefault();
      QuestionsModel.remove(question._id, function() {
        // Remove the question from the ticker list
        $question.slideUp("normal", function() { $(this).remove(); } );
      });
    });
  };

  window.QuestionsView = QuestionsView;
})(this, this.document);
