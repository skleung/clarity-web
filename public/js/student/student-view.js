(function(window, document, undefined) {
  var StudentView = {};

  StudentView.renderCreate = function(question) {
    // callback to render action of creating question in view
    console.log(question);
  };

  StudentView.renderArchive = function(id) {
    // callback to render action of archiving question in view
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
