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
        },
    };
})();

$(document).ready(function () {
    UI.init();
});
