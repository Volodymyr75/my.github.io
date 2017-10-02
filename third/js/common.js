$(document).ready(function() {

	$("#portfolio_grid").mixItUp();

	$(".s_portfolio li").click(function() {
		$(".s_portfolio li").removeClass("active");
		$(this).addClass("active");
	});

	$(".popup").magnificPopup({type:"image"});
	$(".popup_content").magnificPopup({
		type:"inline",
		midClick: true
	});

	// $(".main-nav__items a").hover(function() {
	// 	$(this).animated("bounce", "fadeOutDown");
	// });

	$(".section_header").animated("fadeInUp", "fadeOutDown");

	$(".animation_1").animated("flipInY", "fadeOutDown");
	$(".animation_2").animated("fadeInLeft", "fadeOutDown");
	$(".animation_3").animated("fadeInRight", "fadeOutDown");

	$(".left .resume_item").animated("fadeInLeft", "fadeOutDown");
	$(".right .resume_item").animated("fadeInRight", "fadeOutDown");

	function heightDetect() {
		$(".page-header").css("height", $(window).height());
	};
	heightDetect();
	$(window).resize(function() {
		heightDetect();
	});

	$(".main-nav__toggle").click(function() {
		$(".main-nav__sandwich").toggleClass("active");
	});

	$(".main-nav__items a").click(function() {
		if(window.matchMedia('(max-width: 768px)').matches) {
			$(".main-nav__wrapper").fadeOut(600);
			$(".main-nav__sandwich").toggleClass("active");
		}
		
		// $(".top_text").css("opacity", "1");
	}).append("<span>");

	$(".main-nav__toggle").click(function() {
		if ($(".main-nav__wrapper").is(":visible")) {
			// $(".top_text").css("opacity", "1");
			$(".main-nav__wrapper").fadeOut(600);
			$(".main-nav__item a").removeClass("fadeInUp animated");
		} else {
			// $(".top_text").css("opacity", ".1");
			$(".main-nav__wrapper").fadeIn(600);
			$(".main-nav__item a").addClass("fadeInUp animated");
		};
	});

	$(".portfolio_item").each(function(i) {
		$(this).find("a").attr("href", "#work_" + i);
		$(this).find(".podrt_descr").attr("id", "work_" + i);
	});

	$("input, select, textarea").jqBootstrapValidation();

	$(".top_mnu ul a").mPageScroll2id();

});
$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

	$(".top_text h1").animated("fadeInDown", "fadeOutUp");
	$(".top_text p").animated("fadeInUp", "fadeOutDown");

});