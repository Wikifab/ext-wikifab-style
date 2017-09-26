(function() {
	// Déclarations des variables
	var link;
	var videoForm;
	var ValeurCochee;

	$(document).ready(function() {

		link = $("#embedVideoFieldLink"); // Variable champ lien
		videoForm = $("#embedVideoForm"); // Variable qui contient formulaire

		$("#showVideoFormBtn").click(function() {
			videoForm.show();
		});

		$(".embedVideoDropdown").change(function() {
			ValeurCochee = $(this).val();
			
			if (ValeurCochee == 'youtube') {
				link.css("display", "block");
				$(".embedVideoUrlInput").attr("placeholder", "Entrez le lien Youtube");
			}

			else if (ValeurCochee == 'vimeo') {
				link.css("display", "block");
				$(".embedVideoUrlInput").attr("placeholder", "Entrez le lien Vimeo");			}
			
			else if (ValeurCochee == 'dailymotion') {
				link.css("display", "block");
				$(".embedVideoUrlInput").attr("placeholder", "Entrez le lien Dailymotion");			}

			else {
				alert("Aucun service n'est sélectionné");
				link.css("display", "none");

			}
		});
	});

})();
