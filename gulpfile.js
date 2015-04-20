var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var access = require('./libs/accessSniff.js');

gulp.task('lint', function() {
  return gulp.src('./libs/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('test', function() {
  return gulp.src('./example/**/*.html')
    .pipe(access());
});
