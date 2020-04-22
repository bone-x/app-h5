/*
 * @Descripttion: 
 * @version: 
 * @Author: 尹伊
 * @Date: 2020-02-11 17:32:35
 * @LastEditors  : 尹伊
 * @LastEditTime : 2020-02-12 14:50:01
 */
/**
 * @Description: 判断是否在原生app
 * @return {Boolean}
 * @LastEditors: 蔡江旭
 * @LastEditTime: Do not edit
 * @Date: 2019-05-16 09:05:28
 */
function isNativeApp() {
  let curUrl = window.location.href;
  if (curUrl.indexOf('clientType') !== -1) {
    return true;
  } else {
    return false;
  }
}

/**
 * @Description: Js bridge的交互函数
 * @params {null} text // 当前为null
 * @params {Object} bridgeData // 交互的数据
 * @params {Array} ...args // 其他参数，暂时用不到，预留
 * @return:
 * @LastEditors: 蔡江旭
 * @LastEditTime: Do not edit
 * @Date: 2019-05-16 09:05:28
 */
function JsBridge(text, bridgeData, ...args) {
  let returnData = null;
  if (isNativeApp()) {
    returnData = window.prompt(text, JSON.stringify(bridgeData), ...args);
  } else {
    console.warn('不在原生App: ', '交互数据：', bridgeData);
  }
  return returnData;
}

export {
  JsBridge,
  isNativeApp
};
