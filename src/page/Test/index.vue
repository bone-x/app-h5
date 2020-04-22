/*
 * @Author: mikey.lujunan
 * @Date: 2020-03-26 09:40:07 
 * @Last Modified by: mikey.lujunan
 * @Last Modified time: 2020-04-07 15:35:47
 */
 
<template>
  <div class="ability-test">
    <HeaderTitle :titleVal="titleVal"></HeaderTitle>
    <header></header>
    <div v-for="(item,index) in initArray" :key="index">
      <TestAbility @getMessageA="getMessageA" @getMessageB="getMessageB" @getMessageC="getMessageC" :testData="item"></TestAbility>
    </div>
    <footer>
      <section v-show="isLogin">
        <input type="text" v-model="userName" placeholder="请输入姓名" />
        <input type="text" v-model="userPhoneNum" placeholder="请输入手机号码" />
      </section>
      <button @click="submitResult" :class="isStyle?'isAnswer':''" :disabled='!isStyle'>查看结果</button>
      <p>* 本项测评仅做参考，不作专业指导</p>
    </footer>

  </div>
</template>

<script>

import TestAbility from "@/components/TestAbility"
import HeaderTitle from "@/components/TestAbility/headerTitle";
import { JsBridge } from '@/utils/bridge.js'
import { Toast  } from 'vant'

export default {
  name: "Test",
  components: {
    TestAbility,
    HeaderTitle
  },
  data() {
    return {
      initArray: [
        { key: 1, title: "01 放假的时候，您更喜欢呆在清静的地方" },
        { key: 2, title: "02 与陌生人交谈，您一般先等待别人开口" },
        { key: 3, title: "03 即使是关在铁笼内的猛兽，您见了也会感到惴惴不安" },
        { key: 4, title: "04 如果您要换一个新的环境，您更希望生活得和从前相似" },
        { key: 5, title: "05 您对待生活对待工作都很严谨，不太喜欢谈论是非，能保守秘密" },
        { key: 6, title: "06 您对经济开支能控制，很少有“月初松、月底空”的现象" },
        { key: 7, title: "07 您觉得自己一个人安安静静地呆着，心情会比较轻松" },
        { key: 8, title: "08 做事情前您习惯先列好计划，按照计划进行" },
        { key: 9, title: "09 您更希望能过简单的生活，有单纯的人际关系" },
        { key: 10, title: "10 出席朋友的聚会，您更乐意安静听朋友聊天" },
        { key: 11, title: "11 您是否有会计实战经验" },
        { key: 12, title: "12 是否通过以下证书 (仅选一项含金量高的)" },
      ],
      isLogin: true,
      userName: '',
      userPhoneNum: '',
      isStyle: false,
      counts: 0 , // 统计10道题目是的数量
      addArray: new Array(2).fill(undefined), // 11， 12题的数据
      newArray: new Array(10).fill(undefined),
      titleVal: '性格测试',
      isClick: 0, // 触发监听变量
    };
  },
  watch: {
    'isClick'(newVal,oldVal) {
         const isBelowThreshold = (currentValue) => currentValue != undefined;
          let isTrue = this.newArray.every(isBelowThreshold)  //判断10个题目是不是有没选的
          let isAddTrue = this.addArray.every(isBelowThreshold) //判断后面2个题目是否没选
          if (isTrue && isAddTrue) {
            if (!this.isLogin) { // 登录的时候
              this.isStyle = true
            } else if (this.userName && this.userPhoneNum){ // 未登录验证手机号码
              this.isStyle = true
            } 
          } 
    },
    'userName'() {
      this.isClick ++
    },
    'userPhoneNum' () {
      this.isClick ++
    }
  },
  mounted () {
    // 判断用户是否登录
    let userinfo = JsBridge(null, { path: "info/user" });
    let token = (userinfo && JSON.parse(userinfo).code == 200 && JSON.parse(userinfo).data) && (JSON.parse(userinfo).data.token)
    if (token) {
      this.isLogin = false
    }
  },
  methods: {
    // 选择A
    getMessageA(obj) {
      if (obj.key === 1) {
        this.newArray.splice(0,1,1)
      } else if (obj.key === 2) {
        this.newArray.splice(1,1,1)
      } else if (obj.key === 3) {
        this.newArray.splice(2,1,1)
      } else if (obj.key === 4) {
        this.newArray.splice(3,1,1)
      } else if (obj.key === 5) {
        this.newArray.splice(4,1,1)
      } else if (obj.key === 6) {
        this.newArray.splice(5,1,1)
      } else if (obj.key === 7) {
        this.newArray.splice(6,1,1)
      } else if (obj.key === 8) {
        this.newArray.splice(7,1,1)
      } else if (obj.key === 9) {
        this.newArray.splice(8,1,1)
      } else if (obj.key === 10) {
        this.newArray.splice(9,1,1)
      } else if (obj.key === 11) {
        this.addArray.splice(0,1,obj)
      }
      this.isClick ++
    },
    // 选择B
    getMessageB(obj) {
      if (obj.key === 1) {
        this.newArray.splice(0,1,0)
      } else if (obj.key === 2) {
        this.newArray.splice(1,1,0)
      } else if (obj.key === 3) {
        this.newArray.splice(2,1,0)
      } else if (obj.key === 4) {
        this.newArray.splice(3,1,0)
      } else if (obj.key === 5) {
        this.newArray.splice(4,1,0)
      } else if (obj.key === 6) {
        this.newArray.splice(5,1,0)
      } else if (obj.key === 7) {
        this.newArray.splice(6,1,0)
      } else if (obj.key === 8) {
        this.newArray.splice(7,1,0)
      } else if (obj.key === 9) {
        this.newArray.splice(8,1,0)
      } else if (obj.key === 10) {
        this.newArray.splice(9,1,0)
      } else if (obj.key === 11) {
        this.addArray.splice(0,1,obj)
      }
      const reducer = (accumulator, currentValue) => accumulator + currentValue
      this.counts = this.newArray.reduce(reducer);
      this.isClick ++
    },
    // 选择12题的时候
    getMessageC(obj) {
      this.addArray.splice(1,1,obj)
      this.isClick ++
    },
    submitResult() {
      // 登陆
      if (!this.isLogin) {
        this.$store.commit('getTestAbility',this.addArray)
        this.$router.push({name:'testResult', query: {'counts': this.counts}})
      } else {
        // 未登陆
        if (!this.userName) {
          Toast('请输入姓名')
        } else if (this.userPhoneNum) {
          if (!(/^1[3456789]\d{9}$/.test(this.userPhoneNum))) {
          Toast('您输入的手机号无效，请确认')
          } else {
            let data = {
              name: this.userName,
              tel: this.userPhoneNum,
              subscribeUrl: window.location.href,
              remark: '性格测试'
            }
            this.$api.getGoodsResult(data).then(res=> {
              if (res.code === 200) {
                this.$store.commit('getTestAbility',this.addArray)
                this.$router.push({name:'testResult', query: {'counts': this.counts}})
              }
            })
          }
        } else {
          Toast('请填写完整信息')
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.ability-test {
  header {
    height: 420px;
    background: no-repeat url("../../assets/images/subject/abilityTest.png");
    background-size: 100% 420px;
  }
  .do-question {
    section {
      width: 100%;
      min-height: 374px;
      padding: 42px 36px;
      article {
        font-size: 34px;
        font-family: PingFang SC;
        font-weight: bold;
        line-height: 52px;
        color: rgba(58, 60, 66, 1);
        margin-bottom: 30px;
      }
      ul {
        li {
          display: inline-block;
          width: 100%;
          height: 90px;
          line-height: 90px;
          background: rgba(250, 251, 253, 1);
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 74px;
          color: rgba(58, 60, 66, 1);
          border: 1px solid rgba(234, 238, 242, 1);
          border-radius: 12px;
          span {
            margin: 0 18px 0 30px;
            display: inline-block;
            width: 50px;
            height: 50px;
            font-size: 29px;
            font-weight: bold;
            text-align: center;
            line-height: 48px;
            // color:rgba(255,255,255,1);
            // background:rgba(0,171,132,1);
            border: 3px solid rgba(232, 232, 232, 1);
            color: #717171;
            border-radius: 50px;
          }
        }
        & li:first-child {
          margin-bottom: 24px;
        }
        .active-a {
          background: rgba(236, 251, 247, 1);
          span {
            color: rgba(255, 255, 255, 1);
            background: rgba(0, 171, 132, 1);
            border: none;
          }
        }
        .active-b {
          background: rgba(236, 251, 247, 1);
          span {
            color: rgba(255, 255, 255, 1);
            background: rgba(0, 171, 132, 1);
            border: none;
          }
        }
      }
    }
  }
  footer {
    margin: 30px 72px 60px 72px;
    input {
      padding: 39px 0 36px 0;
      width: 100%;
      height: 120px;
      border-bottom: 2px solid #EDEDED;
    }
    button {
      margin-top: 24px;
      width: 100%;
      height: 96px;
      background: #A3ABB8;
      font-size:36px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
      border-radius:6px;
    }
    .isAnswer {
      background: #00AB84;
    }
    p {
      margin-top: 30px;
      font-size:24px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(108,113,121,1);
      text-align: center;
      opacity: .7;
    }
  }
}
</style>