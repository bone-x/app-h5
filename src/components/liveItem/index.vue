<template>
  <div class="liveItem">
    <div class="videoIcon">
      <i class="iconfont iconpingce-1 tColor" v-if="playingLive === liveItemDetail.classplanLiveId"></i>
      <i class="iconfont iconzhibo" v-else></i>
    </div>
    <div class="item" @click='handleplay(liveItemDetail.classplanLiveId)'>
      <div :class="playingLive == liveItemDetail.classplanLiveId ? 'liveTitle tColor' : 'liveTitle'">{{liveItemDetail.liveName}}</div>
      <div :class="playingLive == liveItemDetail.classplanLiveId ? 'livetype tColor' : 'livetype'">
        <div v-if='liveItemDetail.isValidLive'>
          <span>{{liveItemDetail.liveTimeRange}}</span>
          <span>{{liveItemDetail.liveStatus | setVideoType}}</span>
        </div>
        <div v-else>
          <span>排课中，未开始</span>
        </div>
      </div>
    </div>
    <div class="folderIcon">
      <!-- <i class="iconfont iconbiji edit"></i> -->
      <i class="iconfont iconwenjian"></i>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  props:{
    liveItemDetail: Object,
    currentShow: Boolean
  },
  computed: {
    ...mapGetters(['playingLive'])
  },
  filters: {
    setVideoType(val) {
      switch(val) {
        case 1:
          return '直播中'
        case 2:
          return '未直播'
        case 3:
          return '有回放'
        case 4:
          return '无回放'
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    // 这一块可以用状态管理来实现
    handleplay(id){
      this.$store.commit('setPlayingLive', id)
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
    .iconfont{
      font-size: 38px;
    }
    .videoIcon{
      flex: 1;
      margin-top: 10px;
      color: #3A3C42;
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
    .tColor{
      color: #00AB84 !important;
    }
    .folderIcon{
      flex: 2;
      margin-top: 10px;
      text-align: right;
      color: #3A3C42;
      .edit{
        margin-right: 36px;
      }
    }
  }
</style>
