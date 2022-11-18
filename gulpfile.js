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
      replace('../', 'https://teamppub.github.io/plgrim-renew/build/'),
      replace('./', '' + __dirname + '/list/'),
      phpinc({ verbose: true }),
      gulp.dest('build/list'),
    ],
    cb
  );
});

//pc
gulp.task('pchtml', function (cb) {
  pump(
    [
      gulp.src(setFilesPC),
      replace('../layout/', '' + __dirname + '/pc/html/layout/'),
      phpinc({ verbose: true }),
      gulp.dest('build/pc/html'),
    ],
    cb
  );
});
gulp.task('pcguide', function (cb) {
  pump(
    [
      gulp.src(setFilesGuide),
      replace('./', '' + __dirname + '/pc/guide/'),
      phpinc({ verbose: true }),
      gulp.dest('build/pc/guide'),
    ],
    cb
  );
});
gulp.task('pccss', function (cb) {
  pump([gulp.src('pc/css/*.css'), gulp.dest('build/pc/css')], cb);
});
gulp.task('pcguidecss', function (cb) {
  pump([gulp.src('pc/guide/*.css'), gulp.dest('build/pc/guide')], cb);
});
gulp.task('assets', function (cb) {
  pump([gulp.src('assets/**'), gulp.dest('build/assets')], cb);
});
gulp.task('pcimage', function (cb) {
  pump([gulp.src('pc/images/**'), gulp.dest('build/pc/images')], cb);
});
gulp.task('pcjs', function (cb) {
  pump([gulp.src('pc/js/*.js'), gulp.dest('build/pc/js')], cb);
});

//mo
// gulp.task('pchtml', function (cb) {
//   pump(
//     [
//       gulp.src(setFilesPC),
//       replace('../layout/', '' + __dirname + '/pc/html/layout/'),
//       phpinc({ verbose: true }),
//       gulp.dest('build/pc/html'),
//     ],
//     cb
//   );
// });
// gulp.task('pcguide', function (cb) {
//   pump(
//     [
//       gulp.src(setFilesGuide),
//       replace('./', '' + __dirname + '/pc/guide/'),
//       phpinc({ verbose: true }),
//       gulp.dest('build/pc/guide'),
//     ],
//     cb
//   );
// });
// gulp.task('pccss', function (cb) {
//   pump([gulp.src('pc/css/*.css'), gulp.dest('build/pc/css')], cb);
// });
// gulp.task('pcguidecss', function (cb) {
//   pump([gulp.src('pc/guide/*.css'), gulp.dest('build/pc/guide')], cb);
// });
// gulp.task('assets', function (cb) {
//   pump([gulp.src('assets/**'), gulp.dest('build/assets')], cb);
// });
// gulp.task('pcimage', function (cb) {
//   pump([gulp.src('pc/images/**'), gulp.dest('build/pc/images')], cb);
// });
// gulp.task('pcjs', function (cb) {
//   pump([gulp.src('pc/js/*.js'), gulp.dest('build/pc/js')], cb);
// });

//걸프 자동화
gulp.task(
  'default',
  gulp.series([
    'list',
    'pchtml',
    'pcguide',
    'pccss',
    'pcguidecss',
    'assets',
    'pcimage',
    'pcjs',
  ]),
  () => {
    gutil.log('Gulp is running');
  }
);
