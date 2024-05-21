const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // 使用交互式可缩放树形地图可视化 webpack 输出文件的大小
const { shouldOpenAnalyzer } = require('../src/utils/envConstans.js')

const PLUGINS = [shouldOpenAnalyzer && new BundleAnalyzerPlugin()].filter(Boolean)

const proWebpackConfig = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    filename: '[name].[contenthash:8].js',
    publicPath: '/',
    chunkFilename: '[name][id].[chunkhash].js',
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: true, //在生成文件之前清空 output 目录 ，可以用来替代CleanWebpackPlugin插件
  },
  plugins: PLUGINS,
})
module.exports = proWebpackConfig
