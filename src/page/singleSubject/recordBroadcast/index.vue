<!--
 * @Author: 尹伊
 * @Date: 2020-01-06 10:01:44
 * @LastEditTime : 2020-01-16 16:12:10
 * @LastEditors  : 尹伊
 * @Description: 单科详情-录播
 * @FilePath: \hqjy-accounting-h5\src\page\singleSub\index.vue
 -->
 <template>
  <div class="subject">
    <!-- 头部 -->
    <div :class="isVideoClass ? 'sub-header fx' : 'sub-header'">
      <PlayerBL ref :config-bl="configBl" v-if='isPlayerBL'/>
      <img :src="goodsDetail.thumbPath" v-else>
    </div>
    <!-- 中间内容 fxCon-->  
    <div :class="isVideoClass ? 'sub-content fxCon' : 'sub-content'">
      <van-tabs :class='handleChangeClass()'>
        <van-tab title="介绍">
          <IntroduceSub :infoData='infoData' :goodsId='goodsId'></IntroduceSub>
        </van-tab>
        <van-tab>
          <div slot="title" class="subCon">
            <div>目录</div>
            <div class="subTips" v-if='goodsDetail.courseIsListen'>试听</div>
          </div>
          <div v-for="(item, index) in catalogList" :key="index" class="recordItem">
            <van-collapse v-model="checkName":key="index">
              <van-collapse-item :name="index">
                <div slot="title">{{item.chapterName}}</div>
                <div class="content" v-if='item.sectionList.length'>
                  <!-- <RecordItem v-for='(subItem,subIndex) in item.sectionList' :key='subIndex' :recordItem='subItem' ></RecordItem> -->
                  <div class="liveItem" v-for='(subItem,subIndex) in item.sectionList' :key='subIndex'>
                    <div class="videoIcon" @click='handlePlayingRecord(subItem.recordId)'>
                      <img src="@/assets/images/icon/bf.png" class="tColor" v-if="playingRecord === subItem.recordId" alt="">
                      <!-- style="width: 32px; height: 32px; background-color: break;" -->
                      <img src="@/assets/images/icon/luV.png"  alt="" v-else>
                      <!-- <i class="iconfont iconpingce-1 tColor" v-if="playingRecord === subItem.recordId"></i>
                      <i class="iconfont iconlubo" v-else></i> -->
                    </div>
                    <div class="item" @click='handlePlayingRecord(subItem)'>
                      <div :class="playingRecord === subItem.recordId ? 'liveTitle tColor' : 'liveTitle'">{{subItem.recordName}}</div>
                    </div>
                    <div class="folderIcon">
                      <div v-if='playingRecord === subItem.recordId'>
                        <img src="@/assets/images/icon/bj.png"  class="edit" alt="">
                        <img src="@/assets/images/icon/wj.png" alt="">
                        <!-- <i class="iconfont iconbiji edit"></i>
                        <i class="iconfont iconwenjian"></i> -->
                      </div>
                      <div v-else>
                        <div  class="Audition" v-if='subItem.sectionIsListen'>试听</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="content" v-else>暂无内容</div>
                <!-- <div class="more">
                  加载更多<i class="iconfont iconxiala moreIcon"></i>
                </div> -->
              </van-collapse-item>
            </van-collapse>
          </div>
        </van-tab>
        <van-tab title="推荐">
          <Recommend :goodsId='infoData.id' :categoryId='infoData.categoryId' :goodsType='infoData.goodsType'></Recommend>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 底部 -->
    <div class="sub-bottom">
      <Footer :xiaoNengUrl='infoData.xiaoNengUrl' :hasBoughtGoods='infoData.hasBoughtGoods' :isCollected='infoData.isCollected' :collectionId='infoData.id'></Footer>
    </div>
    <!-- 弹框 -->
    <van-dialog
      v-model="show"
      show-cancel-button
      confirmButtonText="立即报名"
      cancelButtonText="再考虑下"
      @confirm='gotosign'
    >
    报名后才能学习，现在立即报名
    </van-dialog>
  </div>
</template>
<script>
import PlayerBL from "@/components/playerBL";
import IntroduceSub from '@/components/IntroduceSub'
import Recommend from '@/components/recommend'
import Footer from '@/components/Footer'
import { getUrlPara } from '@/utils/factory.js'
import {mapGetters} from 'vuex'
export default {
  name: 'subject',
  components: {
    PlayerBL,
    IntroduceSub,
    Recommend,
    Footer
  },
  props: {
    infoData: Object
  },
  computed: {
    ...mapGetters(['courseType', 'token'])
  },
  data () {
    return {
      activeName: '',
      show: false,
      isPlayerBL: false,
      goodsDetail: {},
      goodsId: '',
      configBl: {},  // 保利威录播
      configZs: {}, // 展示互动录播配置信息
      chatmsg: {},
      checkName: [],
      catalogList: [],
      playingRecord: '',
      isRoof: false,
      isVideoClass: false
    }
  },
  created() {
    this.goodsDetail = this.infoData
    this.goodsId = getUrlPara('goodsId')
    this.init(this.goodsId)
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  watch: {
    infoData (val) {
      this.goodsDetail = val
    }
  },
  methods: {
    init(value) {
      let data = {
        goodsId: value
      }
      this.$api.getSingleSectionList(data).then(res => {    
        if(res && res.code === 200){
          this.catalogList = res.data
        }
      })
    },
    handleScroll () {   
      if (this.isPlayerBL) {
        // 视频播放
        this.isVideoClass = true
      } else {
        this.isRoof = window.pageYOffset > 201 ? true : false
        this.isVideoClass = false
      }
    },
    handleChangeClass () {
      if (this.isVideoClass) {
        return 'playVideo_roof'
      } else {
        if (this.isRoof) {
          return 'roof'
        }else {
          return ''
        }
      }
    },
    handlePlayingRecord(val) {
      if (!this.infoData.hasBoughtGoods) {
        if (val.sectionIsListen) {
          // 2 未购买：支持试听
          this.videoPlay(val)
        } else {
          // 3 未购买: 不支持试听
          this.show = true
        }
        return 
      }
      // 1 已经购买
      this.videoPlay(val)
    },

    // 视频播放
    videoPlay (val) {
      this.configBl.vid = val.vid
      this.configBl.playsafe = this.token
      this.recordId = val.vid
      this.isPlayerBL = true
      this.playingRecord = val.recordId
    },
    gotosign () {
      console.log('立即报名')
    }
  },
}
</script>
<style lang="less" scoped>
  img{
    width: 40px; 
    height: 40px; 
    background-color: break;
  }
  .subject{
    width: 100%;
    /* min-height: 100vh; */
    position: relative;
    .sub-header{
      width: 100%;
      height: 428px;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .fx{
      width: 100%;
      position: fixed;
      z-index: 10;
      top: 0;
    }
    .fxCon{
      padding-top: 428px;
    }
    .sub-content{
      padding-bottom: 98px;
      .roof{
        /deep/.van-tabs__wrap{
          position: fixed;
          top: 0;
        }
      }
      .playVideo_roof {
        /deep/.van-tabs__wrap{
          position: fixed;
          z-index: 10;
        }
        /deep/.van-tabs__content{
          padding-top: 98px;
        }
      }
      .subCon{
        position: relative;
        .subTips{
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
        .subTips::after{
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
      /deep/ .van-tabs__wrap{
        width: 100%;
        height: 96px;
        box-shadow: 0px 10px 30px rgba(58,60,66,0.03);
        .van-tabs__nav--line{
          padding: 0;
        }
        .van-tab{
          line-height: 96px;
          font-size:30px;
          color: #6C7179;
        }
        .van-tab--active{
          font-size: 34px;
          color: #2E3033;
        }
        .van-tabs__line{
          width: 36px !important;
          height: 6px;
          background:rgba(0,171,132,1);
          opacity:1;
          border-radius:3px;
        }
      }
    }
.recordItem{
  width: 100%;
  height: 100%;
  /* margin-top: 50px; */
  /deep/.van-cell{
    font-size: 30px;
    font-weight: 500;
    color: #3A3C42;
    line-height: 36px;
    padding: 30px 88px 33px 32px;
    display: flex;
    align-items: center;
    .van-cell__title{
      margin-right: 73px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .van-cell__right-icon{
      font-size: 40px;
    }
  }
  /deep/.van-cell:not(:last-child)::after{
    content: '';
    border-bottom: none;
  }
  /deep/.van-collapse-item__content{
    background-color: #FAFAFA;
  }
  .content{
    width: 100%;
    min-height: 96px;
    font-size: 28px;
  }
  .more{
    width: 100%;
    margin-top: 24px;
    text-align: center;
    font-size: 30px;
    color: #A3ABB8;
    .moreIcon{
      margin-left: 10px;
      font-size: 12px;
    }
  }
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
        margin-right: 25px;
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
}
    .sub-bottom{
      position: fixed;
      box-shadow:0px -10px 20px rgba(58,60,66,0.05);
      width: 100%;
      height: 98px;
      bottom: 0;
      background-color: #fff;
    }
  }
</style>
