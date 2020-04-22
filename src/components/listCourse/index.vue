/*
* @Author: mikey.lujunan
* @Date: 2020-02-09 15:48:06
* @Last Modified by: mikey.lujunan
* @Last Modified time: 2020-02-09 17:17:04
*/

<template>
  <div class="goodItem">
    <div class="goodBox">
      <div class="goodImg">
        <img :src="list.thumbPath" alt="">
      </div>

      <div class="text">
        <p class="title">{{list.name}}</p>
        <p class="content">{{list.courseTarget}}</p>
      </div>
    </div>
    <p class="footer">
      <span class="video">{{list.pattern}} <i v-if='list.courseCount' class='numClass'><span
            class='circle'></span>{{list.courseCount}}门课程</i></span>
      <span class="price">
        <span v-if='clientType == "ios"'>{{list.presentPrice | changeFormate}}<span class="xuebi"
            v-if='list.presentPrice != 0'>学币</span></span>
        <span v-else><span v-if='list.presentPrice != 0'>¥</span>{{list.presentPrice | changeFormate}}</span>
        <!-- v-html='changeFormate(list.originalPrice)' -->
        <i v-if='list.presentPrice !== list.originalPrice'>
          <span v-if='clientType == "ios"'>{{list.originalPrice | changeFormate}}<span
              v-if='list.originalPrice != 0'>学币</span></span>
          <span v-else><span v-if='list.originalPrice != 0'>¥</span>{{list.originalPrice | changeFormate}}</span>
        </i>
      </span>
    </p>
  </div>
</template>
<script>
  export default {
    props: ['list'],
    data() {
      return {
        clientType: '',
        goodImg: require('@/assets/images/home/商品1.png'),
      }
    },
    created() {
      this.clientType = this.$type
    },
    filters: {
      changeFormate(val) {
        if (!val || val.toFixed(1) == 0.0) {
          return '免费'
        } else {
          return val.toFixed(1)
        }
      }
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
  .goodItem {

    .numClass {
      position: relative;
      padding-left: 18px;

      .circle {
        position: absolute;
        left: 0;
        top: 14px;
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 100%;
        background: rgba(224, 224, 224, 1);
      }
    }

    padding:24px 32px 0 24px;
    width: 678px;
    height: 262px;
    background:rgba(250, 250, 250, 1);
    border:1px solid rgba(237, 237, 237, 1);
    border-radius:6px;
    margin: auto;
    margin-bottom: 30px;

    // padding: 24px;
    .goodBox {
      display: flex;
      flex-direction: row;
      // width: 630px;
      height: 169px;
      border-bottom: 1px solid rgba(237, 237, 237, 1);

      .goodImg {
        width: 246px;
        height: 138px;
        overflow: hideen;

        img {
          width: 100%;
          height: 100%;
          border-radius: 6px;
        }
      }

      .text {
        margin-left: 24px;
        font-family: Microsoft YaHei;
        flex: 1;
        font-weight: 400;

        .title {
          // height: 58px;
          // font-size:30px;
          // line-height:58px;
          // color:rgba(58,60,66,1);
          // overflow:hidden;
          // text-overflow:ellipsis;
          // white-space:nowrap;

          font-size: 30px;
          font-weight: 400;
          height: 72px;
          line-height: 40px;
          color: #3A3C42;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          font-family: Microsoft YaHei;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;


        }

        .content {
          margin-top: 6px;
          font-size: 22px;
          line-height: 32px;
          color: rgba(163, 171, 184, 1);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }

    .footer {
      display: flex;
      justify-content: space-between;
      //   padding:30px 0 21px 0;
      padding-top: 20px;
      //   line-height:60px;
      font-family: Microsoft YaHei;
      font-weight: 400;

      .video {
        color: rgba(0, 171, 132, 1);

        i {
          display: inline-block;
          margin-left: 15px;
          font-size: 22px;
          ;
          color: rgba(108, 113, 121, 1);
        }
      }

      .price {
        font-size: 32px;
        color: rgba(246, 97, 47, 1);

        .xuebi {
          font-size: 24px;
          font-weight: 400;
          margin-left: 6px;
        }

        i {
          display: inline-block;
          margin-left: 14px;
          text-decoration: line-through;
          font-size: 24px;
          color: rgba(163, 171, 184, 1);
        }
      }
    }
  }
</style>