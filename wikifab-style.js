
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

// BACK TO TOP

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
	var backToTop = document.getElementById("backToTop");
    if (backToTop){
    	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
	        backToTop.style.display = "block";
	    } else {
	       	backToTop.style.display = "none";
	    }
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	$('body, html').stop().animate({scrollTop:0}, 500, 'swing', function() { 
	});
} 

// BACK TO TOP - END


// SMOOTH SCROLLING PAGE ANCHOR

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

// SMOOTH SCROLLING PAGE ANCHOR - END

// LOGIN POPUP ON CLICK ON EDIT BUTTON (Not logged in)

(function() {
	$( document ).ready(function() {
		$('#ca-edit a, #ca-formedit a').click(function(e){
			if (! mw.config.get('wgUserId')) {
				e.preventDefault();
				displayModal();
				return;
			}
		});
	});

	function displayModal() {
		$( "#connectionRequiredModal" ).modal();
	}
})();
	
// LOGIN POPUP ON CLICK ON EDIT BUTTON - END


$('body').on('click.collapse-next.data-api', '[data-toggle=collapse-next]', function (e) {
  var $target = $(this).next(".collapse");
  $target.data('bs.collapse') ? $target.collapse('toggle') : $target.collapse();
})
