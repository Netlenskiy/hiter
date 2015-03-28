$( function () {

	function scrollWindow (into) {
		var doc = document.documentElement.scrollTop ? document.documentElement : document.body;
		$(doc).animate({
			scrollTop: into
		}, {
			duration: 1000
		});
	}
	var buttons = $("input[type=image]").on('mousedown', function(event) {
		event.preventDefault();
	});
	var navLinks = $("#menu a").on('click', function(event) {
		event.preventDefault();
		scrollWindow( $(event.target).attr("into") );
		console.log("event.target.into ", $(event.target).attr("into"));
	});
			$(document).on('click', function(event) {
				event.preventDefault();
				console.log(event.clientY + document.body.scrollTop);
			});
});