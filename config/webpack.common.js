const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { isDev, PROJECTINFO } = require('../src/utils/envConstans')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin') // 启动本地服务/打包错误提示
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离css文件, 这个插件将CSS取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。它支持按需加载 CSS 和 SourceMaps。

const PLUGINS = [
  new HtmlWebpackPlugin({
    title: PROJECTINFO.name, // 动态设置标题，打包后插入到 <title><%= htmlWebpackPlugin.options.title %></title>
    favicon: resolve(__dirname, '../public/favicon.ico'), // 网站头部图片
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
  // 进度条
  new WebpackBar({
    name: '正在构建中',
    color: '#85d', // 默认green，进度条颜色支持HEX
    // basic: false, // 默认true，启用一个简单的日志报告器
    // profile: false, // 默认false，启用探查器。
  }),
  // ts的检查输出到控制台
  new ForkTsCheckerWebpackPlugin({
    typescript: {
      configFile: resolve(__dirname, '../tsconfig.json'),
    },
  }),
]

const getCssLoaders = (importLoaders) => [
  // 执行顺序从后到前 less-loader -> postcss-loader -> css-loader -> style-loader/MiniCssExtractPlugin.loader
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // style-loader的作用就是将结果以style标签的方式插入DOM树中。style-loader将css-loader打包好的 CSS 代码以<style>标签的形式插入到 HTML 文件中
  {
    loader: 'css-loader',
    options: {
      // 开启cssmodules，不然我们使用styles到组件中的样式将无法进行打包，开启不了css样式隔离
      modules: {
        localIdentName: '[local]_[hash:base64:5]',
      },
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
    main: resolve(__dirname, '../src/index.tsx'),
  },
  output: {
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      '@': resolve(__dirname, '../src'),
    },
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
      {
        //字体
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg)$/,
        type: 'asset',
        parser: {
          // 当提供函数时，返回 true 值时告知 webpack 将模块作为一个 Base64 编码的字符串注入到包中，
          // 否则模块文件会被生成到输出的目标目录中。将base64的资源都放在一个目录下
          dataUrlCondition: (source, { filename }) => {
            // 1. 如果是base64下的目录，将文件打包成base64
            if (filename.includes('assets/base64_images')) {
              return true
            }
            // 3. 对于小于imageInlineSizeLimit的文件，会以Base64 编码的字符串注入到包中
            if (source.length <= 4 * 1024) {
              return true
            }
            return false
          },
        },
        exclude: /node_modules/, //排除 node_modules 目录
      },
      {
        // 匹配js/jsx/ts/tsx
        test: /\.[tj]s(x?)$/,
        // 排除node_modules
        exclude: /node_modules/,
        use: [
          // 确定使用的loader
          {
            loader: 'babel-loader',
            // 参数配置
            options: {
              cacheDirectory: true,
              presets: [
                // 解析react
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic', // 设置运行时的转换，此后不用在顶层导入react，react17开始可以使用
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
}
