var request = require('request');

var SPOTIFY_URL = 'https://api.spotify.com/v1/search';

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
    q: query,
    type: "track"
  };

  // make GET request to youtube, searching for tracks
  request.get({
    url: SPOTIFY_URL,
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
