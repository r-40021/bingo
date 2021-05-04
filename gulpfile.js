// gulpプラグインの読み込み
const gulp = require("gulp");
// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass");
const packageImporter = require('node-sass-package-importer');

// style.scssをタスクを作成する
gulp.task("default", function () {
  // style.scssファイルを取得
  return (
    gulp
      .src("./src/css/style.scss")
      // Sassのコンパイルを実行
      .pipe(
        sass({
          outputStyle: "compressed",
          importer: packageImporter({
            extensions: [".scss", ".css"],
          }),
        })
      )
      
      // cssフォルダー以下に保存
      .pipe(gulp.dest("./dist"))
  );
});
