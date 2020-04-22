<template>
    <div class="vipClass" :style="{background:`no-repeat center/100%  url(${backGroundImg})`}">
        <div class="header">
            <div class="btns" @click='goBack()'>
                <div><img src="../../assets/images/icon/topbar-btn-back-white@2x.png" alt="" ></div>
            </div>
            <img :src="vipHead" alt="会员专题" >
            <div class="ability">
                <img :src="line" alt="会员专题">
            </div>
            <div class="title">
                <img :src="dot" alt="会员专题" class="dot">
                行业全财务管理会计
                <img :src="dot" alt="会员专题" class="dot">
            </div>
        </div>

        <div class="vipList">
            <div class="title">
                <img :src="dotColor" alt="会员专题" class="dot">
                会员班
                <img :src="dotColor" alt="会员专题" class="dot">
            </div>

            <div class="course" v-if="goodsData[0]" @click="entryMember(goodsData[0].id)">
                <img :src="goodsFirst" alt="会员专题" >
                <div class="content">
                    <img src="@/assets/images/vip/spot-1.png" alt="会员专题" class="spot">
                    <div class="header">行业全财务管理会计入门会员班</div>
                    <div class="section">
                        <p><span>适合人群：</span>&nbsp;零基础、想转行、升职加薪的人、大学生</p>
                        <p><span>学习内容：</span><i>&nbsp;1.管理会计基础&nbsp; 2.管理会计入门实训 </i>&nbsp; 3.自学成才系列</p>
                    </div>
                    <div class="footer">
                        <span class="courseType">面授</span> <span class="price">{{changeFormate(goodsData[0].presentPrice)}}</span>
                    </div>
                </div>
            </div>

            <div class="course" v-if="goodsData[1]" @click="IntensiveLecture(goodsData[1].id)">
                <img :src="goodsSecond" alt="会员专题" >
                <div class="content">
                    <img src="@/assets/images/vip/spot-2.png" alt="会员专题" class="spot-long">
                    <div class="header">行业全财务管理会计全能会员班</div>
                    <div class="section">
                        <p><span>适合人群：</span>&nbsp;零基础、想转行、在校生、有一定财务基础想升职加薪的人</p>
                        <p><span>学习内容：</span>&nbsp;1.管理会计基础  &nbsp;2.管理会计入门实训<i> &nbsp;3.商超全财务管理会计实战</i> &nbsp;4.自学成才系列</p>
                    </div>
                    <div class="footer">
                        <span class="courseType">直播 / 面授 / 双师</span> <span class="price">{{changeFormate(goodsData[1].presentPrice)}} <i> 起</i></span>
                    </div>
                </div>
            </div>

            <div class="course" v-if="goodsData[2]" @click="professor(goodsData[2].id)">
                <img :src="goodsThree" alt="会员专题" >
                <div class="content">
                    <img src="@/assets/images/vip/spot-2.png" alt="会员专题" class="spot-long">
                    <div class="header">行业全财务管理会计精英会员班</div>
                    <div class="section">
                        <p><span>适合人群：</span>&nbsp;零基础、大学生、想转行或想学精管理会计人员</p>
                        <p><span>学习内容：</span>&nbsp;1.管理会计基础 &nbsp;2.管理会计入门实训 &nbsp;3.商超全财务管理会计实战<i> &nbsp;4.电子工业全财务管理会计实战</i><br/>5.多行业全财务管理会计实战 &nbsp;6.自学成才系列</p>
                    </div>
                    <div class="footer">
                        <span class="courseType">直播 / 面授 / 双师</span> <span class="price">{{changeFormate(goodsData[2].presentPrice)}} <i> 起</i></span>
                    </div>
                </div>
            </div>

            <div class="course" v-if="goodsData[3]" @click="outstanding(goodsData[3].id)">
                <img :src="goodsFour" alt="会员专题" >
                <div class="content">
                    <img src="@/assets/images/vip/spot-2.png" alt="会员专题" class="spot-long">
                    <div class="header">行业全财务管理会计杰出会员班</div>
                    <div class="section">
                        <p><span>适合人群：</span>&nbsp;想升职加薪、提升财务分析决策能力的会计人员</p>
                        <p><span>学习内容：</span>&nbsp;1.管理会计基础 &nbsp;2.管理会计入门实训<i> &nbsp;3.商超全财务管理会计实战 &nbsp;4.电子工业全财务管理会计实战 <br/> 5.多行业全财务管理会计实战</i> &nbsp;6.真账实习<i> &nbsp;&nbsp;7.财务管理专修 &nbsp;8.自学成才系列</i> &nbsp; 9.初级职称无忧通关面授班</p>
                    </div>
                    <div class="footer">
                        <span class="courseType">直播 / 面授 / 双师</span> <span class="price">{{changeFormate(goodsData[3].presentPrice)}} <i> 起</i></span>
                    </div>
                </div>
            </div>

            <div class="course" v-if="goodsData[4]" @click="brilliant(goodsData[4].id)">
                <img :src="goodsFive" alt="会员专题" >
                <div class="content">
                    <img src="@/assets/images/vip/spot-2.png" alt="会员专题" class="spot-long">
                    <div class="header">行业全财务管理会计卓越会员班</div>
                    <div class="section">
                        <p><span>适合人群：</span>&nbsp;想提升风控管控、跨部门协同、集团管控的会计人员</p>
                        <p><span>学习内容：</span><i>&nbsp;1.商超全财务管理会计实战 &nbsp;2.电子工业全财务管理会计实战 &nbsp;3.多行业全财务管理会计实战 &nbsp;4.财务管理专修  &nbsp;5.中央财大财务管理研修班</i> &nbsp;6.中级会计职称</p>
                    </div>
                    <div class="footer">
                        <span class="courseType">直播 / 面授 / 双师</span> <span class="price">{{changeFormate(goodsData[4].presentPrice)}} <i> 起</i></span>
                    </div>
                </div>
            </div>

            <div class="course" v-if="goodsData[5]" @click="pass(goodsData[5].id)">
                <img :src="goodsSix" alt="会员专题" >
                <div class="content">
                    <img src="@/assets/images/vip/spot-2.png" alt="会员专题" class="spot-long">
                    <div class="header">行业全财务管理会计通关会员班</div>
                    <div class="section">
                        <p><span>适合人群：</span>&nbsp;想提升风控管控、跨部门协同、集团管控的会计人员</p>
                        <p><span>学习内容：</span><i>&nbsp;1.商超全财务管理会计实战 &nbsp;2.电子工业全财务管理会计实战 &nbsp;3.多行业全财务管理会计实战 &nbsp;&nbsp;4.财务管理专修</i>  &nbsp;&nbsp;5.中级会计职称<i> &nbsp;&nbsp;6.中央财大财务管理研修班 <br/>7.中央财大财务总监研修班</i> &nbsp;8.CMA/CPA/税务师</p>
                    </div>
                    <div class="footer">
                        <span class="courseType">直播 / 面授 / 双师</span> <span class="price">{{changeFormate(goodsData[5].presentPrice)}} <i> 起</i></span>
                    </div>
                </div>
            </div>

        </div>
        
    </div>
</template>

<script>
import { JsBridge } from '@/utils/bridge.js'

export default {
  name: 'vipList',
  data() {
      return {
          vipHead: require( '@/assets/images/vip/会员专题-头部.png'),
          line: require( '@/assets/images/vip/路线.png'),
          dot: require( '@/assets/images/vip/圆点@2x.png'),
          dotColor: require( '@/assets/images/vip/圆点2@2x.png'),
          backGroundImg: require( '@/assets/images/vip/组 1830.png'),
          goodsFirst: require( '@/assets/images/vip/goods-1.jpg'),
          goodsSecond: require( '@/assets/images/vip/goods-2.jpg'),
          goodsThree: require( '@/assets/images/vip/goods-3.png'),
          goodsFour: require( '@/assets/images/vip/goods-4-1.jpg'),
          goodsFive: require( '@/assets/images/vip/goods-5.png'),
          goodsSix: require( '@/assets/images/vip/goods-6.jpg'),
          goodsData: [],
      };
  },
  created () {
      JsBridge(null,
        {
          path: "navigation/needHide",
          data: {
            //0表示导航栏显示，如果要隐藏则设置为1
            needHide: 1
          }
        })
    this.$api.getVipListData().then(res=>{
            if (res && res.code == 200) {
                this.goodsData = res.data;
            } 
         })
  },
  methods: {
      changeFormate:function(val) {
        if (!val) {
            return '免费'
        } else {
            if (this.$type == 'ios') {
                return val.toFixed(1) + ' 学币'
            } else {
                return '¥ ' + val.toFixed(1)
            }
        }
      },
      // 返回交互
      goBack() {
        JsBridge(null, { path: "webview/action/finish" })
      },
      // 入门会员班
      entryMember(id) {
          JsBridge(null, { path: "jump/webview",data:{
              url:`${this.$url}/classVip?goodsId=${id}`,
              navigation: false
          }})
      },
      // 精讲班
      IntensiveLecture(id) {
          JsBridge(null, { path: "jump/webview",data:{
              url:`${this.$url}/classVip?goodsId=${id}`,
              navigation: false
          }})
      },
      // 职称通关班
      professor(id) {
          JsBridge(null, { path: "jump/webview",data:{
              url:`${this.$url}/classVip?goodsId=${id}`,
              navigation: false
          }})
      },
      // 杰出会员班
      outstanding(id) {
         JsBridge(null, { path: "jump/webview",data:{
              url:`${this.$url}/classVip?goodsId=${id}`,
              navigation: false
          }})
      },
      // 卓越会员班
      brilliant(id) {
          JsBridge(null, { path: "jump/webview",data:{
              url:`${this.$url}/classVip?goodsId=${id}`,
              navigation: false
          }})
      },
      // 通关会员班
      pass(id) {
         JsBridge(null, { path: "jump/webview",data:{
              url:`${this.$url}/classVip?goodsId=${id}`,
              navigation: false
          }})
      },
  }
}
</script>

<style lang="less" scoped>
.vipClass {
    padding-bottom: 116px;
    .header {
        position: relative;
        z-index: 1;
        .btns{
            z-index: 2;
            position: fixed;
            top: 35px;
            left: 36px;
            img{
                width:50%;
                height: 40px;
            }
        }
        img {
            width: 100%;
            height: 665px;
            border-radius: 0 0 10% 10%;
        }
        .ability {
            width: 100%;
            height: auto;
            position: absolute;
            bottom: -211px;
            img {
                width: 100%;
                height: 100%;
                border-radius: 0px;
            }
        }
        .title {
            position: absolute;
            left: 154px;
            top: 360px;
            font-size:40px;
            font-family:Source Han Sans CN;
            font-weight:bold;
            line-height:107px;
            color:rgba(42,93,187,1);
            text-align: center;
            .dot {
                width: 40px;
                height: 40px;
                margin-top: 30px;
            }
        }
    }
    .vipList {
        margin-top: 220px; //TDD
        .title {
            margin-bottom: 30px;
            font-size:40px;
            font-family:Source Han Sans CN;
            font-weight:bold;
            line-height: 50px;
            color:#fff;
            text-align: center;
        }
        .dot {
            width: 40px;
            height: 40px;
            margin-top: 10px;
        }
        .course {
            background: #fff;
            margin: 0 36px 38px 36px;
            width: 682px;
            height: auto;
            border-radius: 12px;
            overflow: hidden;
            img {
                width: 100%;
                height: 380px;
            }
            .content {
                position: relative;
                height: auto;
                padding: 22px 34px 0 34px;
                .spot {
                    position: absolute;
                    left: 34px;
                    top: 95px;
                    width: 13px;
                    height: 50px;
                }
                .spot-long {
                    position: absolute;
                    left: 34px;
                    top: 95px;
                    width: 13px;
                    height: 85px;   
                }
                .header {
                    font-size:34px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:60px;
                    color:rgba(58,60,66,1);
                }
                 .section {
                    font-size:24px;
                    font-family:Microsoft YaHei;
                    line-height:36px;
                    font-weight:400;
                    padding-bottom: 24px;
                    border-bottom: 1px solid #E0E0E0;
                    p {
                        color: #6C7179;
                        margin-left: 15px;
                        i {
                            color: rgba(0,171,132,1);
                        }
                        span {
                        color:rgba(158,167,176,1);
                     }
                    } 
                 }
                 .footer {
                     height: 94px;
                     line-height: 94px;
                     display: flex;
                     justify-content: space-between;
                    .courseType {
                        padding: 0 10px;
                        margin: 28px 0;
                        line-height: 38px;
                        font-size:22px;
                        font-family:Microsoft YaHei;
                        font-weight:400;
                        color:rgba(0,171,132,1);
                        background: rgba(240,250,248,1);
                        border-radius: 4px;
                    }
                    .price {
                        font-size:32px;
                        font-family:Microsoft YaHei;
                        font-weight:bold;
                        color:rgba(246,97,47,1);
                        i:first-child {
                            font-size:24px;
                            color: #F6612F;    
                        }
                        i:last-child {
                            font-size:24px;
                           color:rgba(158,167,176,1);
                        }
                    }
                 }
            }
        }
    }
}

</style>