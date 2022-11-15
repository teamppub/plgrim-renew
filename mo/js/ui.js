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
            wrap : '#wrap',
            header: '.header-wrap',
            gnbBtn: '.btn-gnb',
            gnbWrap: '.gnb-wrap',
            top: '#btn-top',
            btnViewArea : '.btn-wrap'  
        },
        event: function () {
            var lThiz = this.element;
            var pos = $('html,body').scrollTop();

            //layout
            if (pos === 0) {
                $(lThiz.header).addClass('top');
                $(lThiz.top).addClass('up');
            }

            window.addEventListener('scroll', function (event) {
                var st = $(this).scrollTop();

                if (pos < st) {
                    $(lThiz.header).removeClass('top');
                    $(lThiz.top).removeClass('up');
                } else if (st === 0) {
                    $(lThiz.header).addClass('top');
                    $(lThiz.top).addClass('up');
                } else {
                    $(lThiz.header).removeClass('top');
                }


                if( (st + $(window).height()) >=  Math.floor($( "footer" ).offset().top )){
                    $(lThiz.wrap).css( "position", "relative" );
                    $(lThiz.top).addClass( "sticky" );
                }else{
                    $(lThiz.wrap).css( "position", "" );
                    $(lThiz.top).removeClass( "sticky" );
                }
      


                pos = st;
            }, false);

            
			$(lThiz.gnbBtn).on('click', function() {
				var navItem = $( ".gnb-list" ).find( "li" );
                var itemDelay =  0.03;
                var itemSpeed = 0.55;
                if( !$(this).find(".icon-menu").hasClass( "open" )){
                    navItem.each( function( index, item ){
                        gsap.set( item, { x: (navItem.eq(index).width()) , opacity:0});
                        gsap.to( item, itemSpeed,{ x:0, opacity:1,  ease:Sine.easeOut, delay: itemDelay * index })
                    })
                }else{
                    gsap.killTweensOf(navItem);
                }
                
                $(this).find(".icon-menu").toggleClass("open");
                $("body").toggleClass("fixed");
				$(lThiz.gnbWrap).toggleClass('active');

				// gnbBtn.toggleClass("active");
			});

            $(lThiz.top).on("click", function () {
                $("html, body").animate({ scrollTop: "0" }, 300);
            });

            // sub page == gnb active
            var pageTitle = document.querySelector("h6");
            var currentTitle = pageTitle.innerHTML;

            $(".sub-menu .list-depth1 li a[name=link]").each(function() { 
                var pageItem = $(this).attr("data-index"); 

                if(pageItem == currentTitle) {
                    $(this).addClass("active")
                } 
                else {
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
            var dim = $(pOption.selId).find(".dim");

            if (pOption.st !== "close") {
                lLayer.addClass('active').fadeIn(300);
                dim.show();
                $("body").css({ overflow: "hidden" });
                
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
                $("body").css({ overflow: "" });
            }

            lLayer.find(".dim, .pop-close").on("click", function (e) {
                e.preventDefault();
                lLayer.removeClass('active').fadeOut(300);
                dim.hide();
                $("body").css({ overflow: "" });
            });
        },

        workList: function(){
            var dataURL = "../../html/json/work.json";
            var lThiz = this.element;

            $.ajax ({
                type : 'get',
                url: dataURL,
                datatype : 'json',
                success : function(data){   
                  var max = 4;
                  var start = 0;
                  //처음 데이터가 없을경우 화살표 제거
                  if( data.worksListItem.length == max ){
                    $(lThiz.btnViewArea).css( "display", "none");
                  }else{
                    $(lThiz.btnViewArea).css( "display", "block");
                  }
                  //json data 
                  for( let i = start; i < max; i++){
                    UI.workView(data, i);
                  }   
        
                  //버튼 더보기
                  var btnView = '';
                  btnView += '<div class="btn-wrap">',
                  btnView += '<a href="javascript:;" class="btn-type">',
                  btnView += '<i class="ico-arr down"><span class="hidden">더보기</span></i>',
                  btnView += '</a>'
                  btnView += '<p class="more">MORE</p>',
                  btnView += '</div>'
                  if( arSplitFileName == "main" ) return;
                  $( ".work-item-list" ).append( btnView ) ;
        
                  var _cnt = 1;
                  //더보기 클릭 시
                  $( ".btn-type" ).on( "click", function(e){
                    _cnt++;
                    //더보기 클릭 이후 갯수 체크 이후 버튼 삭제
                    if( data.worksListItem.length == data.worksListItem.length ){
                      $(lThiz.btnViewArea).css( "display", "none");
                    }
                    //더보기 아이템 출력
                    for( let i=max*(_cnt-1);i<  data.worksListItem.length; i++){
                        UI.workView(data, i);
                        if( arSplitFileName == "main" ){
                            $( ".btn-wrap").remove();
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
                str += '<div class="item-title">'+data.worksListItem[i].itemTitle+'</div>',
                str += '<div class="item-img"><img src="'+data.worksListItem[i].itemImgSrc+'" alt="'+data.worksListItem[i].itemImgArt+'"></div>',
                str += '<div class="item-sub">'+data.worksListItem[i].itemSubText+'</div>',
                str += '</div>',
                str += '</a>',
                $( ".work-item-list" ).append( str );
                if( arSplitFileName == "main" ){
                    // $( ".btn-wrap").remove();
                };
                //아이템 클릭시 페이지 이동
                $( ".btn_work_link" ).on( "click", function(){
                    var link = $( this )[0].dataset.link;
                    var itemId = $( this )[0].dataset.id;
                    location.href = link;
                    localStorage.setItem('pageId', itemId);
                })
        },
    };
})();

$(document).ready(function () {
    UI.init(); 
});
 