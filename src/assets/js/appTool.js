// js和APP对调工具方法
class AppTool {
  constructor () {
    const u = navigator.userAgent
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    this.systemType = isAndroid ? 'Android' : isIOS ? 'iOS' : 'pc'
  }
  setShareConfig (data) {
    let isWebView = false
    console.log(data)
    // 调起手机右上角分享并设置分享参数
    try {
      switch (this.systemType) {
        case 'iOS' :
          (() => {
            const setShareConfig = window.webkit.messageHandlers.setShareConfig.postMessage
            if (window.Vm.$hqTool.isFn(setShareConfig)) {
              isWebView = true
              window.webkit.messageHandlers.setShareConfig.postMessage(JSON.stringify(data))
            }
          })()
          break
        case 'Android' :
          (() => {
            const setShareConfig = window.webview.setShareConfig
            if (window.Vm.$hqTool.isFn(setShareConfig)) {
              isWebView = true
              window.webview.setShareConfig(JSON.stringify(data))
            }
          })()
          break
        default:
          console.log('setShareConfig 非移动设备')
      }
    } catch (e) {
      console.log(e)
    }
    return isWebView
  }
  showShareDialog (data) {
    let isWebView = false
    // 分享弹窗
    try {
      switch (this.systemType) {
        case 'iOS' :
          (() => {
            const showShareDialogPostMessage = window.webkit.messageHandlers.showShareDialog.postMessage
            if (window.Vm.$hqTool.isFn(showShareDialogPostMessage)) {
              isWebView = true
              window.webkit.messageHandlers.showShareDialog.postMessage(data)
            }
          })()
          break
        case 'Android' :
          (() => {
            const showShareDialog = window.webview.showShareDialog
            if (window.Vm.$hqTool.isFn(showShareDialog)) {
              isWebView = true
              window.webview.showShareDialog()
            }
          })()
          break
        default:
          console.log('showShareDialog 非移动设备')
      }
    } catch (e) {
      console.log(e)
    }
    return isWebView
  }
}
export default new AppTool()
