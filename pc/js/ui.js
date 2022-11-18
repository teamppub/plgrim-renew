/* 페이징 처리 */
var sOriginImgUrl =  window.location.pathname;
var arSplitUrl   = sOriginImgUrl.split("/");    
var nArLength     = arSplitUrl.length;
var arFileName   = arSplitUrl[nArLength-1];   
var arSplitFileName     = arFileName.split(".")[0];  


var UI = (function () {
  return {
    init: function () {
      this.event();
      this.workList();
    },
    element: {
      header: '.header-wrap',
      btnViewArea : '.btn-more'  
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

      $(lThiz.workListMoreEle).on( "click", this.worklistMore );
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
      //페이지 url값 찾기
      var dataURL = "../../html/json/work.json";
      var lThiz = this.element;

      $.ajax ({
        type : 'get',
        url: dataURL,
        datatype : 'json',
        success : function(data){   
          var max = 6;
          var start = 0;
          //리스트 페이지만 실행
          //처음 데이터가 없을경우 화살표 제거
          if( arSplitFileName == "list"){
            if( data.worksListItem.length == max ){
              $(lThiz.btnViewArea).css( "display", "none");
            }else{
              $(lThiz.btnViewArea).css( "display", "block");
            }
          }
          //json data 
          for( let i = start; i < max; i++){
            if( i%2==0){
                UI.workView(data, i);
            }else{
                UI.workView(data, i);
            }
          }

          //버튼 더보기
          var btnView = '';
          btnView += '<div class="btn-wrap">',
          btnView += '<a href="javascript:;" class="btn-type btn-more">',
          btnView += '<i class="ico-arr down"><span class="hidden">더보기</span></i>',
          btnView += '</a>'
          btnView += '<p class="more">MORE</p>',
          btnView += '</div>'
          $( ".work-item-wrap" ).append( btnView ) ;

          var _cnt = 1;
          //더보기 클릭 시
          $( ".btn-more" ).on( "click", function(e){
            _cnt++;
            //더보기 클릭 이후 갯수 체크 이후 버튼 삭제
            if( data.worksListItem.length == data.worksListItem.length ){
              $(lThiz.btnViewArea).parents( '.btn-wrap').css( "display", "none");
            }
            //더보기 아이템 출력
            for( let i=max*(_cnt-1);i<  data.worksListItem.length; i++){
              if( i%2==0){
                UI.workView(data, i);
                 
              }else{
                UI.workView(data, i);
              }
              if( arSplitFileName == "main" ){
                $( ".item-sub").remove();
              };
            }
          });
        },
        error : function(err){
          console.log('err : ',err)
        }
      });
    },
    workView: function(data, i){
      var str = '';
      str += '<div class="work-item">',
      str += '<a href="javascript:;" data-id="'+data.worksListItem[i].id+'" data-link="'+data.worksListItem[i].itemLink+'" class="btn_work_link">',
      str += '<div class="item-img"><img src="'+data.worksListItem[i].itemImgSrc+'" alt="'+data.worksListItem[i].itemImgArt+'"></div>',
      str += '<div class="item-info">',
      str += '<div class="item-title">'+data.worksListItem[i].itemTitle+'</div>',
      str += '<div class="item-sub">'+data.worksListItem[i].itemSubText+'</div>',
      str += '</div>',
      str += '</a>',
      str += ' </div>'
      if( i%2==0){
        $( ".work-item-list.left" ).append( str );
      }else{
        $( ".work-item-list.right" ).append( str );
      }
      if( arSplitFileName == "main" ){
        $( ".item-sub").remove();
      };
      
      //아이템 클릭시 페이지 이동
      $( ".btn_work_link" ).on( "click", function(){
        var link = $( this )[0].dataset.link;
        var itemId = $( this )[0].dataset.id;
        var urlCheck = window.location.origin;
        var strChage = "build/mo";
        
        if( urlCheck.indexOf( "teamppub" ) != -1){
            location.href = link.replace(/mo/, strChage );
            localStorage.setItem('pageId', itemId);
        }else{
            location.href = link; 
            localStorage.setItem('pageId', itemId);
        }
      })
    },
  };
})();

$(document).ready(function () {
  UI.init();
  
});
