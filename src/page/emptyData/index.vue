<template>
  <div class="empty-data" v-show="emptyDataObj.status">
    <div class="empty-data-content">
      <img src="../../assets/images/nofound.png" alt="">
      <p class="fs26px color-666">{{emptyDataObj.text}}</p>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {

  computed: {
    ...mapGetters(['emptyDataObj'])
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.empty-data{
  text-align: center;
  width: 100%;
  height: 100vh;
  display: table;
  .empty-data-content{
    display: table-cell;
    vertical-align: middle;
    img{
      width: 400px;
    }
  }
}
</style>
