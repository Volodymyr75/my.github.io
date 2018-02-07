
$(function(){
	'use strict';
// пплавный скроллинг к выбранному пункту меню
	$("a[href^='#']").click(function(e) {
		e.preventDefault();
		let target = $(this).attr('href');
		$('html, body').animate(
			{
				scrollTop:$(target).offset().top
			},
			1000
		);
	});


// прилипающее меню при прокрутке вниз
	var offset = $("#header-nav").offset();

	$(window).scroll(function() {
		if($(window).scrollTop() > offset.top) {
			$("#header-nav").addClass("page-header__bottom--fixed");
		} else {
			$("#header-nav").removeClass("page-header__bottom--fixed");
		}
	});

//библиотека slick, слайдер, есть много разного
	if(window.innerWidth > 1024) {
			$("#slide").slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 3000
		});
	}else {
			$("#slide").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 3000
		});
	}

// добавление в фотогалерею при клике на кнопку показать все
	$("#view_all_gallery").click(function() {
		let content = '<div class="s-gallery__item"><div class="s-gallery__box s-gallery__box--long"><img src="img/relaxing-620.jpg" alt=""></div><div class="s-gallery__box s-gallery__box--short"><img src="img/relaxing-300.jpg" alt=""></div></div><div class="s-gallery__name">Lorem ipsum dolor sit amet / <span>Consectetur adipisicing elit</span></div>';
		$("#gallery_box").append(content);
		$(this).remove();
	});

	$(".modal-call, .back-fill").hide();

	$("#call").click(function() {
		$(".modal-call, .back-fill").show();
	});

	$(".modal-call__close, .back-fill").click(function() {
		$(".modal-call, .back-fill").hide();
	});
	
});


// $(document).ready(function() {

	
// });


// $(window).load(function() {

// 	$(".loader_inner").fadeOut();
// 	$(".loader").delay(400).fadeOut("slow");

// 	$(".page-header__logo").animated("fadeInDown", "fadeOutUp");
// 	$(".page-header__tagline").animated("fadeInUp", "fadeOutDown");

// });