<!--
 * @Descripttion: 横向商品
 * @version: 
 * @Author: 尹伊
 * @Date: 2020-02-05 17:21:09
 * @LastEditors: 尹伊
 * @LastEditTime: 2020-02-22 15:49:05
 -->
<template>
  <div class="goodItem" @click="goodsDetail(goodItemDetail)">
    <div class="goodImg">
      <img v-if='goodItemDetail.thumbPath' :src="goodItemDetail.thumbPath" alt>
      <img v-else src="@/assets/images/base_loading_pic.png" alt="">
    </div>
    <div class="goodName">
      <div class="tt">{{goodItemDetail.name}}</div>
      <div class="labelList">
        <div v-if='practice'>
          <span v-if='goodItemDetail.label&&show'>{{goodItemDetail.label}}</span>
          <span v-if='goodItemDetail.pattern'>{{goodItemDetail.pattern}}</span>
        </div>
      </div>
      <div class="money">
        <span class="free">
          <span v-if='clientType == "ios"'>{{goodItemDetail.presentPrice | changeFormate}}<span class="xuebi"
              v-if='goodItemDetail.presentPrice != 0'>学币</span></span>
          <span v-else><span v-if='goodItemDetail.presentPrice != 0'>¥</span>{{goodItemDetail.presentPrice | changeFormate}}</span>
        </span>
        <del class="discount" v-if=' goodItemDetail.presentPrice !==goodItemDetail.originalPrice'>
              <span v-if='clientType == "ios"'>{{goodItemDetail.originalPrice | changeFormate}}<span class="xuebi"
                  v-if='goodItemDetail.originalPrice != 0'>学币</span></span>
              <span v-else><span
                  v-if='goodItemDetail.originalPrice != 0'>¥</span>{{goodItemDetail.originalPrice | changeFormate}}</span>
              </del>
      </div>
    </div>
  </div>
</template>
<script>
  import { JsBridge } from '@/utils/bridge.js'
  // var clientType = this.$type
  export default {
    props: {
      show: {
        type: Boolean,
        default: true
      },
      goodItemDetail: {
        type: Object,
        default: () => { }
      },
      practice: {
        type: Boolean,
        default: true
      }
    },
    filters: {
      changeFormate(val) {
        if (!val) {
          return '免费'
        } else {
          return val.toFixed(1)
          // if (this.$type == 'ios') {
          //   return val.toFixed(1) + ' 学币'
          // } else {
          //   return '¥ ' + val.toFixed(1)
          // }
        }
      }
    },
    data() {
      return {
        clientType: ''
      }
    },
    created() {
      this.clientType = this.$type
    },
    methods: {

      goodsDetail() {
        this.$emit("goodsDetail")
      },
      // changeFormate(val) {
      //   if (!val) {
      //     return '免费'
      //   } else {
      //     if (this.$type == 'ios') {
      //       return val.toFixed(1) + ' 学币'
      //     } else {
      //       return '¥ ' + val.toFixed(1)
      //     }
      //   }
      // }
    }
  }
</script>
<style lang="less" scoped>
  .goodItem {
    box-sizing: border-box;
    display: flex;
    /* padding: 36px 44px 44px 36px; */
    padding: 36px 0 44px 0;
    margin-left: 36px;
    margin-right: 44px;
    box-sizing: border-box;
    border-bottom: 1px solid #EDEDED;


    .goodImg {
      width: 306px;
      height: 172px;
      margin-right: 24px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 6px;
      }
    }

    .goodName {

      flex: 1;
      width: 100%;
      position: relative;

      .tt {
        font-size: 30px;
        font-weight: 400;
        /* height: 72px; */
        line-height: 40px;
        color: #3A3C42;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
      }

      .labelList {
        margin-top: 18px;

        span {
          padding: 3px 10px;
          background-color: #F0FAF8;
          color: #00AB84;
          font-size: 22px;
          font-weight: 400;
          line-height: 36px;
          border-radius: 3px;
        }
      }

      .money {
        margin-top: 20px;
        position: absolute;
        bottom: 0;

        .free {
          font-size: 32px;
          font-weight: bold;
          line-height: 28px;
          color: #F6612F;
          margin-right: 12px;
          font-family: San Francisco;

          .xuebi {
            font-size: 24px;
            font-weight: 400;
            margin-left: 6px;
          }
        }

        .discount {
          font-size: 24px;
          color: #A3ABB8;
          font-family: San Francisco;
        }
      }
    }
  }

 .goodItem:nth-last-child(1) {
    border-bottom: none;
  }
</style>