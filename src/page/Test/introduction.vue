<template>
  <div class="page">
    <header>
      <h1>{{title}}</h1>
      <p> <img src="../../assets/images/icon/clock@2x.png" alt="clock" >{{time}}</p>
    </header>
    <section>
      <div v-html="data"></div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: '',
      title: '',
      time: ''
    }
  },
  mounted() {
    
    const data = {
      id: this.$route.query.id || 1
    }
    this.$api.getExamDetailsData(data).then(res=>{
      this.data = res.data.detail
      this.title = res.data.title
      this.time = res.data.createTime
      this.time = this.$hqTool.formatDate(this.time, 9) // 时间戳转化
      this.time = this.$hqTool.iosDateStr(this.time) // 兼容ios
    })

  },
  filters: {
    formatDate (val) {
      this.$hqTool.formatDate(val,9)
    }
  },
  methods: {
    
  }

}
</script>

<style lang="less" scoped>
.page {
  padding: 0 33px;
  background: #fff;
  header {
    h1 {
      padding-top: 12px;
      height: 115px;
      font-size: 44px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      line-height: 115px;
      color: rgba(58,60,66,1);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    p {
      display: flex;
      align-items: center;
      height: 35px;
      line-height: 35px;
      font-size:23px;
      font-family:Source Han Sans CN;
      font-weight:400;
      color:rgba(163,171,184,1);
      img {
        margin-right: 12px;
        width: 30px;
        height: 30px;
      }
    }
  }
  section {
    margin-top: 35px;
  }
}

</style>