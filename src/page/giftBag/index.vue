<template>
  <div class="gift-bag">
    <div class="closePage" @click='handleClosePage'>
      <van-icon name="arrow-left" />
    </div>
    <div class="surprise">
      <div class="surprise-bag">
        <div class="broadcast">
          <img src="~@/assets/images/giftBag/broadcast.png" alt />
        </div>
        <div class="introduce">
          <p>
            一年之计在于春，大好的时节千万不要忘记学习~新人专属超值惊喜课程礼包全新上线，
            <span>3大热门课程礼包任你免费挑选！</span>史无前例，后惠无期
          </p>
        </div>
      </div>
      <div :class="topFixed ? 'curse fx' : 'curse'">
        <div v-for="(item,index) in subjectType" :key="index" @click="changeDetail(index)">
          <img :src='"~@/assets/images/giftBag/title2/"+item.imgName+(index+1)+".png"' alt />
        </div>
      </div>
      <div class="detail">
        <img v-for="pic in 6" :key="pic" :src='"~@/assets/images/giftBag/"+subjectName+"/"+pic+".png"' alt />
      </div>
    </div>
    <div class="add-gift">
      <img src="~@/assets/images/giftBag/add-gift.png" alt />
    </div>
    <div :class="iosRule? 'get-rule ios-rule' : 'get-rule'">
      <img src="~@/assets/images/giftBag/get-rule.png" alt />
    </div>
    <img src="~@/assets/images/giftBag/header.png" class="head-img" alt />
    <div class="footer">
      <div class="footer-title">当前已选<span class="checkName">{{this.currentName}}</span>大礼包</div>
      <div :class="isReceive === '已领取-去学习'? 'receive alery-receive' : 'receive'" @click="receive()">{{isReceive}}</div>
    </div>
    <!-- 弹框 -->
    <div class="dialog-assembly" v-if='showDialog'>
      <div class="dialog-content">
        <img src="~@/assets/images/giftBag/dialog.png" alt="">
        <div class="title">恭喜！礼包领取成功</div>
        <div class="content">
          <div>线上课程已发放至<span class="learningCenter" @click='gotoStudy'>【学习中心】</span>，</div>
          <div>通过下方按钮即可学习；线下课程和权益，</div>
          <div>将由专人在24小时内联系您进行发放，</div>
          <div>请留意接听电话。祝您学习愉快！</div>
        </div>
        <div class="dialog-button" @click='gotoStudy'>马上学习</div>
      </div>
      <div class="closeDialog">X</div>
      <div class="mask"></div>
    </div>
  </div>
</template>
<script>
  import { JsBridge } from '@/utils/bridge.js'
  import { getUrlPara } from '@/utils/factory.js'
  let clientType = getUrlPara('clientType')
  export default {
    data() {
      return {
        subjectType: [
          {
            subjectName: "primary",
            imgName: "checked-sort-"
          },
          {
            subjectName: "intermadiate",
            imgName: "sort-"
          },
          {
            subjectName: "taxation",
            imgName: "sort-"
          },
          {
            subjectName: "cpa",
            imgName: "sort-"
          }
        ],
        subjectName: 'primary',
        currentName: "初级会计职称",
        currentIndex: 0,
        goodsList: [],
        isReceive: '立即领取',
        isLogin: false,
        showDialog: false,
        topFixed: false,
        iosRule: false,
        platformTypeObj: {}
      };
    },
    mounted() {
      window.addEventListener('scroll', this.listenerScroll)
    },
    created() {
      //隐藏导航标题栏
      JsBridge(null,{path: "navigation/needHide",
          data: {
            //0表示导航栏显示，如果要隐藏则设置为1
            needHide: 1
          }
      })
      if(this.$type == 'ios') {
        this.iosRule = true;
      }

      this.$api.giftGoodsInfoList().then(res => {
        if (res && res.code == 200) {
          this.goodsList = res.data
        }
      })
      this.isCheckGiftPack()
    },
    methods: {
      //去学习中心
      gotoStudy() {
        JsBridge(null, { path: "jump/myCourse" })
        this.showDialog = false
      },
      changeDetail(index) {
        this.currentIndex = index;
        this.subjectName = this.subjectType[index].subjectName;
        for (let i = 0; i < this.subjectType.length; i++) {
          this.subjectType[i].imgName = "sort-"
        }
        this.subjectType[index].imgName = "checked-sort-";
        this.changePageName(this.subjectName)
      },
      //  获取token和
      // getToken() {
      //   this.token = JsBridge(null, { path: "info/user" })
      //   this.platformType = 'ios'
      // },
      // 判断礼包是否领取
      isCheckGiftPack() {
        let userinfo=JsBridge(null, {"code":200, path: "info/user" });
        let token=(userinfo&&JSON.parse(userinfo).code==200)&&JSON.parse(userinfo).data.token;
        this.$api.checkGiftPack({ token: token?token:'', }).then(res => {
          if (res && res.code == 200) {
            this.isReceive = res.data.receive ? '已领取-去学习' : '立即领取'
          }
          this.isLogin = res && res.code == 401 ? false : true
        })
      },
      // 监听滚动
      listenerScroll() {
        this.topFixed = window.pageYOffset > 240 ? true : false
      },
      // 礼包名替换
      changePageName(name) {
        switch (name) {
          case 'primary':
            this.currentName = "初级会计职称";
            break;
          case 'intermadiate':
            this.currentName = "中级会计职称";
            break;
          case 'taxation':
            this.currentName = "税务师";
            break;
          case "cpa":
            this.currentName = "CPA"
            break;
        }
      },
      // 关闭当前页
      handleClosePage() {
        JsBridge(null,
          {
            path: "webview/action/finish",
          })
      },
      // 领取礼包
      receive() {
        if (!this.isLogin) {
          JsBridge(null, { path: "webview/action/login" })
          return
        }
        if (this.isReceive == '已领取-去学习') {
          this.gotoStudy();
          return;
        }
        let ids = ''
        // this.goodsList.map(item => {
        //   if (item.gifGoodsName == this.currentName) {
        //     ids = item.gifGoodsId + ',' + item.gifGoodsAddId
        //   }
        // })
        let currentGoods = this.goodsList[this.currentIndex]
        ids = currentGoods.gifGoodsId + ',' + currentGoods.gifGoodsAddId
        let platformType = ''
        if (this.$type == 'android') {
          platformType = 2
        } else if (this.$type == 'ios') {
          platformType = 3
        }
        let userinfo=JsBridge(null, {"code":200, path: "info/user" });
        let token=(userinfo&&JSON.parse(userinfo).code==200)&&JSON.parse(userinfo).data.token;
        // 领取
        this.$api.getReceiveGift({
          token: token?token:'',
          platformType: platformType,
          commodityIdListStr: ids
        }).then(res => {
          if (res && res.code == 200) {
            this.showDialog = true
            this.isReceive = '已领取-去学习'
          }
        })
      }
    }
  };
</script>
<style lang="less" scoped>
  .gift-bag {
    position: relative;
     .closePage {
       position: fixed;
       top: 0;
       z-index: 1000;
       color: #fff;
       font-size: 34px;
       margin: 20px;
     }
    .surprise {
      padding: 286px 40px 33px 40px;
      background: linear-gradient(120deg,
          rgba(149, 44, 19, 1),
          rgba(220, 68, 33, 1));

      .surprise-bag {
        width: 669px;
        height: 197px;
        background: rgb(255,244,230);
        border-radius: 4px;
        position: absolute;
        z-index: 11;
        padding: 25px 38px 28px 30px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .broadcast {
          width: 129px;
          height: 109px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .introduce {
          width: 456px;
          height: 109px;
          margin-left: 15px;

          p {
            font-size: 24px;
            line-height: 34px;
            letter-spacing: 0px;
            color: #333333;
            font-weight: bolder;
            text-align: justify;
            span {
              color: #aa361b;
              font-weight: bolder;
            }
          }
        }
      }

      .curse {
        margin-top: 210px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        div {
          width: 163px;
          height: 77px;
          // background: linear-gradient(
          //   81deg,
          //   rgba(247, 198, 68, 1),
          //   rgba(248, 237, 108, 1)
          // );
          // border-radius: 4px;
          // box-sizing: border-box;
          // position: relative;
          // span {
          //   width: 100%;
          //   font-size: 12px;
          //   font-weight: bold;
          //   color: rgba(51, 51, 51, 1);
          //   text-align: center;
          //   display: block;
          //   transform: scale(0.6);
          //   line-height: 24px;
          //   text-indent: -75px;

          //   //   text-indent: -50px;
          // }
          // span:nth-of-type(1) {
          //   position: absolute;
          //   left: 0;
          //   right: 0;
          //   text-align: center;
          // }
          // span:nth-of-type(2) {
          //   font-size: 24px;
          //   font-family: AlibabaPuHuiTi;
          //   font-weight: bold;
          //   color: rgba(170, 54, 27, 1);
          //   transform: scale(1);
          //   text-indent: 0px;
          // }
          img {
            width: 100%;
          }
        }
      }

      .fx {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        margin-top: 0;
        z-index: 10000;
        background-color: #952c13;
        padding: 20px 20px 10px 20px;
      }

      .detail {
        background: rgb(255, 245, 228);
        margin-top: 5px;
        padding: 20px 20px 35px 20px;

        img {
          width: 100%;
        }
      }
    }

    .add-gift {
      background: rgb(255, 245, 228);
      padding: 20px 20px 35px 20px;
      width: 100%;

      img {
        width: 100%;
      }
    }

    .get-rule {
      width: 100%;
      margin-bottom: 110px;
      padding: 20px 20px 35px 20px;
      img {
        width: 100%;
      }
    }
    .ios-rule {
      padding-bottom: 145px;
    }
    .footer {
      width: 100%;
      position: fixed;
      height: 110px;
      bottom: 0;
      background: url('~@/assets/images/home/receive.png');
      background-size: 100% 110px;
      padding: 0 50px;
      line-height: 70px;

      .receive {
        width: 240px;
        height: 110px;
        position: absolute;
        right: 40px;
        text-align: center;
        line-height: 110px;
        color: #aa361b;
        padding-right: 20px;
        font-size: 28px;
        font-weight: bold;
      }
      .alery-receive {
        font-size: 24px;
        text-align: left;
        padding-left: 18px;
        line-height: 110px;
      }
      .footer-title {
        position: absolute;
        color: #ffffff;
        top: 0;
        font-size: 28px;

        .checkName {
          margin: 0px 8px;
          color: yellow;
        }
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
    
    .head-img {
      position: absolute;
      width: 100%;
      top: 0;
    }

    .dialog-assembly {
      width: 100%;
      height: 100%;
      /* position: fixed; */
      position: absolute;
      top: 0;
      z-index: 100;

      .dialog-content {
        position: fixed;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 600px;
        height: 748px;
        background-color: #fff;
        z-index: 100000;
        border-radius: 16px;
        text-align: center;
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 42px;
        color: #6C7179;

        img {
          width: 250px;
          height: 250px;
          margin-top: 40px;
          margin-bottom: 18px;
        }

        .title {
          font-size: 44px;
          font-family: PingFang SC;
          font-weight: bold;
          line-height: 56px;
          color: #3C3D41;
          opacity: 1;
        }

        .content {
          margin-top: 18px;
          margin-bottom: 39px;

          .learningCenter {
            color: #00AB84;
          }
        }

        .dialog-button {
          width: 420px;
          height: 90px;
          background: #00AB84;
          line-height: 90px;
          color: #fff;
          border-radius: 45px;
          margin: auto;
          font-size: 34px;
          font-family: SourceHanSansCN-Medium;
        }
      }

      .mask {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.6;
      }
    }
  }
</style>