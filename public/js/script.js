$(".result").click(function() {
  $(".result").removeClass("active");
  $(this).addClass("active");
  $(".select-wrapper").show();
  $(".selected").html($(this).html());
});