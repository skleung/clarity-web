(function(window, document, undefined) {
  var BarometerModel = {};

  var POST_URL= '/bars';
  var STATUS_OK = 200;

  /**
   * Loads the level of student understanding
   *
   * Calls: callback(error, questions)
   *  error -- the error that occurred or null if no error occurred
   *  results -- a hash of student parameters as follows:
   *  {numUnderstanding: x, totalUnderstanding: y}
   */
  BarometerModel.loadUnderstanding = function(callback) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      if (request.status === STATUS_OK) {
        callback(null, JSON.parse(request.responseText));
      } else {
        callback(request.responseText, null);
      }
    });

    request.open('GET', POST_URL, true);
    request.send();
  };

  window.BarometerModel = BarometerModel;
})(this, this.document);
