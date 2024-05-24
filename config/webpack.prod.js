const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // 使用交互式可缩放树形地图可视化 webpack 输出文件的大小
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离css文件, 这个插件将CSS取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。它支持按需加载 CSS 和 SourceMaps。
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') // 这个插件优化和压缩css
const TerserPlugin = require('terser-webpack-plugin') // 这个插件使用 terser 来压缩 JavaScript，可以多进程压缩，删除注释、去除console
const CompressionPlugin = require('compression-webpack-plugin') // 静态资源压缩, 使用Content-Encoding为它们提供服务
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin') // 构建速度时间展示
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin')

const {
  shouldOpenAnalyzer,
  shouldSpeedMeasurePlugin,
  PROJECTINFO,
  SentryConfig,
} = require('../src/utils/envConstans.js')

const spm = new SpeedMeasurePlugin()

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
    test: /\.js$|\.html$|\.css/, // 匹配文件名,一般来说css不会很大，在压成.gz没有啥意义
    threshold: 10240, // 对超过10k的数据压缩
    deleteOriginalAssets: false, // 不删除源文件，如果删除也源文件，那么当用户出现访问.gz文件访问不到，还可以访问源文件，双重保障
    // minRatio: 0.8, // 压缩比
  }),
  // 打包时上传源代码到错误监控系统中
  sentryWebpackPlugin({
    org: SentryConfig.org, // 组织
    project: SentryConfig.project, // sentry创建的项目名字
    authToken: SentryConfig.authToken, // 令牌
    include: './dist/js', // 只上传js
    ignore: ['node_modules'],
    release: process.env.SENTRY_RELEASE, // 对应main.js版本号
    cleanArtifacts: true, // 先清理再上传
  }),
].filter(Boolean)

const prodWebpackConfig = merge(common, {
  mode: 'production',
  // 生产环境不开启源代码映射，安全问题。但我们测试环境可以开启，方便我们在测试环境定位问题
  // 如果引入了错误监控系统sentry，那么生产环境就的
  devtool: PROJECTINFO.devtool,
  output: {
    publicPath: '/',
    filename: 'js/[name].[contenthash:8].js',
    assetModuleFilename: 'images/[name].[contenthash:8].[ext]',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    clean: true, //在生成文件之前清空 output 目录 ，可以用来替代CleanWebpackPlugin插件
  },
  // 让webpack遇到但不打包的文件
  externals: {
    jquery: '$',
    react: 'React',
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
    // 对于动态导入模块，请在 SplitChunksPlugin 页面中查看配置其行为的可用选项。
    splitChunks: {
      // 其他配置选择默认即可
      automaticNameDelimiter: '-', // 生成名称的分隔符
      chunks: 'all', // all-所有模块生效，async-抽取异步模块，initial:同步模块生效
      // minSize: 100000, //  todo, 后续还有性能问题再拆, 生成 chunk 的最小体积（以 bytes 为单位）。
      // maxSize: 40000, // todo, 后续还有性能问题再拆, 生成 chunk 的最大体积（以 bytes 为单位）。
      cacheGroups: {
        commons: {
          test: /[/\\]node_modules[/\\]/,
          name: 'vendors',
          chunks: 'all',
        },
        // 抽离自定义工具库
        utilCommon: {
          name: 'common',
          minSize: 0, // 将引用模块分离成新代码文件的最小体积
          minChunks: 2, // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
          priority: -20, // 优先级
        },
      },
    },
  },
})
module.exports = () => {
  if (shouldSpeedMeasurePlugin) {
    return spm.wrap(prodWebpackConfig)
  }
  return prodWebpackConfig
}
