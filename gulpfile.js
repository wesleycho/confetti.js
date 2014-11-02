var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  karma = require('karma').server,
  lazypipe = require('lazypipe');

var testFiles = [
  'src/confetti.js',
  'test/*.spec.js'
];

var jshintTask = lazypipe()
  .pipe(jshint)
  .pipe(jshint.reporter, stylish)
  .pipe(jshint.reporter, 'fail');

gulp.task('jshint', function () {
  return gulp.src(testFiles)
    .pipe(jshintTask());
})

gulp.task('karma', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    autoWatch: false,
    browsers: ['Firefox']
  }, done);
});

gulp.task('test', ['jshint', 'karma']);
