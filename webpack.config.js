var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'src/public');
var APP_DIR = path.resolve(__dirname, 'src/app');
var VS_DIR = path.resolve(__dirname, 'node_modules/monaco-editor/min/vs');

console.log(VS_DIR);

var config = {
  entry: [
    "babel-polyfill",
    APP_DIR + '/index.js'
  ],
  output: {
    path: BUILD_DIR,
    publicPath: '/public',
    filename: 'bundle.js'
  },
  devServer:{
    contentBase: 'src'
  },
  module : {
    loaders : [
      {
        test : /\.js?/,
        include : APP_DIR,
        loader : 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: VS_DIR,
        to: '../vs',
      }
    ])
  ]
};

module.exports = config;