var gulp = require("gulp");
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var replace = require('gulp-replace');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');

gulp.task("build", function () {
    gulp.start('htmlCopy');
    gulp.start('scssCompile');
    gulp.start('webpack');
});
gulp.task('serve', function () {
    gulp.start('htmlCopy');
    gulp.start('scssCompile');
    gulp.start('webpack');
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch("src/index.html").on('change', function () {
        gulp.start('htmlCopy');
        browserSync.reload();
    });
    gulp.watch("src/scss/*.scss", ['scssCompile']);
    gulp.watch(["src/*.ts", "src/lib/*.ts", "src/config.json", "src/lib/*.js"]).on('change', function () {
        gulp.start('webpack');
        browserSync.reload();
    })
});
gulp.task('default', ['serve']);

gulp.task('scssCompile', function () {
    gulp.src("src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
    return gulp.src('node_modules/materialize-css/dist/fonts/roboto/*')
        .pipe(gulp.dest('dist/fonts/roboto'));
})

gulp.task('htmlCopy', function () {
    gulp.src('src/index.html')
        .pipe(replace('scss', 'css'))
        .pipe(gulp.dest('dist'));
})
gulp.task('webpack', function () {
    gulp.src('src/config.json')
        .pipe(gulp.dest('dist'));
    gulp.src('src/main.ts')
        .pipe(webpackStream(require('./webpack.config.js'), webpack))
        .pipe(gulp.dest('dist/'));

})