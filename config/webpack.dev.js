const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const { SERVER_HOST, SERVER_PORT } = require('../src/utils/envConstans')

const devWebpackConfig = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  // 控制 bundle 信息该怎么显示
  stats: 'errors-warnings',
  devServer: {
    host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
    port: SERVER_PORT, // 指定端口，默认是8080
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
  },
})
module.exports = devWebpackConfig
