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

function youtubeAPIready() {
  
  
}
function searchYoutube(query){
  gapi.client.setApiKey('AIzaSyDDP01Gnj3-wfoqM59xQz6pryJQhmYWCt8');

  gapi.client.load('youtube', 'v3', function() {
    $(".youtube-post-load").fadeIn(100).fadeOut(100); //flashes the post load
    $('input[type="submit"]').removeAttr('disabled');
    console.log("searching youtube for "+query);
    var request = gapi.client.youtube.search.list({
      q: query,
      //The part parameter specifies a comma-separated 
      //list of one or more search resource properties 
      //that the API response will include. Set the parameter 
      //value to snippet. The snippet part has a quota cost of
      // 1 unit.
      part: 'snippet'
    });

    request.execute(function(response) {
      //see https://developers.google.com/youtube/v3/docs/search/list for the structure
      var videoID = response.items[0].id.videoId
      if (videoID) {
        $('#youtube-result').html(generateYoutubeIframe(videoID));
      } else {
        $('#youtube-result').html("No results found.");
      }
    });
  });
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