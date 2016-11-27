; (function($) {
    var GalMenu = {
        defaults: {
            click_to_close: true,
            stay_open: false
        },
        init: function(options) {
            var o = options,
            $this = $(this);
            $this.each(function(i) {
                var $this = $(this),
                settings = $.extend({},
                GalMenu.defaults, o),
                $menu = $('.' + settings.menu);
                
                $('body').prepend("<div id='user' class='user' style='display:none;z-index:1000;-webkit-box-sizing: none;box-sizing: none;'>");
	            var $btip = $(".user");
                $this.on('click',
	                function(e) {
	                    if (e.which !== 3 && $(e.target).parents('.GalMenu').length < 1 && settings.click_to_close&&click_node==undefined||(click_node!=undefined&&click_node==check)) {
	                        $this.find('.GalMenu').stop(true, false).animate({
	                            opacity: 0
	                        },
	                        {
	                            duration: 100,
	                            queue: false,
	                            complete: function() {
	                                $(this).css('display', 'none').find('.active').removeClass('active').next().stop(true, true).slideUp('normal')
	                            }
	                        });
	                        $(".circle").removeClass("open");
	                        $("#overlay").hide();
	                        setTimeout(function(){$("#option").hide();},100);
	                        $btip.hide();
	                        trans=undefined;
	                    }else if(click_node!=undefined&&click_node!=check){
	                    	check=click_node;
	                    	var options={
								photo: "images/avtar.png", //图片路径
								name: click_node.name,                 //姓名
								partners:promatrix[click_node.dataIndex][4],
								importance: click_node.value,               //爱好
								role:click_node.data.category,
							};
	                    	/*删除和还原只显示一个*/
							$btip.html("<span></span><div class='out'><div class='ins'><a title='人物肖像'><img src='" + options.photo + "' alt='' /></a><div>名称：" + options.name + "<br />好友数：" + options.partners + "<br />重要度：" + options.importance + "<br />角色：" + options.role + "<br /><a class='btn btn-danger btn-small' title='删除' onclick='left_click_delete()'>删除</a>&nbsp;&nbsp;<a class='btn btn-success btn-small' title='取消' onclick='cancel()'>取消</a></div></div></div></div>");
	                    	GalMenu.getCoords(e);
	                    	var add = 150;
	                    	var top = Coords.clickY-225;
	                    	if(Coords.clickX+290>$(window).width()){
	                    		left =  Coords.clickX-250
	                    		$btip.find("span").addClass('br');
	                    	}else{
	                    		left = Coords.clientX-20;
	                    	$btip.find("span").addClass('bl');
	                    	}
	                    	$btip.css('display','block');
			                $btip.css({
			                    top: top + 'px',
	                        	left: left + 'px',
			                }).show();
	                   };
	                   $btip.off().on('mouseover', function () {
				            $btip.show();
				        }).on('mouseleave', function () {
				            $btip.hide();
				            click_node=undefined;
				        });
                });
                
                $this.on('contextmenu',
                	function(e) {
                		//console.log(trans);
                		$btip.hide();
                		if(trans!=undefined){
	                    	e.preventDefault();
		                    e.stopPropagation();
		                    GalMenu.getCoords(e);
		                    $('.GalMenu_close_me').stop(true, false).animate({
		                        opacity: 0
		                    },
		                    {
		                        duration: 100,
		                        queue: false,
		                        complete: function() {
		                            $(this).css('display', 'none')
		                        }
		                    });
		                    var add = 150;
		                    var top = Coords.clientY - add,
		                    left = ($('body')[0] === e.target) ? Coords.clickX + add: Coords.clientX - add;
		                    $menu.css({
		                        top: top + 'px',
		                        left: left + 'px',
		                        display: 'block'
		                    }).stop(true, false).animate({
		                        opacity: 1
		                    },
		                    {
		                        duration: 100,
		                        queue: false
		                    });
		                    if ($("#gal").hasClass("open")) {
		                        $(".circle").removeClass("open");
		                        $("#overlay").hide();
		                        trans=undefined;
		                        setTimeout(function(){$("#option").hide();},100);
		                    } else {
		                        $(".circle").addClass("open");
		                        $("#overlay").show();
		                    }
		                }
	                })		
            })
        },
        getCoords: function(e) {
            var evt = e ? e: window.event;
            var clickX = 0,
            clickY = 0;
            if ((evt.clientX || evt.clientY) && document.body && document.body.scrollLeft != null) {
                clickX = evt.clientX + document.body.scrollLeft;
                clickY = evt.clientY + document.body.scrollTop
            };
            if ((evt.clientX || evt.clientY) && document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.scrollLeft != null) {
                clickX = evt.clientX + document.documentElement.scrollLeft;
                clickY = evt.clientY + document.documentElement.scrollTop
            };
            if (evt.pageX || evt.pageY) {
                clickX = evt.pageX;
                clickY = evt.pageY
            };
            Coords = {
                clickX: clickX,
                clickY: clickY,
                clientX: evt.clientX,
                clientY: evt.clientY,
                screenX: evt.screenX,
                screenY: evt.screenY
            }
            return Coords;
        }
    };
    $.fn.GalMenu = function(method, options) {
        if (GalMenu[method]) {
            return GalMenu[method].apply(this, Array.prototype.slice.call(arguments, 1))
        } else if (typeof method === 'object' || !method) {
            return GalMenu.init.apply(this, arguments)
        } else {
            $.error('Method ' + method + ' does not exist')
        }
    }
})(jQuery);
String.prototype.removeWS = function() {
    return this.toString().replace(/\s/g, '')
};
String.prototype.pF = function() {
    return parseFloat(this)
};
Number.prototype.pF = function() {
    return parseFloat(this)
};
