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
			init: function( ){
				var currentCount = this.realIndex+1;
				var totalCount = this.loopedSlides;
				var stNum = String("0" + currentCount).slice(-2);
				var totalNum = String("0" + totalCount).slice(-2);
		
				$(".swiper-paging .current-count").text( stNum );
				$(".swiper-paging .total-count").text( totalNum);
			},
			slideChange: function() {
				visualChange(this);
			},
		}
  	});
	function visualChange(slide){
		// console.log('slide가 바뀐 후 실행');
		// console.log("0" + (slide.realIndex + 1));
		var currentCount = slide.realIndex + 1
		var totalCount = slide.loopedSlides;
		var stNum = String("0" + currentCount).slice(-2);
		var totalNum = String("0" + totalCount).slice(-2);

		$(".swiper-paging .current-count").text( stNum );
		$(".swiper-paging .total-count").text( totalNum);
	}

	$('.visual-swiper .swiper-slide').on('mouseenter', function(e){
		visualSwiper.autoplay.stop();
	})
	$('.visual-swiper .swiper-slide').on('mouseleave', function(e){
		visualSwiper.autoplay.start();
	})
});
