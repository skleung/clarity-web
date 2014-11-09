var request = require('request');

var FLICKR_URL = 'https://api.flickr.com/services/rest/?';
var FLICKR_API_KEY = '3cffcc97867ea6aaf3d7fa2690f0ae10';
var STATUS_OK = 200;

/**
 * Queries SoundCloud for tracks that match the given title and artist.
 *
 * @param title -- the title of the song
 * @param artist -- the artist of the song
 *
 * Calls @param callback(error, searchResults):
 *  error -- the error that occurred or null if no error
 *  searchResults -- if error is null, contains the search results
 */
exports.search = function(query, callback) {
  var params = {
    'method': 'flickr.photos.search',
    'media': 'photos',
    'text': query,
    'api_key': FLICKR_API_KEY,
    'format': 'json',
    'nojsoncallback': 1
  };

  // Make GET request to SoundCloud, searching for tracks
  request.get({
    url: FLICKR_URL,
    qs: params
  }, function(error, response, data) {
    if (error) {
      callback(error);
    } else if (response.statusCode !== STATUS_OK) {
      callback(new Exception('Received bad status code: ' + response.statusCode));
    } else {
      var photos = JSON.parse(data).photos.photo;
      var results = photos.map(function(photo) {
        var photoUrl = [
          'https://farm', photo.farm,
          '.staticflickr.com/', photo.server,
          '/', photo.id, '_', photo.secret, '_m.jpg'
        ].join('');

        return {
          'title': photo.title,
          'source': photoUrl
        };
      });
      callback(null, results);
    }
  });
};
