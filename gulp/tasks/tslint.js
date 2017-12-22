module.exports = function (gulp, plugins) {
  return function tslint() {
    return gulp.src(['src/main.ts', 'src/lib/*.ts'])
      .pipe(plugins.tslint())
      .pipe(plugins.tslint.format())
  };
};