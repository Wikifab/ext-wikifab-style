(function() {

	$( document ).ready(function() {

    	$('#tutorials-list-form').areYouSure(
	      {
	        message: mw.msg('wfextstyle-areyousure-alert'),
	        setDirtyOnDOMChange: true
	      }
    	);
    }
})();