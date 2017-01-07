(function() {

    var thisDays = 0;
    $("#baojia_bg").find("input:text").prop("readonly", "readonly");
    $(".baojia_input").each(function() {
        var _this = this;
        $(this).find(".glyphicon-minus").on("click", function() {
            var val = parseInt($(_this).find("input").val());
            if (val > 0) {
                val -= 1;
                $(_this).find("input").val(val);
            } else {
                return;
            }
        });

        $(this).find(".glyphicon-plus").on("click", function() {
            var val = parseInt($(_this).find("input").val());
            val += 1;
            $(_this).find("input").val(val);
        });

    });

    //日期
    $(".baojia_riqi").each(function(item) {
        var _this = this;
        $(this).find(".glyphicon-remove").on("click", function() {
            $(_this).find("input").val('');
        });

    });

    $(".baojia_page_one").mouseover(function() {
        //var reg = new RegExp("-", "g");
        var child = parseInt($(".baojia_input").eq(0).find("input").val());
        var oldMan = parseInt($(".baojia_input").eq(1).find("input").val());
        var man = parseInt($(".baojia_input").eq(2).find("input").val());
        var oneRiqi = $(".baojia_riqi").eq(0).find("input").val();
        var twoRiqi = $(".baojia_riqi").eq(1).find("input").val();
        thisDays = parseInt(DateDiff(oneRiqi, twoRiqi));

        if (child == 0 && oldMan == 0 && man == 0) {
            alert("请确定出团人数！");
            return;
        }
        if (oneRiqi == "") {
            alert("请确定开始日期！");
            return;
        } else if (twoRiqi == "") {
            alert("请确定结束日期！");
            return;
        } else if (thisDays < 0) {
            alert("结束日期应该晚于或等于开始日期！");
            return;
        }
    });

    function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2006-12-18格式   2006-1-9就要转换
        var aDate, oDate1, oDate2, iDays
        aDate = sDate1.split("-")
        oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为12-18-2006格式  
        aDate = sDate2.split("-")
        oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
        iDays = parseInt((oDate2 - oDate1) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数  
        return iDays
    }

    //交通
    $(".baojia_page_two").mouseover(function() {
        var jd_list_num = 0;
        $(".baojia_jd_list").find("input").each(function() {
            if ($(this).get(0).checked) {
                jd_list_num++;
            }
        });
        if (jd_list_num == 0) {
            alert("至少选择一处景点！");
            return;
        }
    });

    $(".baojia_page_three").mouseover(function() {
        var che_list_num = 0;
        $(".baojia_che_list").find("input").each(function() {
            if ($(this).get(0).checked) {
                jd_list_num++;
            }
        });
        if (che_list_num == 0) {
            alert("至少选择一种出行工具！");
            return;
        }
    });

    //酒店
    $(".baojia_page_four").mouseover(function() {

        $(".baojia_jiudian_con").each(function() {
            var _this = this;
            (function(_this) {
                var isCheck = $(_this).find("input:radio").get(0).checked;
                if (isCheck) {
                    var checkNum = 0;
                    $(_this).find("input:text").each(function() {
                        var checkValue = $(this).val();
                        if (checkValue > 0) {
                            checkNum++;
                        }
                    });
                    if (checkNum == 0) {
                        alert("您需要酒店，但是没有确定房间数量！");
                        return;
                    }
                }

            })(_this);
        });

    });

    $(".baojia_jiudian_list").find(".glyphicon").on("click", function() {
        $(".p_radio").each(function(item, obj) {
            $(obj).find("input:radio").prop("checked", false);
        });
        $(this).parent().siblings(".p_radio").find("input:radio").prop("checked", true);
        $(this).parent().parent().siblings(".baojia_jiudian_con").find("input:text").val(0);
    });

    $(".p_radio").on("click", function() {
        $(".baojia_jiudian_con").each(function() {
            $(this).find("input:text").val(0);
        });
    });

    //餐饮
    var canyinText = true;
    $(".baojia_page_five").mouseover(function() {
        var outRadio = $(".baojia_canyin_list").find("input[name='radio_canyin']").eq(1).get(0).checked;
        if (outRadio) {
            var isCheckbox = true;
            $(".baojia_canyin_con").find("input:checkbox").each(function() {
                var _this = this;
                var isCheck = $(this).prop("checked");
                if (canyinText) {
                    if (isCheck) {
                        isCheckbox = false;
                        var isText = $(_this).parent().parent().siblings().find("input:text").val();
                        if (isText == 0) {
                            alert("请选择餐饮天数！");
                            canyinText = false;
                            return;
                        }
                    }
                }
            });
            if (isCheckbox) {
                alert("您需要餐饮，但是没有具体选择需要的类型和天数！");
                return;
            }
        }
    });

    $(".baojia_canyin_con").find("input:checkbox").on("click", function() {
        var cut = false;
        if ($(this).get(0).checked) {
            $(this).parent().parent().siblings().find("input:radio").eq(0).prop("checked", true);
            $(this).parent().parent().siblings().find("input:text").val(thisDays);
        } else {
            $(this).parent().parent().siblings().find("input:radio").prop("checked", false);
            $(this).parent().parent().siblings().find("input:text").val(0);
        }
        $(".baojia_canyin_con").find("input:checkbox").each(function() {
            if ($(this).get(0).checked) {
                cut = true;
            }
        });
        canyin(cut);
    });

    $(".baojia_canyin_con").find("input:radio").on("click", function() {
        $(this).parent().parent().siblings().find("input:checkbox").prop("checked", true);
        canyin(true);
    });

    $(".baojia_canyin_con").find(".glyphicon").on("click", function() {
        canyinText = true;
        $(this).parent().siblings().find("input:checkbox").prop("checked", true);
        canyin(true);
        var isCheck = true;
        $(this).parent().siblings().find("input:radio").each(function() {
            var thisRadio = $(this).prop("checked");
            if (thisRadio) {
                isCheck = false;
            }
        });
        if (isCheck) {
            $(this).parent().siblings().find("input:radio").eq(0).prop("checked", true);
        }
    });
    $(".baojia_canyin_list").find("input[name='radio_canyin']").eq(0).on("click", function() {
        $(".baojia_canyin_list").find("input:checkbox").prop("checked", false);
        $(".baojia_canyin_list").find("input:radio").prop("checked", false);
        $(".baojia_canyin_list").find("input:text").val(0);
        $(this).prop("checked", true);
    });

    function canyin(cut) {
        if (cut) {
            $(".baojia_canyin_list").find("input[name='radio_canyin']").eq(1).prop("checked", true);
            $(".baojia_canyin_list").find("input[name='radio_canyin']").eq(0).prop("checked", false);
        } else {
            $(".baojia_canyin_list").find("input[name='radio_canyin']").eq(0).prop("checked", true);
            $(".baojia_canyin_list").find("input[name='radio_canyin']").eq(1).prop("checked", false);
        }
    }

    //导游
    $(".baojia_page_six").mouseover(function() {
        var isCheck = $(".baojia_daoyou_list").find("input:radio").eq(1).prop("checked");
        if (isCheck) {
            var isCheckbox = true;
            $(".baojia_daoyou_list").find("input:checkbox").each(function() {
                var isCheck = $(this).prop("checked");
                if (isCheck) {
                    isCheckbox = false;
                }
            });
            if (isCheckbox) {
                alert("您需要导游，但是没有具体选择！");
                return;
            }
        }

    });

    $(".baojia_daoyou_list").find("input:checkbox").on("click", function() {
        var cut = false;
        $(".baojia_daoyou_list").find("input:checkbox").each(function() {
            if ($(this).get(0).checked) {
                cut = true;
            }
        });
        daoyou(cut);
    });

    function daoyou(cut) {
        if (cut) {
            $(".baojia_daoyou_list").find("input:radio").eq(0).prop("checked", false);
            $(".baojia_daoyou_list").find("input:radio").eq(1).prop("checked", true);
        } else {
            $(".baojia_daoyou_list").find("input:radio").eq(1).prop("checked", false);
            $(".baojia_daoyou_list").find("input:radio").eq(0).prop("checked", true);
        }
    }

    $(".baojia_daoyou_list").find("input:radio").eq(0).on("click", function() {
        $(".baojia_daoyou_list").find("input:checkbox").prop("checked", false);
    });

    //接送机
    var cheNeed = true;
    $(".baojia_page_seven").mouseover(function() {

        $(".baojia_che_need").find("input:checkbox").each(function() {
            if (cheNeed) {
                if ($(this).get(0).checked) {
                    var isCheck = true;
                    $(".baojia_che_type").find("input:checkbox").each(function() {
                        if ($(this).get(0).checked) {
                            isCheck = false;
                        }
                    });
                    if (isCheck) {
                        alert("您需要接送机，但是没有具体选择车型！");
                        cheNeed = false;
                        return;
                    }
                }
            }
        });
    });
    $(".baojia_che_type").find("input:checkbox").on("click", function() {
        cheNeed = true;
        $(".baojia_che_type").find("input:checkbox").each(function() {
            if ($(this).get(0).checked) {
                var cut = true;
                $(".baojia_che_need").find("input:checkbox").each(function() {
                    if ($(this).get(0).checked) {
                        cut = false;
                    }
                });
                if (cut) {
                    $(".baojia_che_need").find("input:checkbox").prop("checked", true);
                }
            }
        });

    });
    $(".baojia_che_need").find("input:checkbox").on("click", function() {
        cheNeed = true;
        var isCheck = true;
        $(".baojia_che_need").find("input:checkbox").each(function() {
            if ($(this).get(0).checked) {
                isCheck = false;
            }
        });
        if (isCheck) {
            $(".baojia_che_type").find("input:checkbox").each(function() {
                $(this).prop("checked", false);
            });
        }
    });


























})();