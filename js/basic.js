(function(){
	/*导航下拉*/
	$(".navdown").hover(function(){
		$(".navdown_list").css("display","block");
	},function(){
		$(".navdown_list").css("display","none");
	})
	/*首页效果*/
	jQuery(".index_slide").slide({mainCell:".bd ul",autoPlay:true,effect:"fold"});
	jQuery(".slideBox_dz").slide({mainCell:".bd ul",effect:"leftLoop"});
	jQuery(".picScroll-left").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"leftLoop",vis:3,easing:"easeInQuint"});
	$("#header").scrollFix();
	/*注册登录*/
	$("#register").click(function(){
		$("#reglogin_con").css("display","none");
		$("#reglogin_con .login").css("display","none");
		$("#reglogin_con").css("display","block");
		$("#reglogin_con .register").css("display","block");
	});
	$("#login").click(function(){
		$("#reglogin_con").css("display","none");
		$("#reglogin_con .register").css("display","none");
		$("#reglogin_con").css("display","block");
		$("#reglogin_con .login").css("display","block");
	});
	$("#reg_close").click(function(){
		$("#reglogin_con").css("display","none");
		$("#reglogin_con .register").css("display","none");
	});
	$("#lo_close").click(function(){
		$("#reglogin_con").css("display","none");
		$("#reglogin_con .login").css("display","none");
	});
	
	
	
	
	
	
	
	
})();
