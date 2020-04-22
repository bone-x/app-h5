<!--
 * @Author: 尹伊
 * @Date: 2020-01-06 10:01:44
 * @LastEditTime: 2020-02-22 17:03:59
 * @LastEditors: 尹伊
 * @Description: 单科详情-介绍模块
 * @FilePath: \hqjy-accounting-h5\src\page\singleSub\index.vue
 -->
<template>
  <div class="introduce">
    <div class="content1">
      <div class="title">{{infoData.name}}</div>
      <div class="money" v-if='!infoData.hasBoughtGoods'>
        <span class="discount">{{infoData.presentPrice | changeFormate}}</span>
        <del class="original"
          v-if='infoData.presentPrice !== infoData.originalPrice'>￥{{infoData.originalPrice | priceFormate}}</del>
      </div>
    </div>
    <div class="content2">
      <div class="line"></div>
      <div class="object">
        <span class="subtitle">课程</span>
        <!-- <span class="text">10章20节 | 共30个小时</span> -->
        <span class="text" v-if='infoData.courseCountInfo'>{{infoData.courseCountInfo}}</span>
        <span class="text">{{infoData.courseStudyInfo}}</span>
      </div>
      <div class="service">
        <span class="subtitle" v-if='infoData.goodsServiceList && infoData.goodsServiceList.length > 0'>服务</span>
        <span class="text" v-for='(item,index) in infoData.goodsServiceList' :key='index'>{{item.name}}</span>
      </div>
    </div>
    <div class="content3" v-for='(item,index) in detailData' :key='index'>
      <div class="conText" v-if='item.type === "text"'>{{item.content}}</div>
      <div class="conImg" v-if='item.type === "img"'>
        <img :src="item.content" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      infoData: {
        type: Object,
        default: {}
      },
      goodsId: {
        type: String,
        default: ''
      }
    },
    filters: {
      changeFormate(val) {
        if (val && val.toFixed(1) == 0) {
          return '免费'
        } else {
          return '¥ ' + val.toFixed(1)
        }
      },
      priceFormate(val) {
        return val.toFixed(1)
      }
    },
    // watch: {
    //   goodsId(newVal) {
    //     this.init(newVal)
    //   }
    // },
    data() {
      return {
        detailData: []
      }
    },
    created() {
      this.init(this.goodsId)
    },
    methods: {
      init(value) {
        let data = {
          goodsId: value
        }
        this.$api.getGoodsDetail(data).then(res => {
          if (res && res.code === 200) {
            this.detailData = res.data
          }
        })
      }
    },
  }
</script>
<style lang="less" scoped>
  .introduce {
    width: 100%;
    height: 100%;
    background-color: #fff;

    .content1 {
      box-sizing: border-box;
      padding: 30px 68px 0px 32px;

      .title {
        font-size: 38px;
        font-family: PingFang SC;
        font-weight: bold;
        line-height: 52px;
        color: #3A3C42;
      }

      .money {
        margin-top: 40px;

        .discount {
          margin-right: 30px;
          font-size: 48px;
          font-family: ource Han Sans CN;
          font-weight: 500;
          line-height: 24px;
          color: #F6612F;
        }

        .original {
          font-size: 30px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 24px;
          color: #6C7179;
        }
      }
    }

    .content2 {
      width: 100%;
      /* height: 171px; */
      box-sizing: border-box;
      padding: 30px 68px 25px 32px;
      font-size: 26px;
      color: #A3ABB8;

      .line {
        width: 100%;
        height: 2px;
        background: rgba(235, 237, 240, 1);
        opacity: 1;
      }

      .object {
        margin-top: 26px;
        margin-bottom: 19px;
      }

      .text {
        font-weight: 400;
        color: #6C7179;
      }

      .text:last-child::after {
        content: '';
      }

      .text::after {
        content: '|';
        height: 22px;
        width: 2px;
        padding: 0 10px 0 15px;
      }

      .subtitle {
        margin-right: 25px;
      }

      /* .service{
    } */
    }

    .content3 {
      width: 100%;
      margin-top: 10px;

      .conText {
        padding: 0px 68px 0px 32px;
      }

      .conImg {
        width: 100%;

        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
</style>