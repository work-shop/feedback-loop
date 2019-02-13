'use strict';

var focused = false;
var focusedIn = false;

function ui(){
	//console.log("ui.js loaded");

	$(document).ready( function() {

		$( '.feedback-input' ).focus(function() {
			console.log('focus in');
			focused = true;
			setTimeout(function() {
				toggleFocus();	
			}, 10);
			
		});

		$( '.feedback-input' ).focusout(function() {
			console.log('focus out');

			if( $('#feedback-input-textarea').is(':focus') || $('#feedback-input-name').is(':focus') || $('#feedback-input-email').is(':focus') ){
				focused = true;
			} else{
				focused = false;
			}
			setTimeout(function() {
				toggleFocus();	
			}, 10);
			

		});


	});


	function toggleFocus(){
		if( focused ){
			$('body').removeClass('focus-off').addClass('focus-on');
			$('html,body').animate({
				scrollTop: 0
			}, 0);
		} else{
			$('body').removeClass('focus-on').addClass('focus-off');
		}
	}

}


export { ui };