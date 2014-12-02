(function(window, document, undefined) {
  var QuestionsView = {};

  var $questionTemplate = $('#question-template');
  var $newQuestionTemplate = $('#new-question-template');
  var templates = {
    renderQuestion: Handlebars.compile($questionTemplate.html()),
    renderNewQuestionForm: Handlebars.compile($newQuestionTemplate.html())
  };

  QuestionsView.createQuestion = function(question) {
    // callback to render action of creating question in view
    QuestionsView.renderQuestion($("#questions"), question);
  };

  QuestionsView.archiveQuestion = function(id) {
    // callback to render action of archiving question in view
    $(".question").each(function(index) {
      var curId = $(this).find(".id").val()
      if (curId === id) {
        $(this).slideUp();
      }
    });
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

  QuestionsView.render = function($body) {
    QuestionsModel.connectSocket({
      createQuestion: QuestionsView.createQuestion,
      archiveQuestion: QuestionsView.archiveQuestion,
      upvoteQuestion: QuestionsView.upvoteQuestion
    });

    // Renders the questions
    var $questions = $body.find("#questions");
    QuestionsModel.loadAll(function(error, questions) {
      if (error) {
        $('.error').text('Failed loading questions.');
      } else {
        questions.sort(function(a, b) {
          return b.upvotes - a.upvotes
        });
        questions.forEach(function(question) {
          QuestionsView.renderQuestion($questions, question);
        });
      }
    });
    var $newQuestionForm = $(templates.renderNewQuestionForm())
    $questions.prepend($newQuestionForm);


    var $newQuestionInput = $("#new-question-text");
    var $newQuestionTrigger = $("#add-new-question");
    var $newQuestionSubmitButton = $body.find('#submit-new-question');
    $newQuestionInput.hide();
    $newQuestionSubmitButton.hide()

    $newQuestionTrigger.click(function() {
      $newQuestionInput.fadeIn("fast");
      $newQuestionSubmitButton.show();
      $(this).hide();
    });
    // Attaches event listeners to question form
    
    var addQuestion = function() {
      QuestionsModel.add({
        content: $newQuestionInput.val()
      }, function(error, question) {
        if (error) {
          console.log(error);
        } else {
          console.log("saved question.");
        }
      });
      $newQuestionSubmitButton.hide();
      $newQuestionInput.val("");
      $newQuestionInput.hide();
      $newQuestionTrigger.show();
    };

    $newQuestionSubmitButton.click(function(event) {
      addQuestion();
    });

    $newQuestionInput.keyup(function(event) {
      if (event.keyCode === 13) {
        addQuestion();
      }
    });
  };

  /* Given question information, renders a question element into $question. */
  QuestionsView.renderQuestion = function($questions, question) {
    var $question = $(templates.renderQuestion(question));
    if (question.active) {
      $question.appendTo($questions);
    }

    // Delete question when the archive button is clicked
    $question.find('.remove').click(function(event) {
      event.preventDefault();
      QuestionsModel.remove(question._id, function() {
        // Remove the question from the ticker list
        $question.slideUp("normal", function() { $(this).remove(); } );
      });
    });

    // Delete question when the archive button is clicked
    $question.find('#up').click(function(event) {
      event.preventDefault();
      QuestionsModel.upvote(question._id, function(question) {
        //succeeding in upvoting
      });
    });

    // Delete question when the archive button is clicked
    $question.find('#down').click(function(event) {
      event.preventDefault();
      QuestionsModel.downvote(question._id, function(question) {
        // rerender list to display upvotes?
      });
    });
  };

  window.QuestionsView = QuestionsView;
})(this, this.document);
