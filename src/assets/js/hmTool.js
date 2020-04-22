import { Toast } from 'vant'
import moment from 'moment'
class HmTool {
  constructor () {
    console.log('2019/8/26 v1.1.4 上生产线')
    this.arrayAddingMethod()
    this.stringAddingMethod()
  }
  // prototype
  arrayAddingMethod () {
    /* eslint-disable */
    Array.prototype.removeRepeat = function () {
      // 去重
      return Array.from(new Set(this))
      /*
      console.log(self, 'self')
      let newArr = []
      for (let i = 0; i < self.length; i++) {
        const item = self[i]
        if (newArr.indexOf(item) === -1) {
          newArr.push(item)
        }
      }
      console.log(newArr, 'newArr')
      */
    }
    Array.prototype.newSort = function (bool) {
      /**
       *
       * @param bool true 正序 false 倒序
       * @returns {Array}
       */
      let newArr = []
      newArr = this.sort(function(a,b){
        if (!bool)  return  a>b;
        return a<b;

      })
      return newArr
    }
  }
  stringAddingMethod () {
    String.prototype.wholeTrim = function () {
      return this.replace(/\s/g,"")
    }
  }
  // fn
  test () {
    console.log('测试')
  }
  getUrlKey(name){
    /* eslint-disable */
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
  }
  jsonStr (str) {
    if (typeof str === 'string') {
      try {
        let obj = JSON.parse(str)
        if (typeof obj === 'object' && obj) {
          return true
        } else {
          return false
        }
      } catch (e) {
        return false
      }
    } else {
      return false
    }
  }
  isFn (fn) {
    if (typeof fn === 'function') return true
    return false
  }
  isArray (arr) {
     return Array.isArray(arr)
  }
  isObj (obj) {
    const type = Object.prototype.toString.call(obj)
    if (type === '[object Object]') {
      return true
    }
    return false
  }
  emptyObject (obj) {
    // 是否为空对象
    const arr = Object.keys(obj);
    if (arr.length == 0) return true
    return false
  }
  isNull (str) {
    if (str === null || str ==='null') return true
    return false
  }
  isUndefined (str) {
    if (str === undefined || str ==='undefined') return true
    return false
  }
  iosDateStr (dateStr) {
    // ios时间格式件兼容
    return dateStr.replace(/-/g, '/')
  }
  countDown (timeStamp) {
    /**
     *倒计时
     * @param timeStamp 结束时间戳 或者 结束时间
     * * @returns {string} s
     */
      // 当前时间戳
    let curTimeStamp = new Date().getTime()
    // 结束时间戳
    const reg =/\D/g
    if (reg.test(timeStamp)) {
      timeStamp = new Date(timeStamp).getTime()
    }
    let endTimeStamp = timeStamp
    // 获取剩下的时间戳
    let Leftover = endTimeStamp - curTimeStamp
    // 将剩下的时间戳转为秒
    let overSecond = Math.floor(Leftover / 1000)
    // 秒转为天
    let D = Math.floor(overSecond / 60 / 60 / 24)
    // 余数代表剩下的秒数；
    overSecond = overSecond % (60 * 60 * 24)
    // 秒转为 时
    let h = Math.floor(overSecond / 60 / 60)
    // 余数代表 剩下的秒数；
    overSecond %= 3600
    // 秒转为 分
    var m = Math.floor(overSecond / 60)
    // 余数代表秒
//    overSecond %= 60;
    var s = overSecond % 60
    // 补零操作
    D = D < 10 ? '0' + D : D
    h = h < 10 ? '0' + h : h
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s
    // 返回值容错处理
    if (D === '00') {
      return h + ':' + m + ':' + s
    }
    return D + '天 ' + h + ':' + m + ':' + s
  }
  getCookie (name) {
    // (^| )name=([^;]*)(;|$),match[0]为与整个正则表达式匹配的字符串，match[i]为正则表达式捕获数组相匹配的数组；
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) {
      return unescape(arr[2]);
    }
    return null;
  }
  setCookie (name,value, Days) {
    var exp  = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    if((typeof value == "string")&&(value.length > 0)){
      document.cookie = name + "="+ escape(value) + ";expires=" + exp.toGMTString();
    }else{
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval=getCookie(name);
      if(cval!=null)
        document.cookie=name +"="+cval+";expires="+exp.toGMTString();
    }
  }
  delCookie (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=this.getCookie(name)
    if(cval!=null)
      document.cookie= name + "="+cval+";expires="+exp.toGMTString();
  }
  setSessionStorage  (key, value) {
    console.log(value, 'valuevalue')
    var type = Object.prototype.toString.call(value)
    if (type === '[object Object]') {
      function stringifyObj(obj){
        // 解决对象中有方法 无法使用json自带的方法转换
        var newObj = {};
        for(var key in obj){
          if(obj.hasOwnProperty(key) && obj[key] instanceof Function){
            newObj[key] = obj[key].toString().replace(/[\n\t]/g,"");
            continue;
          }
          newObj[key] = obj[key];
        }
        return JSON.stringify(newObj);
      }
      value = stringifyObj(value)
    }else if (type === '[object Array]' || type === '[object Function]') {
      // console.log('数组和方法')
      value = value.toString()
      if (type === '[object Array]') {
        value = '['+value+']'
      }
    }
    window.sessionStorage.setItem(key, value)
  }
  getSessionStorage(key) {
    var val = window.sessionStorage.getItem(key)
    if (!val) return ''
    val = val.trim()
    var objReg = /^{.*}$/g
    var arrReg = /^\[.*\]$/g
    var fnReg = /^function/g
    if (objReg.test(val)){
      function parseObj(strObj){
        // 处理对象中无法转函数的问题
        var obj = JSON.parse(strObj);
        var funReg = /function\s/g;
        for(var key in obj){
          if(funReg.test(obj[key])){
            try{
              var fun = (new Function("return " + obj[key]))();
              if(fun instanceof Function){
                obj[key] = fun;
              }
            }catch(e){
              console.log(e)
            }
          }
        }
        return obj;
      }
      return parseObj(val)
    } else if (arrReg.test(val)) {
      var str = val.replace(/\[|\]/g,'');
      return str.split(',')
    }else if(fnReg.test(val)) {
      var fun = (new Function("return " + val))();
      return fun
    } else {
      return val
    }
  }
  removeSessionStorage (key) {
    window.sessionStorage.removeItem(key)
  }
  clearSessionStorage () {
    window.sessionStorage.clear()
  }
  toast(obj) {
    // 轻提示
    Toast({
      type: obj.type, //  loading success fail html
      message: obj.msg, // 文案
      mask: obj.mask || false,// 是否展示遮罩层
      duration: obj.duration ===0?0: 1500 // 时长
    })
  }
  clearToast () {
    // 清除 轻提示
    Toast.clear(true)
  }
  isEmptyData(obj){
    let self = obj.that || window.Vm
    delete obj.that
    self.$store.commit('setEmptyDataObj', obj)
  }
  formatDate(dateString, model, isNow = false) {
    // 日期格式化
    if (!!isNow) return '至今';
    const date = !!dateString ? moment(dateString, ['YYYY-MM-DD HH:mm', 'x', 'YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD']).toArray() : moment(dateString).toArray();
    if (model === 2) {
        return moment(date).format('M-D H:mm');
    } else if (model === 3) {
        return moment(date).format('YYYY-M-D H:mm');
    } else if (model === 4) {
        return moment(date).format('YYYY');
    } else if (model === 5) {
        return `${moment(date).format('MM')}月${moment(date).format('DD')}日 ${moment(date).format('HH')}:${moment(date).format('mm')}`;
    } else if (model === 6) {
        return `${moment(date).format('YYYY')}年${moment(date).format('MM')}月${moment(date).format('DD')}日 ${moment(date).format('HH')}:${moment(date).format('mm')}`;
    } else if (model === 7) {
        return `${moment(date).format('YYYY')}.${moment(date).format('M')}.${moment(date).format('D')}`;
    } else if (model === 8) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    } else if (model === 9) {
        return moment(date).format('YYYY-MM-DD');
    } else if (model === 10) {
        return moment(date).format('YYYY-MM');
    }

    return moment(date).format('YYYY/MM/DD H:mm:ss');
  }
}
export default new HmTool()
