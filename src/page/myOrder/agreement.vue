<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: 杨兰
 * @Date: 2020-01-08 15:01:48
 * @LastEditors  : 杨兰
 * @LastEditTime : 2020-01-10 14:56:52
 -->
<template>
  <div class="agreement">
    <div class="nav-title">
      <span class="goback" @click="$router.back(-1)">返回</span>
      恒企会计服务协议
    </div>
    <div class="agreement-content">
        服务协议内容
    </div>
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
.agreement {
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
  .agreement-content {
      padding: 38px 30px 0px 30px;
  }
}
</style>
