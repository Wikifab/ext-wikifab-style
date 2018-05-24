
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

	$('.videofile').wrap("<div class='videofile'></div>");
	$('<span>').addClass('mp4-file').prependTo('div.videofile');
});

$(function() {
    /**
    * Smooth scrolling to page anchor on click
    **/
    $(".smooth-scroll a[href*='#']:not([href='#'])").click(function() {
        if (
            location.hostname == this.hostname
            && this.pathname.replace(/^\//,"") == location.pathname.replace(/^\//,"")
        ) {
            var anchor = $(this.hash);
            anchor = anchor.length ? anchor : $("[name=" + this.hash.slice(1) +"]");
            if ( anchor.length ) {
                $("html, body").animate( { scrollTop: anchor.offset().top }, 800);
            }
        }
    });
});


$('body').on('click.collapse-next.data-api', '[data-toggle=collapse-next]', function (e) {
  var $target = $(this).next(".collapse");
  $target.data('bs.collapse') ? $target.collapse('toggle') : $target.collapse();
})