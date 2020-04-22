<!--
 * @Author: linweibin
 * @Description: 展示互动, 录播
 * @props: 
 * @event: 
 * @Date: 2019-10-21 09:16:17
 * @LastEditors: linweibin
 * @LastEditTime: 2019-11-26 11:26:46
 -->
 <template>
  <div>
    <div id="playerZSBox" style="width: 100%; height: 260px;">
      <!-- <gs:video-vod site="www.gensee.com" ownerid="f8625298d18042fbbba7a8d4f75555ca" uid="55831" uname="user5623" authcode="333333" group="testgroup"/> -->
      <!-- <gs:doc site="www.gensee.com" ownerid="f8625298d18042fbbba7a8d4f75555ca" group="testgroup"/> -->
      <!-- <gs:video-vod id="hangjia_sy_player_gs" site="192.168.0.168" ctx="webcast" ownerid="f8625298d18042fbbba7a8" uid="55831" uname="user5623" authcode="333333"/> -->
    </div>
    <div id="gsVideoDoc"></div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);

export default {
  name: "playerZS",
  props: {
    configZs: {
      type: Object,
      default: () => {}
    },
    chatmsg: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // chatInfo: [],
    };
  },
  mounted() {
    // console.log("chatMsg",this.chatmsg)
    this.init();
  },
  // watch: {
    // chatmsg() {
    //   // 监听公聊信息的变化, 如果变化, 发送信息
    //   if (this.chatmsg) {
    //     console.log(this.chatmsg);
    //     this.sendChatMsg(this.chatmsg);
    //   }
    // }
  // },
  watch: {
    // chatInfo(newVal) {
    //   // 当长度达到指定最大长度，则移除一部分
    //   const maxLen = 200;
    //   const removeLen = 50;
    //   if (newVal.length > maxLen) {
    //     this.$nextTick(() => {
    //       this.chatInfo.splice(0, removeLen);
    //     });
    //   }
    // }
  },
  beforeDestroy() {
    // console.log("销毁展示互动播放器");
    clearInterval(this.findGSDomTimer);
    clearInterval(this.findGSDom2Timer);
  },
  methods: {
    init() {
      console.log(this.configZs);

      const { site, ownerid, authcode, k, videoDomName, uname, uid } = this.configZs;
      // window.open(`http://${site}/sdk/site/test/vod?ownerid=${ownerid}&authcode=${authcode}&k=${k}`)
      // window.open(`http://${site}/sdk/site/test/simple?ownerid=${ownerid}&authcode=${authcode}&k=${k}`)
      // return;
      if (site && ownerid  && k) {
        const gsConfig = {
          // videoDomName: 'video-vod',
          docDomName: "doc"
        };

        // 展视互动 - 讲师视频
        const gsDom = document.createElement("gs:" + videoDomName);
        gsDom.setAttribute("id", "hangjia_sy_player_gs");
        gsDom.setAttribute("group", "hangjia_sy_player_gs");
        gsDom.setAttribute("style", "width: 100%; height: 100%;");
        gsDom.setAttribute("bar", "true");
        gsDom.setAttribute("ctx", "webcast");
        // gsDom.setAttribute("fullscreen", true);
        // gsDom.setAttribute("gsver", 2);
        // gsDom.setAttribute("py", 1);
        gsDom.setAttribute("post", true);
        gsDom.setAttribute("site", site);
        gsDom.setAttribute("uname", uname);
        gsDom.setAttribute("uid", uid);
        gsDom.setAttribute("ownerid", ownerid);
        // gsDom.setAttribute("authcode", authcode);
        gsDom.setAttribute("k", k);

        clearInterval(this.findGSDomTimer);
        this.findGSDomTimer = setInterval(() => {
          const dom = document.getElementById("playerZSBox");
          if (dom) {
            clearInterval(this.findGSDomTimer);
            dom.appendChild(gsDom);
            window.GS.loadTag(videoDomName, gsDom);
          }
        }, 50);

        // // 展视互动 - 文档视频
        // const gsDom2 = document.createElement("gs:" + gsConfig.docDomName);
        // gsDom2.setAttribute("id", "hangjia_sy_player_gs_sub");
        // gsDom2.setAttribute("group", "hangjia_sy_player_gs");
        // gsDom2.setAttribute("width", "100%");
        // gsDom2.setAttribute("bar", "true");
        // gsDom2.setAttribute("ctx", "webcast");
        // // gsDom2.setAttribute("fullscreen", true);
        // gsDom2.setAttribute("site", site);
        // gsDom2.setAttribute("ownerid", ownerid);

        // clearInterval(this.findGSDom2Timer);
        // this.findGSDom2Timer = setInterval(() => {
        //   const dom = document.getElementById("gsVideoDoc");
        //   if (dom) {
        //     clearInterval(this.findGSDom2Timer);
        //     dom.appendChild(gsDom2);
        //     window.GS.loadTag(gsConfig.docDomName, gsDom2);
        //   }
        // }, 50);

        this.channel = window.GS.createChannel("hangjia_sy_player_gs");

        // 展视互动 - 事件监听 - SDK加载完毕
        this.channel.bind("onDataReady", event => {
          console.log("播放器加载完毕");
        });

        // this.channel.bind("onPublicChat", event => {
        //   // console.log("收到公聊信息");
        //   // console.log(event);
        //   this.$emit('onChatData', event.data);
        //   // 暂不使用Vuex存储数据, 直接父子组件传值
        //   // this.chatInfo.push(event.data);
        //   // this.$store.state.chatList.push(event.data);
        //   // let arr=[];
        //   // arr.push(event.data)
        //   // this.$store.commit('changeList',arr)
        // });
      } else {
        // console.log("服务器异常：获取配置失败")
        Toast("服务器异常：获取配置失败");
      }
    },
    // 发送公聊信息
    // sendChatMsg(info) {
    //   // console.log(info);
    //   // console.log("发送聊天信息");
    //   // this.chatInfo.push(info);
    //   this.channel.send("submitChat", {
    //     richtext: info.richtext
    //   });
    // }
  }
};
</script>

<style lang='less' scoped>
</style>