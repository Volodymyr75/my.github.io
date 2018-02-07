"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");
var imagemin = require("gulp-imagemin");
var svgmin = require("gulp-svgmin");
var server = require("browser-sync").create();
var run = require("gulp-sequence");
var del = require("del");

var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

gulp.task("style", function() {
	gulp.src("sass/style.scss")
		.pipe(plumber())
		.pipe(sass())
		.pipe(postcss([
			autoprefixer({browsers: [
				"last 1 version",
				"last 2 Chrome versions",
				"last 2 Firefox versions",
				"last 2 Opera versions",
				"last 2 Edge versions"
				]}),
			mqpacker({
				sort: true
			})
		]))
		.pipe(gulp.dest("build/css"))
		.pipe(minify())
		.pipe(rename("style.min.css"))

		.pipe(gulp.dest("build/css"))
		.pipe(server.reload({stream: true}));

});

gulp.task("images", function() {
	return gulp.src("build/img/**/*.{png,jpg,gif}")
	.pipe(imagemin([
		imagemin.optipng({optimizationLevel: 3}),
		imagemin.jpegtran({progressive: true})
		]))
	.pipe(gulp.dest("build/img"));

});

gulp.task("symbols", function() {
	return gulp.src("build/img/icons/*.svg")
	.pipe(svgmin())
	.pipe(svgstore({
		inlineSvg: true
	}))

	.pipe(rename("symbols.svg"))
	.pipe(gulp.dest("build/img"));
});

gulp.task("html:copy", function() {
	return gulp.src("*.html")
	.pipe(gulp.dest("build"));
});

gulp.task("html:update", ["html:copy"], function(done) {
	server.reload();
	done();
});

gulp.task("serve",  function() {
	server.init({
		server: "build/",
		notify: false,
		open: true,
		cors: true,
		ui: false
	});

	gulp.watch("sass/**/*.{scss,sass}", ["style"]);
	gulp.watch("*.html", ["html:update"]);
});


gulp.task("copy", function() {
	return gulp.src([
		"fonts/**/*.{woff,woff2}",
		"libs/**",
		"img/**",
		"js/**",
		"*.html"
		], {
			base: "."
		})
		.pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
	return del("build");
});

gulp.task("build", function(fn) {
	run(
		"clean",
		"copy",
		"style", 
		"images", 
		"symbols", 
		fn
	);
});

gulp.task("scripts", function () { // Берем все необходимые библиотеки
	return gulp.src(["libs/jquery/jquery-2.1.3.min.js", // Берем jQuery
		"libs/jqBootstrapValidation/jqBootstrapValidation.js",
		"libs/parallax/parallax.min.js", // Берем parallax
		"libs/animate/animate-css.js", // Берем Animate
		"libs/boostsrap/bootstrap-grid.min.js", // Берем Bootstrap
		// "libs/mixitup/jquery.mixitup.js", // Берем mixitup
		"libs/scroll2id/PageScroll2id.min.js", // Берем Scroll2id
		"libs/waypoints/waypoints.min.js", // Берем waypoints
		"libs/magnific-popup/jquery.magnific-popup.min.js" // Берем Magnific Popup
					])
		.pipe(concat("libs.min.js")) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest("libs/")); // Выгружаем в папку app/js
});