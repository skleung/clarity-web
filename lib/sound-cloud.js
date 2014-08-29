var request = require('request');

var SC_URL = 'https://api.soundcloud.com/tracks.json';
var SC_CLIENT_ID = '1c3aeb3f91390630d351f3c708148086';

/**
 * Queries SoundCloud for tracks that match the given title and artist. Calls
 * the provided callback with a JSON string of results.
 *
 * @param title -- the title of the song
 * @param artist -- the artist of the song
 *
 * Calls @param callback(error, searchResults):
 *  error -- the error that occurred or null if no error
 *  searchResults -- if error is null, contains the search results
 */
exports.search = function(query, callback) {
  var queryStringParameters = {
    client_id: SC_CLIENT_ID,
    q: query
  };

  // make request to SoundCloud, searching for tracks
  request.get({
    url: SC_URL,
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
