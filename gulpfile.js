var gulp = require('gulp');
var pump = require('pump');
var phpinc = require('php-include-html');
var replace = require('gulp-replace');
var setFilesGuidelist = ['list/*.html'];
var setFilesGuide = ['pc/guide/*.html'];
var setFilesPC = ['pc/html/**/*.html'];
var setFilesMO = ['mo/html/**/*.html'];
var setFilesGuideMO = ['mo/guide/*.html'];

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
gulp.task('pcjson', function (cb) {
  pump([gulp.src('pc/html/json/*.json'), gulp.dest('build/pc/html/json')], cb);
});

//mo
gulp.task('mohtml', function (cb) {
  pump(
    [
      gulp.src(setFilesMO),
      replace('../layout/', '' + __dirname + '/mo/html/layout/'),
      phpinc({ verbose: true }),
      gulp.dest('build/mo/html'),
    ],
    cb
  );
});
gulp.task('moguide', function (cb) {
  pump(
    [
      gulp.src(setFilesGuideMO),
      replace('./', '' + __dirname + '/mo/guide/'),
      phpinc({ verbose: true }),
      gulp.dest('build/mo/guide'),
    ],
    cb
  );
});
gulp.task('mocss', function (cb) {
  pump([gulp.src('mo/css/*.css'), gulp.dest('build/mo/css')], cb);
});
gulp.task('moguidecss', function (cb) {
  pump([gulp.src('mo/guide/*.css'), gulp.dest('build/mo/guide')], cb);
});
gulp.task('moimage', function (cb) {
  pump([gulp.src('mo/images/**'), gulp.dest('build/mo/images')], cb);
});
gulp.task('mojs', function (cb) {
  pump([gulp.src('mo/js/*.js'), gulp.dest('build/mo/js')], cb);
});
gulp.task('mojson', function (cb) {
  pump([gulp.src('mo/html/json/*.json'), gulp.dest('build/mo/html/json')], cb);
});

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
    'pcjson',
    'mohtml',
    'moguide',
    'mocss',
    'moguidecss',
    'moimage',
    'mojs',
    'mojson',
  ]),
  () => {
    gutil.log('Gulp is running');
  }
);
