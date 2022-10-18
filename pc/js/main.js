$(document).ready(function () {
  //product
  var prdPos = [];
  var visualSwiper = new Swiper('.visual-swiper', {
    loop: true,
    loopAdditionalSlides: 100,
    slidesPerView: 1.2,
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
  });
});
