"use strict";

const webpack = require('webpack');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV;
const libraryName = "enchanted";

const config = {
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: NODE_ENV === "production" ? libraryName + ".min.js" : libraryName + ".js",
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        include: [
          path.resolve(__dirname, "./src")
        ]
      }
    ]
  },
  resolve: {
    root: path.resolve(__dirname, "./src"),
    extensions: ["", ".js"]
  },
  plugins: getPlugins(NODE_ENV)
};

function getPlugins(env) {
  let ret = [];
  if (env === "production") {
    ret.push(new webpack.optimize.UglifyJsPlugin({
      minimize: true, 
      compress: { warnings: false }
    }));
  }
  return ret;
}

module.exports = config;