<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: 杨兰
 * @Date: 2020-01-08 15:01:48
 * @LastEditors  : 杨兰
 * @LastEditTime : 2020-01-10 14:46:13
 -->
<template>
  <div class="finish-pay">
    <div class="nav-title">
      <span class="goback" @click="$router.back(-1)">返回</span>
      支付完成
    </div>
    <div class="imageWrap">
      <div class="finish-pic">
        <img src="~@/assets/images/nofound.png" alt>
      </div>
      <h3>支付成功</h3>
      <p>
        <span>5</span>秒后自动跳转到课程详情
      </p>
    </div>
    <div class="subject-detail">
      <div class="goods-pic">
        <img src="~@/assets/images/subject/bg1.png" alt>
      </div>
      <p>课程名称课程名称，最多两行啦啦啦啦啦啦</p>
      <span>有效期至 2020.10.12</span>
    </div>
    <div class="finish-btn">
      <div class="consult">
        <p>
          您的课程已进入人工排单,24小时后可在
          <span>"我的课程"</span>查询,如有疑问请在线咨询
        </p>
      </div>
      <button>查看订单</button>
      <button>马上学习</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: "1",
      radio2: "1",
      show: true
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.finish-pay {
  width: 100%;
  height: 100%;
  background: #ffffff;
  position: relative;
  .nav-title {
    height: 96px;
    text-align: center;
    line-height: 96px;
    position: relative;
    font-size: 36px;
    font-family: SourceHanSansCN-Medium;
    color: #3a3c42;
    background: #ffffff;
    opacity: 1;
    border-bottom: solid 1px #ededed;
    .goback {
      position: absolute;
      left: 32px;
    }
  }
  .imageWrap {
    text-align: center;
    margin-top: 56px;
    border-bottom: solid 1px #ededed;
    .finish-pic {
      width: 250px;
      height: 250px;
      display: inline-block;
      img {
        width: 100%;
        height: 100%;
      }
    }
    h3 {
      font-size: 42px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #3a3c42;
      opacity: 1;
      margin-bottom: 7px;
    }
    p {
      font-size: 26px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 30px;
      color: #6c7179;
      opacity: 1;
      margin-bottom: 60px;
      span {
        color: #fc3f4c;
        margin-right: 11px;
      }
    }
  }
  .subject-detail {
    overflow: hidden;
    margin-bottom: 48px;
    padding: 32px 47px 36px 32px;
    border-bottom: solid 1px #ededed;

    .goods-pic {
      width: 258px;
      height: 144px;
      border-radius: 4px;
      float: left;
      margin-right: 16px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      font-size: 30px;
      font-family: SourceHanSansCN-Regular;
      color: rgba(58, 60, 66, 1);
      opacity: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 32px;
    }
    span {
      font-size: 24px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 29px;
      color: #a3abb8;
      opacity: 1;
    }
  }
  .finish-btn {
    margin: 60px 32px 0px 32px;
    .consult {
      padding: 0px 96px 60px 96px;
      p {
        font-size: 26px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 40px;
        color: #6C7179;
        opacity: 1;
        span {
          color: #00AB84;
        }
      }
    }
    button {
      width: 312px;
      height: 96px;
      border: 1px solid #00ab84;
      opacity: 1;
      border-radius: 6px;
      font-size: 34px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      line-height: 41px;
      color: rgba(0, 171, 132, 1);
      opacity: 1;
      background: #ffffff;
    }
    button:nth-of-type(2) {
      background: #00ab84;
      color: #ffffff;
      margin-left: 34px;
    }
  }
}
</style>
