/*
 * @Author: mikey.lujunan 
 * @Date: 2020-03-27 10:33:14 
 * @Last Modified by: mikey.lujunan
 * @Last Modified time: 2020-04-07 14:38:52
 */
<template>
  <div class="test-result">
    <!-- 结果展示 -->
    <div class="course-content">
      <div class="img-div">
        <ul>
          <li>根据测试结果，您属于</li>
          <li>{{character}}</li>
        </ul>
        <img :src='imagesType' alt="人物图片" >
      </div>
      <section class="text-content">
       {{describeCon}}
      </section>
    </div>
    <!-- 课程展示 -->
    <div class="course-show">
      <h1>课程推荐</h1>
      <div class="content-goods">
        <FreeItem v-for='(item, index) in freeGoodsList' :key='index' :ItemDetail='item'></FreeItem>
      </div>
      
    </div>
  </div>
</template>

<script>
import FreeItem from '@/components/TestAbility/goodsItem'
import HeaderTitle from "@/components/TestAbility/headerTitle"
import { mapGetters } from 'vuex'

export default {
  name:'testResult',
  components: {
    FreeItem,
    HeaderTitle
  },
  data() {
    return {
      freeGoodsList: [],
      imagesType: require('../../assets/images/test/9-10.png'),
      character: '', //  性格
      described: [
        '您是偏运动型性格。喜好热闹，喜欢突破自我，自控能力有点弱，有时候沉不下性子！会计对您来说是一个具有 挑战性的工作。在进入这个行业前，您需要注重性格的磨练，有专业的职业规划师为您做规划指导，会更利于您会计职业的发展！',
        '您是偏温和型性格。对待生活与工作，您能静能动，生活方式独立，有一定的自控能力。在财会领域，您能充分展示自己沉稳又不失活泼的沟通能力！想真正在会计职场如鱼得水，您还需要强化自己的问题处理思路，进行系统的训练和积累！',
        '您是偏谨慎型性格。做事很有一套自己的看法和思路，情绪稳定而成熟，具有较强的自控能力，在财会领域有很大的发展潜力，只要努力与坚持，您会成为一名优秀的会计！',
        '您天生就是做会计的料。您温和、内敛、严谨又敏感，您不张扬，不夸张，能着重面对现实，情绪稳定而成熟，追求细节的完美，对数字天生敏感，善于分析数据。从事财会工作能很快崭露头角，并能在财会领域做出一番事业！'
      ], // 描述内容
      describeCon: "", //具体内容
    }
  },
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'testData',
    ])
  },
  created() {

  },
  mounted() {
    this.getTestAbility()
    let counts = this.$route.query.counts
    if (counts < 4) {
      this.imagesType = '0-3'
      this.character = '偏运动型性格'
      this.describeCon = this.described[0]
    } else if (counts > 3 && counts < 7) {
      this.imagesType = '4-6'
      this.character = '偏温和型性格'
      this.describeCon = this.described[1]
    } else if (counts > 6 && counts < 9) {
      this.imagesType = '7-8'
      this.character = '偏谨慎型性格'
      this.describeCon = this.described[2]
    } else {
      this.imagesType = '9-10'
      this.character = '完美型型性格'
      this.describeCon = this.described[3]
    }
    this.imagesType = require(`../../assets/images/test/${this.imagesType}.png`)
  },
  methods: {
    async getTestAbility () {
      let data = {
        "list": [
          {
            "content": this.testData[0].cho,
            "option": this.testData[0].cho === '否'?'B':'A',
            "serialNumber": 11
          },
        {
            "content": this.testData[1].val,
            "option": this.testData[1].key,
            "serialNumber": 12
          }
        ]
      }
      let res = await this.$api.getTestAbilityGoodsInfo(data)
      this.freeGoodsList = res.data
      console.log(res, '结果')
    }
  }
  
}
</script>

<style lang="less" scoped>
.test-result {
  .course-content {
    padding: 0 36px;
    width: 100%;
    height: 836px;
    background: url('../../assets/images/test/bg.png') no-repeat;
    background-size: 100% 836px;
    .img-div {
      padding-top: 42px;
      display: flex;
      direction: row;
      ul {
        padding-top: 68px;
        width: 324px;
        height: auto;
        font-family:PingFang SC;
        color:rgba(255,255,255,1);
        line-height:55px;
        li:first-child {
          padding-top: 24px;
          font-size:28px;
          font-weight:400;
          opacity:0.7;
        }
        li:last-child {
          font-size:54px;
          font-weight:bold;
          opacity:1;
        }
      }
      img {
        width: 354px;
        height: 254px;
      }
    }
    .text-content {
      padding: 48px 36px 36px;
      font-size:28px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:44px;
      color:rgba(255,255,255,1);
    }
  }
  .course-show {
    padding: 0 36px;
    h1 {
      margin-top: 16px;
      text-align: center;
      height: 104px;
      font-size:40px;
      font-family:PingFang SC;
      font-weight:bold;
      line-height:38px;
      color:rgba(58,60,66,1);
      line-height: 104px;
    }
    .content-goods {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
}
</style>