jQuery(document).ready(function ($) {
    "use strict";
    $('.mainmenu-area a[href*="#"]:not([href="#"])').on('click',function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
    $(".carousel-inner .item:first-child").addClass("active");
    /*WoW js Active
    =================*/
    new WOW().init({
        mobile: false,
    });
    /* Scroll to top
    ===================*/
    $.scrollUp({
        scrollText: '<i class="icofont icofont-long-arrow-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

    $('.my-slider').cardslider({
        swipe: true,
        dots: false,
        direction: 'down',
        loop: true,
    });

    //Header Background Slider
    $(".home-slide").responsiveSlides({
        auto: true, // Boolean: Animate automatically, true or false
        speed: 600, // Integer: Speed of the transition, in milliseconds
        timeout: 4000, // Integer: Time between slide transitions, in milliseconds
        pager: true, // Boolean: Show pager, true or false
    });

    // Book List Slider
    var book_slide = $('.book-list');
    book_slide.owlCarousel({
        loop: true,
        margin: 30,
        dots: true,
        autoplayTimeout: 4000,
        smartSpeed: 600,
        mouseDrag: true,
        touchDrag: false,
        animateIn: 'fadeInLeft',
        animateOut: 'fadeOutRight',
        center: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            992: {
                items: 2
            },
            1500: {
                items: 4
            }
        }
    });
    $('.bookslide_nav .testi_next').on('click', function () {
        book_slide.trigger('next.owl.carousel');
    });
    $('.bookslide_nav .testi_prev').on('click', function () {
        book_slide.trigger('prev.owl.carousel');
    });

    book_slide.on('translate.owl.carousel', function (property) {
        $('.book-content .owl-dot:eq(' + property.page.index + ')').click();
    });

    /* Gallery Slider Active
    =============================*/
    $('.team_slide').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        nav: false,
        autoplay: true,
        autoplayTimeout: 4000,
        smartSpeed: 1000,
        center: true,
        navText: ['<i class="icofont icofont-long-arrow-left"></i>', '<i class="icofont icofont-long-arrow-right"></i>'],
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
    /* Gallery Slider Active
    =============================*/
    $('.testimonial-slide').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        nav: true,
        autoplay: true,
        autoplayTimeout: 4000,
        smartSpeed: 1000,
        center: true,
        navText: ['<i class="icofont icofont-long-arrow-left"></i>', '<i class="icofont icofont-long-arrow-right"></i>'],
        items: 1
    });
    $('.wow').parent('div').addClass('fix');

    if(typeof(access_token) !== 'undefined') {
        $( window ).on( "load", function() {
            console.log( "window loaded" );
            $.ajax({
            url: API_PATH + 'notifications/count/user',
            contentType: 'application/json',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': access_token,
            },
            type: 'GET',
            data: {},
            }).done(function (response) {
                if (response.message.code == 200) {
                    if(response.item.count == 0)
                    {
                        $('.count_Notifications').html();
                    }
                    else
                    {
                        $('.count_Notifications').html(response.item.count);
                    }
                } else {
                    showNotify('danger', "Data Invalid", {icon: "glyphicon glyphicon-remove"}, {delay: 1000});
                }
            }).fail(function (error) {
                showNotify('danger', "Data Invalid", {icon: "glyphicon glyphicon-remove"}, {delay: 1000});
            });
        });
    }
}(jQuery));
