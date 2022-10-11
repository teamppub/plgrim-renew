var UI = (function () {
    return {
        init: function () {
            this.event();
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

            window.addEventListener('scroll', function (event) {
                var st = $(this).scrollTop();

                if (pos < st) {
                    $(lThiz.header).removeClass('top');
                } else if (st === 0) {
                    $(lThiz.header).addClass('top');
                } else {
                    $(lThiz.header).removeClass('top');
                }

                pos = st;
            }, false);

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
    };
})();

$(document).ready(function () {
    UI.init();
});
