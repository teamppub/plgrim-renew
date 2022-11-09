$(document).ready(function () {
	var visualSwiper = new Swiper('.visual-swiper', {
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		loop: true,
		loopAdditionalSlides: 100,
        // autoHeight : true,
		slidesPerView: 1,
		on: {
			slideChange: function() {
				visualChange(this);
			},
		}
  	});
	function visualChange(slide){
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

	var businessSwiper = new Swiper('.business-swiper', {
		slidesPerView : 'auto',
	});
});
