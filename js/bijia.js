(function() {
    $("#bijia_title").scrollFix();
    var bijia_box = $(".bijia_box");
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


    anchorGoWhere("#right_nav", "active", 500, 130);





})();