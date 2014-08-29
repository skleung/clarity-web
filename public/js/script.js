var $searchForm = $("#search-form");
var $soundcloudResult = $("#soundcloud-result");
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
  SC.oEmbed(trackURL, { "height": "81px", auto_play: true }, function(embed) {
    $soundcloudResult.html(embed.html);
  });
}

function searchSoundCloud() {
  event.preventDefault();

  var title = $("#search-form input[name='query']").val();

  $soundcloudResult.html("Loading Soundcloud results...");

  // make AJAX request to /search
  var searchRequest = new XMLHttpRequest();
  searchRequest.addEventListener("load", function() {
    displaySoundCloudPlayer(searchRequest.responseText);
  });

  searchRequest.open('GET', "/search?title=" + encodeURIComponent(title), true);
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

  searchSoundCloud();
}

SC.initialize({ client_id: "1c3aeb3f91390630d351f3c708148086" });
$searchForm.submit(searchAllAPIs);