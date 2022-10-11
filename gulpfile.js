var gulp = require('gulp');
var pump = require('pump');
var phpinc = require('php-include-html');
var replace = require('gulp-replace');
var setFilesGuide = ['list/*.html'];
var setFilesPC = ['pc/html/**/*.html'];

gulp.task('pchtml', function (cb) {
  pump(
    [
      gulp.src(setFilesPC),
      replace('../layout/', '' + __dirname + '/pc/html/layout/'),
      phpinc({ verbose: true }),
      gulp.dest('build/html/pc'),
      gulp.src('pc/css/*.css'),
      gulp.dest('build/css'),
    ],
    cb
  );
});
gulp.task('guide', function (cb) {
  pump(
    [
      gulp.src(setFilesGuide),
      replace('./', '' + __dirname + '/pc/html/layout/'),
      phpinc({ verbose: true }),
      gulp.dest('build/html/list'),
    ],
    cb
  );
});
