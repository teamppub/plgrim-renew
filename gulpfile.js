var gulp = require('gulp');
var pump = require('pump');
var phpinc = require('php-include-html');
var replace = require('gulp-replace');
var setFilesGuidelist = ['list/*.html'];
var setFilesGuide = ['pc/guide/*.html'];
var setFilesPC = ['pc/html/**/*.html'];

gulp.task('list', function (cb) {
  pump(
    [
      gulp.src(setFilesGuidelist),
      replace('../', ' '),
      replace('./', '' + __dirname + '/list/'),
      phpinc({ verbose: true }),
      gulp.dest('build/html/list'),
    ],
    cb
  );
});
gulp.task('pchtml', function (cb) {
  pump(
    [
      gulp.src(setFilesPC),
      replace('../layout/', '' + __dirname + '/pc/html/layout/'),
      phpinc({ verbose: true }),
      gulp.dest('build/html/pc'),
    ],
    cb
  );
});
gulp.task('pcguide', function (cb) {
  pump(
    [
      gulp.src(setFilesGuide),
      replace('./', '' + __dirname + '/list/'),
      phpinc({ verbose: true }),
      gulp.dest('build/html/pc/guide'),
    ],
    cb
  );
});
gulp.task('pccss', function (cb) {
  pump([gulp.src('pc/css/*.css'), gulp.dest('build/css')], cb);
});
gulp.task('pcguidecss', function (cb) {
  pump([gulp.src('pc/guide/*.css'), gulp.dest('build/html/pc/guide')], cb);
});
