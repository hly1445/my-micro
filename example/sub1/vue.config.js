module.exports = {
  lintOnSave: false,
  devServer: {
    port: "8082",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    output: {
      library: `vue2`,
      libraryTarget: 'umd',
    },
  },
};
