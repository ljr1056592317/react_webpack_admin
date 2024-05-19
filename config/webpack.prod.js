const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const PLUGINS = [new CleanWebpackPlugin()]

const proWebpackConfig = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    filename: '[name].[contenthash:8].js',
    publicPath: '/',
    chunkFilename: '[name][id].[chunkhash].js',
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  plugins: PLUGINS,
})
module.exports = proWebpackConfig
