/*
 * @Descripttion: 
 * @version: 
 * @Author: 尹伊
 * @Date: 2020-02-04 14:45:11
 * @LastEditors  : 尹伊
 * @LastEditTime : 2020-02-09 16:06:20
 */
import subject from './subject'
import home from './home'
import testColumn from './testColumn'
const apiArr = [subject, home,testColumn]
export default ((arr) => {
  /*
 接收数组 数组中包含的只能是对象
 */
  // 判断传递进来的所有对象是否用相同的key值 只适用一层对象 例: { name2 : 'xxx', age2: xxx};
  var keyArr = []
  var flay = true
  var newObj = {}
  for (var i = 0; i < arr.length; i++) {
    const obj = arr[i]
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
      console.error('当前传递的数组中有非对象')
      flay = false
      break
    }
    for (var k in obj) {
      keyArr.push(k)
    }
  }
  if (!flay) return newObj
  var newArr = []
  var repeatArr = []
  for (let i = 0; i < keyArr.length; i++) {
    const str = keyArr[i]
    if (newArr.indexOf(str) === -1) {
      newArr.push(str)
    } else {
      repeatArr.push(str)
    }
  }
  if (repeatArr.length) {
    console.error('当前传递的所有对象有key值相同, 相同的key值为: ' + repeatArr)
    return newObj
  }
  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i]
    Object.assign(newObj, obj)
  }
  return newObj
})(apiArr)
