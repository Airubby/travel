 "use strict"
 // 锚点跳转
 function anchorGoWhere(nav, yangshi, sudu, toubu) {
     var thisA = nav + " a";
     var scrollTop = null;
     var firstA = $(thisA).get(0);
     var firstIDtop = $($(firstA).attr("href")).offset().top;
     $(thisA).click(function () {
         thisID = $(this).attr("href");
         $("html,body").animate({
             scrollTop: $(thisID).offset().top - toubu
         }, sudu);
         return false;
     });
     $(window).scroll(function () {
         scrollTop = $(this).scrollTop();
         $(thisA).each(function (index) {
             if (scrollTop < firstIDtop) {
                 $(firstA).addClass(yangshi);
             } else {
                 var thisID = $(this).attr("href");
                 var thisIDtop = $(thisID).offset().top;
                 var value = scrollTop - thisIDtop;
                 if (-toubu <= value && value < $(thisID).height()) {
                     $(thisA).each(function () {
                         $(this).removeClass(yangshi);
                     });
                     $(this).addClass(yangshi);
                 }
             }
         });
     });

 }

 (function () {
     var header_height = $("#header").height();
     var footer_height = $("#footer").height();
     var body_height = $(window).height();
     //搜索
     var search_li = $(".search_text_list li");
     for (var i = 0; i < search_li.length; i++) {
         search_li[i].onclick = function () {
             $($(".search_data").get(0)).text($(this).text())
             $($(".search_data").get(0)).data("search", $(this).data("search"));
             //console.log($($(".search_data").get(0)).data("search"))
         }
     }
     //导航 侧边导航
     $("#nav_pop_wrapper").slide({
         titCell: ".mod_cate",
         targetCell: ".mod_subcate",
         delayTime: 0,
         triggerTime: 10,
         defaultPlay: false,
         returnDefault: true
     });
     $("#side_edge_tab .gotoTop").on("click", function () {
         $("html,body").animate({
             scrollTop: 0
         }, 500);
     });
     var edge_tab = true;
     $("#side_edge_tab .side_edge_tab").click(function () {
         $("#side_edge_con").toggle();
         if (edge_tab) {
             $("#side_edge_tab .side_edge_tab i").addClass("tabi_active");
             edge_tab = false;
         } else {
             $("#side_edge_tab .side_edge_tab i").removeClass("tabi_active");
             edge_tab = true;
         }
     });

     $("#side_edge .side_edge_box").each(function (index) {
         var _this = $(this).find(".edge_reminder").get(0);
         $(this).hover(function () {
             $(_this).css({
                 'display': 'block',
                 'opacity': 1,
                 'right': '35px'
             });
         }, function () {
             $(_this).css({
                 'display': 'none',
                 'opacity': 0,
                 'right': '60px'
             });

         });

     });
     $("#edge_reminder_addA").click(function () {
         $("#edge_reminder_add").toggle();
     });


     /*首页效果*/
     jQuery(".index_ibox_slide").slide({
         mainCell: ".bd",
         effect: "fold",
         trigger: "click"
     });
     var scrollHeight = $("#slide").height() - 70;
     $(window).scroll(function (event) {
         var top = $(window).scrollTop();
         if (top > scrollHeight) {
             $("#index_header").css({
                 'background': '#fff',
                 'border-bottom': '1px solid #c4c4c3'
             });
             $("#index_header a").css("color", "#000");
             $("#index_header #index_nav_right").css("display", "none");
             $("#index_header #search").css("display", "block");
         } else {
             $("#index_header").css({
                 'background': 'none',
                 'border-bottom': 'none'
             });
             $("#index_header a").css("color", "#fff");
             $("#index_header #index_nav_right").css("display", "block");
             $("#index_header #search").css("display", "none");
         }
     });

     function slide() {
         var slide_index = $('#slide_bd').children().length;
         var slide_width = (24 * slide_index) / 2;
         for (var i = 0; i < slide_index; i++) {
             if (i == 0) {
                 $('#slide_hd').append("<li class='on'></li>");
             } else {
                 $('#slide_hd').append('<li></li>');
             }
         }
         $('.index_slide .hd').css({
             "margin-left": -(slide_width)
         });
     }
     slide();
     jQuery(".index_slide").slide({
         mainCell: ".bd ul",
         autoPlay: true,
         effect: "fold"
     });
     jQuery(".slideBox_dz").slide({
         mainCell: ".bd ul",
         effect: "leftLoop"
     });
     jQuery(".picScroll-left").slide({
         titCell: ".hd ul",
         mainCell: ".bd ul",
         autoPage: true,
         effect: "leftLoop",
         vis: 3,
         easing: "easeInQuint"
     });


     /*列表页*/
     var list_dl = 896 - $(".list_dl dd:nth-of-type(1)").outerWidth() - $(".list_dl dd:nth-of-type(2)").outerWidth();
     $(".list_dl dd:nth-of-type(3)").outerWidth(list_dl);
     $("#list_fixed").scrollFix({
         distanceTop: 70,
         endPos: 327
     });
     //报价,私人定制
     jQuery(".slideBox_baojia").slide({
         mainCell: ".bd",
         effect: "left",
         trigger: "click",
         easing: "easeInQuint"
     });
     $("#btn_baojia").click(function () {
         $("#baojia_bg").css("visibility", "visible");
     });
     $(".baojia_close").each(function () {
         $(this).click(function () {
             $("#baojia_bg").css("visibility", "hidden");
         })
     });
     $("#sirendingzhi_select").find("li").on("click", function () {
         $(this).siblings().removeClass("active");
         $(this).addClass("active");
         $("#sirendingzhi_select .label_select").find("span").html($(this).html());
         $("#sirendingzhi_select .label_select").find("ul").css("display", "none");
         var thistype = $(this).attr("data-type");
         if (thistype == 3) {
             $("#sirendingzhi_select").find(".showhiden").css("display", "none");
         } else if (thistype == 2) {
             $("#sirendingzhi_select").find(".showhiden").css("display", "block");
             $("#sirendingzhi_select").find("input").val('');
             $("#sirendingzhi_select").find("img").attr("onclick", "WdatePicker({el:'cfrq',minDate:'%y-%M-{%d+1}',dateFmt:'yyyy-MM'})");
         } else if (thistype == 1) {
             $("#sirendingzhi_select").find(".showhiden").css("display", "block");
             $("#sirendingzhi_select").find("input").val('');
             $("#sirendingzhi_select").find("img").attr("onclick", "WdatePicker({el:'cfrq',minDate:'%y-%M-{%d+1}',dateFmt:'yyyy-MM-dd'})");
         }
     });
     $("#sirendingzhi_select").find("label").hover(function () {
         $("#sirendingzhi_select .label_select").find("ul").css("display", "block");
     }, function () {
         $("#sirendingzhi_select .label_select").find("ul").css("display", "none");
     });
     //私人管家
     var guanjia_img = body_height - header_height;
     $(".guanjia_img img").css("height", guanjia_img);
     //内容页
     if ($("#content_nav").length > 0) {
         $("#content_nav").scrollFix();
         anchorGoWhere("#content_nav_a", "active", 500, 40);
         jQuery(".txtScroll-top").slide({
             titCell: ".hd ul",
             mainCell: ".bd ul",
             autoPage: true,
             effect: "topLoop",
             autoPlay: true,
             easing: "easeInQuint"
         });
     }

     //购物车,比价
     var eleFlyElement = document.querySelector("#flyItem"),
         eleShopCart = document.querySelector("#shopCart");
     var numberItem = 0;
     // 抛物线运动
     var myParabola = funParabola(eleFlyElement, eleShopCart, {
         speed: 400, //抛物线速度
         curvature: 0.0001, //控制抛物线弧度
         complete: function () {
             eleFlyElement.style.visibility = "hidden";
             eleShopCart.querySelector("span").innerHTML = ++numberItem;
         }
     });
     // 绑定点击事件
     if (eleFlyElement && eleShopCart) {

         [].slice.call(document.getElementsByClassName("btnCart")).forEach(function (button) {
             button.addEventListener("click", function (event) {
                 // 滚动大小
                 var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0,
                     scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
                 eleFlyElement.style.left = event.clientX + scrollLeft + "px";
                 eleFlyElement.style.top = event.clientY + scrollTop + "px";
                 eleFlyElement.style.visibility = "visible";

                 // 需要重定位
                 myParabola.position().move();
             });
         });
     }
     // 比价
     $("#edge_reminder_add").find(".empty").on("click", function () {
         $("#edge_reminder_add .edge_reminder_add_list").html('');
     });
     var edge_reminder_add_list = jQuery.trim($("#edge_reminder_add .edge_reminder_add_list").html());
     if (edge_reminder_add_list.length != 0) {
         $("#edge_reminder_add").find(".glyphicon-remove").on("click", function () {
             $(this).closest('.add_list_box').remove();
         });
     }

     //秒杀
     if ($("#clock").length > 0) {
         $('#clock').countdown($("#time").html(), function (event) {
             $(this).html(event.strftime('距离本次秒杀结束还有<i>%D</i>天' + '<i>%H</i>时' + '<i>%M</i>分' + '<i>%S</i>秒'));
         });
     }












 })();