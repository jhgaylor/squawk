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
    base: './src/client/js',
    all: './src/client/js/**/*.js'
  },
  templates: {
    all: './src/client/templates/**/*.html'
  }
};

gulp.task('default', ['bower', 'lint']);

gulp.task('bower', function() {
  gulp.src(blobs.html.main)
    .pipe(wiredep())
    .pipe(gulp.dest(blobs.app));
});

// Lints the source code
gulp.task('lint', function defaultTask () {
  return gulp.src(appSourceBlob)
      .pipe(jscs());
});

gulp.task('build-js', function() {
  // there is no build step, just inject them
  gulp.src(blobs.html.main)
    .pipe(inject(
      gulp.src(blobs.js.all)
        .pipe(angularFilesort()
    ), {relative: true}))
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

// TODO: determine what value this would bring to me inside of electron
// gulp.task('build-templates', function() {
//   return gulp.src(blobs.templates.all)
//     .pipe(templateCache('templates.js', {standalone: true}))
//     .pipe(gulp.dest(blobs.js.base));
// });

gulp.task('watch', ['build-js', 'build-css'], function() {
  watch(blobs.scss.all, batch(function(events, done) {
    gulp.start('build-css', done);
  }));

  watch(blobs.js.all, batch(function(events, done) {
    gulp.start('build-js', done);
  }));

  // watch(blobs.templates.all, batch(function(events, done) {
  //   gulp.start('build-templates');
  // }));
});
