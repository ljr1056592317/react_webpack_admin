const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const proWebpackConfig = merge(common, {
  mode: 'production',
  devtool: 'none',
  output: {
    filename: '[name].[contenthash:8].js',
    publicPath: '/',
    chunkFilename: '[name][id].[chunkhash].js',
    assetModuleFilename: 'images/[hash][ext][query]',
  },
})
module.exports = proWebpackConfig
