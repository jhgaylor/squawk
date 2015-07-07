var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jasmine = require('gulp-jasmine');
var watch = require('gulp-watch')
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var batch = require('gulp-batch');
var wiredep = require('wiredep').stream;

var appSourceBlob = 'src/**/*.js';
var blobs = {
  app: './src/client',
  html: {
    main: './src/client/index.html'
  },
  css: {
    all: './src/client/css/**/*.css'
  },
  scss: {
    buildTo: './src/client/css',
    all: 'src/client/scss/**/*.scss',
    main: '/src/client/scss/main.scss'
  },
  js: {
    all: './src/client/**/*.js'
  }
};

gulp.task('bower', function() {
  gulp.src(blobs.html.main)
    .pipe(wiredep())
    .pipe(gulp.dest(blobs.app));
});

gulp.task('default', ['lint'], function defaultTask () {
  return 1;
});

// Lints the source code
gulp.task('lint', function defaultTask () {
  return gulp.src(appSourceBlob)
      .pipe(jscs());
});
