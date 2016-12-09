(function() {
    var header_height = $("#header").height();
    var footer_height = $("#footer").height();
    var body_height = $(window).height();
    //搜索
    var search_li = $(".search_text_list li");
    for (var i = 0; i < search_li.length; i++) {
        search_li[i].onclick = function() {
            $($(".search_data").get(0)).text($(this).text())
            $($(".search_data").get(0)).data("search", $(this).data("search"));
            //console.log($($(".search_data").get(0)).data("search"))
        }
    }
    //导航 
    $("#nav_pop_wrapper").slide({
        titCell: ".mod_cate",
        targetCell: ".mod_subcate",
        delayTime: 0,
        triggerTime: 10,
        defaultPlay: false,
        returnDefault: true
    });
    /*首页效果*/
    jQuery(".index_slide").slide({ mainCell: ".bd ul", autoPlay: true, effect: "fold" });
    jQuery(".slideBox_dz").slide({ mainCell: ".bd ul", effect: "leftLoop" });
    jQuery(".picScroll-left").slide({ titCell: ".hd ul", mainCell: ".bd ul", autoPage: true, effect: "leftLoop", vis: 3, easing: "easeInQuint" });
    /*列表页*/
    var list_dl = 896 - $(".list_dl dd:nth-of-type(1)").outerWidth() - $(".list_dl dd:nth-of-type(2)").outerWidth();
    $(".list_dl dd:nth-of-type(3)").outerWidth(list_dl);
    $("#list_fixed").scrollFix({ distanceTop: 70, endPos: 327 });
    //报价,私人定制
    jQuery(".slideBox_baojia").slide({
        mainCell: ".bd",
        effect: "left",
        trigger: "click",
        easing: "easeInQuint"
    });
    $("#btn_baojia").click(function() {
        $("#baojia_bg").css("visibility", "visible");
    });
    $(".baojia_close").each(function() {
        $(this).click(function() {
            $("#baojia_bg").css("visibility", "hidden");
        })
    });
    //私人管家
    var guanjia_img = body_height - header_height;
    $(".guanjia_img img").css("height", guanjia_img);
    //内容页
    $("#content_nav").scrollFix();
    anchorGoWhere("#content_nav", "active", 500, 40);
    // 锚点跳转
    function anchorGoWhere(nav, yangshi, sudu, toubu) {
        var thisA = nav + " a";
        var scrollTop = null;
        var firstA = $(thisA).get(0);
        var firstIDtop = $($(firstA).attr("href")).offset().top;
        $(thisA).click(function() {
            thisID = $(this).attr("href");
            $("html,body").animate({ scrollTop: $(thisID).offset().top - toubu }, sudu);
            return false;
        });
        $(window).scroll(function() {
            scrollTop = $(this).scrollTop();
            $(thisA).each(function(index) {
                if (scrollTop < firstIDtop) {
                    $(firstA).addClass(yangshi);
                } else {
                    var thisID = $(this).attr("href");
                    var thisIDtop = $(thisID).offset().top;
                    var value = scrollTop - thisIDtop;
                    if (-toubu <= value && value < $(thisID).height()) {
                        $(thisA).each(function() {
                            $(this).removeClass(yangshi);
                        });
                        $(this).addClass(yangshi);
                    }
                }
            });
        });

    }




})();