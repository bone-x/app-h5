<template>
  <div class="header-title">
    <img @click="goBackPage" src="@/assets/images/icon/topbar-btn-back-black@2x.png"/>{{titleVal}}
  </div>
</template>

<script>
export default {
  props: {
    titleVal: {
      type: String,
      default: "标题"
    }
  },
  methods: {
    goBackPage () {
      this.$router.go(-1)
    }
  }

}
</script>

<style lang="less" scoped>
.header-title {
  padding: 0 36px;
  width: 100%;
  height: 88px;
  text-align: center;
  line-height: 88px;
  font-size:36px;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(58,60,66,1);
  img {
    margin-top: 24px;
    width: 40px;
    height: 40px;
    float: left;
  }
}
</style>