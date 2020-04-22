/*
 * @Author: mikey.lujunan 
 * @Date: 2020-02-11 17:10:56 
 * @Last Modified by: mikey.lujunan
 * @Last Modified time: 2020-02-12 18:06:51
 */

<template>
  <div class="item" @click="goodsImg">
    <img :src="goodsData.image" alt="商品图片"/>
    <div class="itemCon">
      <div class="tt">{{goodsData.name}}</div>
      <div class="labelList">
        <span>{{goodsData.pattern}}</span>
      </div>
      <div class="money">
        <span class="free">{{changeFormate(goodsData.presentPrice)}}<i v-show="goodsData.courseCount>1">起</i></span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      goodsData: {
        type: Object,
        default: () => []
      }
    },
    data() {
      return {

      }
    },
    methods: {
      goodsImg() {
        this.$emit('googsDetail');
      },
      changeFormate(val) {
        if (!val) {
          return '免费'
        } else {
          if (this.$type == 'ios') {
            return val.toFixed(1) + ' 学币'
          } else {
            return '¥ ' + val.toFixed(1)
          }
        }
      },
    }


  }
</script>
<style lang="less" scoped>
  .item {
    box-sizing: border-box;
    width: 306px;
    height: 396px;
    display: inline-block;
    border: 2px solid #EDEDED;
    overflow: hidden;
    border-radius: 6px;

    img {
      width: 100%;
      height: 172px;
    }

    .itemCon {
      padding: 18px 25px 0 18px;
      /* padding: 22px 15px 25px 28px; */

      .tt {
        font-size: 26px;
        font-weight: 400;
        height: 72px;
        line-height: 36px;
        color: rgba(58, 60, 66, 1);
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
        }
      }

      .money {
        margin-top: 20px;

        .free {
          font-size: 32px;
          font-weight: 400;
          line-height: 28px;
          color: #F6612F;
          i {
            display: inline-block;
            margin-left: 8px;
            font-size:23px;
            font-family:Microsoft YaHei;
            font-weight:400;
            line-height:20px;
            color:rgba(163,171,184,1);
          }
        }

      }
    }
  }
</style>