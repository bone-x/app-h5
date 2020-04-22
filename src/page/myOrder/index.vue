<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: 杨兰
 * @Date: 2020-01-08 15:01:48
 * @LastEditors  : 杨兰
 * @LastEditTime : 2020-01-10 11:52:07
 -->
<template>
  <div class="myorder">
    <div class="nav-title">
      <span class="goback" @click="$router.back(-1)">返回</span>
      我的订单
    </div>
    <div class="tabs">
      <van-tabs v-model="active">
        <van-tab title="全部" name="a">
          <div class="order-detail">
            <div class="goods-detail">
              <div class="order-num">
                <p>订单号:123456789111</p>
                <span>等待支付</span>
              </div>
              <div class="describe">
                <div class="goods-pic">
                  <img src="~@/assets/images/subject/bg1.png" alt>
                </div>
                <p>课程名称课程名称，最多两行啦啦啦啦啦啦</p>
              </div>
              <div class="pirce">
                <div class="relay-pay">
                  实付:
                  <p>
                    <span>￥</span>198
                  </p>
                </div>
              </div>
            </div>
            <div class="count-down">
              <div class="time">
                <p>
                  <span>23:59</span>后订单将被取消
                </p>
              </div>
              <div class="btn">
                <button @click="show=true">取消订单</button>
                <button class="paid" @click="show=true">立即支付</button>
              </div>
            </div>
          </div>
          <div class="order-detail finish-order">
            <div class="goods-detail">
              <div class="order-num">
                <p>订单号:123456789111</p>
                <span>交易成功</span>
              </div>
              <div class="describe">
                <div class="goods-pic">
                  <img src="~@/assets/images/subject/bg1.png" alt>
                </div>
                <p>课程名称课程名称，最多两行啦啦啦啦啦啦</p>
              </div>
              <div class="pirce">
                <div class="relay-pay">
                  实付:
                  <p>
                    <span>￥</span>198
                  </p>
                </div>
              </div>
            </div>
            <div class="count-down">
              <div class="time">
                <p>有效期至 2020.10.12</p>
              </div>
              <div class="btn">
                <button class="to-learn">去学习</button>
              </div>
            </div>
          </div>
          <div class="order-detail del-order">
            <div class="goods-detail">
              <div class="order-num">
                <p>订单号:123456789111</p>
                <span>交易关闭</span>
              </div>
              <div class="describe">
                <div class="goods-pic">
                  <img src="~@/assets/images/subject/bg1.png" alt>
                </div>
                <p>课程名称课程名称，最多两行啦啦啦啦啦啦</p>
              </div>
              <div class="pirce">
                <div class="relay-pay">
                  实付:
                  <p>
                    <span>￥</span>198
                  </p>
                </div>
              </div>
            </div>
            <div class="count-down">
              <div class="btn">
                <button class="del-btn">删除订单</button>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab>
          <div slot="title" class="unpaid">
            <div>待支付</div>
            <span class="tag">1</span>
          </div>
          <div class="order-detail">
            <div class="goods-detail">
              <div class="order-num">
                <p>订单号:123456789111</p>
                <span>等待支付</span>
              </div>
              <div class="describe">
                <div class="goods-pic">
                  <img src="~@/assets/images/subject/bg1.png" alt>
                </div>
                <p>课程名称课程名称，最多两行啦啦啦啦啦啦</p>
              </div>
              <div class="pirce">
                <div class="relay-pay">
                  实付:
                  <p>
                    <span>￥</span>198
                  </p>
                </div>
              </div>
            </div>
            <div class="count-down">
              <div class="time">
                <p>
                  <span>23:59</span>后订单将被取消
                </p>
              </div>
              <div class="btn">
                <button>取消订单</button>
                <button class="paid">立即支付</button>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="交易完成" name="c">
          <div class="order-detail finish-order">
            <div class="goods-detail">
              <div class="order-num">
                <p>订单号:123456789111</p>
                <span>交易成功</span>
              </div>
              <div class="describe">
                <div class="goods-pic">
                  <img src="~@/assets/images/subject/bg1.png" alt>
                </div>
                <p>课程名称课程名称，最多两行啦啦啦啦啦啦</p>
              </div>
              <div class="pirce">
                <div class="relay-pay">
                  实付:
                  <p>
                    <span>￥</span>198
                  </p>
                </div>
              </div>
            </div>
            <div class="count-down">
              <div class="time">
                <p>有效期至 2020.10.12</p>
              </div>
              <div class="btn">
                <button class="to-learn">去学习</button>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="交易关闭" name="d">
          <div class="order-detail del-order">
            <div class="goods-detail">
              <div class="order-num">
                <p>订单号:123456789111</p>
                <span>交易关闭</span>
              </div>
              <div class="describe">
                <div class="goods-pic">
                  <img src="~@/assets/images/subject/bg1.png" alt>
                </div>
                <p>课程名称课程名称，最多两行啦啦啦啦啦啦</p>
              </div>
              <div class="pirce">
                <div class="relay-pay">
                  实付:
                  <p>
                    <span>￥</span>198
                  </p>
                </div>
              </div>
            </div>
            <div class="count-down">
              <div class="btn">
                <button class="del-btn">删除订单</button>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <div class="order-dialog">
          <p>是否确定删除订单记录</p>
          <!-- <p>是否确定取消订单</p> -->
          <div>
            <button>取消</button>
            <button>确定</button>
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
      active: 2,
      show: true
    };
  },
  methods: {
    onClickLeft() {
      Toast("返回");
    }
  }
};
</script>
<style lang="less" scoped>
.myorder {
  width: 100%;
  height: 100%;
  background: #fafafa;
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
    font-weight: 500;
    .goback {
      position: absolute;
      left: 32px;
    }
  }
  .tabs {
    .unpaid {
      position: relative;
      .tag {
        position: absolute;
        top: 10px;
        right: 10px;
        line-height: 100%;
        display: inline-block;
        width: 30px;
        height: 26px;
        background: linear-gradient(
          360deg,
          rgba(255, 64, 64, 1) 0%,
          rgba(255, 114, 91, 1) 100%
        );
        opacity: 1;
        border-radius: 13px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
      }
    }

    .order-detail {
      padding: 35px 32px 0px 27px;
      margin-bottom: 18px;
      background: #ffffff;
      .goods-detail {
        border-bottom: solid 1px #ededed;
        .order-num {
          margin-bottom: 25px;
          p {
            display: inline-block;
            font-size: 26px;
            font-family: SourceHanSansCN-Regular;
            color: rgba(108, 113, 121, 1);
            opacity: 1;
          }
          span {
            font-size: 26px;
            font-family: SourceHanSansCN-Regular;
            line-height: 31px;
            color: rgba(252, 63, 76, 1);
            opacity: 1;
            float: right;
          }
        }
        .describe {
          overflow: hidden;
          margin-bottom: 18px;
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
          }
        }
        .pirce {
          overflow: hidden;
          margin-bottom: 30px;
          .relay-pay {
            float: right;
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(108, 113, 121, 1);
            opacity: 1;
            p {
              display: inline-block;
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
        }
      }
      .count-down {
        overflow: hidden;
        height: 114px;
        line-height: 114px;
        .time {
          float: left;
          p {
            font-size: 26px;
            font-family: SourceHanSansCN-Regular;
            color: rgba(108, 113, 121, 1);
            opacity: 1;
            span {
              color: #fc3f4c;
              margin-right: 16px;
            }
          }
        }
        .btn {
          float: right;
          button {
            width: 150px;
            height: 60px;
            border: 1px solid #a3abb8;
            border-radius: 30px;
            font-size: 26px;
            font-family: SourceHanSansCN-Regular;
            line-height: 60px;
            color: rgba(108, 113, 121, 1);
            background: #ffffff;
          }
          button:nth-of-type(1) {
            margin-right: 18px;
          }
          .paid {
            background: #f6612f;
            border: 1px solid #f6612f;
            color: #ffffff;
          }
        }
      }
    }
    .finish-order {
      .order-num {
        span {
          color: #6c7179 !important;
        }
      }
      .btn {
        .to-learn {
          background: #ffffff !important;
          border: 1px solid #00ab84 !important;
          color: #00ab84 !important;
        }
      }
    }
    .del-order {
      .order-num {
        span {
          color: #6c7179 !important;
        }
      }
      .btn {
        .del-btn {
          background: #ffffff !important;
          border: 1px solid #a3abb8 !important;
          color: #6c7179 !important;
        }
      }
    }
    /deep/ .van-tabs__wrap {
      width: 100%;
      height: 96px;
      box-shadow: 0px 10px 30px rgba(58, 60, 66, 0.03);
      .van-tabs__nav--line {
        padding: 0;
      }
      .van-tab {
        line-height: 96px;
        font-size: 30px;
        color: #6c7179;
      }
      .van-tab--active {
        font-size: 34px;
        color: #2e3033;
      }
      .van-tabs__line {
        width: 36px !important;
        height: 6px;
        background: rgba(0, 171, 132, 1);
        opacity: 1;
        border-radius: 3px;
      }
    }
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .order-dialog {
      width: 600px;
      height: 250px;
      background: #ffffff;
      opacity: 1;
      border-radius: 12px;
      padding-top: 44px;
      text-align: center;
      position: relative;
      p {
        font-size: 32px;
        font-family: SourceHanSansCN-Regular;
        color: #2e3033;
        opacity: 1;
        padding: 0 63px 0 79px;
        // border-bottom: solid 1px #ededed;
        padding-bottom: 50px;
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
          color: #00ab84;
        }
        button:nth-of-type(1) {
          border-right: solid 1px #ededed;
          border-bottom-left-radius: 12px;
          color: #6c7179;
        }
        button:nth-of-type(2) {
          border-bottom-right-radius: 12px;
        }
      }
    }
  }
}
</style>
