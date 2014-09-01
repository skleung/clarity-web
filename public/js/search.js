
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
/* Helper method to generate spotify's iframe
 *
 * Arguments:
 * trackURI -- the track's URI (e.g. "spotify:track:2toEICLQiCx8twlZw21eBB")
 */
function generateSpotifyIframe(trackURI) {
  return '<iframe src="https://embed.spotify.com/?uri='+trackURI+'" width="100%" height="80px" frameborder="0" allowtransparency="true"></iframe>';
}
/* Helper method to generate Youtube's iframe
 *
 * Arguments:
 * videoID -- video ID of the youtube video
 */
function generateYoutubeIframe(videoID) {
  return '<iframe id="ytplayer" type="text/html" width="100%" height="80px" src="http://www.youtube.com/embed/'+videoID+'" frameborder="0"/>';
}
/* Displays a SoundCloud player for the first search result.
 *
 * Arguments:
 * searchResults -- the raw string of search results from the SoundCloud API
 */
function displaySoundCloudPlayer(searchResults){
   searchResults = JSON.parse(searchResults);
   console.log(searchResults);
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
  // var videoID = searchResults.items[0].id.videoId;
  if (searchResults.tracks.items[0]) {
    var trackURI = searchResults.tracks.items[0].uri;
    $spotifyResult.html(generateSpotifyIframe(trackURI));
  } else {
    $spotifyResult.html("No results found.");
  }
}

/* Displays a YouTube player for the first search result.
 *
 * Arguments:
 * searchResults -- the raw string of search results from the SoundCloud API
 */
function displayYoutube(searchResults) {
  searchResults = JSON.parse(searchResults);
  var videoID = searchResults.items[0].id.videoId;
  if (videoID) {
    $youtubeResult.html(generateYoutubeIframe(videoID));
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
/* Displays a SoundCloud player for the first search result.
 *
 * Arguments:
 * searchResults -- the raw string of search results from the SoundCloud API
 */
function searchSoundCloud(query) {

  // make AJAX request to /search
  var searchRequest = new XMLHttpRequest();
  searchRequest.addEventListener("load", function() {
    displaySoundCloudPlayer(searchRequest.responseText);
  });

  searchRequest.open('GET', "/searchSoundcloud?queryStr=" + encodeURIComponent(query), true);
  searchRequest.send();
}

function searchYoutube(query){

  // make AJAX request to /searchYoutube
  var searchRequest = new XMLHttpRequest();
  searchRequest.addEventListener("load", function() {
    displayYoutube(searchRequest.response);
  });

  searchRequest.open('GET', "/searchYoutube?queryStr=" + encodeURIComponent(query), true);
  searchRequest.send();
}

function searchSpotify(query){

  // make AJAX request to /searchSpotify
  var searchRequest = new XMLHttpRequest();
  searchRequest.addEventListener("load", function() {
    displaySpotify(searchRequest.response);
  });

  searchRequest.open('GET', "/searchSpotify?queryStr=" + encodeURIComponent(query), true);
  searchRequest.send();
}

function searchAllAPIs(event){
  event.preventDefault();
  $(".result").show();

  var query = $("#search-form input[name='query']").val();

  // validation of input for all APIs
  if (!query) {
    $soundcloudResult.html("Enter a search query!");
    return;
  }

  searchSoundCloud(query);
  searchYoutube(query);
  searchSpotify(query);
}

SC.initialize({ client_id: "1c3aeb3f91390630d351f3c708148086" });
$searchForm.submit(searchAllAPIs);