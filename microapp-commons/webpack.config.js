var webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  entry: './common.js',
  output: {
    path: __dirname + '/public',
    publicPath: 'http://localhost:8089/public/',
    filename: 'bundleCommon.js',
    libraryTarget: 'umd'
  },
  plugins:[
    new CleanWebpackPlugin()
],
}
