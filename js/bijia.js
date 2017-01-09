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


    $(".bijia_box2_title").each(function(item, obj) {
        $(obj).find(".close").on("click", function() {
            $(".bijia_box").each(function() {
                $(this).find('.bijia_box2').eq(item).html('');
            });
            $(obj).html(`<div class="form-group">
                                <div class="input-group">
                                    <input class="form-control" type="text" placeholder="添加对比产品编号">
                                </div>
                                <button type="submit" class="btn btn-default">+</button>
                            </div>`);

        });
    });




})();