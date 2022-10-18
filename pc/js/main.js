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

  if (matchMedia('screen and (min-width: 1640px)').matches) {
    //1640보다 크면
    window.onload = () => {
      document.querySelectorAll('.work-item').forEach(item => {
        item.style.gridRowEnd = `span ${item.clientHeight + 140}`;
      });
      const wrap = document.querySelector('.work-item-list');
      wrap.style.display = 'grid';
      wrap.style.gridTemplateColumns = 'repeat(2, 670px)';
      wrap.style.gap = '0px 60px';
      wrap.style.gridAutoRows = '1px';
    };
  } else {
    window.onload = () => {
      document.querySelectorAll('.work-item').forEach(item => {
        item.style.gridRowEnd = `span ${item.clientHeight + 70}`;
      });
      const wrap = document.querySelector('.work-item-list');
      wrap.style.display = 'grid';
      wrap.style.gridTemplateColumns = 'repeat(2, 570px)';
      wrap.style.gap = '0px 60px';
      wrap.style.gridAutoRows = '1px';
    };
  }
});
