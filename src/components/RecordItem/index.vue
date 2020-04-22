<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: 尹伊
 * @Date: 2020-01-07 15:06:18
 * @LastEditors  : 尹伊
 * @LastEditTime : 2020-01-10 16:36:30
 -->
<template>
  <div class="liveItem">
    <div class="videoIcon" @click='handlePlayingRecord(recordItem.recordId)'>
      <i class="iconfont iconpingce-1 tColor" v-if="playingRecord === recordItem.recordId"></i>
      <i class="iconfont iconlubo" v-else></i>
    </div>
    <div class="item" @click='handlePlayingRecord(recordItem)'>
      <div :class="playingRecord === recordItem.recordId ? 'liveTitle tColor' : 'liveTitle'">{{recordItem.recordName}}</div>
      <!-- <div class="livetype">
        <div v-if='false'>
          <span>11-18（17:00 - 19:00）</span>
          <span>观看回放</span>
        </div>
        <div else>
          <span>排课中，未开始</span>
        </div>
      </div> -->
    </div>
    <div class="folderIcon">
      <div v-if='playingRecord === recordItem.recordId'>
        <i class="iconfont iconbiji edit"></i>
        <i class="iconfont iconwenjian"></i>
      </div>
      <div v-else>
        <div  class="Audition" v-if='recordItem.sectionIsListen'>试听</div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  props: {
    recordItem: Object
  },
  computed: {
    ...mapGetters(['playingRecord'])
  },
  data () {
    return {}
  },
  methods: {
    handlePlayingRecord(val) {
      if (val.sectionIsListen){
        let obj = {
          vid:val.vid,
          playsafe: '80ec31e28000016f8d8f350681000001',
          recordId: val.vid
        }
        this.$store.commit('setPlayingRecord', val.recordId)
        this.$store.commit('setCourseType', val.courseType)
        this.$store.commit('setConfigBl', obj)
      }     
    }
  }
}
</script>
<style lang="less" scoped>
  .liveItem{
    width: 100%;
    background-color: #FAFAFA;
    padding: 22px 33px 22px 35px;
    display: flex;
    /* align-items: center; */
    .iconfont{
      font-size: 38px;
    }
    .videoIcon{
      flex: 1;
      /* margin-top: 10px; */
      color: #3A3C42;
    }
    .tColor{
      color: #00AB84 !important;
    }
    .item{
      flex: 6;
      box-sizing: border-box;
      font-weight: 400;
      .liveTitle{
        font-size: 28px;
        color: #3A3C42;
        overflow: hidden;
        line-height: 42px;
        margin-bottom: 12px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .livetype{
        color: #A3ABB8;
        font-size: 22px;
        line-height: 26px;
      }
    }
    .folderIcon{
      flex: 2;
      margin-top: 10px;
      text-align: right;
      color: #3A3C42;
      display: flex;
      justify-content: flex-end;
      .edit{
        margin-right: 36px;
      }
      .Audition{
        width: 76px;
        height: 56px;
        font-size: 24px;
        color: #FF9D12;
        font-weight: 400;
      }
    }
  }
</style>
