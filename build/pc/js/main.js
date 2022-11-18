$(document).ready(function () {
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
		navigation: {
			nextEl: '.swiper-button-box .button-next',
			prevEl: '.swiper-button-box .button-prev',
		},
		breakpoints: {
			1640: {
				spaceBetween: 50,
			},
		},
		on: {
			slideChange: function() {
				visualChange(this);
			},
		}
  	});
	function visualChange(slide){
		// console.log('slide가 바뀐 후 실행');
		// console.log("0" + (slide.realIndex + 1));
		var currentCount = "0" + (slide.realIndex + 1)
		var totalCount = "0" + (slide.loopedSlides);
		$(".swiper-paging .current-count").text(currentCount)
		$(".swiper-paging .total-count").text(totalCount)
	}

	$('.visual-swiper .swiper-slide').on('mouseenter', function(e){
		visualSwiper.autoplay.stop();
	})
	$('.visual-swiper .swiper-slide').on('mouseleave', function(e){
		visualSwiper.autoplay.start();
	})
});