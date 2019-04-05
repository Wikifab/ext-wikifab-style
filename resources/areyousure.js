(function() {

	$( document ).ready(function() {
		$('#pfForm').areYouSure(
	      {
	        message: mw.msg('wfextstyle-areyousure-alert'),
	        setDirtyOnDOMChange: true
	      }
    	);

    	$('#tutorials-list-form').areYouSure(
	      {
	        message: mw.msg('wfextstyle-areyousure-alert'),
	        setDirtyOnDOMChange: true
	      }
    	);
	});

})();