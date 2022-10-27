$(document).ready(function () {
	//product
	var prdPos = [];
	var visualSwiper = new Swiper('.visual-swiper', {
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		loop: true,
		loopAdditionalSlides: 100,
		// slidesPerView: 1.2,
		slidesPerView: "auto",
		spaceBetween: 100,
		centeredSlides: true,
		pagination: {
			el: '.swiper-paging',
			type: 'fraction',
			formatFractionCurrent: function (number) {
        		return ('0' + number).slice(-2);
      		},
			formatFractionTotal: function (number) {
				return ('0' + number).slice(-2);
			},
			renderFraction: function (currentClass, totalClass) {
				return (
					'<em class="' +
					currentClass +
					'"></em>' +
					'<span> / </span>' +
					'<em class="' +
					totalClass +
					'"></em>'
				);
			},
    	},
		navigation: {
			nextEl: '.swiper-button-box .button-next',
			prevEl: '.swiper-button-box .button-prev',
		},
		breakpoints: {
			1640: {
			  spaceBetween: 50,
			},
		  },
  	});

	$('.visual-swiper .swiper-slide').on('mouseenter', function(e){
		// console.log('stop autoplay');
		visualSwiper.autoplay.stop();
	})
	$('.visual-swiper .swiper-slide').on('mouseleave', function(e){
		// console.log('start autoplay');
		visualSwiper.autoplay.start();
	})
});
