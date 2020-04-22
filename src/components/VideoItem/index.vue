<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: 尹伊
 * @Date: 2020-01-08 14:20:17
 * @LastEditors  : 尹伊
 * @LastEditTime : 2020-01-08 17:37:53
 -->
<template>
  <div class="videoItem">
    <video class="video"  poster="@/assets/images/subject/bg1.png"  src="https://vdept.bdstatic.com/5a4a4a72444549427273557858433844/564570535a74394a/25c56eda14cb8ff44904f0f1dc1942782f64998212a355df3284ca304a61b585fc6ef774580f82cb2d6690312d91d65d.mp4?auth_key=1578540932-0-0-22ce5886263b1e4f5730ea51bb5f7d27" controls="controls"></video>
  </div>
</template>
<script>
export default{
    props: {
      advert: {
        type: Object,
        default: {}
      }
    },
  data () {
    return {}
  }
}
</script>
<style lang='less' scoped>
  .videoItem{
    width: 100%;
    /* height: 100%; */
    .video{
      width: 100%;
      height: 100%;
    }
  }
</style>
