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

const getCssLoaders = (importLoaders) => [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: false,
      sourceMap: isDev,
      importLoaders,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          // 修复一些和 flex 布局相关的 bug
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              grid: true,
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          require('postcss-normalize'),
        ],
        sourceMap: isDev,
      },
    },
  },
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
        use: getCssLoaders(1),
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(2),
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
