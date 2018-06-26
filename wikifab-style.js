
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
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("backToTop").style.display = "block";
    } else {
        document.getElementById("backToTop").style.display = "none";
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

// STEP NUMBER ON TUTORIALS FORM

(function() {

	function refreshStepNumber(){
		var multipleTemplateInstances = $('.multipleTemplateInstance');

		multipleTemplateInstances.each(function (key){
			var multipleTemplateInstance = this;
    		$('.step-number', multipleTemplateInstance).text(mw.msg('wfextstyle-form-step-label') + " " + (multipleTemplateInstances.index(multipleTemplateInstance) + 1));
		});
	}

	function onLoad(){
		var multipleTemplateInstances = $('.multipleTemplateInstance');

		multipleTemplateInstances.each(function (key){
			var multipleTemplateInstance = this;
			var wfFormTutoStepInstructions = $('.WfFormTutoStepInstructions', multipleTemplateInstance).first();
			wfFormTutoStepInstructions.prepend("<div class='step-number'> " + mw.msg('wfextstyle-form-step-label') + " " + (multipleTemplateInstances.index(multipleTemplateInstance) + 1) + "</div>");
		});
	}

	function onNodeAdded($node){
		var wfFormTutoStepInstructions = $('.WfFormTutoStepInstructions', $node).first();
		var multipleTemplateInstances = $('.multipleTemplateInstance');
		wfFormTutoStepInstructions.prepend("<div class='step-number'></div>");

		refreshStepNumber();
	}

	function onNodeRemoved($node){
		refreshStepNumber();
	}

	//see MutationObserver 
	//https://developer.mozilla.org/fr/docs/Web/API/MutationObserver
	function setObserver(){
		//it is assumed that there's only one element with a multipleTemplateList class
		var targetNode = document.getElementsByClassName('multipleTemplate-tutostep')[0].getElementsByClassName('multipleTemplateList')[0];

		if(targetNode){
			//what we observe
			var config = { childList: true };

			var callback = function(mutationsList) {
			    for(var mutation of mutationsList) {
			        if (mutation.type == 'childList') {
			        	//it is assumed that only one element is added at a time
			        	if(mutation.addedNodes[0]){
							onNodeAdded(mutation.addedNodes[0]);
			        	}
			        	if(mutation.removedNodes[0]){
			        		onNodeRemoved(mutation.removedNodes[0]);
			        	}
			        }
			    }
			};

			var observer = new MutationObserver(callback);

			observer.observe(targetNode, config);
		}
	}

	$( document ).ready(function() {
		onLoad();
		setObserver();
	});

})();

// STEP NUMBER ON TUTORIALS FORM - END

$('body').on('click.collapse-next.data-api', '[data-toggle=collapse-next]', function (e) {
  var $target = $(this).next(".collapse");
  $target.data('bs.collapse') ? $target.collapse('toggle') : $target.collapse();
})
