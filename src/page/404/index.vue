<template>
  <div class="my-404">
    <div class="my-404-content">
      <img src="../../assets/images/nofound.png" alt="">
      <p class="fs26px color-666">哎呀,你要找的页面不见了</p>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
.my-404{
  text-align: center;
  width: 100%;
  height: 100vh;
  display: table;
  .my-404-content{
    display: table-cell;
    vertical-align: middle;
    img{
      width: 400px;
    }
  }
}
</style>
