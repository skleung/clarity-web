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
function displaySoundCloudPlayer(searchResults){
   searchResults = JSON.parse(searchResults);
  // ensures search results exist
  if (searchResults.length === 0 || !searchResults[0].permalink_url) {
    $soundcloudResult.html("No tracks found.");
    return;
  }

  // show SoundCloud player
  var trackURL = searchResults[0].permalink_url;
  SC.oEmbed(trackURL, { auto_play: false, maxheight: "80px" }, function(embed) {
    $soundcloudResult.html(embed.html);
  });
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
  searchResults = JSON.parse(searchResults);
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
function searchSoundCloud(query) {
  var searchRequest = new XMLHttpRequest();
  searchRequest.addEventListener("load", function() {
    displaySoundCloudPlayer(searchRequest.responseText);
  });
  searchRequest.open('GET', "/searchSoundCloud?q=" + encodeURIComponent(query), true);
  searchRequest.send();
}

// make AJAX request to /searchYouTube
function searchYouTube(query){
  var searchRequest = new XMLHttpRequest();
  searchRequest.addEventListener("load", function() {
    displayYouTube(searchRequest.response);
  });
  searchRequest.open('GET', "/searchYouTube?q=" + encodeURIComponent(query), true);
  searchRequest.send();
}

// make AJAX request to /searchSpotify
function searchSpotify(query){
  var searchRequest = new XMLHttpRequest();
  searchRequest.addEventListener("load", function() {
    displaySpotify(searchRequest.response);
  });
  searchRequest.open('GET', "/searchSpotify?q=" + encodeURIComponent(query), true);
  searchRequest.send();
}

function searchAll(event) {
  event.preventDefault();
  $(".result").show();
  var query = $("#search-form input[name='query']").val();

  // client-side validation of search query
  if (!query) {
    $soundcloudResult.html("Enter a search query!");
  } else {
    searchYouTube(query);
    searchSoundCloud(query);
    searchSpotify(query);
  }
}

SC.initialize({ client_id: "1c3aeb3f91390630d351f3c708148086" });
$searchForm.submit(searchAll);
