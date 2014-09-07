
function generateIframe(embedURL) {
  return '<iframe id="ytplayer" type="text/html" width="100%" height="80px" frameborder="0" src="'+embedURL+'"></iframe>'
}

function generateFeed(responseText) {
  var feeds = JSON.parse(responseText);
  $("ul.newsfeed-list").empty();
  for (var i=0; i<feeds.length; i++) {
    var srcURL = feeds[i].src;
    var newPost = $("<li>", {id:"feed-"+i});
    newPost.html(generateIframe(srcURL));
    $("ul.newsfeed-list").append(newPost);
  }
}

function updateFeed() {
  var searchRequest = new XMLHttpRequest();
  searchRequest.addEventListener("load", function() {
    generateFeed(searchRequest.response);
  });
  searchRequest.open('GET', "/getContent", true);
  searchRequest.send();
}

// click handlers
$(".result").click(function() {
  // activates the selection of the media boxes
  $(".result").removeClass("active");
  $(this).addClass("active");

  // shows and overwrites the selected wrapper that is above the newsfeed
  $(".select-wrapper").show();
  $(".selected").html($(this).html());
});

$("#post-button").click(function() {
  var url = $(".selected iframe").attr("src");
  var postContentRequest = new XMLHttpRequest();
  postContentRequest.addEventListener("load", function() {
    updateFeed();
  });
  postContentRequest.open('POST', "/postContent", true);
  postContentRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  postContentRequest.send(JSON.stringify({src: url}));
});

updateFeed();
