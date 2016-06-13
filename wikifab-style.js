
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
		} else {
		    $(".saving-menu").css("position",'fixed');
		    $(".saving-menu").css("top",$movedPosition);
		}
	});
    
    
    // add no-image-yet if not image yet on tutoriel form
	// super com
    
    $( '.form-picture' ).each( function () {

    	var picDetails = $(this).parents('.col-pic-detail');
    	
    	if (! picDetails.find('.sfImagePreviewWrapper').html()) {
    		picDetails.find('.sfImagePreviewWrapper').append('<img src="http://files.wikifab.org/8/89/No-image-yet.jpg">');
    	}
    	
    	var picStep = $(this).parents('.col-pic-step');
    	
    	if (! picStep.find('.sfImagePreviewWrapper').html()) {
    		picStep.find('.sfImagePreviewWrapper').append('<img src="http://files.wikifab.org/8/89/No-image-yet.jpg">');
    	}
    	
	} );
    
    
});


$('body').on('click.collapse-next.data-api', '[data-toggle=collapse-next]', function (e) {
  var $target = $(this).next(".collapse");
  $target.data('bs.collapse') ? $target.collapse('toggle') : $target.collapse();
})