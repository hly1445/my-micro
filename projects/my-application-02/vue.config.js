const path = require("path");
module.exports = {
  publicPath: "./",
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: {
    port: 8082,
    contentBase: path.join(__dirname, "../"),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    historyApiFallback: true,
    disableHostCheck: true,
  },
  configureWebpack:{
      output:{
        library: `subApp`,
        libraryTarget: 'umd',
      }
  }
};
