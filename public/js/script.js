
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
  var urlToSave = $(".selected iframe").attr("src");
  console.log(urlToSave);
  //david saves the above string
});