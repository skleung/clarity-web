var $searchForm = $("#search-form");
var $soundcloudResult = $("#soundcloud-result");
var $youtubeResult = $("#youtube-result");

//callback for the search request
function displaySoundCloudPlayer(searchResults){
   searchResults = JSON.parse(searchResults);

  // ensures search results exist
  if (searchResults.length === 0 || !searchResults[0].permalink_url) {
    $soundcloudResult.html("No tracks found.");
    return;
  }

  // show SoundCloud player
  var trackURL = searchResults[0].permalink_url;
  SC.oEmbed(trackURL, { auto_play: true }, function(embed) {
    $soundcloudResult.html(embed.html);
  });
}

function searchSoundCloud(query) {
  var title = query

  $soundcloudResult.html("Loading Soundcloud results...");

  // make AJAX request to /search
  var searchRequest = new XMLHttpRequest();
  searchRequest.addEventListener("load", function() {
    displaySoundCloudPlayer(searchRequest.responseText);
  });

  searchRequest.open('GET', "/search?title=" + encodeURIComponent(title), true);
  searchRequest.send();
}

//hardcoded height here
function generateYoutubeIframe(videoID) {
  return '<iframe id="ytplayer" type="text/html" width="100%" height="130px" src="http://www.youtube.com/embed/'+videoID+'?autoplay=1" frameborder="0"/>';
}

function displayYoutube(searchResults) {
  searchResults = JSON.parse(searchResults);
  var videoID = searchResults.items[0].id.videoId;
  if (videoID) {
    $youtubeResult.html(generateYoutubeIframe(videoID));
  } else {
    $youtubeResult.html("No results found.");
  }
}

function searchYoutube(query){

  $youtubeResult.html("Loading Youtube Results...");

  // make AJAX request to /searchYoutube
  var searchRequest = new XMLHttpRequest();
  searchRequest.addEventListener("load", function() {
    displayYoutube(searchRequest.response);
  });

  searchRequest.open('GET', "/searchYoutube?title=" + encodeURIComponent(query), true);
  searchRequest.send();
}

function searchAllAPIs(event){
  event.preventDefault();
  var query = $("#search-form input[name='query']").val();

  // validation of input for all APIs
  if (!query) {
    $soundcloudResult.html("Enter a search query!");
    return;
  }

  searchSoundCloud(query);
  searchYoutube(query);
}

SC.initialize({ client_id: "1c3aeb3f91390630d351f3c708148086" });
$searchForm.submit(searchAllAPIs);