<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: 杨兰
 * @Date: 2020-01-08 15:01:48
 * @LastEditors  : 杨兰
 * @LastEditTime : 2020-01-10 11:02:08
 -->
<template>
  <div class="confirm-order">
    <div class="nav-title">
      <span class="goback" @click="$router.back(-1)">返回</span>
      确认订单
    </div>
    <div class="order-content">
      <div class="course-information">
        <p class="title">课程信息</p>
        <div class="describe">
          <div class="order-pic">
            <img src="~@/assets/images/subject/bg1.png" alt>
          </div>
          <div class="describe-right">
            <p>课程名称课程名称，最多两行啦啦啦啦</p>
            <span>有效期至 2020.10.12</span>
          </div>
        </div>
      </div>
      <div class="price">
        <p>价格</p>
        <p>
          <span>￥</span>168
        </p>
      </div>
      <div class="pay-mode">
        <div class="title">
          <span>支付方式</span>
        </div>
        <div class="change-pay">
          <van-radio-group v-model="radio" >
            <van-radio name="1" icon-size="18px" checked-color="#00AB84">
              <div slot="default">
                <span>图片</span>
                <span class="pay-name">支付宝</span>
              </div>
            </van-radio>
            <van-radio name="2" icon-size="18px" checked-color="#00AB84">
              <div slot="default">
                <span>图片</span>
                <span class="pay-name">微信支付</span>
              </div>
            </van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="treaty">
        <van-radio-group v-model="radio2">
          <van-radio name="1" icon-size="18px" checked-color="#00AB84">
            <div slot="default">
              <p>
                提交订单表示您同意
                <span>《恒企会计报班协议》</span>
              </p>
            </div>
          </van-radio>
        </van-radio-group>
      </div>
      <div class="pay-bottom">
        <div class="payment">
          应付:
          <p>
            <span>￥</span>198
          </p>
        </div>
        <div class="btn">
          <button @click="show = true">立即支付</button>
        </div>
      </div>
    </div>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <div class="pay-dialog">
          <h3>您的支付未完成</h3>
          <p>
            您的订单在
            <span>23 小时 59 分</span>未支付将被取消,请尽快完成支付
          </p>
          <div>
            <button>确定离开</button>
            <button>继续支付</button>
          </div>
        </div>
      </div>
    </van-overlay>
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
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .pay-dialog {
    width: 600px;
    height: 300px;
    background: #ffffff;
    opacity: 1;
    border-radius: 12px;
    padding-top: 44px;
    text-align: center;
    position: relative;
    h3 {
      font-size: 32px;
      font-family: SourceHanSansCN-Regular;
      line-height: 38px;
      color: #2e3033;
      opacity: 1;
      margin-bottom: 9px;
    }
    p {
      font-size: 24px;
      font-family: SourceHanSansCN-Regular;
      line-height: 36px;
      color: #2e3033;
      opacity: 1;
      margin-bottom: 30px;
      padding: 0 63px 0 79px;
      span {
        color: #fc3f4c;
      }
    }
    div {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border-top: solid 1px #ededed;
      button {
        width: 50%;
        height: 96px;
        line-height: 96px;
        background: #ffffff;
        font-size: 32px;
        font-family: SourceHanSansCN-Regular;
        color: #6c7179;
      }
      button:nth-of-type(1) {
        border-right: solid 1px #ededed;
        border-bottom-left-radius: 12px;
      }
      button:nth-of-type(2) {
        color: #00ab84;
        border-bottom-right-radius: 12px;
      }
    }
  }
}
.confirm-order {
  width: 100%;
  height: 100%;
  background: #fafafa;
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
  .order-content {
    .course-information {
      padding: 33px 47px 53px 27px;
      background: #ffffff;
      margin-bottom: 18px;
      .title {
        font-size: 28px;
        font-family: SourceHanSansCN-Regular;
        line-height: 34px;
        color: rgba(58, 60, 66, 1);
        opacity: 1;
        display: block;
        margin-bottom: 26px;
      }
      .describe {
        overflow: hidden;
        .order-pic {
          float: left;
          width: 258px;
          height: 144px;
          margin-right: 16px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 4px;
          }
        }
        .describe-right {
          p {
            font-size: 30px;
            font-family: SourceHanSansCN-Regular;
            line-height: 42px;
            color: rgba(58, 60, 66, 1);
            opacity: 1;
            margin-bottom: 17px;
          }
          span {
            font-size: 24px;
            font-family: SourceHanSansCN-Regular;
            line-height: 29px;
            color: rgba(108, 113, 121, 1);
            opacity: 1;
          }
        }
      }
    }
    .price {
      height: 120px;
      background: #ffffff;
      line-height: 120px;
      padding: 0px 31px;
      margin-bottom: 18px;
      overflow: hidden;
      p {
        display: inline-block;
        float: left;
        font-size: 28px;
        font-family: SourceHanSansCN-Regular;
        color: rgba(58, 60, 66, 1);
        opacity: 1;
      }
      p:nth-of-type(2) {
        float: right;
        font-size: 32px;
        color: rgba(246, 97, 47, 1);
        span {
          font-size: 24px;
        }
      }
    }
    .pay-mode {
      background: #ffffff;
      padding: 0px 31px;
      .title {
        width: 720px;
        height: 96px;
        line-height: 96px;
        border-bottom: solid 1px #ededed;
        span {
          font-size: 28px;
          font-family: SourceHanSansCN-Regular;
          color: #3a3c42;
          opacity: 1;
        }
      }
      .change-pay {
        padding: 18px 0;
        /deep/ .van-radio {
          position: relative;
          height: 96px;
          .van-radio__icon {
            position: absolute;
            right: 0;
          }
          .van-radio__label {
            .pay-name {
              font-size: 28px;
              font-family: SourceHanSansCN-Normal;
              line-height: 52px;
              color: rgba(51, 51, 51, 1);
              opacity: 1;
            }
          }
        }
      }
    }
    .treaty {
      padding: 36px 0 0 36px;
      /deep/ .van-radio__label {
        p {
          font-size: 24px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 29px;
          color: #6c7179;
          opacity: 1;
          span {
            color: #00ab84;
          }
        }
      }
    }
    .pay-bottom {
      height: 98px;
      background: #ffffff;
      box-shadow: 0px -10px 20px rgba(58, 60, 66, 0.05);
      opacity: 1;
      line-height: 98px;
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0px 34px;
      overflow: hidden;
      div {
        display: inline-block;
        p {
          display: inline-block;
        }
      }
      .payment {
        font-size: 24px;
        font-family: SourceHanSansCN-Regular;
        line-height: 29px;
        color: rgba(108, 113, 121, 1);
        opacity: 1;
        p {
          font-size: 36px;
          font-family: SourceHanSansCN-Medium;
          line-height: 43px;
          color: rgba(246, 97, 47, 1);
          opacity: 1;
          span {
            font-size: 24px;
          }
        }
      }
      .btn {
        float: right;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 100%;
        button {
          width: 402px;
          height: 80px;
          opacity: 1;
          border-radius: 6px;
          font-size: 34px;
          font-family: SourceHanSansCN-Medium;
          line-height: 80px;
          color: rgba(255, 255, 255, 1);
          background: #a3abb8;
          background: #f6612f;
        }
      }
    }
  }
}
</style>
