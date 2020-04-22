/*
 * @Author: mikey.lujunan 
 * @Date: 2020-03-26 09:25:08 
 * @Last Modified by: mikey.lujunan
 * @Last Modified time: 2020-03-26 15:24:34
 */

<template>
  <div>
    <div class="do-question" v-show="testData.key < 12">
      <section>
        <article>{{testData.title}}</article>
        <ul>
          <li @click="isUserChoiceA({'key':testData.key, 'cho':'是'})" :class="isActiveA?'active-a':''">
            <span>A</span>是
          </li>
          <li @click="isUserChoiceB({'key':testData.key, 'cho':'否'})" :class="isActiveB?'active-b':''">
            <span>B</span>否
          </li>
        </ul>
      </section>
      <div
        style="border-bottom:1px dashed rgba(200,200,200,1);width:339px;height: 1px;overflow:hidden;margin:auto;"
      ></div>
    </div>

    <!-- 12题 -->
    <div class="do-question" v-show="testData.key === 12">
      <section>
        <article>{{testData.title}}</article>
        <ul v-for="(item,index) in myData" :key="item.id+index">
            <UlList :myChoiceData="item" @isUserChoice="isUserChoice({'key':item.key, 'val':item.data})"></UlList>
        </ul>
      </section>
      <div
        style="border-bottom:1px dashed rgba(200,200,200,1);width:339px;height: 1px;overflow:hidden;margin:auto;"
      ></div>
    </div>
  </div>
</template>
<script>
import UlList from "./ulList.vue";
export default {
  components: {
    UlList
  },
  props: {
    testData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isActiveA: false,
      isActiveB: false,
      myData: [
        {id:1, key:'A',data:'初级会计职称',isStyle: false},
        {id:2, key:'B',data:'中级会计职称',isStyle: false},
        {id:3, key:'C',data:'CPA（注册会计师）',isStyle: false},
        {id:4, key:'D',data:'CMA (美国注册管理会计师)',isStyle: false},
        {id:5, key:'E',data:'ACCA（特许公认会计师公会）',isStyle: false},
        {id:6, key:'F',data:'税务师',isStyle: false},
        {id:7, key:'G',data:'都没有',isStyle: false}
      ]
    };
  },
  methods: {
    isUserChoiceA (obj) {
      this.isActiveA = true
      this.isActiveB = false
      this.$emit('getMessageA', obj)
    },
    isUserChoiceB (obj) {
      this.isActiveA = false
      this.isActiveB = true
      this.$emit('getMessageB', obj)
    },
    isUserChoice (obj) {
      this.$emit('getMessageC', obj)
      this.myData = this.myData.map(items=>{
        if (items.key == obj.key) {
          items.isStyle = true
        } else {
          items.isStyle = false
        }
        return items
      })
    }
  }
};
</script>
<style lang="less" scoped>
.do-question {
  section {
    width: 100%;
    min-height: 374px;
    padding: 42px 36px 18px 36px;
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
        margin-bottom: 24px;
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
</style>