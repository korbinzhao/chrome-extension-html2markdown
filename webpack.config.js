const path = require("path");

module.exports = {
  entry: {
    popup: "./src/popup.js",
    ["content-script"]: "./src/content-script.js",
  },
  output: {
    filename: "[name].js",
  },
  mode: "development",
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, "src"),
    },
    compress: true,
    port: 9000,
  },
  devtool: 'cheap-module-source-map'
};
