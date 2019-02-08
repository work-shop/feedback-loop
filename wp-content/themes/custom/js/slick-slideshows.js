'use strict';

var slick = require ('slick-carousel');

function slickSlideshows( config ) {
	//console.log('slick-slideshows.js loaded');

	$( document ).ready( function() {

		$('.slick-default').slick({
			slidesToShow: config.slidesToShow,
			dots: config.dots,
			arrows: config.arrows,
			autoplay: config.autoplay,
			fade: config.fade,
			autoplaySpeed: config.autoplaySpeed,
			speed: config.speed
		});

		$('#feedback-responses-slick').slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			vertical: true,
			dots: false,
			arrows: true,
			autoplay: false,
			fade: false,
			adaptiveHeight: false,
			autoplaySpeed: 7000,
			speed: 700
		});

	});

}


export { slickSlideshows };
