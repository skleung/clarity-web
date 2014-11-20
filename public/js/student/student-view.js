(function(window, document, undefined) {
  var StudentView = {};

  StudentView.render = function($questionForm) {
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

  window.StudentView = StudentView;
})(this, this.document);
