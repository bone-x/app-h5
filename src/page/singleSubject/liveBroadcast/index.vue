<!--
 * @Author: 尹伊
 * @Date: 2020-01-06 10:01:44
 * @LastEditTime : 2020-01-16 15:32:53
 * @LastEditors: 尹伊
 * @Description: 单科详情-录播
 * @FilePath: \hqjy-accounting-h5\src\page\singleSub\index.vue
 -->
<template>
  <div class="subject">
    <!-- 头部 -->
    <div :class="isVideoClass ? 'sub-header fx' : 'sub-header'">
      <PlayerZS ref="childzs" :config-zs="configZs" v-bind:chatmsg="chatmsg" v-if='isPlayerZS' />
      <!-- @onChatData="onChatData" -->
      <img :src="goodsDetail.thumbPath" v-else>
    </div>
    <div :class="isVideoClass ? 'sub-content fxCon' : 'sub-content'">
      <!-- isRoof && !isVideoClass ? "roof" : isRoof && isVideoClass ? "playVideo_roof" : "" -->
      <van-tabs v-model="activeName" :class='handleChangeClass()' @click='changeTab'>
        <van-tab title="介绍">
          <IntroduceSub :infoData='infoData' :goodsId='goodsId'></IntroduceSub>
        </van-tab>
        <van-tab>
          <div slot="title" class="subCon">
            <div>目录</div>
            <div class="subTips" v-if='goodsDetail.courseIsListen'>试听</div>
          </div>
          <div class="liveList" v-for="(item, index) in catalogList" :key="index">
            <div class="chapterTitle">
              <span class="title">{{item.courseName}}</span>
            </div>
            <div class="liveItems">
              <div class="liveItem" v-for='(subitem,subindex) in item.sectionList' :key='subindex'>
                <div class="videoIcon">
                  <img src="@/assets/images/icon/bf.png" class="tColor" v-if="playingLiveId === subitem.classplanLiveId"
                    alt="">
                  <!--  style="width: 32px; height: 32px; background-color: break;"  -->
                  <img src="@/assets/images/icon/zbV.png" alt="" v-else>
                  <!-- <i class="iconfont iconpingce-1 tColor" v-if="playingLiveId === subitem.classplanLiveId"></i>
                  <i class="iconfont iconzhibo" v-else></i> -->
                </div>
                <div class="item" @click='handleplay(subitem)'>
                  <div :class="playingLiveId == subitem.classplanLiveId ? 'liveTitle tColor' : 'liveTitle'">
                    {{subitem.liveName}}</div>
                  <div :class="playingLiveId == subitem.classplanLiveId ? 'livetype tColor' : 'livetype'">
                    <div v-if='subitem.isValidLive'>
                      <span>{{subitem.liveTimeRange}}</span>
                      <span>{{subitem.liveStatus | setVideoType}}</span>
                    </div>
                    <div v-else>
                      <span>排课中，未开始</span>
                    </div>
                  </div>
                </div>
                <div class="folderIcon">
                  <img src="@/assets/images/icon/bj.png" class="edit" v-if="playingLiveId === subitem.classplanLiveId"
                    alt="">
                  <img src="@/assets/images/icon/wj.png" alt="">
                  <!-- <i class="iconfont iconbiji edit"></i>
                  <i class="iconfont iconwenjian"></i> -->
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="推荐">
          <Recommend :goodsId='infoData.id' :categoryId='infoData.categoryId' :goodsType='infoData.goodsType'>
          </Recommend>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 底部 -->
    <div class="sub-bottom">
      <Footer :xiaoNengUrl='infoData.xiaoNengUrl' :hasBoughtGoods='infoData.hasBoughtGoods'
        :isCollected='infoData.isCollected' :pattern='infoData.pattern' :collectionId='infoData.id'></Footer>
    </div>
    <!-- 弹框 -->
    <van-dialog v-model="show" show-cancel-button confirmButtonText="立即报名" cancelButtonText="再考虑下" @confirm='gotosign'>
      报名后才能学习，现在立即报名
    </van-dialog>
  </div>
</template>
<script>
  import PlayerZS from "@/components/playerZS"
  import IntroduceSub from '@/components/IntroduceSub'
  import Recommend from '@/components/recommend'
  import Footer from '@/components/Footer'
  import { getUrlPara } from '@/utils/factory.js'
  import { mapGetters } from 'vuex'
  export default {
    name: 'subject',
    components: {
      PlayerZS,
      IntroduceSub,
      Recommend,
      Footer
    },
    props: {
      infoData: Object
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    filters: {
      setVideoType(val) {
        switch (val) {
          case 1:
            return '直播中'
          case 2:
            return '未直播'
          case 3:
            return '观看回放'
          case 4:
            return '已结束'
        }
      }
    },
    computed: {
      ...mapGetters(['token'])
    },
    data() {
      return {
        activeName: '',
        show: false,
        playRVideo: false,
        goodsDetail: {},
        goodsId: '',
        configBl: {},  // 保利威录播
        configZs: {}, // 展示互动录播配置信息
        chatmsg: {},
        checkName: [],
        catalogList: [],
        playingRecord: '',
        playingLiveId: '1',
        isRoof: false,
        isPlayerZS: false,
        isVideoClass: false
      }
    },
    created() {
      this.goodsDetail = this.infoData
      this.goodsId = getUrlPara('goodsId')
      this.init(this.goodsId)
    },
    watch: {
      infoData(val) {
        this.goodsDetail = val
      }
    },
    methods: {
      init(value) {
        let data = {
          goodsId: value
        }
        this.$api.getSingleSectionList(data).then(res => {
          if (res && res.code === 200) {
            this.catalogList = res.data
          }
        })
      },
      // 滚动事件
      handleScroll() {
        if (this.isPlayerZS) {
          // 视频播放
          this.isVideoClass = true
        } else {
          this.isRoof = window.pageYOffset > 201 ? true : false
          this.isVideoClass = false
        }
      },
      handleChangeClass() {
        if (this.isVideoClass) {
          return 'playVideo_roof'
        } else {
          if (this.isRoof) {
            return 'roof'
          } else {
            return ''
          }
        }
      },
      handleplay(val) {
        if (!this.infoData.hasBoughtGoods) {
          this.show = true
          return
        }
        if (!val.isValidLive) {
          this.$toast("努力排课中");
          return
        }
        if (val.liveStatus === 2) {
          this.$toast("直播还没开始，敬请留意");
          return
        }
        if (val.liveStatus === 4) {
          this.$toast("视频回放上传中，敬请留意");
          return
        }
        this.playingLiveId = val.classplanLiveId
        let params = {
          SSOTOKEN: this.token,
          appVersion: 999,
          classplanLiveId: val.classplanLiveId,
          clientType: 999,
          id: 2236
        }

        if (val.liveStatus === 3) {
          // 回放接口
          this.$api.getReplayInfo(params).then(res => {
            this.configZs.videoDomName = "video-vod";
            this.configZs.ownerid = res.data.vodId
            this.configZs.uname = res.data.nickname || "匿名用户"
            this.configZs.uid = Number(res.data.uid) + 1000000000
            this.configZs.site = res.data.genseeDomainName
            this.configZs.k = res.data.k;
            this.isPlayerZS = true
          })
        }

        if (val.liveStatus === 1) {
          // 直播接口
          this.$api.getLiveInfo(params).then(res => {
            if (res && res.code == 200) {
              this.configZs.videoDomName = "video-live";
              this.configZs.ownerid = res.data.genseeLiveId
              this.configZs.uname = res.data.nickname
              this.configZs.uid = Number(res.data.uid) + 1000000000
              this.configZs.site = res.data.genseeDomainName
              this.configZs.k = res.data.k;
              this.isPlayerZS = true
            }
          })
        }



      },
      handlePlayingRecord(val) {
        if (!this.infoData.hasBoughtGoods) {
          this.show = true
          return
        }
        if (val.sectionIsListen) {
          this.configBl.vid = val.vid
          this.configBl.playsafe = this.token
          this.recordId = val.vid
          this.playRVideo = true
          this.playingRecord = val.recordId
        }
      },
      changeTab() {

      },
      gotosign() {
        console.log('立即报名')
      }
    },
  }
</script>
<style lang="less" scoped>
  img {
    width: 40px;
    height: 40px;
    background-color: break;
  }

  .subject {
    width: 100%;
    /* min-height: 100vh; */
    position: relative;

    .sub-header {
      width: 100%;
      height: 428px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .fx {
      width: 100%;
      position: fixed;
      z-index: 10;
      top: 0;
    }

    .fxCon {
      padding-top: 428px;
    }

    .sub-content {
      padding-bottom: 98px;

      .roof {
        /deep/.van-tabs__wrap {
          position: fixed;
          z-index: 10;
          top: 0;
        }
      }

      .playVideo_roof {
        /deep/.van-tabs__wrap {
          position: fixed;
          z-index: 10;
        }

        /deep/.van-tabs__content {
          padding-top: 98px;
        }
      }

      .subCon {
        position: relative;

        .subTips {
          box-sizing: border-box;
          position: absolute;
          font-size: 20px;
          top: 10%;
          left: 65%;
          width: 64px;
          height: 34px;
          line-height: 34px;
          color: #fff;
          border-radius: 10px;
          background-color: #FF9D12;
        }

        .subTips::after {
          content: '';
          width: 0;
          height: 0;
          border-top: 0px solid transparent;
          border-bottom: 15px solid transparent;
          border-left: 15px solid #FF9D12;
          position: absolute;
          top: 26px;
          left: 0px;

        }
      }

      .liveList {
        box-sizing: border-box;

        .chapterTitle {
          width: 100%;
          max-height: 144px;
          padding: 30px 88px 33px 32px;
          background-color: #ffffff;
          border-bottom: 1px solid #EDEDED;

          .title {
            width: 100%;
            height: 100%;
            font-size: 30px;
            font-weight: 500;
            color: #3A3C42;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }

        .liveItems {
          /* margin-top: 18px; */

          .liveItem {
            width: 100%;
            background-color: #FAFAFA;
            padding: 22px 33px 22px 35px;
            display: flex;

            .iconfont {
              font-size: 38px;
            }

            .videoIcon {
              flex: 1;
              margin-top: 10px;
              color: #3A3C42;
            }

            .item {
              flex: 6;
              box-sizing: border-box;
              font-weight: 400;

              .liveTitle {
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

              .livetype {
                color: #A3ABB8;
                font-size: 22px;
                line-height: 26px;
              }
            }

            .tColor {
              color: #00AB84 !important;
            }

            .folderIcon {
              flex: 2;
              margin-top: 10px;
              text-align: right;
              color: #3A3C42;

              .edit {
                margin-right: 36px;
              }
            }
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
          color: #6C7179;
        }

        .van-tab--active {
          font-size: 34px;
          color: #2E3033;
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

    .sub-bottom {
      position: fixed;
      box-shadow: 0px -10px 20px rgba(58, 60, 66, 0.05);
      width: 100%;
      height: 98px;
      bottom: 0;
      background-color: #fff;
    }
  }
</style>