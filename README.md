<!--
 * @Description:
 * @Version: 1.0
 * @Autor: 尹伊
 * @Date: 2020-01-06 09:36:28
 * @LastEditors  : 尹伊
 * @LastEditTime : 2020-02-13 16:17:08
 -->

# 项目介绍

基于 vue+vant 框架的恒企教育官网 H5

# active

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

### Compiles and minifies for production

```
npm run build
```

# 文件夹说明

├─build webpack 的初始化配置
├─config 项目初始化配置
├─node_modules
├─src
├─api 请求
├─assets 资源目录，未编译的静态资源如 scss、js
├─css 静态资源
├─js 公共方法
├─image 图片
├─music 音乐
├─components 组件目录
├─page 页面目录
├─router 路由
├─store vuex store
├─utils 接口请求封装
├─App.vue 根组件
├─main.js 入口文件

# 版本介绍

- v1.0 （还没开始）

# 项目注意点

- 页面
  - 单科详情： http://localhost:8080/singleSubject?goodsId=2236&token=80ec31e28000016f8d8f350681000003
- 首页: http://localhost:8080/home
- 我的订单: http://localhost:8080/myOrder
- 确认订单: http://localhost:8080/confirmOrder
- 支付成功: http://localhost:8080/finishPay
- 实操子栏目: http://localhost:8080/practice
- 新人礼包: http://localhost:8080/giftBag?token=80ebe8b780000170385212ea81000001&clientType=android

# 项目优化点建议

-

# 分支介绍

- master：主分支
- dev: 开发
- test: 测试
- preplaned: 预发布

# 原型地址

- 目前还没出来

# swagger-ui

- 网校接口：http://onlineschoolapi.beta.hqjy.com/swagger-ui.html#!/api-goods-controller/goodsInfoUsingGET
- app/h5 首页统一接口 ：http://onlineschoolapi.beta.hqjy.com/swagger-ui.html#!/wx-28-app-home-page-merge-api-controller
- 选课中心子类目页商品分类 ：http://onlineschoolapi.beta.hqjy.com/swagger-ui.html#!/wx-28-goods-category-controller/goodsCenterCategoryUsingGET
- 选课中心子类目页整合数据: http://onlineschoolapi.beta.hqjy.com/swagger-ui.html#!/api-goods-controller/goodsCenterUsingGET

# rap

- 网校接口：http://10.0.98.22:8080/workspace/myWorkspace.do?projectId=31#1214
- 学习中心接口：http://10.0.98.22:8080/workspace/myWorkspace.do?projectId=14#776

# yapi

- app/h5 首页统一接口 ：http://yapi.beta.hqjy.com/project/14/interface/api/3995
- 选课中心子类目页商品分类: http://yapi.beta.hqjy.com/project/14/interface/api/4007
- 选课中心子类目页整合数据: http://yapi.beta.hqjy.com/project/14/interface/api/4001

# 地址

- 测试线：http://mschool.beta.hqjy.com
- 正式线：还没出来

# 团队成员

- 测试：目前没有
- 产品：
  - 伟伟
- 后台：
  - 陈欣煜
  - 简栎湾 ---收藏接口
  - 杜洁丽 ---支付模块
  - 周东林 ---展示互动
- 前端：
  - 尹伊: 课程介绍，课程目录，顶部视频播放，底部栏组件
  - 杨兰：课程推荐，支付部分 实操子栏目
- UI 设计
  - 吴晓玲
