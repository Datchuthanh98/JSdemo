$(function () {

    if ($('textarea#ta').length) {
        CKEDITOR.replace('ta');
    }

    //slide image detail
    if ($("[data-fancybox]").length) {
        $("[data-fancybox]").fancybox();
    }

});


