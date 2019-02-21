'use strict';

import { SubmissionAnalytics } from './submission-analytics.js';

function responsesToggle() {
	//console.log('responses-toggle.js loaded');

	$(document).ready( function() {

		const analytics = new SubmissionAnalytics( gtag );

		$('.feedback-responses-toggle').click(function(e) {
			e.preventDefault();
			responsesToggle( analytics );
		});				
		
	});

	//open and close the menu
	function responsesToggle( analytics ){
		//console.log('responsesToggle');

		if($('body').hasClass('responses-closed')){
			$('#feedback-responses').removeClass('closed').addClass('open');
			$('body').removeClass('responses-closed').addClass('responses-open');
			$('#feedback-responses-label a').text('ﬂ');
			analytics.reportResponsesPaneClicked( 'responses_opened' );
		}
		else if($('body').hasClass('responses-open')){
			$('#feedback-responses').removeClass('open').addClass('closed');
			$('body').removeClass('responses-open').addClass('responses-closed');
			$('#feedback-responses-label a').text('View Responses');
			analytics.reportResponsesPaneClicked( 'responses_closed' );
		}

	}	

}

export { responsesToggle };
