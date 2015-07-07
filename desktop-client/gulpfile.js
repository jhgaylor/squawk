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

gulp.task('build-js', function() {
  // there is no build step, just inject them
  gulp.src(blobs.html.main)
    .pipe(inject(gulp.src(blobs.js.all), {relative: true}))
    .pipe(gulp.dest(blobs.app));
});

gulp.task('build-css', function buildCss () {
  // build the sass into css
  gulp.src(blobs.scss.main)
    .pipe(watch(blobs.scss.all))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(blobs.scss.buildTo));

  // inject the built css into the app
  gulp.src(blobs.html.main)
    .pipe(inject(gulp.src(blobs.css.all), {relative: true}))
    .pipe(gulp.dest(blobs.app));
});

gulp.task('watch', ['build-js', 'build-css'], function() {
  watch(blobs.scss.all, batch(function(events, done) {
    console.log(1)
    gulp.start('build-css', done);
  }));

  watch(blobs.js.all, batch(function(events, done) {
    console.log(1)
    gulp.start('build-js', done);
  }));
});
