(function($) {

	var obj = {
		//初始化方法
		init: function() {
			var self = this;
			self.getLogo() //获取logo
				.getRunImg() //获取轮播图的图片
				.runImg() //图片轮播
				.getShowcase() //Showcase的图片获取
				.getRocketPlanet() //获取行星、飞船配图
				.getResImg() //获取research的轮播图图片
				.runSerImg() //research的图片轮播
				.commentRun() //comment的图片轮播
				.blurFocus(); //获取和失去焦点事件

		},

		//获取logo
		getLogo: function() {
			$.ajax({
				type: "get",
				url: 'http://iwen.wiki/sxtstu/exam3/Atech/getAtechLogo.php',
				success: function(data) {
					$('.imgLogo').attr("src", data.logo);
				}
			})
			return this;
		},
		//获取轮播图图片
		getRunImg: function() {
			$.ajax({
				type: "get",
				url: 'http://iwen.wiki/sxtstu/exam3/Atech/getAtechSlide.php',
				success: function(data) {
					var imgData = data.slide;
					for(var i = 0; i < imgData.length; i++) {
						(function(index) {
							var temp = imgData[index];
							$('.slide_text').eq(index).attr('src', temp.slide_text);
							$('.slide_button').eq(index).attr('src', temp.slide_button);
						})(i);
					}
				}
			});

			return this;
		},

		//图片轮播事件
		runImg: function() {
			var $list = $('.list li');
			var $prev = $('#prev');
			var $next = $('#next');
			var indexNow = 0;
			var count = $list.length;
			var timer = null;

			function core(num) {
				$list.eq(num).stop().fadeIn(2500).siblings().fadeOut(1000);
			}

			function play() {
				indexNow++;
				if(indexNow > count - 1) {
					indexNow = 0;
				}
				core(indexNow);

			}
			$next.click(play);
			$prev.click(function() {
				indexNow--;
				if(indexNow < 0) {
					indexNow = count - 1;
				}
				core(indexNow);
			});

			timer = setInterval(play, 2500);

			$('.list_wrap').hover(function() {
				clearInterval(timer);
			}, function() {
				timer = setInterval(play, 2500);
			});

			return this;
		},

		//Showcase的图片获取
		getShowcase: function() {
			$.ajax({
				type: "get",
				url: 'http://iwen.wiki/sxtstu/exam3/Atech/getAtechShowcase.php',
				success: function(data) {
					var imgData = data.showcase;
					for(var i in imgData) {
						$("." + i).attr("src", imgData[i]);
					}
				}
			});
			return this;
		},

		//获取行星、飞船配图
		getRocketPlanet: function() {
			$.ajax({
				type: "get",
				url: 'http://iwen.wiki/sxtstu/exam3/Atech/getAtechRockets&Planet.php',
				success: function(data) {
					var imgData = data.rocketsAndPlanet;
					$('.rockets').attr("src", imgData.rockets);
					$('.planet').attr("src", imgData.planet);
				}
			})
			return this;
		},

		//获取research的轮播图图片
		getResImg: function() {
			$.ajax({
				type: "get",
				url: 'http://iwen.wiki/sxtstu/exam3/Atech/getAtechRecent.php',
				success: function(data) {
					var imgData = data.recent;
					for(var i in imgData) {
						$("." + i).attr("src", imgData[i]);
					}
				}
			});

			return this;
		},
		//research的图片轮播事件
		runSerImg: function() {
			var list = $('.re_list');
			var first = list.children(':first').clone(true);
			var index = 0;
			var length = list.children().length;
			var width = list.children(':first').width();
			var count = $('.re_list').width() / width;
			var next = $('#next');
			var prev = $('#prev');

			for(var i = 0; i < count; i++) {
				var newLi = list.children('li').eq(i).clone(true);
				list.append(newLi);
			}

			function core(num) {
				list.stop().animate({ "margin-left": (-num * width) });
			}

			function autoPlay() {
				index++;
				if(index > length) {
					list.css("margin-left", 0);
					index = 1;
				}
				core(index);
			}

			var sid = setInterval(autoPlay, 1000);

			$('.reBox').hover(function() {
				clearInterval(sid)
			}, function() {
				sid = setInterval(autoPlay, 1000);
			});

			return this;
		},
		//comment图片轮播
		commentRun: function() {
			var list = $('.comList');
			var first = list.children(':first').clone(true);
			var index = 0;
			var length = list.children().length;
			var width = list.children(':first').width();
			var btns = $('.comBtns li');
			list.append(first);

			function core(num) {
				btns.eq(num >= btns.length ? 0 : num).addClass('active').siblings().removeClass('active');
				list.stop().animate({ "margin-left": (-num * width) });
			}

			function autoPlay() {
				index++;
				if(index > length) {
					list.css("margin-left", 0);
					index = 1;
				}
				core(index);
			}

			btns.click(function() {
				core(index = $(this).index())
			});

			var sid = setInterval(autoPlay, 1500);

			$('.conComment').hover(function() {
				clearInterval(sid)
			}, function() {
				sid = setInterval(autoPlay, 1500);
			});

			return this;
		},
		//获取焦点事事件
		blurFocus: function() {
			var ptInput = $('.ptInput');
			var defaultTxt = ptInput.val();
			
			ptInput.focus(function() {
				ptInput.css('border', "1px solid #4791ff");
				if(ptInput.val() == defaultTxt) ptInput.val("");

			}).blur(function() {
				ptInput.css('border', "1px solid transparent");
				if(ptInput.val() == "") ptInput.val(defaultTxt);
			})
			return this;
		}

	};

	//执行初始化的方法
	obj.init();

})(jQuery);