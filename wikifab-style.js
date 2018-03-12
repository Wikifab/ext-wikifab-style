
/*
$( document ).ready(function() {
    $(window).scroll(function(){
		// en haut : 
	    //$("#saving-menu").css("top",Math.max(0,250-$(this).scrollTop()));

		$originalPosition = Math.floor($('.footer-main').position().top - $(this).scrollTop());

		$movedPosition = $(this).height() - $('.saving-menu').outerHeight(true)  ;

	    // en bas :position:fixed
	    if($originalPosition < $movedPosition) {
		    $(".saving-menu").css("position",'relative');
		    $(".saving-menu").css("top","");
		    $(".saving-menu").css("margin-left",0);
		} else {
		    $(".saving-menu").css("position",'fixed');
		    $(".saving-menu").css("top",$movedPosition);
		    $(".saving-menu").css("margin-left",$("body").css("margin-left"));
		}
	});
});*/

$( document ).ready(function() {
	$('.file-3D').wrap("<div class='file-3D'></div>");
	$('<span>').addClass('stl-file').prependTo('div.file-3D');
});


$('body').on('click.collapse-next.data-api', '[data-toggle=collapse-next]', function (e) {
  var $target = $(this).next(".collapse");
  $target.data('bs.collapse') ? $target.collapse('toggle') : $target.collapse();
})