$('html').addClass('js');

$(function() {
    // Tooltips
    $(".card__detail__link, .blog-post__categories-tags__link").powerTip({
        placement: "s",
        mouseOnToPopup: true
    })

    // Feature tour menu button
    $(".feature-tour__menu-button").click(function () {
        $(".feature-tour__header__nav").removeClass("feature-tour__header__nav--mobile-hide").addClass("feature-tour__header__nav--mobile-show");
        $(".feature-tour__menu-button").addClass("feature-tour__menu-button--hide");
        $(".feature-tour__menu-close-button").removeClass("feature-tour__menu-close-button--hide");
    });

    $(".feature-tour__menu-close-button").click(function () {
        $(".feature-tour__header__nav").removeClass("feature-tour__header__nav--mobile-show").addClass("feature-tour__header__nav--mobile-hide");
        $(".feature-tour__menu-button").removeClass("feature-tour__menu-button--hide");
        $(".feature-tour__menu-close-button").addClass("feature-tour__menu-close-button--hide");
    });

    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 500);
        }
    });

    var owl = $('.owl-carousel');
    owl.owlCarousel({
        loop:true,
        nav:false,
        autoplay:true,
        autoplayTimeout:4000,
        autoplayHoverPause:true,
        autoplaySpeed:700,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            900:{
                items:3
            }
        }
    });

    $('.main-feature__screenshots__nav--next').click(function() {
        owl.trigger('next.owl.carousel');
    });
    $('.main-feature__screenshots__nav--previous').click(function() {
        owl.trigger('prev.owl.carousel');
    });

    $('.feature-tour__screenshot__link, .blog-post__image-link').featherlight();
});

// Headroom
var myElement = document.querySelector("header");
// construct an instance of Headroom, passing the element
var headroom  = new Headroom(myElement);
// initialise
headroom.init();
