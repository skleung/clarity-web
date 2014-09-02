// all the jQuery objects
var $searchForm = $("#search-form");
var $soundcloudResult = $("#soundcloud-result");
var $youtubeResult = $("#youtube-result");
var $spotifyResult = $("#spotify-result");

/* Helper method to generate generic iFrame
 *
 * Arguments:
 * embedURL -- the URL to embed
 */
function generateIframe(embedURL) {
  return '<iframe id="ytplayer" type="text/html" width="100%" height="80px" frameborder="0" src="'+embedURL+'"></iframe>'
}

/* Displays a SoundCloud player for the first search result.
 *
 * Arguments:
 * searchResults -- the raw string of search results from the SoundCloud API
 */
function displaySoundCloudPlayer(searchResults) {
  searchResults = JSON.parse(searchResults);
  if (searchResults[0]) {
    var srcURL = searchResults[0].src;
    $soundcloudResult.html(generateIframe(srcURL));
  } else {
    $soundcloudResult.html("No results found.");
  }
}

/* Displays a Spotify player for the first search result.
 *
 * Arguments:
 * searchResults -- the raw string of search results from the SoundCloud API
 */
function displaySpotify(searchResults) {
  var searchResults = JSON.parse(searchResults);
  if (searchResults[0]) {
    var srcURL = searchResults[0].src;
    $spotifyResult.html(generateIframe(srcURL));
  } else {
    $spotifyResult.html("No results found.");
  }
}

/* Displays a YouTube player for the first search result.
 *
 * Arguments:
 * searchResults -- the raw string of search results from the SoundCloud API
 */
function displayYouTube(searchResults) {
  var searchResults = JSON.parse(searchResults);
  if (searchResults[0]) {
    var srcURL = searchResults[0].src
    $youtubeResult.html(generateIframe(srcURL));
  } else {
    $youtubeResult.html("No results found.");
  }
}

/* Displays loading messages in the result boxes
 *
 */
function displayLoadingMessages() {
  $(".result").show();
  $spotifyResult.html("Loading Spotify Results...");
  $youtubeResult.html("Loading YouTube Results...");
  $soundcloudResult.html("Loading SoundCloud Results...");
}

// make AJAX request to /searchSoundCloud
function searchSoundCloud(query, callback) {
  var searchRequest = new XMLHttpRequest();
  searchRequest.addEventListener("load", function() {
    callback(searchRequest.responseText);
  });
  searchRequest.open('GET', "/searchSoundCloud?q=" + encodeURIComponent(query), true);
  searchRequest.send();
}

// make AJAX request to /searchYouTube
function searchYouTube(query, callback){
  var searchRequest = new XMLHttpRequest();
  searchRequest.addEventListener("load", function() {
    callback(searchRequest.response);
  });
  searchRequest.open('GET', "/searchYouTube?q=" + encodeURIComponent(query), true);
  searchRequest.send();
}

// make AJAX request to /searchSpotify
function searchSpotify(query, callback){
  var searchRequest = new XMLHttpRequest();
  searchRequest.addEventListener("load", function() {
    callback(searchRequest.response);
  });
  searchRequest.open('GET', "/searchSpotify?q=" + encodeURIComponent(query), true);
  searchRequest.send();
}

// Searches APIs via separate invocations of searchYouTube(), searchSoundCloud()
// and searchSpotify()
function searchAll(event) {
  event.preventDefault();
  $(".result").show();
  var query = $("#search-form input[name='query']").val();

  // client-side validation of search query
  if (!query) {
    $soundcloudResult.html("Enter a search query!");
  } else {
    searchYouTube(query, displayYouTube);
    searchSoundCloud(query, displaySoundCloudPlayer);
    searchSpotify(query, displaySpotify);
  }
}

$searchForm.submit(searchAll);







function search(query, callback) {
  var searchRequest = new XMLHttpRequest();
  searchRequest.addEventListener("load", function() {
    callback(searchRequest.response);
  });
  searchRequest.open('GET', "/search?q=" + encodeURIComponent(query), true);
  searchRequest.send();
}
