(function(window, document, undefined) {
  var StudentView = {};

  StudentView.render = function($questionForm) {
    $questionForm.submit(function(event) {
      event.preventDefault();
      QuestionModel.add({
        content: $questionForm.find('input[name=content]').val()
      }, function(error, question) {
        if (error) {
          // $('.error').text('Failed to add the post.');
        } else {
          // Success!
          console.log(question);
        }
      });
    });
  };

  window.StudentView = StudentView;
})(this, this.document);
