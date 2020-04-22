<template>
  <div>
    <li @click="isUserChoice(myChoiceData.key)" :class="myChoiceData.isStyle?'active-a':''">
      <span>{{myChoiceData.key}}</span>
      {{myChoiceData.data}}
    </li>
  </div>
</template>

<script>
export default {
  props: {
    myChoiceData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isActive: '',
    };
  },
  methods: {
    isUserChoice(key) {
      this.isActive = key
      this.$emit('isUserChoice',key)
    }
  }
};
</script>

<style lang="less" scoped>
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
</style>