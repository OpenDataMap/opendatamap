var gulp = require("gulp");
var browserSync = require('browser-sync').create();
var plugins = require('gulp-load-plugins')();
var sass = require('gulp-sass');
var replace = require('gulp-replace');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var uglify = require('gulp-uglify');

function getTask (task) {
  return require('./gulp/tasks/' + task)(gulp, plugins);
}

gulp.task("build", function () {
  gulp.start('htmlCopy');
  getTask('tslint');
  gulp.start('tsc');
  gulp.start('scssCompile');
});
gulp.task('serve', function () {
  gulp.start('htmlCopy');
  getTask('tslint');
  gulp.start('tsc');
  gulp.start('scssCompile');
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch("src/index.html").on('change', function () {
    gulp.start('htmlCopy');
    browserSync.reload();
  });
  gulp.watch("src/scss/*.scss", [ 'scssCompile' ]);
  gulp.watch([ "src/*.ts", "src/lib/*.ts" ]).on('change', function () {
    gulp.start('tsc');
    browserSync.reload();
  })
});
gulp.task('default', ['serve']);

gulp.task('scssCompile', function () {
  return gulp.src("src/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
})

gulp.task('htmlCopy', function () {
  return gulp.src('src/index.html')
    .pipe(replace('scss', 'css'))
    .pipe(replace('ts', 'js'))
    .pipe(gulp.dest('dist'));
})

gulp.task('tsc', function () {
  var tsResult = tsProject.src()
    .pipe(tsProject());
  return tsResult
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
})