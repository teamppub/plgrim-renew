var UI = (function () {
    return {
        init: function () {
            this.event();
        },
        element: {
            header: '.header-wrap',
            gnbBtn: '.btn-gnb',
            gnbWrap: '.gnb-wrap',
            top: '#btn-top'
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

                pos = st;
            }, false);

            
			$(lThiz.gnbBtn).on('click', function() {
				$(this).find(".icon-menu").toggleClass("open");
				$("body").toggleClass("fixed")
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
    };
})();

$(document).ready(function () {
    UI.init();
});
