
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
    // callback
  });
  postContentRequest.open('POST', "/postContent", true);
  postContentRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  postContentRequest.send(JSON.stringify({src: url}));
});
