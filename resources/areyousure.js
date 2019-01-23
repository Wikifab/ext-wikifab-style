(function() {

	$( document ).ready(function() {
		$('#pfForm').areYouSure(
	      {
	        message: mw.msg('wfextstyle-areyousure-alert')
	      }
    	);
	});

})();