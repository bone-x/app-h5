/*
 * @Description: 
 * @Version: 1.0
 * @Autor: 杨兰
 * @Date: 2020-01-10 15:01:06
 * @LastEditors: 杨兰
 * @LastEditTime: 2020-03-07 09:27:57
 */
import fetch from '../utils/fetch'
import { subject, learningCenter} from '../utils/config'
let typeApp = 'app'
export default {
  //获取会员班详情
  getVipClassDetail: (params) => fetch({
    url: `/${subject}/${typeApp}/memberGoodsInfo/v2`,
    method: 'GET',
    params
  }),
  // 获取商品详情
  getGoodsDetail: (params) => fetch({
    url: `/${subject}/${typeApp}/goodsDetail`,
    method: 'GET',
    params
  }),
  // 获取商品信息
  getGoodsInfo: (params) => fetch({
    url: `/${subject}/${typeApp}/goodsInfo`,
    method: 'GET',
    params
  }),
  // 获取目录列表
  getSingleSectionList: (params) => fetch({
    url: `/${subject}/${typeApp}/singleGoodsSectionList`,
    method: 'GET',
    params
  }),
  // 收藏接口
  setCollection: (params) => fetch({
    url: `/${subject}/${typeApp}/collection`,
    method: 'GET',
    params
  }),
  // 课程推荐接口
  getRelateGoodsList: (params) => fetch({
    url: `/${subject}/${typeApp}/relateGoodsList`,
    method: 'GET',
    params
  }),
  // 直播间信息-直播接口
  getLiveInfo: (params) => fetch({
    url: `/${learningCenter}/${typeApp}/getLiveInfo`,
    method: 'GET',
    params
  }),
  // 直播间信息-回放接口
  getReplayInfo: (params) => fetch({
    url: `/${learningCenter}/${typeApp}/getReplayInfo`,
    method: 'GET',
    params
  }),
  //CPA套餐商品详情
  cpaSpecialGoodsInfo: (params) => fetch({
    url: `/${subject}/${typeApp}/cpaSpecialGoodsInfo`,
    method: 'GET',
    params
  }),
  //CPA课程介绍
  cpaGoodsDetail: (params) => fetch({
    url: `/${subject}/${typeApp}/goodsDetail`,
    method: 'GET',
    params
  }),
  // 判断CPA商品是否重复购买
  judgeCpaRepeatPay: (params) => fetch({
    url: `/${subject}/${typeApp}/judgeCpaRepeatPay`,
    method: 'GET',
    params
  }),
  // 测试结果获取商品信息
  getTestAbilityGoodsInfo: (data) => fetch({
    url: `/${subject}/${typeApp}/queryAbilityTestGoodsInfo/v3`,
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    data
  }),
  // 商机预约
  getGoodsResult: (params) => fetch({
    url: `/${subject}/${typeApp}/subscribeGoods`,
    method: 'GET',
    params
  }),
  // 获取考试指南的详情页数据
  getExamDetailsData: (params) => fetch({
    url: `/${subject}/${typeApp}/queryAppInformationDetailInfo`,
    method: 'GET',
    params
  })
}
