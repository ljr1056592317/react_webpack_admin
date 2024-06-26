const { resolve } = require('path')
const { merge } = require('webpack-merge')
const ESLintPlugin = require('eslint-webpack-plugin')
const common = require('./webpack.common')

const { SERVER_HOST, SERVER_PORT } = require('../src/utils/envConstans')

const devWebpackConfig = merge(common, {
  mode: 'development',
  // 默认为eval：打包生成的文件中会使用 eval 函数，并且在 eval 函数的代码最后添加注释 。除了完全不使用 source-map，eval时最快的，但对于定位调试不是很好用
  // mode为production时， devtool:默认为不配置
  // source-map： 完整的源代码文件
  // cheap-module-source-map：虽然速度不及eval，并且只有行映射，没有列映射，没有source-map那么完整，但可以准确地获取报错信息，方便开发调试，同时速度也会比source-map快
  devtool: 'cheap-module-source-map', //
  // 控制 bundle 信息该怎么显示
  stats: 'errors-warnings',
  cache: {
    type: 'filesystem', //保存位置，开发环境下默认为memory类型，生产环境cache配置默认是关闭的。
    buildDependencies: {
      config: [__filename],
    },
  },
  plugins: [
    // 将eslint的检查也一并放入控制台 ，这个配置插件应该放在本地开发就好了
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      eslintPath: require.resolve('eslint'),
      context: resolve(__dirname, '../src'),
    }),
  ],
  devServer: {
    host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
    port: SERVER_PORT, // 指定端口，默认是8080
    proxy: [],
    proxy: [
      {
        context: ['/api'],
        target: ' http://127.0.0.1:6688', // 代理地址
        // 配置了这个可以从 http 代理到 https
        // 依赖 origin 的功能可能需要这个，比如 cookie
        changeOrigin: true,
        pathRewrite: { '^/api': '/v1' },
      },
      {
        context: ['/app-vue3'],
        target: '//localhost:7001', // 代理地址
        // 配置了这个可以从 http 代理到 https
        // 依赖 origin 的功能可能需要这个，比如 cookie
        changeOrigin: true,
        pathRewrite: { '^/app-vue3': '' },
      },
    ],
    client: {
      // 控制日志输出格式
      logging: 'info', // 选择 'none', 'error', 'warn', 'info', 'log', 或 'verbose'
      // 是否覆盖网页
      overlay: {
        errors: true, //出现错误，会直接覆盖在网页上，默认
        warnings: false, // 警告类的只会打印在控制台
      },
    },
    compress: true, // 是否启用 gzip 压缩
    open: true, // 打开默认浏览器
    hot: true, // 热更新
    historyApiFallback: true,
  },
})
module.exports = devWebpackConfig
