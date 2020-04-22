module.exports = {
  getCookieVal (name) {
    var arr
    var reg = new RegExp('(^| )' + name + '=([^]*)(|$)')
    if (arr === document.cookie.match(reg)) {
      return unescape(arr[2])
    } else {
      return null
    }
  },

  getUrlPara (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return (r[2])
    return null
  },

  addDate (date, days) {
    if (days === undefined || days === '') {
      days = 1
    }
    var date1 = new Date(date)
    date1.setDate(date1.getDate() + days)
    var month = date1.getMonth() + 1
    var day = date1.getDate()
    var mm = '"' + month + '"'
    var dd = '"' + day + '"'

    // 单位数前面加0
    if (mm.length === 3) {
      month = '0' + month
    }
    if (dd.length === 3) {
      day = '0' + day
    }

    var time = date.getFullYear() + '-' + month + '-' + day
    return time
  }
}
