const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // 使用交互式可缩放树形地图可视化 webpack 输出文件的大小
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离css文件, 这个插件将CSS取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。它支持按需加载 CSS 和 SourceMaps。
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') // 这个插件优化和压缩css
const TerserPlugin = require('terser-webpack-plugin') // 这个插件使用 terser 来压缩 JavaScript，可以多进程压缩，删除注释、去除console
const CompressionPlugin = require('compression-webpack-plugin') // 静态资源压缩, 使用Content-Encoding为它们提供服务

const { shouldOpenAnalyzer } = require('../src/utils/envConstans.js')

const PLUGINS = [
  // 使用交互式可缩放树形地图可视化 webpack 输出文件的大小
  shouldOpenAnalyzer && new BundleAnalyzerPlugin(),
  // 抽离css文件, 这个插件将CSS取到单独的文件中
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:8].css',
    chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    ignoreOrder: true,
  }),
  new CompressionPlugin({
    test: /\.js$|\.html$|.\css/, // 匹配文件名,一般来说css不会很大，在压成.gz没有啥意义
    threshold: 10240, // 对超过10k的数据压缩
    deleteOriginalAssets: true, // 不删除源文件，如果删除也源文件，那么当用户出现访问.gz文件访问不到，还可以访问源文件，双重保障
    // minRatio: 0.8, // 压缩比
  }),
].filter(Boolean)

const proWebpackConfig = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    publicPath: '/',
    filename: 'js/[name].[contenthash:8].js',
    assetModuleFilename: 'images/[name].[contenthash:8].[ext]',
    chunkFilename: 'js/[name][id].[chunkhash].js',
    clean: true, //在生成文件之前清空 output 目录 ，可以用来替代CleanWebpackPlugin插件
  },
  plugins: PLUGINS,
  optimization: {
    // 允许你通过提供一个或多个定制过的 TerserPlugin 实例， 覆盖默认压缩工具(minimizer)
    minimizer: [
      new TerserPlugin({
        extractComments: false, // 是否删除注释
        terserOptions: {
          compress: { pure_funcs: ['console.log', 'console.warn'] }, //
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
})
module.exports = proWebpackConfig
