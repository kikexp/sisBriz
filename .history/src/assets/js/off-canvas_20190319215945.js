(function($) {
    'use strict';
    $(function() {
        console.log("entra")
        $('[data-toggle="offcanvas"]').on("click", function() {
            $('.sidebar-offcanvas').toggleClass('active')
        });
    });
})(jQuery);