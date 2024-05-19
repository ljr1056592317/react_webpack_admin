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
}
