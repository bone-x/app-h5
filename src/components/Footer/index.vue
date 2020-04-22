<!--
 * @Description: 底部栏
 * @Version: 1.0
 * @Autor: 尹伊
 * @Date: 2020-01-06 15:36:32
 * @LastEditors  : 尹伊
 * @LastEditTime : 2020-01-16 11:35:19
 -->
<template>
  <div class="footer">
    <div class="consultation" @click='handleConsult'>
      <!-- <i class="iconfont iconzixun-"></i> -->
      <img src="@/assets/images/icon/zx.png" alt="" style="width: 20px; height: 20px; background-color: break;">
      咨询
    </div>
    <div class="collection" @click='handlerCollection'>
      <img src="@/assets/images/icon/wsc.png" v-if='!isCollect' alt="" style="width: 20px; height: 20px; background-color: break;">
      <img src="@/assets/images/icon/ysc.png" alt="" v-else style="width: 20px; height: 20px; background-color: break;">
      <!-- <i class="iconfont iconshoucang" v-if='!isCollect'></i>
      <i class="iconfont iconshoucang-shixin iconC" v-else></i> -->
      收藏
    </div>
    <div class="sign" @click='handlerSign' v-if='!hasBoughtGoods'>
      {{videoType == 3 ? '立即预约' : '立即报名'}}
    </div>
  </div>
</template>
<script>
import { getUrlPara } from '@/utils/factory.js'
import { mapGetters } from 'vuex'
export default{
  props: {
    xiaoNengUrl: String,
    hasBoughtGoods: Boolean,
    isCollected: Boolean,
    collectionId: Number,
    pattern: String,
    videoType: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      isCollect: false
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {
    isCollected(val) {
      this.isCollect = val
    }
  },
  created() {
    this.isCollect = this.isCollected
  },
  methods: {
    handlerSign() {
      console.log('立即报名');      
    },
    handlerCollection() {
      let status = this.isCollect ? 1 : 0
      console.log(this.isCollect)
      let params = {
        collectionId: this.collectionId,
        token: this.token,
        status,
        type: 1
      }
      this.$api.setCollection(params).then(res => {
        if(res && res.code == 200) {
          if (res.data === "取消了收藏") {
            this.isCollect = false 
            this.$toast('取消收藏')
          } else {
            this.isCollect = true
            this.$toast('已收藏')
          }
        }
      })
    },
    handleConsult() {
      window.location.href = this.xiaoNengUrl
    }
  }
}
</script>

<style lang="less" scoped>
  .footer{
    width: 100%;
    height: inherit;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center;     /* 垂直居中 */
    text-align: center;
    padding-right: 24px;
    /deep/ .iconfont{
      font-size: 38px;
      color: #2E3033;
    }
    .consultation{
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #3A3C42;
      border-right: 2px solid #E0E0E0;
    }
    .collection{
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #3A3C42;
      .iconC{
        color: #F6612F;
      }
    }
    .sign{
      /* width:448px; */
      flex: 2;
      height:80px;
      line-height: 80px;
      font-size: 34px;
      color: #ffffff;
      background:rgba(246,97,47,1);
      opacity:1;
      border-radius:6px;
    }
  }
</style>
