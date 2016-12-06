(function() {
    "use strict"
    var num = 6;
    var showTwo = $(".showTwo");
    var butt = null; //showTwo下面的button
    var letterArr = [];
    var jdArr = [];
    var jdLetterArr = [];


    $(".selected_con_list").each(function(i, obj) {
        obj.title = $(obj).find(".title").text();
    });
    //console.log($(".selected_con_list")[1].title)

    function contChange(n, className) {
        var cont = $(".cont").get(n);
        var contA = cont.getElementsByTagName('a');
        if (n == 4) {
            for (var i = 0; i < contA.length - 1; i++) {
                contA[i].onclick = function() {
                    $(this).addClass("btn btn-danger btn-sm");
                    $(this).find("i").addClass("glyphicon glyphicon-remove");
                    if ($(this).hasClass("all")) {
                        if ($(".showTwo button").hasClass(className)) {
                            $("." + className).remove();
                            $(this).siblings().removeClass("btn btn-danger btn-sm");
                            $(this).siblings().find("i").removeClass("glyphicon glyphicon-remove");

                        } else {
                            return;
                        }
                    } else {
                        $(contA[0]).removeClass("btn btn-danger btn-sm");
                        $(contA[0]).find("i").removeClass("glyphicon glyphicon-remove");
                        if ($(".showTwo button").hasClass(className)) {
                            var addE = true;
                            butt = showTwo.get(0).getElementsByTagName('button');
                            for (var j = 0; j < butt.length; j++) {
                                if ($(this).data("name") === $(butt[j]).data("name")) {
                                    addE = false;
                                    removeSelect(butt[j]);
                                }
                            }
                            if (addE) {
                                $(".showTwo").append('<button type="button" class="btn btn-default btn-sm ' + className + '" data-name="' + $(this).data("name") + '">' + $(".selected_con_list")[n].title + '：' + $(this).text() + '<i class="glyphicon glyphicon-remove"></i></button>');
                            }

                        } else {
                            $(".showTwo").append('<button type="button" class="btn btn-default btn-sm ' + className + '" data-name="' + $(this).data("name") + '">' + $(".selected_con_list")[n].title + '：' + $(this).text() + '<i class="glyphicon glyphicon-remove"></i></button>');
                        }

                    }

                }
            }
        } else {

            for (var i = 0; i < contA.length; i++) {
                contA[i].onclick = function() {
                    $(this).addClass("btn btn-danger btn-sm");
                    $(this).siblings().removeClass("btn btn-danger btn-sm");
                    if ($(this).hasClass("all")) {
                        if ($(".showTwo button").hasClass(className)) {
                            $("." + className).remove();
                        } else {
                            return;
                        }
                    } else {
                        if ($(".showTwo button").hasClass(className)) {
                            $("." + className).html($(".selected_con_list")[n].title + "：" + $(this).text() + '<i class="glyphicon glyphicon-remove"></i>');
                        } else {
                            $(".showTwo").append('<button type="button" class="btn btn-default btn-sm ' + className + '">' + $(".selected_con_list")[n].title + '：' + $(this).text() + '<i class="glyphicon glyphicon-remove"></i></button>');
                        }
                    }

                }
            }
        }

    }
    if ($(".cont").length > 0) {
        for (var i = 0; i < num; i++) {
            switch (i) {
                case 0:
                    contChange(0, "zthd")
                    break;
                case 1:
                    contChange(1, "cfcs")
                    break;
                case 2:
                    contChange(2, "jscs")
                    break;
                case 3:
                    contChange(3, "xcts")
                    break;
                case 4:
                    contChange(4, "tjjd")
                    break;
                case 5:
                    contChange(5, "xzfw")
                    break;
            }
        }
    }



    showTwo.bind('DOMNodeInserted', function(e) {
        // console.log('element now contains: ' + $(e.target).html());
        if ($(".showTwo").html() != null) {
            $(".selected").css("display", "block");
        }
        butt = showTwo.get(0).getElementsByTagName('button');
        if (butt.length) {
            for (var i = 0; i < butt.length; i++) {
                butt[i].onclick = function() {
                    removeSelect(this);
                }
            }
        }
    });

    function removeSelect(obj) {
        $(obj).remove();
        var dataName = $(obj).data("name");
        if ($(obj).hasClass("zthd")) {
            removeSelectBtn(0, null);
        }
        if ($(obj).hasClass("cfcs")) {
            removeSelectBtn(1, null);
        }
        if ($(obj).hasClass("jscs")) {
            removeSelectBtn(2, null);
        }
        if ($(obj).hasClass("xcts")) {
            removeSelectBtn(3, null);
        }
        if ($(obj).hasClass("tjjd")) {
            removeSelectBtn(4, dataName);
        }
        if ($(obj).hasClass("xzfw")) {
            removeSelectBtn(5, null);
        }
    }

    function removeSelectBtn(n, dataName) {
        var contA = $(".cont").get(n).getElementsByTagName('a');
        if (n == 4) {
            for (var i = 0; i < contA.length - 1; i++) {
                if ($(contA[i]).data("name") == dataName) {
                    $(contA[i]).removeClass("btn btn-danger btn-sm");
                    $(contA[i]).find("i").removeClass("glyphicon glyphicon-remove");
                }
            }
            if (!$(".showTwo button").hasClass("tjjd")) {
                $(contA[0]).addClass("btn btn-danger btn-sm");
            }
        } else {
            for (var i = 0; i < contA.length; i++) {
                $(contA[i]).removeClass("btn btn-danger btn-sm");
            }
            $(contA[0]).addClass("btn btn-danger btn-sm");
        }

    }


    var jingdian = $("#list_jingdian a");
    if (jingdian.length > 28) {
        for (var i = 28; i < jingdian.length - 1; i++) {
            $(jingdian[i]).css("display", "none");
        }
    } else {
        $("#list_jingdian a:last-of-type").css("display", "none");
    }

    $("#jd_more").click(function() {
        $("#jingdian_sx").css("display", "block");
        $("#list_jingdian").css({
            "padding": "10px",
            "border": "1px solid #ddd"
        });
        for (var i = 28; i < jingdian.length - 1; i++) {
            $(jingdian[i]).css("display", "inline-block");
        }
        $("#list_jingdian a:first-of-type").css("display", "none");
        $("#list_jingdian a:last-of-type").css("display", "none");
    });

    var sx_li = $("#jingdian_sx").find("li");
    var list_a = $("#list_jingdian").find("a");

    for (var i = 1; i < sx_li.length; i++) {
        var letter = $(sx_li[i]).data("letter");
        letterArr.push(letter);
    }

    for (var i = 1; i < list_a.length - 1; i++) {
        var letter = $(list_a[i]).data("letter");
        jdArr.push(letter);
    }
    jdLetterArr = unique(jdArr);

    function unique(array) {
        var n = []; //一个新的临时数组
        //遍历当前数组
        for (var i = 0; i < array.length; i++) {
            //如果当前数组的第i已经保存进了临时数组，那么跳过，
            //否则把当前项push到临时数组里面
            if (n.indexOf(array[i]) == -1) n.push(array[i]);
        }
        return n;
    }

    for (var i = 0; i < letterArr.length; i++) {
        if (jdLetterArr.indexOf(letterArr[i]) == -1) {
            $(sx_li[i + 1]).addClass("disabled"); //因为全部的那个没有算进来，所以得加1
        }
    }

    for (var i = 0; i < sx_li.length; i++) {
        if (i == 0) {
            sx_li[i].onclick = function() {
                for (var j = 1; j < list_a.length - 1; j++) {
                    $(list_a[j]).css("display", "inline-block");
                }
            }
        } else {
            sx_li[i].onclick = function() {
                if ($(this).hasClass("disabled")) {
                    return;
                } else {
                    var letter = $(this).data("letter");
                    for (var j = 1; j < list_a.length - 1; j++) {
                        if ($(list_a[j]).data("letter") == letter) {
                            $(list_a[j]).css("display", "inline-block");
                        } else {
                            $(list_a[j]).css("display", "none");
                        }

                    }
                }
            }
        }

    }
    var url = window.location.href;
    $("#showClose").click(function() {
        window.location.href = url;
    })





})();