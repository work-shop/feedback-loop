'use strict';

function responsesToggle() {
	//console.log('responses-toggle.js loaded');

	$(document).ready( function() {
		$('.feedback-responses-toggle').click(function(e) {
			e.preventDefault();
			responsesToggle();
		});				
		
	});

	//open and close the menu
	function responsesToggle(){
		//console.log('responsesToggle');

		if($('body').hasClass('responses-closed')){
			$('#feedback-responses').removeClass('closed').addClass('open');
			$('body').removeClass('responses-closed').addClass('responses-open');
			$('#feedback-responses-label a').text('ﬂ');
		}
		else if($('body').hasClass('responses-open')){
			$('#feedback-responses').removeClass('open').addClass('closed');
			$('body').removeClass('responses-open').addClass('responses-closed');
			$('#feedback-responses-label a').text('View Responses');
		}

	}	

}

export { responsesToggle };
