<template>
  <div class="classVip">
    <!-- 头部 -->
    <div class="class_header">
      <!-- 2575 2576 2577 2578 2579 2580 -->
      <!-- 2387 2388 2389 2390 2391 2392 -->
      <!-- <img :src="detailData.originPath" alt=""> -->
      <img :src="goodsFirst" alt="" v-if='$route.query.goodsId==2575'>
      <img :src="goodsSecond" alt="" v-else-if='$route.query.goodsId==2576'>
      <img :src="goodsThree" alt="" v-else-if='$route.query.goodsId==2577'>
      <img :src="goodsFour" alt="" v-else-if='$route.query.goodsId==2578'>
      <img :src="goodsFive" alt="" v-else-if='$route.query.goodsId==2579'>
      <img :src="goodsSix" alt="" v-else-if='$route.query.goodsId==2580'>
      <!-- 返回和分享 -->
      <div class="operate_btn">
        <div class="btns">
          <div><img src="../../assets/images/icon/topbar-btn-back-white@2x.png" alt="" @click='back()'></div>
          <div> <img src="../../assets/images/icon/topbar-btn-share拷贝@2x.png" alt @click="share()" /></div>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="class_content">
      <div class="content1">
        <div class="class_title">{{detailData.name}}</div>
        <div class="money" v-if='detailData.classList&&!detailData.hasBoughtGoods'>
          <span class="discount">
            <span v-if='clientType == "ios"'>{{detailData.classList[curTab].presentPrice | changeFormate}}<span
                class="xuebi" v-if='detailData.classList[curTab].presentPrice != 0'>学币</span></span>
            <span v-else><span
                v-if='detailData.classList[curTab].presentPrice != 0'>¥</span>{{detailData.classList[curTab].presentPrice | changeFormate}}</span>
          </span>
          <del class="origin" v-if=' (detailData.classList[curTab].originalPrice
                !=detailData.classList[curTab].presentPrice)'>
            <span v-if='clientType == "ios"'>{{detailData.classList[curTab].originalPrice | changeFormate}}
              <span v-if='detailData.classList[curTab].originalPrice != 0'>学币</span>
            </span>
            <span v-else>
              <span
                v-if='detailData.classList[curTab].originalPrice != 0'>¥</span>{{detailData.classList[curTab].originalPrice | changeFormate}}
            </span>
          </del>
        </div>
        <!-- <div class="line"></div> -->
        <div class="teachType clear-float" @click='handleChoice'>
          <!-- <div class='teach'>授课方式</div>
          <div class="type">
            <span class="textIcon">直播</span>
            <span class="textIcon">双师</span>
            <span class="textIcon">面授</span>
          </div> -->
          <div class="float-left">班型</div>
          <div class="checkType float-left">
            已选：{{!detailData.hasBoughtGoods?detailData.classList&&detailData.classList[curTab].name:detailData.boughtClass&&detailData.boughtClass.name}}
          </div>
          <div class="checkIcon float-right" v-if='!detailData.hasBoughtGoods'>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div class="content2">
        <!-- <div v-for='(item,index) in detailList' :key='index'>
          <img :src="item.content" alt="" v-if='item.type=="img"'>
          <div v-if='item.type=="text"' class="textDetail">{{item.content}}</div>
        </div> -->
        <img :src="titleFirst" alt="" v-if='$route.query.goodsId==2575'>
        <img :src="titleSecond" alt="" v-else-if='$route.query.goodsId==2576'>
        <img :src="titleThree" alt="" v-else-if='$route.query.goodsId==2577'>
        <img :src="titleFour" alt="" v-else-if='$route.query.goodsId==2578'>
        <img :src="titleFive" alt="" v-else-if='$route.query.goodsId==2579'>
        <img :src="titleSix" alt="" v-else-if='$route.query.goodsId==2580'>
      </div>
    </div>
    <!-- 底部栏 -->
    <div class="class_footer">
      <div class="consultation" @click='goAsk'>
        <img src="@/assets/images/icon/zx.png" alt="" style="width: 20px; height: 20px; background-color: break;">
        咨询
      </div>
      <div class="sign" @click='handlerSign'>
        {{detailData.hasBoughtGoods?'马上学习':'立即报名'}}
      </div>
    </div>
    <!-- 弹框 -->
    <van-dialog v-model="isShow" show-confirm-button confirmButtonText="确定" @confirm='gotosign'>
      <div>
        <div>预约成功</div>
        <div>24小时内会有专业老师与您练习</div>
      </div>
    </van-dialog>
    <!-- 上拉菜单 -->
    <van-action-sheet :overlay=false v-model="show">
      <div class="sheetCon">
        <div class="sheetMoney">
          <div class="money" v-if='detailData.classList'>
            <!-- v-html='changeFormate(detailData.classList&&detailData.classList[curTab].presentPrice)' -->
            <span class="discount">
              <span v-if='clientType == "ios"'>{{detailData.classList[curTab].presentPrice | changeFormate}}<span
                  class="xuebi" v-if='detailData.classList[curTab].presentPrice != 0'>学币</span></span>
              <span v-else><span
                  v-if='detailData.classList[curTab].presentPrice != 0'>¥</span>{{detailData.classList[curTab].presentPrice | changeFormate}}</span>
            </span>
            <!-- v-html='changeFormate(detailData.classList&&detailData.classList[curTab].originalPrice)' -->
            <del class="origin"
              v-if='detailData.classList[curTab].originalPrice != detailData.classList[curTab].presentPrice'>
              <span v-if='clientType == "ios"'>{{detailData.classList[curTab].originalPrice | changeFormate}}
                <span v-if='detailData.classList[curTab].originalPrice != 0'>学币</span>
              </span>
              <span v-else>
                <span
                  v-if='detailData.classList[curTab].originalPrice != 0'>¥</span>{{detailData.classList[curTab].originalPrice | changeFormate}}
              </span>
            </del>

          </div>
          <div class="checkedTypt">
            已选：{{detailData.classList&&detailData.classList[curTab].name}}
          </div>
        </div>
        <div class="sheetTypt">
          班型
          <div class="typeList">
            <div v-for='(item,index) in detailData.classList' :key='index' @click='selectTab(index)'
              :class='{active:curTab==index}'>{{item.name}}</div>
          </div>
        </div>
      </div>
      <i class="iconfont iconguanbi" @click='show=false'></i>
    </van-action-sheet>
    <div class="boxShadow" v-if='show' @click='show=false'></div>
  </div>
</template>
<script>
  import { JsBridge } from '@/utils/bridge.js'
  import { ActionSheet } from 'vant';
  export default {
    components: {
      'van-action-sheet': ActionSheet
    },
    filters: {
      // 钱币格式化
      changeFormate(val) {
        if (!val) {
          return '免费'
        } else {
          return val.toFixed(1)
        }
      },
    },
    data() {
      return {
        show: false,
        isShow: false,
        curTab: 0,
        detailData: {},
        detailList: [],
        UserToken: '',
        deviceId: '',
        clientType: '',
        goodsFirst: require('@/assets/images/vip/goods-1.jpg'),
        goodsSecond: require('@/assets/images/vip/goods-2.jpg'),
        goodsThree: require('@/assets/images/vip/goods-3.png'),
        goodsFour: require('@/assets/images/vip/goods-4-1.jpg'),
        goodsFive: require('@/assets/images/vip/goods-5.png'),
        goodsSix: require('@/assets/images/vip/goods-6.jpg'),

        titleFirst: require('@/assets/images/vip/title-1.png'),
        titleSecond: require('@/assets/images/vip/title-2.jpg'),
        titleThree: require('@/assets/images/vip/title-3.png'),
        titleFour: require('@/assets/images/vip/title-4.jpg'),
        titleFive: require('@/assets/images/vip/title-5.png'),
        titleSix: require('@/assets/images/vip/title-6.jpg'),
        actions: [
          {
            name: '选项'
          },
          {
            name: '选项'
          },
          {
            name: '选项',
            subname: '副文本',
            openType: 'share'
          }
        ]
      }
    },
    mounted() {
      this.getVipClassDetail();
      JsBridge(null,
        {
          path: "navigation/needHide",
          data: {
            //0表示导航栏显示，如果要隐藏则设置为1
            needHide: 1
          }
        })
    },
    created() {
      this.clientType = this.$type
    },
    methods: {
      back() {
        JsBridge(null, { path: "webview/action/finish" })
      },
      share() {
        JsBridge(null, {
          path: "share/showShareDialog", data: {
            //新方法可以将分享信息填充在这里，而不必特意去调用配置分享信息动作了
            //其中，title,description,imgUrl必须，目前来说，shareUrl也是必须。
            type: 0,	//0表示普通分享，1表示小程序。只针对微信
            title: "恒企教育",	//分享的标题显示内容
            description: "做专业有温度的教育",	//分享的内容描述
            shareUrl: "https://schoolh5.hqjy.com/pages/downloadApp/index.html?from=singlemessage",	//分享点击时需要跳转的链接
            imgUrl: 'http://download.hqjy.com//img/App_logo_kuaiji.png',	//分享条目中显示的小图片
          }
        })
      },
      goAsk() {
        JsBridge(null, { path: "jump/consult" })
      },
      async getVipClassDetail() {
        let userinfo = JsBridge(null, { "code": 200, path: "info/user" });
        console.log(userinfo)
        let token = (userinfo && JSON.parse(userinfo).code == 200 && JSON.parse(userinfo).data) && (JSON.parse(userinfo).data.token);
        this.UserToken = token;
        this.deviceId = (userinfo && JSON.parse(userinfo).data) && (JSON.parse(userinfo).data.deviceId);
        // console.log(this.UserToken)
        // console.log( this.deviceId)
        let obj = token ? { goodsId: this.$route.query.goodsId, token } : { goodsId: this.$route.query.goodsId }

        let res = await this.$api.getVipClassDetail(obj);
        let detail = await this.$api.getGoodsDetail({ goodsId: this.$route.query.goodsId })
        this.detailData = res.data;
        // console.log(this.detailData)
        this.detailList = detail.data
        //  console.log(this.detailData)
      },
      selectTab(index) {
        this.curTab = index;
      },
      handleConsult() {

      },
      handlerSign() {//这里 1 已经买了跳转 学习中心 2没买跳转商品生成订单
        //登录和未登录逻辑 ios不需要登录
        // let userInfo=JsBridge(null, { path: "info/user" })
        // let deviceId=(userInfo&&JSON.parse(userInfo).code==200)&&(JSON.parse(userInfo).data.deviceId);
        // if(deviceId){//ios ->直接去购买
        //  if (this.detailData && this.detailData.hasBoughtGoods) {//ios已买
        //             JsBridge(null, { path: "gift/jump/studyCenter" })
        // }
        // else{
        //      JsBridge(null, {//IOS未买直接下单
        //                 path: "goods/genOrder", data: {
        //                     "goodsId": this.detailData.classList[this.curTab].id,
        //                     //如果已经创建过了订单的话，就会有订单编号(有就传，没有就不传)
        //                     // "orderId":"订单ID",
        //                     //如果已经创建过了订单的话，就会有订单编号(有就传，没有就不传)
        //                     // "orderNo":"订单编号",
        //                 }
        //             })
        // }
        // }else{

        if (this.UserToken || this.deviceId) {//已登录 this.$deviceId存在就为ios无需登录
          if (this.detailData && this.detailData.hasBoughtGoods) {//已买
            JsBridge(null, { path: "jump/myCourse" })
          }
          else { //未买下单
            JsBridge(null, {
              path: "goods/genOrder", data: {
                "goodsId": this.detailData.classList[this.curTab].id,
                //如果已经创建过了订单的话，就会有订单编号(有就传，没有就不传)
                // "orderId":"订单ID",
                //如果已经创建过了订单的话，就会有订单编号(有就传，没有就不传)
                // "orderNo":"订单编号",
              }
            })
          }
        } else {//未登录
          JsBridge(null, { path: "webview/action/login" })//去登录
        }
        // }
      },
      gotosign() {

      },
      onClose() {
        this.setData({ isShow: false });
      },
      onSelect(event) {
        console.log(event.detail);
      },
      // 选择版本
      handleChoice() {
        if (this.detailData.hasBoughtGoods)
          return false;
        else this.show = !this.show;
      }
    }
  }
</script>
<style lang="less" scoped>
  .classVip /deep/ {
    .operate_btn {

      padding: 0 36px;
      position: fixed;
      width: 100%;
      top: 35px;
      left: 0;

      .btns {
        display: flex;
        justify-content: space-between;

        img {
          /* width: 50%; */
          width: 40px;
          height: 40px;
        }
      }
    }

    .iconguanbi {
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: 30px;
      padding: 18px;
    }

    .active {
      color: #00AB84;
      background-color: #F0FAF8 !important;
      border: 2px solid #00AB84;
    }

    .van-popup {
      background: #fff;
    }

    .boxShadow {
      position: fixed;
      background: #000;
      opacity: .5;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    width: 100%;
    box-sizing: border-box;
    overflow: hidden;

    .class_header {
      width: 100%;
      height: 422px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .class_content {
      box-sizing: border-box;
      margin-bottom: 96px;

      .content1 {
        padding: 0 36px;

        .class_title {
          font-size: 38px;
          font-family: PingFang SC;
          font-weight: bold;
          line-height: 52px;
          padding-top: 30px;
          color: #3A3C42;
        }



        .line {
          width: 100%;
          height: 2px;
          background: rgb(128, 133, 142);
          opacity: 1;
        }


        .teachType {
          /* padding: 30px 0 54px 0; */
          font-size: 26px;
          line-height: 96px;
          height: 96px;
          border-top: 2px solid #EDEDED;
          font-family: PingFang SC;
          font-weight: bold;
          color: #A3ABB8;
          //   margin-top: 24px;

          .checkType {
            color: #3A3C42;
            margin-left: 24px;
          }

          /* .type {
            margin-top: 30px;
            font-size: 26px;
            color: #6C7179;

            .textIcon {
              padding: 11px 40px;
              background-color: #F5F6F7;
              border-radius: 30px;
            }
          } */
        }
      }

      .content2 {
        width: 100%;

        img {
          width: 100%;
        }
      }
    }

    .class_footer {
      position: fixed;
      bottom: 0;
      background-color: #fff;
      z-index: 100;
      width: 100%;
      height: 96px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding-right: 24px;
      box-shadow: 0px -10px 20px rgba(58, 60, 66, 0.1);

      /deep/ .iconfont {
        font-size: 38px;
        color: #2E3033;
      }

      .consultation {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #3A3C42;
        border-right: 2px solid #E0E0E0;
      }

      .sign {
        flex: 5;
        height: 80px;
        line-height: 80px;
        font-size: 34px;
        color: #ffffff;
        background: rgba(246, 97, 47, 1);
        opacity: 1;
        border-radius: 6px;
      }
    }

    .sheetCon {
      box-sizing: border-box;
      padding: 18px 36px;

      .sheetMoney {
        border-bottom: 1px solid #EBEDF0;

        .checkedTypt {
          margin-top: 15px;
          margin-bottom: 32px;
          color: #3A3C42;
        }
      }

      .sheetTypt {
        padding-top: 42px;
        font-size: 26px;

        .typeList {
          display: flex;
          flex-wrap: wrap;
          color: #6C7179;

          div {
            padding: 12px 30px;
            border-radius: 30px;
            /* margin: 15px 10px; */
            margin-right: 18px;
            margin-top: 24px;
            background-color: #F5F6F7;
          }
        }
      }

    }

    .money {
      padding-top: 30px;
      padding-bottom: 24px;
      font-size: 30px;
      color: #9EA7B0;
      /* border-bottom: 2px solid rgba(235, 237, 240, 1); */

      .xuebi {
        font-size: 36px;
        font-weight: 400;
        margin-left: 6px;
      }

      .discount {
        font-size: 48px;
        font-family: San Francisco;
        font-weight: 500;
        line-height: 24px;
        color: #F6612F;
      }

      .origin {
        margin-left: 20px;
        font-family: San Francisco;
        font-weight: 400;
        line-height: 24px;
        color: #A3ABB8;
      }

    }
  }
</style>