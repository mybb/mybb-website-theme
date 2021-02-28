$('html').addClass('js');

function recursiveList(items, parentSuffix = '/')
{
    let output = '<ul>';
    let recursiveCount = 0;

    for (let item of items) {
        output += '<li>';

        if (typeof item == 'object') {
            for (let key in item) {
                output += key + parentSuffix;

                let call = recursiveList(item[key]);
                output += call[0];
                recursiveCount += call[1];
            }
        } else {
            recursiveCount++;
            output += item;
        }

        output += '</li>';
    }

    output += '</ul>';

    return [output, recursiveCount];
}

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
        var $target = $('#' + $.escapeSelector(this.hash.slice(1)));

        if($target.length) {
            event.preventDefault();

            history.replaceState({}, "", this.hash);

            $(headroom.elem).hide();

            $('html, body').stop().animate({
                scrollTop: $target.offset().top
            }, 500, function () {
                setTimeout(function () {
                    headroom.unpin();
                    $(headroom.elem).show();
                }, 100);
            });

            location.href = '#' + this.hash.slice(1);
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

    $('[data-recursivelist]').each(function() {
        let id = $(this).attr('data-recursivelist');

        let content, count;
        [content, count] = recursiveList(JSON.parse($(this).text()));

        $('[data-recursivelist-content="' + $.escapeSelector(id) + '"]').html(content);
        $('[data-recursivelist-count="' + $.escapeSelector(id) + '"]').html(count);
    });

    $('[data-common-toggle]').on('toggle', function(e) {
        e.preventDefault();

        let $siblings = $('[data-common-toggle="' + $.escapeSelector($(this).attr('data-common-toggle')) + '"]');

        $siblings.attr('open', e.currentTarget.open);
    });
});

// Headroom
var myElement = document.querySelector("header");
// construct an instance of Headroom, passing the element
var headroom  = new Headroom(myElement, {
    "offset": 75
    }    
);
// initialise
headroom.init();

if (window.location.hash) {
    headroom.unpin();
}
