'use strict';
 
var browserSync   = require('browser-sync').create();
var concat        = require('gulp-concat');
var ejs           = require("gulp-ejs");
var gulp          = require('gulp');
var sass          = require('gulp-sass');

sass.compiler = require('node-sass');
 

function makeCss(){
  return gulp.src([
    './Sass/base.scss',
    './Sass/**/*.scss'
  ])
  .pipe(concat("style.css"))
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./www/css'));
}

function makePage(){
  console.log("makePage")
  return gulp.src("./Sass/pages/*.html")
  .pipe(ejs())
  .pipe(gulp.dest("./www"))
}


function watch(){

    browserSync.init({
        server: "./www"
    });

    gulp.watch("Sass/**/*.html", makePage);
    gulp.watch("Sass/**/*.scss", makeCss);
    gulp.watch("www").on('change', browserSync.reload);
  
}

module.exports.makeCss = makeCss;
module.exports.watch = watch;