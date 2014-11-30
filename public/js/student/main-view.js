(function(window, document, undefined) {

  var MainView = {};


  MainView.render = function($body) {
    StudentView.render($body.find('#question-form'));
    QuestionModel.connectSocket(StudentView.renderCreate, StudentView.renderArchive);
    //render the questions
    $questions = $body.find("#questions");
    QuestionModel.loadAll(function(error, questions) {
      if (error) {
        $('.error').text('Failed loading questions.');
      } else {
        questions.forEach(function(question) {
          StudentView.renderQuestion($questions, question);
        });
      }
    });

    
  };
  window.MainView = MainView;
})(this, this.document);
