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
        questions.sort(function(a, b) {
          return b.upvotes - a.upvotes
        });
        questions.forEach(function(question) {
          QuestionsView.renderQuestion($questions, question);
        });
      }
    });

    $questions.click(function(event) {
      event.preventDefault;
      QuestionsView.selectQuestion($questions, $(event.target));
    });

    $(document).keydown(function(event) {
      if (event.keyCode === 38) {
        event.preventDefault;
        QuestionsView.selectPrevQuestion($questions);
      }
      if (event.keyCode === 40) {
        event.preventDefault;
        QuestionsView.selectNextQuestion($questions);
      }
    });
  };

  QuestionsView.selectQuestion = function($questions, $target) {
    $questions.find('.selected-question').removeClass('selected-question');
    $target.closest('li.question').addClass('selected-question');
  }

  QuestionsView.selectPrevQuestion = function($questions) {
    var $selected = $questions.find('.selected-question').removeClass('selected-question');
    if ($selected) {
      var $siblings = $questions.children();
      $siblings.eq(($siblings.index($selected) - 1) % $siblings.length).addClass('selected-question');
    }
  }

  QuestionsView.selectNextQuestion = function($questions) {
    var $selected = $questions.find('.selected-question');
    $selected.removeClass('selected-question');
    var $siblings = $questions.children();
    if ($selected.length === 0) {
      $siblings.eq(0).addClass('selected-question');
    } else {
      $siblings.eq(($siblings.index($selected) + 1) % $siblings.length).addClass('selected-question');
    }
  }

  /* Given question information, renders a question element into $question. */
  QuestionsView.renderQuestion = function($questions, question) {
    var $question = $(templates.renderQuestion(question));
    if (question.active) {
      $question.appendTo($questions);
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

    $(document).keydown(function(event) {
      if (event.keyCode === 39 || event.keyCode === 32) {
        event.preventDefault();
        if ($question.hasClass('selected-question')) {
          QuestionsModel.remove(question._id, function() {
            // Remove the question from the ticker list
            $question.slideUp("normal", function() { $(this).remove(); } );
          });
        }
      }
    });
  };

  window.QuestionsView = QuestionsView;
})(this, this.document);
