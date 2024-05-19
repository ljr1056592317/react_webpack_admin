const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { isDev, PROJECTINFO } = require('../src/utils/envConstans')

const PLUGINS = [
  new HtmlWebpackPlugin({
    title: PROJECTINFO.name, // 动态设置标题，打包后插入到 <title><%= htmlWebpackPlugin.options.title %></title>
    template: resolve(__dirname, '../public/index.html'),
    filename: 'index.html', //
    cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
    minify: isDev
      ? false
      : {
          removeAttributeQuotes: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          useShortDoctype: true,
        },
  }),
]

module.exports = {
  entry: {
    main: resolve(__dirname, '../src/app.js'),
  },
  output: {
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  plugins: PLUGINS,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false, // 默认就是 false, 若要开启，可在官网具体查看可配置项
              sourceMap: isDev, // 开启后与 devtool 设置一致, 开发环境开启，生产环境关闭
              importLoaders: 0, // 指定在 CSS loader 处理前使用的 laoder 数量
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: isDev,
              importLoaders: 1, // 需要先被 less-loader 处理，所以这里设置为 1
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
    ],
  },
}
