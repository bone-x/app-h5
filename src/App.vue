<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: 杨兰
 * @Date: 2020-01-06 14:20:19
 * @LastEditors  : 杨兰
 * @LastEditTime : 2020-01-10 09:47:19
 -->
<template>
  <div id="app">
    <EmptyData />
    <router-view/>
  </div>
</template>

<script>
import EmptyData from './page/emptyData'
export default {
  name: 'App',
  components: {
    EmptyData
  },
  mounted () {
    this.$hqTool.isEmptyData({
      that: this,
      text: '',
      status: false
    })
  },
  created () {
  }
}
</script>
<style>
html,body,#app {
  height: 100%;
}
</style>
