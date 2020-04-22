
<template>
  <div class="speekSit">
    <img :src="goodItemDetail.thumbPath" alt="">
    <div class="title">{{goodItemDetail.name}}</div>
    <div class='detail'>
      <div class='type'>{{goodItemDetail.pattern}}</div>
      <div class="price" v-html='changeFormate(goodItemDetail.presentPrice)'></div>
    </div>
  </div>
</template>
<script>
  export default {
     props: {
      goodItemDetail: {
        type: Object,
        default: {}
      }
    },
    methods:{
        changeFormate(val) {
            if (!val || val.toFixed(1) == 0.0) {
            return '免费'
            } else {
            if (this.$type == 'ios') {
                return val.toFixed(1) + ' 学币'
            } else {
                return '¥ ' + val.toFixed(1)
            }
            }
        },
    }
   
  }
</script>
<style lang="less" scoped>
 .speekSit{
    margin:0 36px;
   margin-bottom:40px;
   padding-bottom:30px;
   border-bottom:1px solid #EDEDED;
    img{
      width:100%;
      border-radius:12px;
      max-height:370px;
    }
    .title{
      margin-top:30px;
      font-size:30px;
      font-weight:400;
      line-height:44px;
       color: rgba(58, 60, 66, 1);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
    }
    .detail{
      margin-top:24px;
      display: flex;
      justify-content: space-between;
      .type{
        display: inline-block;
        width:64px;
        height:36px;
        font-size:22px;
        background:rgba(240,250,248,1);
        text-align:center;
        font-weight:400;
        color:#00AB84
      }
      .price{
        color:#F6612F;
        font-size:32px;
        font-weight:bold;
      }
    }
 }
</style>