(function(window, document, undefined) {
  var QuestionsView = {};

  var $questionTemplate = $('#question-template');
  var templates = {
    renderQuestion: Handlebars.compile($questionTemplate.html())
  };

  QuestionsView.createQuestion = function(question) {
    // callback to render action of creating question in view
    QuestionsView.renderQuestion($("#questions"), question);
  };

  QuestionsView.archiveQuestion = function(id) {
    // callback to render action of archiving question in view
    console.log(id);
    // delete question with associated id from questions-list (server-side
    // socket.io has been configured)
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
          return a.upvotes - b.upvotes
        });
        questions.forEach(function(question) {
          QuestionsView.renderQuestion($questions, question);
        });
      }
    });

    // Attaches event listeners to question form
    var $questionForm = $body.find('#question-form');
    $questionForm.submit(function(event) {
      event.preventDefault();
      QuestionsModel.add({
        content: $questionForm.find('input[name=content]').val()
      }, function(error, question) {
        if (error) {
          console.log(error);
        } else {
          console.log("saved question.");
        }
      });
    });
  };

  /* Given question information, renders a question element into $question. */
  QuestionsView.renderQuestion = function($questions, question) {
    var $question = $(templates.renderQuestion(question));
    if (question.active) {
      $question.prependTo($questions);
    }

    // // Delete question when the archive button is clicked
    // $question.find('.remove').click(function(event) {
    //   event.preventDefault();
    //   QuestionsModel.remove(question._id, function() {
    //     // Remove the question from the ticker list
    //     $question.slideUp("normal", function() { $(this).remove(); } );
    //   });
    // });

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
