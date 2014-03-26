var lastId,
    // Anchors corresponding to menu items
    menuItems = $(".navbar a"),
    topMenu = $(".navbar"),
    topMenuHeight = topMenu.outerHeight() + 28,
    scrollItems = menuItems.map(function() {
        var itemId = $(this).attr("href");
        var item = $(itemId);
        if (item.length) {
            return item;
        }
    });

function goToPage(pageContainerId) {
    var offsetTop = pageContainerId === "#" ? 0 : $(pageContainerId).offset().top - topMenuHeight;
    $('html, body').stop().animate({
        scrollTop: Math.round(offsetTop)
    }, 800);
}

function activateMenuItem(pageContainerId) {
    $(".navbar li").removeClass('active');
    var selectedMenuItem = $('.navbar a[href="' + pageContainerId + '"]');
    selectedMenuItem.parent().addClass('active');
}

// Bind click handler to menu items
// so we can get a fancy scroll animation
$(".js-menu-item").on("click", function(e) {
    var pageContainerId = $(this).attr("href");
    goToPage(pageContainerId);
    if (!$(this).hasClass('js-multi-scroll')) {
        activateMenuItem(pageContainerId);
    }


    if ($(".navbar-collapse").is(":visible")) {
        if ($(".navbar-toggle").is(":visible")) {
            $(".navbar-toggle").click();
        }
    }

    e.preventDefault();
});


// Bind to scroll
$(window).scroll(function() {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function() {
        if ($(this).offset().top <= fromTop)
            return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
            .parent().removeClass("active")
            .end().filter("[href=#" + id + "]").parent().addClass("active");
    }
});


$.fn.scrollTo = function(target, options, callback) {
    if (typeof options == 'function' && arguments.length == 2) {
        callback = options;
        options = target;
    }
    var settings = $.extend({
        scrollTarget: target,
        offsetTop: 50,
        duration: 500,
        easing: 'swing'
    }, options);
    return this.each(function() {
        var scrollPane = $(this);
        var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
        var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
        scrollPane.animate({
            scrollTop: scrollY
        }, parseInt(settings.duration), settings.easing, function() {
            if (typeof callback == 'function') {
                callback.call(this);
            }
        });
    });
}

rotate = 1;

function hide_preloader() { //DOM
    rotate = 0;
    $("#preloader").fadeOut(1000);
}



$(document).ready(function() {

    // calculate height 
    var screen_ht = $(window).height();
    var preloader_ht = 10;
    var padding = (screen_ht / 2) - preloader_ht;

    $("#preloader").css("padding-top", padding + "px");

    // loading animation using script

    function anim() {
        $("#preloader_image").animate({
                left: '-1400px'
            }, 8000,
            function() {
                $("#preloader_image").animate({
                    left: '0px'
                }, 5000);
                if (rotate == 1) {
                    anim();
                }
            });
    }

    anim();

});
