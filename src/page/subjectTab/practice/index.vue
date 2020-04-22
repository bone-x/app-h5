<template>
  <div class="practice">
    <div class="advertising">
      <div class="pic">
        <img :src="advert.image" alt @click="goodsNews(advert)" />
        <div class="message" v-show="advert.informationTitle">
          <p>{{advert.informationTitle}}</p>
        </div>
      </div>
      <div class="news" v-show="informationTitleList.length">
        <p  v-for="(item,index) in informationTitleList" :key="index" @click="littleNews(item.skipUrl)">
          <i class="circle"></i><span>{{item.title}}</span>
        </p>
      </div>
      <div class="more" v-show="informationTitleList.length">
        <span @click="moreNews">更多资讯 <img src="@/assets/images/icon/btn-close-green@2x.png" class="right"/></span>
      </div>
    </div>
    <div class="subject-goods-copy">
      <h4>{{loadingPage.name}}</h4>
      <div class="goods" >
        <vipGoods v-for="(item,index) in loadingPage.list" :key="index" :goodsData="item" @googsDetail="googsDetail(item.targetUrl)" ></vipGoods>
      </div>
    </div>
    <div class="subject-goods" v-for="(item,index) in goodsList" :key="index">
      <h4>{{item.categoryName}}</h4>
      <div class="goods" v-for="(item,indexs) in item.agivList" :key="indexs">
        <GoodItem v-if='indexs<=curr[index]' :goodItemDetail="item"  @goodsDetail="goodsDetail(item.id)" :show="false" :class="indexs===isLine||item.$isLine-1===indexs?'':'active'"></GoodItem>
      </div>
       <div class="more" @click="unfold(index,item)" v-show="item.agivList.length > 4">
          <span v-if="curr[index] === 3">展开更多({{item.agivList.length - 4}})<img src="@/assets/images/icon/btn-close-green@2x.png" /></span>
          <span v-else>收起更多<img src="@/assets/images/icon/btn-close-green@2x.png" class="moreGoods"/></span>
      </div>
    </div>
  </div>
</template>

<script>
import GoodItem from "../../../components/GoodItem";
import vipGoods from "../../../components/vipGoods";
import {JsBridge,isNativeApp} from '@/utils/bridge';
export default {
  props:{
   curTabChild:{ 
    type: Number,
    default: 9
    }
  },
  components: {
    GoodItem,
    vipGoods
  },
  data() {
    return {
      advert: {},
      goodsList: [],
      informationList: [],
      loadingPage: {},
      curr:[],
      id:'',
      isLine: 3, // 作为展开和收起的标识位
    };
  },
  mounted() {
    let data = {
      categoryId: this.curTabChild,
    }
    this.$api.accountPractice(data).then(res => {
        if (res && res.code == 200) {
            this.advert = res.data.advert;
            this.goodsList = res.data.goodsList;
            this.curr = new Array(res.data.goodsList.length).fill(3);
            this.informationList = res.data.informationList;
            this.id=res.data.childInfoCategoryId||res.data.parentInfoCategoryId;
            this.loadingPage = res.data.loadingPage; 
            // 添加下划线的参数
            this.goodsList = this.goodsList.map(items => {
              items.agivList.map(item => {
                item.$isLine = items.agivList.length;
              })
              return items;
            })
        }
      })
  },
  computed: {
    informationTitleList: function() {
      return this.informationList.slice(0,2)
    }
  },
  methods: {
    unfold(index,item) {
      if (this.curr[index] === 3) {
        this.$set(this.curr,index,item.agivList.length);
        this.isLine = -1;
      } else {
        this.$set(this.curr,index,3);
        this.isLine = 3;
      }
      
    },
    // 商品或者资讯跳转
    goodsNews(val) {
      if(val.type === 'IMAGE') {
        JsBridge(null, {path:"jump/news",data:{skipUrl:val.skipUrl}});
      } else {
        let goodsData = { path:"home/jump/courseInfo",data:{id:goodsId}};
        JsBridge(null, goodsData);  
      }
    },
    // 更多资讯
    moreNews() {
      JsBridge(null, {path:"jump/moreNews",data:{categoryId:this.id}});
    },
    // 部分资讯
    littleNews(val) {
      let newsData = {path:"jump/news",data:{skipUrl:val}};
      JsBridge(null, newsData);
    },
    // 行业财务管理
    googsDetail(targetUrl) {
      let goodsData = { path:"jump/webview",data:{url:targetUrl, navigation: false}};
      JsBridge(null, goodsData);
    },
    // 其他商品詳情
    goodsDetail(courseId) {
      let goodsData = { path:"home/jump/courseInfo",data:{id:courseId}};
      JsBridge(null, goodsData);
    }
  }
};
</script>
<style lang='less' scope>
.practice {
  margin-top:30px;
  .advertising {
    // padding-top: 42px;
    .pic {
      width: 100%;
      height: 382px;
      position: relative;
      padding: 0px 36px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 12px;
        overflow: hidden;
      }
      .message {
        width: 678px;
        height: 80px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 80px;
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        bottom: 0;
        border-radius: 0 0 12px 12px;
        overflow: hidden;
        p {
          padding-left: 24px;
          font-size: 28px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #fff;
          opacity: 1;
        }
      }
    }
    .news {
      margin-top: 32px;
      p {
        padding: 0 60px 30px 36px;
        line-height: 30px;
        font-size: 26px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(58, 60, 66, 1);
        opacity: 1;
        .circle{
        display:inline-block;
        margin-right:10px;
        margin-bottom: 3px;
        width:8px;
        height:8px;
        border-radius:100%;
        background:rgba(224,224,224,1);
      }
      }
    }
    .more {
      //   width: 100%;
      height: 96px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 20px 30px rgba(58, 60, 66, 0.03);
      opacity: 1;
      line-height: 96px;
      text-align: center;
      .right {
        margin: 33px 12px 0 0;
        width: 30px;
        height: 30px;
        transform: rotate(270deg)
      }
      span {
        font-size: 28px;
        font-family: Microsoft YaHei;
        font-weight: 600;
        color: #00ab84;
        opacity: 1;
      }
    }
  }
  .subject-goods-copy {
    margin-top: 66px;
    padding: 0px 36px;
    box-shadow: 0px 10px 30px rgba(58, 60, 66, 0.03);
    overflow: hidden;
    h4 {
      font-size: 40px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      // line-height: 38px;
      margin-bottom: 34px;
      color: rgba(58, 60, 66, 1);
      opacity: 1;
    }
    .goods {
      .item {
        float: left;
        margin-bottom: 30px;
        width: 330px;
      }
      .item:nth-child(2n) {
        float: right;
      }
      .goodItem {
        padding-left: 0px;
      }
    }
  }
  .subject-goods {
    margin-top: 66px;
    // padding: 0px 36px;
    box-shadow: 0px 10px 30px rgba(58, 60, 66, 0.03);
    overflow: hidden;
    h4 {
      margin-left: 36px;
      font-size: 40px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      // line-height: 38px;
      color: rgba(58, 60, 66, 1);
      opacity: 1;
    }
    .goods {
      .item {
        float: left;
        margin-bottom: 30px;
        width: 330px;
      }
      .item:nth-child(2n) {
        float: right;
      }
      .goodItem {
        padding-left: 0px;
      }
      .active {
        border-bottom: 1px solid #EDEDED;
      }
    }
    .more {
      //   width: 100%;
      height: 96px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 20px 30px rgba(58, 60, 66, 0.03);
      opacity: 1;
      line-height: 96px;
      text-align: center;
      img {
        margin: 33px 12px 0 12px;
        width: 30px;
        height: 30px;
      }
      .moreGoods {
        transform: rotate(180deg);
      }
      span {
        font-size: 28px;
        font-family: Microsoft YaHei;
        font-weight: 600;
        color: #00ab84;
        opacity: 1;
      }
    }
    .more {
      //   width: 100%;
      height: 96px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 20px 30px rgba(58, 60, 66, 0.03);
      opacity: 1;
      line-height: 96px;
      text-align: center;
      span {
        font-size: 28px;
        font-family: Microsoft YaHei;
        font-weight: 600;
        color: #00ab84;
        opacity: 1;
      }
    }
  }
}
</style>