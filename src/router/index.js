/*
 * @Description: 
 * @Version: 1.0
 * @Autor: 杨兰
 * @Date: 2020-01-06 14:20:19
 * @LastEditors: 杨兰
 * @LastEditTime: 2020-03-05 10:26:04
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/404',
      name: '404',
      // 懒加载路由资源 修改 build下面的webpack.prod.conf.js  output对象中增加   publicPath: "./"
      component: resolve => require(['@/page/404'], resolve),
      meta: {
        title: '404'
      }
    },
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/page/home'], resolve),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/singleSubject',
      name: 'singleSubject',
      component: resolve => require(['@/page/singleSubject'], resolve),
      meta: {
        title: '单科详情'
      }
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: resolve => require(['@/page/myOrder/index.vue'], resolve),
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: resolve => require(['@/page/myOrder/confirmOrder'], resolve),
      meta: {
        title: '确认订单'
      }
    },
    {
      path: '/finishPay',
      name: 'finishPay',
      component: resolve => require(['@/page/myOrder/finishPay'], resolve),
      meta: {
        title: '支付成功'
      }
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: resolve => require(['@/page/myOrder/agreement.vue'], resolve),
      meta: {
        title: '订单协议'
      }
    },
    {
      path: '/textualResearch',
      name: 'textualResearch',
      component: resolve => require(['@/page/textualResearch'], resolve),
      meta: {
        title: '考证子栏目'
      },
    },
    {
      path: '/subjectTab',
      name: 'subjectTab',
      component: resolve => require(['@/page/subjectTab/index.vue'], resolve),
      meta: {
        title: '科目栏'
      }
    },
    {
      path: '/practice',
      name: 'practice',
      component: resolve => require(['@/page/subjectTab/practice'], resolve),
      meta: {
        title: '实操子栏目'
      }
    },
    {
      path: '/giftBag',
      name: 'giftBag',
      component: resolve => require(['@/page/giftBag'], resolve),
      meta: {
        title: '新人礼包'
      }
    },
    {
      path: '/newGiftPack',
      name: 'newGiftPack',
      component: resolve => require(['@/page/newGiftPack'], resolve),
      meta: {
        title: '新人礼包'
      }
    },
    {
      path: '/classVip',
      name: 'classVip',
      component: resolve => require(['@/page/classVip'], resolve),
      meta: {
        title: '会员班'
      }
    },
    {
      path: '/vipList',
      name: 'vipList',
      component: resolve => require(['@/page/vipList'], resolve),
      meta: {
        title: '会员专题页'
      }
    },
    {
      path: '/CPA',
      name: 'CPA',
      component: resolve => require(['@/page/CPA'], resolve),
      meta: {
        title: 'CPA套餐'
      }
    },
    {
      path: '/Test',
      name: 'Test',
      component: resolve => require(['@/page/Test'], resolve),
      meta: {
        title: '能力测测试'
      }
    },
    {
      path: '/testResult',
      name: 'testResult',
      component: resolve => require(['@/page/Test/testResult'], resolve),
      meta: {
        title: '测试结果'
      }
    },
    {
      path: '/introduction',
      name: 'introduction',
      component: resolve => require(['@/page/Test/introduction'], resolve),
      meta: {
        title: '报考指南'
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
