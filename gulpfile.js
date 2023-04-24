const { series, src, dest } = require("gulp");

function copy(cb) {
  src(["./src/**/*.html", "./src/**/*.json", "./src/**/*.css", "./src/**/*.png"]).pipe(dest("./dist/"));
  cb();
}

exports.default = series(copy);
