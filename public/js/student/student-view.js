(function(window, document, undefined) {
  var StudentView = {};

  var $questionTemplate = $('#question-template');
  var templates = {
    renderQuestion: Handlebars.compile($questionTemplate.html())
  };


  StudentView.renderCreate = function(question) {
    // callback to render action of creating question in view
    // TODO-ALERT: This isn't rendering on another student's page!
    console.log(question);
    StudentView.renderQuestion($("#questions"), question);
  };

  StudentView.renderArchive = function(id) {
    // callback to render action of archiving question in view
    console.log(id);
  };


  StudentView.render = function($questionForm) {
    // Use "this.renderCreate()" and "this.renderArchive" here?
    QuestionModel.connectSocket(StudentView.renderCreate, StudentView.renderArchive);

    $questionForm.submit(function(event) {
      event.preventDefault();
      QuestionModel.add({
        content: $questionForm.find('input[name=content]').val()
      }, function(error, question) {
        if (error) {
          console.log(error)
        } else {
          // Success!
          MainView.render($("body"));
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

  window.StudentView = StudentView;
})(this, this.document);
