var webpack = require("webpack");
module.exports = {
  entry: {
    main: ['babel-polyfill', './index.js']
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  output: {
    path: "dist/",
    filename: "[name].js",
    libraryTarget: "var",
    library: "RecordManager"
  },
  plugins: [
    new webpack.IgnorePlugin(/vertx/)
  ]
};
