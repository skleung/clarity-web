var request = require('request');

var FLICKR_URL = 'https://api.flickr.com/services/rest/?';
var FLICKR_API_KEY = '3cffcc97867ea6aaf3d7fa2690f0ae10';

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
    'method': 'flickr.photos.search',
    'media': 'photos',
    'text': query,
    'api_key': FLICKR_API_KEY,
    'format': 'json',
    'nojsoncallback': 1
  };

  // make GET request to SoundCloud, searching for tracks
  request.get({
    url: FLICKR_URL,
    qs: queryStringParameters
  }, function(error, response, flickrData) {
    if (error) {
      callback(error);
    } else if (response.statusCode !== 200) {
      callback(new Exception('Received bad status code: ' + response.statusCode));
    } else {
      // Standardize results from API for client
      // console.log(flickrData);
      var parsedSearchResults = JSON.parse(flickrData);
      var responseBody = [];
      var photos = parsedSearchResults.photos.photo;
      photos.forEach(function(entry) {
        responseBody.push({
          'api': 'Flickr',
          'title': entry.title,
          'src': 'https://farm'+entry.farm+'.staticflickr.com/'+entry.server+'/'+entry.id+'_'+entry.secret+'_m.jpg'
        });
      });
      callback(null, JSON.stringify(responseBody));
    }
  });
};
