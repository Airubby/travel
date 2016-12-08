(function() {
    $("#bijia_title").scrollFix();
    var bijia_box = $(".bijia_box");
    // if (bijia_box.length > 0) {
    //     for (var i = 0; i < bijia_box.length; i++) {
    //         (function(n) {
    //             thisHeight(n);
    //         })(i);
    //     }
    // }
    $(bijia_box).each(function(index) {
        thisHeight(index);
    });

    function thisHeight(n) {
        var heightArr = [];
        var bijia_box2 = $(bijia_box[n]).children(".bijia_box2");
        $(bijia_box2).each(function(index) {
            heightArr.push($(this).height());
        });
        var h = Math.max.apply(null, heightArr); //求数组中最大数
        $(bijia_box2).each(function(index) {
            $(this).height(h);
        });
    }

    function anchorGoWhere(nav, yangshi, sudu, toubu) {
        var a = nav + " a";
        var scrollTop = null;
        var firstA = $(a).get(0);
        var firstIDtop = $($(firstA).attr("href")).offset().top;
        $(a).click(function() {
            thisID = $(this).attr("href");
            $("html,body").animate({ scrollTop: $(thisID).offset().top - toubu }, sudu);
            return false;
        });
        $(window).scroll(function() {
            scrollTop = $(this).scrollTop();
            $(a).each(function(index) {
                //scrollGoWhere(index, this);
                if (scrollTop < firstIDtop) {
                    $(firstA).addClass(yangshi);
                } else {
                    var thisID = $(this).attr("href");
                    var thisIDtop = $(thisID).offset().top;
                    var value = scrollTop - thisIDtop;
                    if (-toubu <= value && value < $(thisID).height()) {
                        $(a).each(function() {
                            $(this).removeClass(yangshi);
                        });
                        $(this).addClass(yangshi);
                    }
                }
            });
        });

    }
    anchorGoWhere("#right_nav", "active", 500, 130);


})();