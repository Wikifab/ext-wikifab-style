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

	$('video').wrap("<div class='videofile'></div>");
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

// STEP NUMBER ON TUTORIALS FORM

(function() {

	function refreshStepNumber(){
		var multipleTemplateInstances = $(".multipleTemplate-tutostep .multipleTemplateInstance");

		multipleTemplateInstances.each(function (key){
			var multipleTemplateInstance = this;
    		$('.step-number', multipleTemplateInstance).text(mw.msg('wfextstyle-form-step-label') + " " + (multipleTemplateInstances.index(multipleTemplateInstance) + 1));
		});
	}

	function onLoad(){
		var multipleTemplateInstances = $('.multipleTemplate-tutostep .multipleTemplateInstance');

		multipleTemplateInstances.each(function (key){
			var multipleTemplateInstance = this;
			var wfFormTutoStepInstructions = $('.WfFormTutoStepInstructions', multipleTemplateInstance).first();
			wfFormTutoStepInstructions.prepend("<div class='step-number'> " + mw.msg('wfextstyle-form-step-label') + " " + (multipleTemplateInstances.index(multipleTemplateInstance) + 1) + "</div>");
		});
	}

	function onNodeAdded($node){
		var wfFormTutoStepInstructions = $('.WfFormTutoStepInstructions', $node).first();
		if ( !wfFormTutoStepInstructions.find('.step-number').length ) {
		    // Do something
		    wfFormTutoStepInstructions.prepend("<div class='step-number'></div>");
		}

		refreshStepNumber();
	}

	function onNodeRemoved($node){
		refreshStepNumber();
	}

	//see MutationObserver 
	//https://developer.mozilla.org/fr/docs/Web/API/MutationObserver
	function setObserver(){
		//it is assumed that there's only one element with a multipleTemplateList class
		var e = document.getElementsByClassName('multipleTemplate-tutostep')[0];
		if(e){
			var targetNode = e.getElementsByClassName('multipleTemplateList')[0];

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
	}

	$( document ).ready(function() {
		onLoad();
		setObserver();
	});

})();

(function () {

	function onLoad(){
		
		var $dokitSosRadios = $('.multipleTemplate-dokitstep .multipleTemplateInstance .dokit-sos-radio');
		$dokitSosRadios.each(function( index ) {
			var $radios = $(this).find('input[name^=DokitPageStep]');
			$radios.on('click', function () {
				var $radios = $( this ).parents('.dokit-sos-radio').find('input[name^=DokitPageStep]');
				var checkedRadioIndex = $radios.index($( this ));
				if ( checkedRadioIndex != 0 ) {
					$( this ).parents('.dokit-sos-radio').hide();
				}
			});
			var $checkedRadio = $(this).find('input[name^=DokitPageStep]:checked');
			var checkedRadioIndex = $radios.index($checkedRadio);
			if ( checkedRadioIndex != 0 ) {
				$( this ).hide();
			} else {

			}
		});
	}

	function onNodeAdded(node){

		$dokitSosRadios = $('.dokit-sos-radio', node );
		var $radios = $('.dokit-sos-radio input[name^=DokitPageStep]', node );
		$radios.on('click', function () {
			var $radios = $( this ).parents('.dokit-sos-radio').find('input[name^=DokitPageStep]');
			var checkedRadioIndex = $radios.index($( this ));
			if ( checkedRadioIndex != 0 ) {
				$( this ).parents('.dokit-sos-radio').hide();
			}
		});
	}

	//see MutationObserver 
	//https://developer.mozilla.org/fr/docs/Web/API/MutationObserver
	function setObserver(){
		//it is assumed that there's only one element with a multipleTemplateList class
		var e = document.getElementsByClassName('multipleTemplate-dokitstep')[0];
		if(e){
			var targetNode = e.getElementsByClassName('multipleTemplateList')[0];

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
				        }
				    }
				};

				var observer = new MutationObserver(callback);

				observer.observe(targetNode, config);
			}
		}
	}

	$( document ).ready(function() {
		if ( $( '.multipleTemplate-dokitstep' ).length ) {
			onLoad();
			setObserver();
		}
	});
})();

// STEP NUMBER ON TUTORIALS FORM - END

$('body').on('click.collapse-next.data-api', '[data-toggle=collapse-next]', function (e) {
  var $target = $(this).next(".collapse");
  $target.data('bs.collapse') ? $target.collapse('toggle') : $target.collapse();
});

(function () {

	var exists = null;

	// #CreateNewPage popup
	// check whether the page already exists! If so, then display an error message. Otherwise, redirect.

	function pageExists(form, search, namespace) {

		// fonction to do second request to execute follow action
		function ajaxQuery(jsondata) {

			var token = jsondata.query.tokens.csrftoken;

			var data = {
				action : 'query',
				format : 'json',
				list : 'search',
				srsearch : search,
				token : token
			};

			if (namespace != 'undefined') {
				data.srnamespace = namespace;
			}

			$.ajax({
				type : "POST",
				url : mw.util.wikiScript('api'),
				data : data,
				dataType : 'json',
				success : function(jsondata) {

					if (jsondata.query.searchinfo.totalhits > 0) {
						exists = true;
					} else {
						exists = false;
					}

					$(form).submit();
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log(textStatus);
					console.log(jqXHR);
					console.log(errorThrown);
				}
			});
		}
		;

		// first request to get token
		$.ajax({
			type : "GET",
			url : mw.util.wikiScript('api'),
			data : {
				action : 'query',
				format : 'json',
				meta : 'tokens',
				type : 'csrf'
			},
			dataType : 'json',
			success : ajaxQuery
		});
	}

	var messages = {

		clear : function() {
			$('#CreateNewPage .alert').remove();
		},
		msg : function(e, txt) {

			this.clear();

			var message = document.createElement("div");

			message.classList.add("alert");
			message.classList.add("alert-danger");
			message.innerHTML = txt;

			$(e).prepend(message);
		}
	};

	$('#CreateNewPage form').on('submit', function(e) {

		if (exists === null) {

			e.preventDefault(); //don't send the form yet

			data = $(this).serializeArray();

			var search = data.filter(obj => {
			  return obj.name === "page_name"
			});

			var namespace = data.filter(obj => {
			  return obj.name === "namespace"
			});

			search = search[0].value;

			if (namespace != 'undefined' && namespace.length) {
				namespace = mw.config.get( 'wgNamespaceIds' )[namespace[0].value.toLowerCase()];
			} else {
				namespace = false;
			}
			
			namespace ? pageExists(this, search, namespace) : pageExists(this, search);
		}

		if (exists === true) {

			e.preventDefault(); //don't send the form yet

			messages.msg(this, mw.msg('wfextstyle-page-already-exists'));

			exists = null;

			$( this ).find('[name=page_name]').first().one( "click", function() {
			  messages.clear();
			});
		}

	});
})();