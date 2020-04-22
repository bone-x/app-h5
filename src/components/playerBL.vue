<!--
 * @Author: linweibin
 * @Description: 播放器, 录播(点播)
 * @props: 
 * @event: 
 * @Date: 2019-10-21 09:16:17
 * @LastEditors  : 尹伊
 * @LastEditTime : 2020-01-16 15:08:37
 -->
 <template>
  <div id="hi-sy-palyer" style="width: 100%;"></div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);

export default {
  name: "playerBL",
  props: {
    configBl: {
      type: Object,
      default: () => {}
    },
    VideoHight:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
      player: null,
      config: {}
    };
  },
  mounted() {
    this.init();
  },
  created() {
    // console.log("重新加载组件");
  },
  beforeDestroy() {
    // this.player.destroy;
    if (this.player) {
      this.player.destroy;
      console.log("销毁保利威视播放器");
    }
  },
  methods: {
    // 初始化
    init() {
      // 监听保利威视播放器初始化完成
      const { vid, playsafe, ts, sign, recordId } = this.configBl;
      if (vid) {
        const options = {
          wrap: "#hi-sy-palyer",
          height:this.VideoHight,
          // srt_caption_txt_size:'20',
          vid: vid,
          autoplay: false,
          // playsafe: playsafe,
          ts: ts,
          sign: sign,
          showHd: true
          // watchStartTime: 0,
          // showAuto: true,
          // statistics: {
          //   param1: userInfo.uid,
          //   param2: this.state.recordId
          // }
        };
        console.log("更新播放器", options);
        this.player = window.polyvPlayer(options);
        
        window.s2j_onPlayerInitOver = () => {
          // Toast("播放器加载完毕");
        };
      } else {
        console.log("服务器异常：获取配置失败");
      }
    }
  }
};
</script>

<style lang='less' scoped>
</style>