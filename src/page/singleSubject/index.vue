<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: 尹伊
 * @Date: 2020-01-13 10:42:23
 * @LastEditors  : 尹伊
 * @LastEditTime : 2020-01-16 11:14:27
 -->
<template>
  <div>
    <!-- 直播 -->
    <LiveBroadcast v-if='infoData.pattern === "直播"' :infoData='infoData'></LiveBroadcast>
    <!-- 录播 -->
    <RecordBroadcast v-if='infoData.pattern === "录播"' :infoData='infoData'></RecordBroadcast>
    <!-- 面授 -->
    <ChapterFaceList v-if='infoData.pattern === "面授" || infoData.pattern === "双师"' :infoData='infoData'></ChapterFaceList>
  </div>
</template>
<script>
import LiveBroadcast from './liveBroadcast'
import RecordBroadcast from './recordBroadcast'
import ChapterFaceList from './ChapterFaceList';
import { getUrlPara } from '@/utils/factory.js'
export default {
  components: {
    LiveBroadcast,
    RecordBroadcast,
    ChapterFaceList
  },
  data () {
    return {
      infoData: {},
      goodsId: '',
      token: ''
    }
  },
  created () {
    this.goodsId = getUrlPara('goodsId')
    this.token = getUrlPara('token')
    this.$store.commit('setToken', this.token)
    this.init()
  },
  methods: {
    init () {
      let data = {
        goodsId: this.goodsId,
        token: this.token
      }
      this.$api.getGoodsInfo(data).then(res => {
        if (res && res.code === 200) {
          this.infoData = res.data
        }
      })
    }
  }
}
</script>
<style lang='less'>
</style>
