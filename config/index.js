'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
// http://10.0.85.232:8083/learningReport/reportDetail?userId=1&pushDay=2
// let learningTarget = ''
let tikuExternalTarget = ''
let subjectTarget = '' // 网校接口
let learningC = '' // 学习中心
const type = 'beat'
if (type === 'beat') {
  //---http://10.0.99.32:8093测试线
  // learningTarget = 'http://learningapi.beta.hqjy.com'
  tikuExternalTarget = 'http://10.0.99.46:8086'
  subjectTarget = 'http://onlineschoolapi.beta.hqjy.com/'
  learningC = 'http://lctestkuaiji.beta.hqjy.com/'
} else {
  // 生产线
  // learningTarget = 'http://apiv4.hqjy.com'
  tikuExternalTarget = 'http://tiku.hqjy.com'
  subjectTarget = 'https://onlineschoolapi.hqjy.com/'
  learningC = 'http://lctestkuaiji.beta.hqjy.com/'
}
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/learningCenter': {
        target: learningC,
        changeOrigin: true,
        pathRewrite: {
          '^/learningCenter': '/learningCenter',
        }
      },
      // '/learning': {
      //   target: learningTarget,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/learning': '/learningReport',
      //   }
      // },
      '/tikuExternal': {
        target: tikuExternalTarget,
        changeOrigin: true,
        pathRewrite: {
          '^/tikuExternal': '/tiku_external',
        }
      },
      '/subject': {
        target: subjectTarget,
        changeOrigin: true,
        pathRewrite: {
          '^/subject': '/onlineschool',
        }
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
