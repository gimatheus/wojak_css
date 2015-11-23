var navigation = "";
(function($) {
Drupal.behaviors.menuWojak = {
	moveNavigation: function() {
  		var screenSize = Drupal.behaviors.menuWojak.checkWindowWidth();
  		var lengMobilMenu = $("body").find(".mobilMenu").length;
  		var lengDesktopMenu = $("#block-system-main-menu").find('.content').length;
  		if (lengMobilMenu) {
  			$("body").find('.mobilMenu').detach();
  		}
  		if (lengDesktopMenu) {
  			$("#block-system-main-menu").find('.content').detach();
  		}
        if (screenSize) {		
			$("#block-system-main-menu").append(navigation);
		} else {
			var divMenu = $("<div>", {
				html: navigation
			}).addClass("mobilMenu");
			divMenu.addClass("cd-main-nav");
			
			$("#page").after(divMenu);
		}
	},
	checkWindowWidth: function() {
		var mq = window.getComputedStyle(document.querySelector('#page'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, "");
		return ( mq == 'mobile' ) ? false : true;
	},
	htmlButtomMenu: function () {
		var hrefHtml = $('<a>', {
			class: "cd-nav-trigger",
			html: "<span></span>",
			href: "javascript:"
			});
		return hrefHtml;
	},
	attach: function (context, settings) {
		navigation = $("#block-system-main-menu").html();
		console.log(navigation);
		this.checkWindowWidth();
		$( window ).resize(function() {
			(!window.requestAnimationFrame)?setTimeout(Drupal.behaviors.menuWojak.moveNavigation(), 300):window.requestAnimationFrame(Drupal.behaviors.menuWojak.moveNavigation);
		});
		var screenSizeM = Drupal.behaviors.menuWojak.checkWindowWidth();
		if (!screenSizeM) {
			Drupal.behaviors.menuWojak.moveNavigation();
		}
		var screenSize = this.checkWindowWidth(); 
  		
  		var htmlButtom = this.htmlButtomMenu();
  		htmlButtom.click(function(event){
  			event.preventDefault();
  			if($("#page").hasClass('nav-is-visible')) $('.moves-out').removeClass('moves-out');
  			var lengMobilMenu = $("body").find(".mobilMenu").length;
  			if (lengMobilMenu) {
  				if($("body").find(".mobilMenu").hasClass('nav-is-visible')) $("body").find(".mobilMenu").removeClass('nav-is-visible');
  				$("body").find(".mobilMenu").toggleClass('nav-is-visible');
  			}
  			
  			$("#page").toggleClass('nav-is-visible');
  			return false;
  		});
  		$("#navigation").prepend(htmlButtom);
  	}
};
})(jQuery);