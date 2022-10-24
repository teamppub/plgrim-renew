var UI = (function () {
  return {
    init: function () {
      this.event();
      this.workList();
    },
    element: {
      header: '.header-wrap',
    },
    event: function () {
      var lThiz = this.element;
      var pos = $('html,body').scrollTop();

      //layout
      if (pos === 0) {
        $(lThiz.header).addClass('top');
      }

      window.addEventListener(
        'scroll',
        function (event) {
          var st = $(this).scrollTop();

          if (pos < st) {
            $(lThiz.header).removeClass('top');
          } else if (st === 0) {
            $(lThiz.header).addClass('top');
          } else {
            $(lThiz.header).removeClass('top');
          }

          pos = st;
        },
        false
      );

      // sub page == gnb active
      var pageTitle = document.querySelector('h6');
      var currentTitle = pageTitle.innerHTML;

      $('.sub-menu .list-depth1 li a[name=link]').each(function () {
        var pageItem = $(this).attr('data-index');

        if (pageItem == currentTitle) {
          $(this).addClass('active');
        } else {
          // $(this).removeClass('active');
        }
      });
    },
    layerPopUp: function (pOption) {
      /*   pOption
       *  {
       *  	 state : 'open'  OR  'close'
       *  	 selId : Layer Selector
       *  }
       */
      var lLayer = $(pOption.selId);
      var dim = $(pOption.selId).find('.dim');

      if (pOption.st !== 'close') {
        lLayer.addClass('active').fadeIn(300);
        dim.show();
        $('body').css({ overflow: 'hidden' });

        if (pOption.selId == '#pop-recruit') {
          var recruitSwiper = new Swiper('.recruit-slider', {
            loop: true,
            slidesPerView: 1,
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
              nextEl: '.button-next',
              prevEl: '.button-prev',
            },
          });
        }
      } else {
        lLayer.removeClass('active').fadeOut(300);
        dim.hide();
        $('body').css({ overflow: '' });
      }
      lLayer.find('.dim, .pop-close').on('click', function (e) {
        e.preventDefault();
        lLayer.removeClass('active').fadeOut(300);
        dim.hide();
        $('body').css({ overflow: '' });
      });
    },
    workList: function () {
      if (matchMedia('screen and (min-width: 1640px)').matches) {
        //   1640보다 크면
        document.querySelectorAll('.work-item').forEach(item => {
          item.style.gridRowEnd = `span ${item.clientHeight + 140}`;
        });
        const wrap = document.querySelector('.work-item-list');
        wrap.style.display = 'grid';
        wrap.style.gridTemplateColumns = 'repeat(2, 670px)';
        wrap.style.gap = '0px 60px';
        wrap.style.gridAutoRows = '1px';
      } else {
        document.querySelectorAll('.work-item').forEach(item => {
          item.style.gridRowEnd = `span ${item.clientHeight + 70}`;
        });
        const wrap = document.querySelector('.work-item-list');
        wrap.style.display = 'grid';
        wrap.style.gridTemplateColumns = 'repeat(2, 570px)';
        wrap.style.gap = '0px 60px';
        wrap.style.gridAutoRows = '1px';
      }
    },
  };
})();

$(document).ready(function () {
  UI.init();
});
