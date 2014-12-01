(function(window, document, undefined) {
  var StudentView = {};

  var $questionTemplate = $('#question-template');
  var templates = {
    renderQuestion: Handlebars.compile($questionTemplate.html())
  };


  StudentView.renderCreate = function(question) {
    // callback to render action of creating question in view
    StudentView.renderQuestion($("#questions"), question);
  };

  StudentView.renderArchive = function(id) {
    // callback to render action of archiving question in view
  };

  StudentView.renderUpvote = function(q) {
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
  }



  StudentView.render = function($questionForm) {
    // Use "this.renderCreate()" and "this.renderArchive" here?
    QuestionModel.connectSocket(StudentView.renderCreate, StudentView.renderArchive, StudentView.renderUpvote);

    $questionForm.submit(function(event) {
      event.preventDefault();
      QuestionModel.add({
        content: $questionForm.find('input[name=content]').val()
      }, function(error, question) {
        if (error) {
          console.log(error)
        } else {
          console.log("saved question.")
        }
      });
    });
  };

  /* Given question information, renders a question element into $question. */
  StudentView.renderQuestion = function($questions, question) {
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
        //succeeding in upvoting
      });
    });

    // Delete question when the archive button is clicked
    $question.find('#down').click(function(event) {
      event.preventDefault();
      QuestionModel.downvote(question._id, function(question) {
        // rerender list to display upvotes?
      });
    });
  };

  window.StudentView = StudentView;
})(this, this.document);
