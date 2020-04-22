/*
 * @Description: 入口文件
 * @Version: 1.0
 * @Autor: 杨兰
 * @Date: 2020-01-06 14:20:19
 * @LastEditors: 尹伊
 * @LastEditTime: 2020-02-19 15:26:18
 */
// The Vue build version to loading with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import promise from 'es6-promise'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import 'lib-flexible'
import {
  Toast,
  Tab,
  Tabs,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Collapse,
  CollapseItem,
  Dialog,
  RadioGroup,
  Radio,
  Overlay,
  Swipe,
  SwipeItem,
  Lazyload,
  Search,
  Icon,
  DropdownMenu,
  ActionSheet
} from 'vant'
// set rem
import 'lib-flexible'
// set prototype
import hmTool from './assets/js/hmTool'
import appTool from './assets/js/appTool'
import axios from 'axios'
import {
  cancelObj
} from './utils/fetch'
import api from './api/mergeApi'
// style
import './assets/css/base.css'
import 'vant/lib/index.css'
import './assets/css/vant.css'
import './assets/css/fontSize.css'
import './assets/css/color.css'
import './assets/font/iconfont.css'
import 'swiper/dist/css/swiper.min.css'
import {
  url
} from '@/utils/commonUrl'

// use
import {
  JsBridge
} from '@/utils/bridge.js'



promise.polyfill()
Vue.config.productionTip = false
window.Hls = require('hls.js');
Vue.prototype.$hqTool = hmTool
Vue.prototype.$appTool = appTool
Vue.prototype.$api = api
Vue.prototype.$url = url
const res = JsBridge(null, {
  path: "info/app"
});
Vue.prototype.$type = (res && JSON.parse(res).code == 200) && (JSON.parse(res).data.platform)
Vue.use(VueAwesomeSwiper)
Vue.use(Toast)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(GoodsAction)
Vue.use(GoodsActionIcon)
Vue.use(GoodsActionButton)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Dialog)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Overlay)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Search)
Vue.use(Icon)
Vue.use(DropdownMenu)
Vue.use(ActionSheet)
// 动态title
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 切换路由取消上个路由的所有请求
  const CancelToken = axios.CancelToken
  cancelObj.source.cancel && cancelObj.source.cancel()
  cancelObj.source = CancelToken.source()
  // all
  next()
})
/* eslint-disable no-new */
window.Vm = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
