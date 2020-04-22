/*
 * @Descripttion: 
 * @version: 
 * @Author: 尹伊
 * @Date: 2020-02-09 14:02:56
 * @LastEditors: 尹伊
 * @LastEditTime: 2020-02-14 14:27:24
 */
import axios from 'axios'
import querystring from 'querystring'
const service = axios.create({
  baseURL: '',
  // timeout: 6000,
  timeout: 30000,
  // transformRequest: [data => {
  //   // 处理数据格式转为fromData
  //   return querystring.stringify(data)
  // }]
})
// 定义取消请求需要的值
let cancelObj = {
  source: {
    token: null,
    cancel: null
  }
}
const CancelToken = axios.CancelToken
const source = CancelToken.source()
cancelObj.requestCancel = source.cancel
// request拦截器
service.interceptors.request.use(config => {
  // 防止缓存
  if (config.params) {
    config.params.timer = new Date().getTime()
  } else if (config.data) {
    config.data.timer = new Date().getTime()
  }
  // 返回路由取消请求
  config.cancelToken = cancelObj.source.token
  // load
  const isLoad = config.isLoad
  if (isLoad === undefined) {
    window.Vm.$hqTool.toast({
      type: 'loading',
      // msg: '加载中...',
      mask: true,
      duration: 0
    })
  }
  // config.headers['token'] = getCookieKey('token')
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    window.Vm.$hqTool.clearToast()
    const res = response.data
    if (res.code == 401) {
      return res
    }
    if (res.code !== 200) {
      window.Vm.$hqTool.toast({
        type: 'fail', //  loading success fail html
        msg: res.msg || res.message // 文案
      })
      // 成功 根据自己项目返回业务状态码做处理
      return ''
    }
    return res
  },
  error => {
    window.Vm.$hqTool.clearToast()
    const errors = Promise.reject(error)
    let msg = ''
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      console.log('请求超时')
      msg = '请求超时'
    } else if (error.message) {
      console.log('请求失败')
      msg = '请求失败~~~'
    }
    window.Vm.$hqTool.toast({
      type: 'fail',
      msg: msg
    })
    return errors
  }
)
export {
  cancelObj
}
export default service
