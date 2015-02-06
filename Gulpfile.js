var gulp          = require('gulp'),
    connect       = require('gulp-connect'),
    less          = require('gulp-less'),
    concat        = require('gulp-concat'),
    prefix        = require('gulp-autoprefixer'),
    minifyCSS     = require('gulp-minify-css'),
    autowatch     = require('gulp-autowatch'),
    plumber       = require('gulp-plumber'),
    uglify        = require('gulp-uglify'),
    srcFolder = 'src',
    dstFolder = 'dst',
    normalize = require('normalize');


// HTML

gulp.task('htmls', function () {
  gulp.src('*.html')
    .pipe(connect.reload());
});

// HAML 

// gulp.task('hamls', function () {
//   gulp.src('haml/index.haml')
//     .pipe(plumber())
//     .pipe(haml({
//       // compiler: 'visionmedia'
//     }))
//     .pipe(prettify({indent_size: 2}))
//     .pipe(gulp.dest('web'))
//     .pipe(connect.reload());
// });

// SCSS

// gulp.task('styles', function() {
//   return gulp.src(['styles/less/order.less', 'styles/less/table.less'])
//     .pipe(plumber())
//     // .pipe(concat('base.scss'))
//     .pipe(less())
//     .pipe(prefix())
//     .pipe(minifyCSS({keepBreaks: true}))
//     .pipe(gulp.dest('styles/css'))
//     .pipe(connect.reload());
// });

gulp.task('styles', function() {
  return gulp.src([srcFolder + '/styles/main.less'])
    .pipe(plumber())
    // .pipe(concat('base.scss'))
    .pipe(less())
    .pipe(prefix())
    .pipe(minifyCSS({keepBreaks: true}))
    .pipe(gulp.dest(dstFolder + '/styles'))
    .pipe(connect.reload());
});

// gulp.task('styles', function() {
//   return gulp.src('scss/*.scss')
//     .pipe(plumber())
//     .pipe(concat('style.scss'))
//     .pipe(less())
//     .pipe(prefix(["last 5 version", "ie 9"]))
//     .pipe(minifyCSS({keepBreaks: true}))
//     .pipe(gulp.dest('css'))
//     .pipe(connect.reload());
// });

// JS


gulp.task('scripts', function() {
  return gulp.src(srcFolder + 'js/*.js')
    .pipe(plumber())
    .pipe(concat('scripts.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(dstFolder + '/js'))
    .pipe(connect.reload());
});

// gulp.task('scripts', function() {
//   return gulp.src('src/js/*.js')
//     .pipe(plumber())
//     // .pipe(uglify())
//     .pipe(gulp.dest('widget'))
//     .pipe(connect.reload());
// });

// WATCH

var paths = {
  htmls:          '*.html',
  scripts:         srcFolder + '/js/*.js',
  // 'base-styles':  'scss/base/*.scss',
  // scripts: 'js/*js',
  styles:  srcFolder + '/styles/*.less'
};

gulp.task('watch', function(cb) {
  autowatch(gulp, paths);
  return cb();
});

// LIVERELOAD 

gulp.task('connect', function() {
  connect.server({
    port: '3005',
    livereload: true
  });
});

// DEFAULT

gulp.task('default',  [
  'connect',
  'styles',
  'watch',
  'scripts'
  ]);