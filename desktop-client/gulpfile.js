var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jasmine = require('gulp-jasmine');
var watch = require('gulp-watch')
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var batch = require('gulp-batch');
var templateCache = require('gulp-angular-templatecache');
var angularFilesort = require('gulp-angular-filesort');

var wiredep = require('wiredep').stream;

var appSourceBlob = 'src/**/*.js';
var blobs = {
  app: './src/client',
  buildAppTo: './build/client',
  html: {
    main: './src/client/index.html',
    buildTo: './build/client/index.html'
  },
  css: {
    all: './src/client/css/**/*.css',
    buildTo: './build/client/css',
  },
  scss: {
    buildTo: './build/client/css',
    all: './src/client/scss/**/*.scss',
    main: './src/client/scss/main.scss'
  },
  js: {
    base: './src/client/js',
    buildTo: './build/client/js',
    all: './src/client/js/**/*.js'
  },
  // all the other keys apply to the angular app. this namespace
  // is for the container app
  electron: {
    js: {
      all: './src/electron/**/*.js',
      buildTo: './build/electron'
    }
  },
  templates: {
    all: './src/client/templates/**/*.html',
    buildTo: './build/client/templates'
  }
};

gulp.task('default', ['bower', 'lint']);

gulp.task('bower', function() {
  gulp.src(blobs.html.main)
    .pipe(wiredep())
    .pipe(gulp.dest(blobs.buildAppTo));
});

// Lints the source code
gulp.task('lint', function defaultTask () {
  return gulp.src(appSourceBlob)
      .pipe(jscs());
});

gulp.task('build-js', function() {
  // just copy the files verbatim
  // TODO: ngTransform
  gulp.src(blobs.js.all)
    .pipe(gulp.dest(blobs.js.buildTo));

  gulp.src(blobs.electron.js.all)
    .pipe(gulp.dest(blobs.electron.js.buildTo));

  // inject the built scrits
  gulp.src(blobs.html.main)
    .pipe(inject(
      gulp.src(blobs.js.all)
        .pipe(angularFilesort()
    ), {relative: true}))
    .pipe(gulp.dest(blobs.buildAppTo));
});

gulp.task('build-css', function buildCss () {
  // build the sass into css
  gulp.src(blobs.scss.main)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(blobs.scss.buildTo));

  // inject the built css into the app
  gulp.src(blobs.html.main)
    .pipe(inject(gulp.src(blobs.css.all), {relative: true}))
    .pipe(gulp.dest(blobs.buildAppTo));
});

// TODO: determine what value this would bring to me inside of electron
gulp.task('build-templates', function() {
  return gulp.src(blobs.templates.all)
    // .pipe(templateCache('templates.js', {standalone: true}))
    .pipe(gulp.dest(blobs.templates.buildTo));
});

gulp.task('watch', ['build-js', 'build-css', 'build-templates'], function() {
  watch(blobs.scss.all, batch(function(events, done) {
    gulp.start('build-css', done);
  }));

  watch(blobs.js.all, batch(function(events, done) {
    gulp.start('build-js', done);
  }));

  watch(blobs.electron.js.all, batch(function(events, done) {
    gulp.start('build-js', done);
  }));

  watch(blobs.templates.all, batch(function(events, done) {
    gulp.start('build-templates', done);
  }));
});
