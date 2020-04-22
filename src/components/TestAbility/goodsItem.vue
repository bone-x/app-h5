/*
 * @Author: mikey.lujunan 
 * @Date: 2020-03-27 16:24:39 
 * @Last Modified by: mikey.lujunan
 * @Last Modified time: 2020-03-27 16:55:31
 */

<template>
  <div class="item" @click='handleClickGood(ItemDetail)'>
    <div class="goodsImg">
      <img v-if='ItemDetail.thumbPath' :src="ItemDetail.thumbPath" alt="商品图片">
      <img v-else src="@/assets/images/base_loading_pic.png" alt="">
    </div>
    <div class="itemCon">
      <div class="tt">{{ItemDetail.name}}</div>
      <div class="labelList">
        <span v-if='ItemDetail.label'>{{ItemDetail.label}}</span>
        <span v-if='ItemDetail.pattern'>{{ItemDetail.pattern}}</span>
      </div>
      <div class="money">
        <!-- 免费 -->
        <span class="free">
          <span v-if='clientType == "ios"'>{{ItemDetail.presentPrice | changeFormate}}<span class="xuebi"
              v-if='ItemDetail.presentPrice != 0'>学币</span></span>
          <span v-else><span
              v-if='ItemDetail.presentPrice != 0'>¥</span>{{ItemDetail.presentPrice | changeFormate}}</span>
        </span>
        <del class="discount" v-if='ItemDetail.presentPrice !== ItemDetail.originalPrice'>
          <span v-if='clientType == "ios"'>{{ItemDetail.originalPrice | changeFormate}}<span
              v-if='ItemDetail.originalPrice != 0'>学币</span></span>
          <span v-else> <span
              v-if='ItemDetail.originalPrice != 0'>¥</span>{{ItemDetail.originalPrice | changeFormate}}</span>
        </del>
      </div>
    </div>
  </div>
</template>
<script>
  import { JsBridge } from '@/utils/bridge.js'
  export default {
    props: {
      ItemDetail: {
        type: Object,
        default: {}
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
      handleClickGood(data) {
        JsBridge(null, {
          path: "home/jump/courseInfo",
          data: {
            id: data.goodsId
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .item {
    margin-bottom: 20px;
    box-sizing: border-box;
    width: 330px;
    height: 390px;
    display: inline-block;
    border: 2px solid #EDEDED;
    overflow: hidden;
    border-radius: 6px;
    .goodsImg {
      width: 100%;
      height: 172px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .itemCon {
      padding: 18px 25px 0 18px;
      /* padding: 22px 15px 25px 28px; */

      .tt {
        font-size: 28px;
        font-weight: bold;
        height: 72px;
        line-height: 36px;
        font-family: Microsoft YaHei;
        color: #3A3C42;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        white-space: normal;
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
          font-weight: 400;
        }
      }
    }
  }
</style>