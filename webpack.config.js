module.exports = {
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: `./src/index.js`,
  
    // ファイルの出力設定
    output: {
      // 出力ファイル名
      filename: "main.js"
    },
    mode: "development",
    devServer: {
      contentBase: "dist",
      open: true
    }
  };