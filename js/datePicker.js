"use strict"
var obj = {
    date: new Date(),
    year: -1,
    month: -1,
    priceArr: []
};
var htmlObj = {
    header: "",
    center: "",
    bodyer: ""
}
var elemId = null;
var pickerEvent = {
    Init: function (elemid) {
        if (obj.year == -1) {
            dateUtil.getCurrent();
        }
        for (var item in pickerHtml) {
            pickerHtml[item]();
        }
        var p = document.getElementById("calendar_choose");
        var dp = document.getElementById("datePicker");
        if (p != null) {
            dp.removeChild(p);
        }
        var html = `<div id="calendar_choose">${htmlObj.header}${htmlObj.center}${htmlObj.bodyer}</div>`;
        elemId = elemid;
        $(dp).append(html);
        document.getElementById("picker_last").onclick = pickerEvent.getLast;
        document.getElementById("picker_next").onclick = pickerEvent.getNext;
        var lis = document.getElementById("calendar_bodyer").getElementsByTagName("li");
        
        for (var i = 0; i < lis.length; i++) {
            if (lis[i].getAttribute("data-date") != null && lis[i].getAttribute("data-date") != "" ) {
                lis[i].onclick = function () {
                    commonUtil.chooseClick(this)
                };
            }
        }
    },
    getLast: function () {
        dateUtil.getLastDate();
        pickerEvent.Init(elemId);
    },
    getNext: function () {
        dateUtil.getNextDate();
        pickerEvent.Init(elemId);
    },
    setPriceArr:function(arr){
        obj.priceArr = arr;
    }
};
var dateUtil = {
    //获取当前的年月日
    getCurrent: function () {
        var dt = obj.date;
        obj.year = dt.getFullYear();
        obj.month = dt.getMonth() + 1;
        obj.day = dt.getDate();
    },
    //得到当前一个月的天数
    getLastDay: function () {

        var new_year = obj.year; //取当前的年份        
        var new_month = obj.month; //取当前月份
        var new_date = new Date(new_year, new_month, 1); //取当年下个月中的第一天       

        return new Date(new_date.getTime() - 1000 * 60 * 60 * 24).getDate(); //获取当月最后一天日期  
    },
    //得到当前一个月第一天是星期几
    getWeek: function () {
        return new Date(obj.year, obj.month - 1, 1).getDay(); //0是星期天
    },
    getLastDate: function () {
        if (obj.year == -1) {
            var dt = new Date(obj.date);
            obj.year = dt.getFullYear();
            obj.month = dt.getMonth() + 1;
            return;
        }
        var newMonth = obj.month - 1;
        if (newMonth < 1) {
            obj.year -= 1;
            obj.month = 12;
        } else {
            obj.month -= 1;
        }

    },
    getNextDate: function () {
        if (obj.year == -1) {
            var dt = new Date(obj.date);
            obj.year = dt.getFullYear();
            obj.month = dt.getMonth() + 1;
            return;
        }
        var newMonth = obj.month - 1;
        if (newMonth > 12) {
            obj.year += 1;
            obj.month = 1;
        } else {
            obj.month += 1;
        }
    }
};
var pickerHtml = {
    getHeader: function () {
        htmlObj.header = `<div id="calendar_header">
                <a href="javascript:void(0)" title="上一月" id="picker_last" >上一月</a>
                <a href="javascript:void(0)" title="下一月" id="picker_next" >上一月</a>
                <p>${obj.year}年${obj.month}月</p>
            </div>`;
    },
    getCenter: function () {
        htmlObj.center = `<div id="calendar_center">
                <ul>
                    <li>周日</li>
                    <li>周一</li>
                    <li>周二</li>
                    <li>周三</li>
                    <li>周四</li>
                    <li>周五</li>
                    <li>周六</li>
                </ul>
            </div>`;
    },
    getBodyer: function () {
        var days = dateUtil.getLastDay();
        var week = dateUtil.getWeek();
        var html = `<div id="calendar_bodyer"><ul>`;
        for (var i = 1; i < 42; i++) {
            var c = week > 0 ? week : 0;
            if ((i - 1) >= week && (i - c) <= days) {
                var price = commonUtil.getPrice((i - c));
                var priceStr = "";
                if(price!=-1){
                    priceStr = "<em>￥</em>"+ price;
                }
                if (obj.year == new Date().getFullYear() && obj.month == new Date().getMonth() + 1 && i - c == new Date().getDate()) {
                    html += `<li data-date="${obj.year}-${obj.month}-${i-c}" data-price="${price}"><p>今天</p><p>${priceStr}</p></li>`
                } else {
                    html += `<li data-date="${obj.year}-${obj.month}-${i-c}" data-price="${price}"><p>${i-c}</p><p>${priceStr}</p></li>`
                }
            } else {
                html += `<li></li>`
            }
        }
        html += `</ul></div>`;
        htmlObj.bodyer = html;
    }

};

var commonUtil = {
    getPrice: function (day) {
        var dt = obj.year + "-";
        if (obj.month < 10) {
            dt += "0" + obj.month;
        } else {
            dt += obj.month;
        }
        if (day < 10) {
            dt += "-0" + day;
        } else {
            dt += "-" + day;
        }
        for (var i = 0; i < obj.priceArr.length; i++) {
            if (obj.priceArr[i].Date == dt) {
                return obj.priceArr[i].Price.split('.')[0];
            }
        }
        return -1;
    },
    chooseClick:function(sender){
        var lis = document.getElementById("calendar_bodyer").getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            $(lis[i]).removeClass("active");
        }
        $(sender).addClass("active");
    }
};