/*
 * @Descripttion: 
 * @version: 
 * @Author: 尹伊
 * @Date: 2020-02-09 15:48:24
 * @LastEditors  : 尹伊
 * @LastEditTime : 2020-02-13 11:08:17
 */
import fetch from '../utils/fetch'
import {
  subject
} from '../utils/config'
let typeApp = 'app'
export default {
  // 首页接口
  getHomePageMergeApi: (params) => fetch({
    url: `/${subject}/${typeApp}/homePageMergeApi/v2`,
    method: 'POST',
    params
  }),
  // 财会证书
  accountPractice: (params) => fetch({
    url: `/${subject}/${typeApp}/goodsCenter/v2`,
    method: 'GET',
    params
  }),
  // 子栏目分类
  goodsCenterCategory: (params) => fetch({
    url: `/${subject}/${typeApp}/goodsCenterCategory/v2`,
    method: 'GET',
    params
  }),
  // 新人礼包列表
  giftGoodsInfoList: (params) => fetch({
    url: `/${subject}/${typeApp}/giftGoodsInfoList/v2`,
    method: 'GET',
    params
  }),
  // 判断礼包是否领取
  checkGiftPack: (params) => fetch({
    url: `/${subject}/${typeApp}/checkGiftPack/v2`,
    method: 'GET',
    params
  }),
  // 领取新人礼包
  getReceiveGift: (params) => fetch({
    url: `/${subject}/${typeApp}/receiveGift/v2`,
    method: 'GET',
    params
  }),
  // 会员列表页
  getVipListData: (params) => fetch({
    url: `/${subject}/${typeApp}/memberGoodsList/v2`,
    method: 'GET',
    params
  })
}
