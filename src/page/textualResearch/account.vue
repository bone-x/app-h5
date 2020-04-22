<template>
  <div class="account">
    <div class="advertising">
      <!-- 广告位视频id存在就是视频 -->
      <div class="pic" v-if="advert&&advert.vid" ref='video'>
        <PlayerBL :configBl='advert' :VideoHight='VideoHight' />
      </div>
      <!-- 图片 -->
      <div class="pic" v-else @click="jumpNewsPic(advert)">
        <img :src="advert&&advert.image" alt />
        <div class="message" v-if='advert.informationTitle'>
          <p>{{advert&&advert.informationTitle}}</p>
        </div>
      </div>
      <!--1、 目前为： ENTRY 显示报名时间 EXAM 显示考试时间 EXAM_END 显示考试已截止 ENTRY_END 显示报名已截止 NONE 不显示 -->
      <div class="timer" v-if="(countDown&&countDown.countDownType)=='EXAM_END'">
        <img :src="clock" alt class="clock" /><span>{{countDown&&countDown.currentYear}}年考试时间已截止</span>
      </div>
      <div class="timer" v-else-if="(countDown&&countDown.countDownType)=='ENTRY_END'">
        <img :src="clock" alt class="clock" /><span>{{countDown&&countDown.currentYear}}年报名时间已截止</span>
      </div>
      <div class="timer" v-else-if="(countDown&&countDown.countDownType)=='ENTRY'">
        <img :src="clock" alt class="clock" /><span>距离{{countDown&&countDown.currentYear}}年报名时间还有<span
            class='day'>{{countDown&&countDown.remainEntryDay}}</span>天</span>
      </div>
      <div class="timer" v-else-if="(countDown&&countDown.countDownType)=='EXAM'">
        <img :src="clock" alt class="clock" /><span>距离{{countDown&&countDown.currentYear}}年考试时间还有<span
            class='day'>{{countDown&&countDown.remainExamDay}}</span>天</span>
      </div>
      <!-- 咨询    -->
      <div class="news" v-if='informationList.length>0'>
        <p v-for='(item,index) in informationList' :key='index' @click='jumpNews(item)'>

          <span class='title'><i class="circle"></i>{{item.title}}</span>
        </p>
      </div>
      <div class="more" v-if='informationList.length>0'>
        <span @click='jumpMoreNews()'>更多资讯 <img src="@/assets/images/icon/btn-close-green@2x.png"
            class="right" /></span>
      </div>
    </div>
    <!--  课程列表 -->
    <div class="subject-goods" v-for='(item,index) in goodsList' :key='index' v-show='goodsList.length>0'>
      <!-- 阴影 -->
      <div class="shadow" v-if='item.showType != "ROADMAP"'>
        <img src="../../assets/images/home/icon_section_head.png" alt="">
      </div>
      <h4 class='goodTitle' :class="{'special':item.showType!=='SINGLE', 'spec':item.showType == 'ROADMAP'}">
        {{item.categoryName}}
        <!-- <span v-if="item.showType!='SINGLE'">系列课程</span> -->
        <span v-if="item.categoryName=='全科'">系列课程</span>
      </h4>
      <!-- //全科 -->
      <div class="goods" v-if="item.showType=='SPECIAL'">
        <ListCourse v-for='(list,index) in item.agivList' :key='index' :list='list'
          @click.native='jumpGoodsDetail(list.id)' />
      </div>
      <!-- //单科 -->
      <div class="goods" v-else-if="item.showType=='SINGLE'">
        <div>
          <GoodItem v-if='indexs<=curr[index]' v-for='(list,indexs) in item.agivList' :key='indexs' :show='false'
            :goodItemDetail='list' @click.native='jumpGoodsDetail(list.id)' />
        </div>
        <div class="goodShow" @click="moreShow(index,item)" v-show="item.agivList.length > 4">
          <span v-if="curr[index] === 3">展开更多({{item.agivList.length - 4}})<img
              src="@/assets/images/icon/btn-close-green@2x.png" /></span>
          <span v-else>收起更多<img src="@/assets/images/icon/btn-close-green@2x.png" class="moreGoods" /></span>
        </div>
      </div>
      <!-- // 学习路径 -->
      <div class="goods" v-else-if="item.showType=='ROADMAP'">
        <ListGood :goodItemDetail='item.agivList' @jump='jumpGoodsDetail' />
      </div>
      <!-- // 专题讲座 -->
      <div class="goods" v-else-if="item.showType=='LECTURE'">
        <SpeekSit v-show='indexs<=curr[index]' v-for='(list,indexs) in item.agivList' :key='indexs'
          :goodItemDetail='list' @click.native='jumpGoodsDetail(list.id)' />
        <div class="goodShow" @click="moreShow(index,item)" v-show="item.agivList.length > 4">
          <span v-if="curr[index] === 3">展开更多({{item.agivList.length - 4}})<img
              src="@/assets/images/icon/btn-close-green@2x.png" /></span>
          <span v-else>收起更多<img src="@/assets/images/icon/btn-close-green@2x.png" class="moreGoods" /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { JsBridge, isNativeApp } from '@/utils/bridge';
  import PlayerBL from "@/components/playerBL";
  import SpeekSit from "@/components/OtherGoodItem";
  import ListGood from "@/components/OtherGoodItem/item";
  import ListCourse from "@/components/listCourse";
  import GoodItem from "@/components/GoodItem";
  import VideoItem from "@/components/VideoItem";
  export default {
    name: "account",
    props: {
      curTabChild: {
        type: Number,
        default: 0
      },
    },
    components: {
      ListCourse,
      GoodItem,
      // VideoItem,
      ListGood,
      SpeekSit,
      PlayerBL
    },
    data() {
      return {
        showPic: true, // 展示图片or照片
        show: true, // 财会证书的下面tab栏展示
        showGoods: false, // 展开商品
        choiceTab: true,
        choiceTab: 0,
        Img: require("@/assets/images/icon/分类-上@2x.png"),
        banner: require("@/assets/images/home/首banner.png"),
        clock: require("@/assets/images/icon/clock.png"),
        topImg: require("@/assets/images/icon/btn-close-green@2x.png"),
        advert: {},//资讯广告位
        countDown: {},//倒计时
        informationList: [],//资讯列表,
        goodsList: [],//商品各类目列表
        VideoHight: 0,
        curr: [],
        id: '',


      };
    },
    watch: {
      curTabChild(val, oldVal) {//监听传来的id
        this.getGoodsList()
      }
    },
    mounted() {
      this.getGoodsList();
    },
    methods: {
      jumpNewsPic(advert) {
        switch (advert.type) {
          case 'IMAGE':
            //资讯
            JsBridge(null, {
              path: 'jump/news', data: {
                skipUrl: advert.skipUrl
              }
            })
            break;
          case 'GOODS':
            //跳转到app商品详情
            JsBridge(null, { path: 'home/jump/courseInfo', data: { id: advert.goodsId } })
            break;
        }
      },
      jumpNews(data) {//跳转到app的资讯
        JsBridge(null, {
          path: 'jump/news', data: {
            skipUrl: data.skipUrl
          }
        })
      },
      jumpMoreNews() {//跳转到app的更多资讯
        JsBridge(null, {
          path: 'jump/moreNews', data: {
            categoryId: this.id
          }
        })
      },
      jumpGoodsDetail(id) {//跳转到app课程详情
        JsBridge(null, { path: 'home/jump/courseInfo', data: { id } })
      },
      async getGoodsList() {
        let res = await this.$api.getColumnList({ categoryId: this.curTabChild });
        if (res.code == 200 && res.data) {
          this.advert = res.data.advert;//资讯广告位
          this.countDown = res.data.countDown;
          this.informationList = res.data.informationList;
          this.goodsList = res.data.goodsList;
          this.id = res.data.childInfoCategoryId || res.data.parentInfoCategoryId;
          this.curr = new Array(res.data.goodsList.length).fill(3)//填充res.data.goodsList长度的数组【2,2,2.。。。】
          this.$nextTick(() => {
            // setTimeout(() => {
            (this.$refs.video) && (this.VideoHight = this.$refs.video.offsetHeight);
            // }, 20)

          })
        }

        //   console.log(this.advert)
      },

      moreShow(index, item) {
        // this.curr[index]=item.agivList.length;
        //这里v-if 里面绑定的是数组的时候试图不会更新 vue监测不到-》用this.$set()
        this.curr[index] === 3 ? this.$set(this.curr, index, item.agivList.length) : this.$set(this.curr, index, 3)
        // console.log(this.curr)
      },
      choiceType(val) {
        this.choiceTab = val;
      }
    }
  };
</script>
<style lang="less" scoped>
  .account {
    background-color: #fff;

    .moreGoods {
      transform: rotate(180deg);
    }

    .advertising {

      // padding-top: 0px;
      .pic {
        width: 100%;
        height: 382px;
        position: relative;
        padding: 0px 36px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 12px;
          overflow: hidden;
        }

        .message {
          width: 678px;
          height: 80px;
          line-height: 80px;
          background: rgba(0, 0, 0, 0.5);
          // opacity: 0.5;
          border-radius: 0px 0px 12px 12px;
          position: absolute;
          bottom: 0;

          p {
            padding-left: 24px;
            font-size: 28px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            opacity: 1;
          }
        }
      }

      .timer {
        border-bottom: 1px solid #EDEDED;
        width: 678px;
        height: 98px;
        line-height: 98px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(58, 60, 66, 1);
        margin: auto;

        .day {
          color: #FF8800;
          font-size: 44px;
          padding: 0 12px;
          font-family: PingFang SC;
          font-weight: bold;
        }

        .clock {
          margin: 30px 8px 0 0;
          width: 42px;
          height: 42px;
          // background:linear-gradient(180deg,rgba(255,160,128,1) 0%,rgba(246,97,47,1) 100%);
          // box-shadow: 0px 3px 6px rgba(246, 97, 47, 0.16);
        }

        span {
          font-size: 32px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(58, 60, 66, 1);
        }
      }

      .news {
        //   padding: 36px 0px;
        width: 678px;
        margin: 0 auto;

        .title {
          position: relative;
          padding-left: 20px;
        }

        .circle {
          position: absolute;
          left: 0;
          top: 14px;
          display: inline-block;
          margin-right: 10px;
          width: 8px;
          height: 8px;
          border-radius: 100%;
          background: rgba(224, 224, 224, 1);
        }

        p {
          padding: 26px 60px 15px 0px;
          // line-height: 10px;
          font-size: 26px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(58, 60, 66, 1);
          opacity: 1;
          display: flex;
        }
      }

      .more {
        //   width: 100%;
        height: 96px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 20px 30px rgba(58, 60, 66, 0.03);
        opacity: 1;
        line-height: 96px;
        text-align: center;

        .right {
          margin: 33px 12px 0 0;
          width: 30px;
          height: 30px;
          transform: rotate(270deg)
        }

        span {
          font-size: 28px;
          font-family: Microsoft YaHei;
          font-weight: 600;
          color: #00ab84;
          opacity: 1;
        }
      }
    }

    .subject-goods {
      /* margin-top: 48px; */
      /* padding: 0px 36px; */
      /* box-shadow: 0px 10px 30px rgba(58, 60, 66, 0.03); */
      overflow: hidden;
      margin-bottom: 48px;
      background-color: #fff;

      .shadow {
        width: 100%;
        /* margin-top: 36px; */

        img {
          width: 100%;
        }
      }

      .goodTitle {
        padding-left: 36px;
      }

      h4 {
        font-size: 40px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        // line-height: 38px;
        color: rgba(58, 60, 66, 1);
        opacity: 1;

        //   margin-bottom: 34px;
        &.special {
          margin-bottom: 34px;
        }

        &.spec {
          font-size: 30px !important;
        }

        span {
          font-size: 24px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 30px;
          color: rgba(108, 113, 121, 1);
        }
      }

      .goods {
        .item {
          float: left;
          margin-bottom: 30px;
        }

        .item:nth-child(2n) {
          float: right;
        }

        //   .goodItem {
        //     padding-left: 0px;
        //   }
      }
    }

    .goodShow {
      height: 98px;
      line-height: 98px;
      box-shadow: 0px 20px 30px rgba(58, 60, 66, 0.03);
      text-align: center;
      font-size: 30px;
      color: #00ab84;

      img {
        width: 42px;
        height: 42px;
        margin-top: 28px;
      }
    }

    .item-goods {
      margin-top: 66px;
      box-shadow: 0px 10px 30px rgba(58, 60, 66, 0.03);
      overflow: hidden;

      h4 {
        font-size: 40px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 38px;
        color: rgba(58, 60, 66, 1);
        opacity: 1;
        margin-bottom: 34px;
        margin-left: 36px;
      }

      .goods {
        .item {
          float: left;
          margin-bottom: 30px;
        }

        .item:nth-child(2n) {
          float: right;
        }
      }

    }
  }
</style>