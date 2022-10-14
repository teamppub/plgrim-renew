$(document).ready(function () {
	//product
	var prdPos = [];
	var visualSwiper = new Swiper(".visual-swiper", {
		loop: true,
        slidesPerView: 1.5,
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
                return '<em class="' + currentClass + '"></em>' +
                    '<span> / </span>' +
                    '<em class="' + totalClass + '"></em>';
            }
        },
        navigation: {
            nextEl: ".swiper-button-box .button-next",
            prevEl: ".swiper-button-box .button-prev",
        },
	});

    window.onload = () => {
        document.querySelectorAll(".work-item").forEach((item) => {
            item.style.gridRowEnd = `span ${item.clientHeight + 140}`;
        });
        const wrap = document.querySelector(".work-item-list");
        wrap.style.display = "grid";
        wrap.style.gridTemplateColumns = "repeat(2, 670px)";
        wrap.style.gap = "0px 60px";
        wrap.style.gridAutoRows = "1px";
    }
});
