var request = require('request');

var YT_URL = 'https://www.googleapis.com/youtube/v3/search';
var YT_API_KEY = 'AIzaSyDDP01Gnj3-wfoqM59xQz6pryJQhmYWCt8';

/**
 * Queries YouTube for tracks that match the given title and artist. Calls
 * the provided callback with a JSON string of results.
 *
 * @param query - the query for the search
 *
 * Calls @param callback(error, searchResults):
 *  error -- the error that occurred or null if no error
 *  searchResults -- if error is null, contains the search results
 */
exports.search = function(query, callback) {
  var queryStringParameters = {
    key: YT_API_KEY,
    q: query,
    part: "snippet",
    type: "video"
  };

  // make GET request to youtube, searching for tracks
  request.get({
    url: YT_URL,
    qs: queryStringParameters
  }, function(error, response, searchResults) {
    if (error) {
      callback(error);
    } else if (response.statusCode != 200) {
      callback(new Exception('Received bad status code: ' +
        response.statusCode));
    } else {
      callback(null, searchResults);
    }
  });
};
