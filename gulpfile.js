const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const imagemin = import('gulp-imagemin');
const uglify = require('gulp-uglify');

function styles() {
  return gulp.src('./src/styles/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(sourcemaps.write('.maps'))
      .pipe(gulp.dest('./dist/css'));
}

function images(){
  return gulp.src('./src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'));
}


function comprimeJS(){
  return gulp.src('./src/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts'))
}

exports.watch = function(){
  gulp.watch('./source/styles/*.scss', {ignoreInitial: false} , gulp.series(styles, images, comprimeJS))
}
exports.default = gulp.parallel(styles, comprimeJS, images);
