/*
  Tests and linting must pass before a build will succeed.

  To Deploy this server and call it your own, simply
  tweak the ssh settings.

  If you want to fork this package, you'll need to update the
  `docker` variable to reflect your dockerhub repository.

  Don't forget to `docker login` before using `gulp deploy`
*/
var moment = require('moment');
var gulp = require('gulp');
var jscs = require('gulp-jscs');
var shell = require('gulp-shell')
var jasmine = require('gulp-jasmine');
// TODO: I configured this using ~/.ssh/config, but it wont trigger
//       I would like to have this out of source control. At least
//       I knocked out the hostname using /etc/hosts
// Docs: https://www.npmjs.com/package/gulp-ssh/
var gulpSSH = require('gulp-ssh')({
  ignoreErrors: false,
  sshConfig: {
    host: 'squawk',
    port: 22,
    username: 'root',
    privateKey: require('fs').readFileSync('/Users/jake/.ssh/squawk')
  }
});

// Options used for building and deploying docker images
var docker = {
  imageRepo: 'jhgaylor/squawk-api-server',
  containerName: 'squawk-api-server'
};

var appSourceBlob = 'src/**/*.js';
var testSpecBlob = 'spec/main.js';

gulp.task('default', ['lint', 'test'], function defaultTask () {
  return 1;
});

// Lints the source code
gulp.task('lint', function defaultTask () {
  return gulp.src(appSourceBlob)
      .pipe(jscs());
});

// Runs the tests
gulp.task('test', function test () {
  return gulp.src(testSpecBlob)
      .pipe(jasmine());
});

// currently doesn't do anything to the source code, but
// provides an easy place to add traceur or a less compiler
gulp.task('compile', ['lint', 'test'], function test () {
  return gulp.src(appSourceBlob)
      .pipe(gulp.dest('dist'));
});

// create a docker image from the compiled source code
// and remove the compiled code
gulp.task('build', ['compile'], shell.task([
  'docker build -t ' + docker.imageRepo + ' .',
  'rm -rf dist/'
]));

// Pushes the most recent build of the docker image to docker hub
gulp.task('push-to-docker-hub', shell.task([
  'docker push ' + docker.imageRepo
]));

// Deploys the most recent build but does not make a build
gulp.task('deploy', ['push-to-docker-hub'], function deploy () {
  // SSH to the server - pull image & swap running container
  return gulpSSH
    .exec([
      'docker pull ' + docker.imageRepo + ':latest',
      'docker stop ' + docker.containerName,
      'docker rm ' + docker.containerName,
      'docker rmi ' + docker.imageRepo + ':current',
      'docker tag ' + docker.imageRepo + ':latest ' + docker.imageRepo + ':current',
      'docker run -d --name ' + docker.containerName + ' -p 4000:3000 ' + docker.imageRepo + ':latest',
      'docker ps'
    ], {
      filePath: 'deploy' + moment().format('MMDDYYYY_HHmmss') + '.log'
    })
    .pipe(gulp.dest('logs'));
});

gulp.task('watch', function watch () {
  gulp.watch(appSourceBlob, ['lint', 'test']);
  return 1;
});
