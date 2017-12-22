var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var uglify = require('gulp-uglify');

module.exports = function (gulp) {
  var tsResult = tsProject.src()
    .pipe(tsProject())
  return tsResult
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
}
