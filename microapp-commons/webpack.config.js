var webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  entry: './common.js',
  output: {
    path: __dirname + '/public',
    publicPath: 'http://localhost:4000/common/',
    filename: 'bundleCommon.js',
    libraryTarget: 'amd'
  },
  plugins:[
    new CleanWebpackPlugin()
],
}
