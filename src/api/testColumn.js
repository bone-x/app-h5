import fetch from '../utils/fetch'
import { subject, learningCenter } from '../utils/config'
let typeApp = 'app'
export default {
  //获取考证子栏目数据
  getTestColumn: (params) => fetch({
    // url: `/${subject}/${typeApp}/goodsDetail`,
    url: `/${subject}/${typeApp}/goodsCenterCategory/v2`,
    method: 'GET',
    params
  }),
  getColumnList: (params) => fetch({
    url: `/${subject}/${typeApp}/goodsCenter/v2`,
    method: 'GET',
    params
  }),
}
