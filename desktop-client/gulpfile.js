var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jasmine = require('gulp-jasmine');
var wiredep = require('wiredep').stream;

var appSourceBlob = 'src/**/*.js';

gulp.task('bower', function() {
  gulp.src('./src/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('./src'));
});

gulp.task('default', ['lint'], function defaultTask () {
  return 1;
});

// Lints the source code
gulp.task('lint', function defaultTask () {
  return gulp.src(appSourceBlob)
      .pipe(jscs());
});
