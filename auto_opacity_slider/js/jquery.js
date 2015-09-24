<!--//--><![CDATA[
	//Set Cookie function
	function Set_Cookie( name, value, expires, path, domain, secure ) {
		var today = new Date();
		today.setTime( today.getTime() );
		if ( expires )
		{
		expires = expires * 1000 * 60 * 60 * 24; }
		var expires_date = new Date( today.getTime() + (expires) );
		document.cookie = name + "=" +escape( value ) + ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + ( ( path ) ? ";path=" + path : "" ) + ( ( domain ) ? ";domain=" + domain : "" ) +( ( secure ) ? ";secure" : "" );
	}

	//Hover Intent Function
	(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:4,interval:100,timeout:200};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);
	//Hover Lavalamp 
	$(function() { $(".lavaLamp").lavaLamp({ fx: "backout", speed: 700 })});
	
	$(function () {
		var tabContainers = $('div.tabs > div');
		
		$('div.tabs ul.tabNavigation a').click(function () {
			tabContainers.hide().filter(this.hash).show();
			
			$('div.tabs ul.tabNavigation a').removeClass('selected');
			$(this).addClass('selected');
			
			return false;
		}).filter(':first').click();
	});
	
	//Itemdrop down menu
	function initTopMenu() {
		$('ul.sortby ul').hide();
		$('ul.sortby li a').click(
		function() {
			var checkElement = $(this).nextAll();
			var parent = this.parentNode.parentNode.id;
			
			if((checkElement.is('ul')) && (checkElement.is(':visible'))) {	
				//Remove all properties and close ul
				$('ul.sortby ul:visible').hide();
				$('ul.sortby li.current').removeClass('active2');
				$('ul.sortby li.select').removeClass('active');
				return false;
			}
			if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
				//Remove all properties on other open uls
				$('ul.sortby ul:visible').hide();
				$('ul.sortby li.current').removeClass('active2');
				$('ul.sortby li.select').removeClass('active');
				//then add to current click ul
				checkElement.show();
				$(this).parent().addClass('active');
				$(this).parent().parent().find('li.current').addClass('active2');
				return false;
			}
		});
	$('#main').bind('click', 
	function(e) { 
		//if the mouse is clicked outside the menu
		var $clicked=$(e.target);
		if($clicked.is('ul.sortby')) {	
		} else {
			//Remove all properties and close ul
			$('ul.sortby ul').hide();  
			$('ul.sortby li.current').removeClass('active2');
			$('ul.sortby li.select').removeClass('active');
		}
		});
	}
	
	//Show/hide labels on forms
	$(function(){
		$('.comment-form li input, .comment-form li textarea').focus(function(){
			$('label[for=' + $(this).attr('id') + ']').hide();
		});
		$('.comment-form li input, .comment-form li textarea').each(function(ele){
			if($(this).val().length > 0)
				$('label[for=' + $(this).attr('id') + ']').css({ display: "none" });
		});
		$('.comment-form li input, .comment-form li textarea').blur(function(){
			if($(this).val().length == 0)
				$('label[for=' + $(this).attr('id') + ']').show();
		});

		
	});
	
	//Main Menu Hover
	$(document).ready(function() {
	
		//PNG fix
		$(document).pngFix();
		
		//Open rel link in new window
		$('a[rel="external"]').click( function() {
			window.open( $(this).attr('href') );
			return false;
		});
		
		//Mini Slideshow
		$('.mini-sld1').cycle({ 
			fx:    'fade', 
			speed:  800,
			timeout: 6000,
			next:   '#next-sld', 
			prev:   '#prev-sld' 			
		});
		
		//Show comments on main page
		$('.comment-count a').click(function(){
			$(this).parent().parent().next('.comment-contain').slideToggle();
			$(this).parent().parent().toggleClass('active');
			return false;
		});
		
		//Drop Down menu
		initTopMenu();
		
		//Image thumbnail hovers 
		//$('.thumbnail .info').hide();
		$('.thumbnail a').hover(function(){
			$(this).parent().find('.info').animate({top:'134px'},{queue:false,duration:300});
		}, function(){
			$(this).parent().find('.info').animate({top:'171px'},{queue:false,duration:400});
		});
		
		//show hide rss and twitter counts
		$('.rss-count').hide();
		$('a.rss-img').hoverIntent(function(){
			$('.rss-count').show();
		}, function(){
			$('.rss-count').hide();
		});
		$('.twt-count').hide();
		$('a.twt-img').hoverIntent(function(){
			$('.twt-count').show();
		}, function(){
			$('.twt-count').hide();
		});
		
		//Show hide news excerpts
		$('a.showExcerpt').click(function(){
		
			var text = $(this).parent().next('.excerpt')[0];
			
			if ($(text).is(":visible")) {
				$(this).parent().next('.excerpt').fadeOut();
				$(this).text("Show Excerpt");
			} else {
				$(this).parent().next('.excerpt').fadeIn();
				$(this).text("Hide Excerpt");
			}
			return false;
		});
		
	});
//]]>