/* eslint-disable no-console */

var del = require('del');
var gulp   = require('gulp');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var nodeunit = require('gulp-nodeunit');
var runSequence = require('run-sequence');
var access = require('./index.js');

gulp.task('clean', function(cb) {
  return del([
    './reports'
  ], cb);
});

gulp.task('lint', function() {
  return gulp.src(['./libs/*.js', 'gulpfile.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('nodeunit', function() {
  return gulp.src('./test/*_test.js')
    .pipe(nodeunit({
      reporter: 'junit',
      reporterOptions: {
        output: 'reports'
      }
    }));
});

gulp.task('accessSniff-txt', function() {
  return gulp.src('./example/**/*.html')
    .pipe(access({
      force: true,
      verbose: false
    }))
    .pipe(access.report({reportType: 'txt'}))
    .pipe(rename({
      extname: '.txt'
    }))
    .pipe(gulp.dest('reports/txt'));

});

gulp.task('accessSniff-json', function() {
  return gulp.src('./example/**/*.html')
    .pipe(access({
      force: true,
      verbose: false
    }))
    .on('error', console.log)
    .pipe(rename({
      extname: '.json'
    }))
    .pipe(gulp.dest('reports/json'));
});

gulp.task('accessSniff-error', function() {
  return gulp.src('./errors/**/*.html')
    .pipe(access({
      force: true,
      verbose: false
    }))
    .on('error', console.log)
    .pipe(rename({
      extname: '.json'
    }))
    .pipe(gulp.dest('reports/json'));
});

gulp.task('test', function(callback) {
  runSequence('clean', 'lint', 'accessSniff-txt', 'accessSniff-json', 'accessSniff-error', 'nodeunit', callback);
});
