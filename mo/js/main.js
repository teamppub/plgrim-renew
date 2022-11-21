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

	var businessSwiper = new Swiper('.business-swiper', {
		slidesPerView : 'auto',
	});
});
