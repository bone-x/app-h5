<!--
 * @Author: 杨兰
 * @Date: 2020-01-06 10:01:44
 * @LastEditTime : 2020-01-16 11:35:58
 * @LastEditors  : 尹伊
 * @Description: 单科详情-推荐模块
 * @FilePath: \hqjy-accounting-h5\src\page\singleSub\index.vue
 -->
 <template>
  <div class="recommend">
    <div class="goods-container" v-if='relateGoods.relateGoodsList && relateGoods.relateGoodsList.length > 0'>
      <div class="subject" v-for='(item, index) in relateGoods.relateGoodsList'>
        <div class="left-pic">
          <img :src="item.thumbPath" alt>
        </div>
        <div class="right-detail">
          <h3 class="goods-title">{{item.name}}</h3>
          <div class="tag">
            <span v-if='item.label'>{{item.label}}</span>
            <span>{{item.pattern}}</span>
          </div>
          <div class="price">
            <span>{{item.presentPrice | changePrice}}</span>
            <span class="origin-price" v-if='item.presentPrice !== item.originalPrice'>￥{{item.originalPrice | priceFormate}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="noData" v-else>暂无推荐课程</div>
  </div>
</template>
<script>
export default {
  props: {
    categoryId: Number,
    goodsId: Number,
    goodsType: Number
  },
  filters: {
    priceFormate (val) {
      return val.toFixed(1)
    },
    changePrice (val) {
      if (val) {
        return val.toFixed(1)
      }
      return '免费'
    }
  },
  data() {
    return {
      relateGoods: {}
    };
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      let params = {
        categoryId: this.categoryId,
        goodsId: this.goodsId,
        goodsType: this.goodsType
      }
      this.$api.getRelateGoodsList(params).then(res => {
        if(res && res.code == 200){
          this.relateGoods = res.data
        }     
      })
    }
  }
};
</script>
<style lang="less" scoped>
.recommend {
  width: 100%;
  height: 100%;
  background: #ffffff;
  .goods-container {
    padding-left: 32px;
    padding-right: 55px;
    .subject {
      height: 252px;
      background: rgba(255, 255, 255, 1);
      opacity: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border-bottom: solid 1px #ededed;
      .left-pic {
        width: 298px;
        height: 172px;
        margin-right: 34px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right-detail {
        flex: 1;
        .goods-title {
          font-size: 30px;
          font-family: Source Han Sans CN;
          font-weight: 800;
          line-height: 40px;
          color: rgba(58, 60, 66, 1);
          opacity: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .tag {
          margin-top: 12px;
          margin-bottom: 10px;
          span {
            display: inline-block;
            font-size: 22px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 36px;
            color: rgba(0, 171, 132, 1);
            opacity: 1;
            padding: 3px 10px;
            background: rgba(240, 250, 248, 1);
            margin-right: 12px;
          }
        }
        .price {
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: 800;
          line-height: 28px;
          color: rgba(246, 97, 47, 1);
          opacity: 1;
          .origin-price {
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 21px;
            color: rgba(163, 171, 184, 1);
            opacity: 1;
            text-decoration: line-through;
            margin-left: 18px;
          }
        }
      }
    }
  }
  .noData{
    padding: 32px;
  }
}
</style>
