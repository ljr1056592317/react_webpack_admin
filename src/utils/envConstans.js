const PROJECT_NAME = '后台系统'
const projectMapObj = {
  dev: {
    name: PROJECT_NAME,
    baseApi: 'https://dev',
    theme: 'default',
    devtool: 'cheap-module-source-map',
  },
  test: {
    name: PROJECT_NAME,
    baseApi: 'https://test',
    theme: 'default',
    devtool: 'cheap-module-source-map',
  },
  release: {
    name: PROJECT_NAME,
    baseApi: 'https://release',
    theme: 'default',
    devtool: 'source-map',
  },
  prod: {
    name: PROJECT_NAME,
    baseApi: 'https://prod',
    theme: 'default',
    // devtool: false,
    //引入错误监控后，将输出源代码，以方便源代码的上传到错误监控系统中
    devtool: 'source-map',
  },
  aliyun: {
    name: PROJECT_NAME,
    baseApi: 'https://aliyun',
    theme: 'default',
    devtool: 'source-map',
  },
}
const NODE_ENV = process.env.NODE_ENV
const NODE_ENV_KEY = process.env.NODE_ENV_KEY || 'dev'
const isDev = process.env.NODE_ENV !== 'production'
const PROJECTINFO = projectMapObj[NODE_ENV_KEY]
const SERVER_HOST = '127.0.0.1'
const SERVER_PORT = 9000
const shouldOpenAnalyzer = false //是否启动插件来分析项目中的各个资源所占的体积
const shouldSpeedMeasurePlugin = false // 是否启动分析loader和plugin耗时插件
const SentryConfig = {
  dns: 'https://61228e64b5ee096425bf557a831d20d1@o4505770761322496.ingest.us.sentry.io/4507305263235072',
  org: 'study-bb59598f7',
  project: 'webpack-admin-react',
  authToken: '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', // 需要勾选写入权限
}

module.exports = {
  NODE_ENV,
  isDev,
  PROJECTINFO,
  SERVER_HOST,
  SERVER_PORT,
  shouldOpenAnalyzer,
  shouldSpeedMeasurePlugin,
  SentryConfig,
}
