<!--
 * @Author: 尹伊
 * @Date: 2020-02-04 17:16:09
 * @LastEditTime: 2020-02-25 16:29:36
 * @LastEditors: 尹伊
 * @Description: 首页
 -->
<template>
  <div class="home">
    <!-- 顶部标题栏 -->
    <div class="topBar">
      <span v-html='clientType == "ios" ? "恒企教育" : "恒企会计"'></span>
      <div class="searchIcon" @click='handleSearch'>
        <img src="../../assets/images/home/course_home_search_black.png" alt="">
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="swipe">
      <!-- <SwipeCom :bannerList='bannerList'></SwipeCom> -->
      <SwiperC v-if='bannerList.length>0' :bannerList='bannerList'></SwiperC>
    </div>
    <!-- 标题栏 -->
    <div class="titleBar">
      <div class="title" v-for='(item, index) in titles' :key='index' @click='handleGoTab(item.id)'>
        <div class="text">
          <img :src=item.img alt="">
        </div>
        <div>{{item.title}}</div>
      </div>
    </div>
    <!-- 人才培养专区 -->
    <!-- <div class="subject">
      <img src="../../assets/images/home/自学成才.png" alt="">
      <img src="../../assets/images/home/财务总监.png" alt="">
      <img src="../../assets/images/home/财务经理.png" alt="">
    </div> -->
    <!-- 阴影 -->
    <div class="shadow">
      <img src="../../assets/images/home/icon_section_head.png" alt="">
    </div>
    <!-- 免费专区 -->
    <div class="freeZone">
      <div class="freeTitle">免费课程</div>
      <div class="freeList">
        <FreeItem v-for='(item, index) in freeGoodsList' :key='index' :ItemDetail='item'></FreeItem>
      </div>
    </div>
    <!-- 阴影 -->
    <div class="shadow">
      <img src="../../assets/images/home/icon_section_head.png" alt="">
    </div>
    <!-- 推荐专区 -->
    <div class="recommendZone">
      <div class="freeTitle">推荐专区</div>
      <div class="recommendCon">
        <div class="cont1" @click="vipPage(recommendList.specialTopicUrl)">
          <img :src="recommendList.specialTopicPic" alt="">
        </div>
        <div class="cont2">
          <div v-for='(item, index) in recommendList.goodsList' :key='index'>
            <img :src="item.goodsPic" @click='clickGoodsItem(item)' alt="">
          </div>
        </div>
      </div>
    </div>
    <!-- 课程分类 -->
    <div v-for='(item, index) in categoryList' :key='index'>
      <!-- 阴影 -->
      <div class="shadow">
        <img src="../../assets/images/home/icon_section_head.png" alt="">
      </div>
      <!-- 课程分栏 -->
      <div class="finance">
        <div class="freeTitle pd">{{item.categoryName}}</div>
        <div>
          <GoodItem v-for='(subItem,subIndex) in item.agivList' :key='subIndex' @goodsDetail="goodsDetail(subItem.id)"
            :goodItemDetail='subItem'></GoodItem>
        </div>
        <div class="more" @click="accountBook(item)">查看更多
          <img src="@/assets/images/icon/btn-close-green@2x.png" class="right" />
        </div>
      </div>
    </div>
    <!-- 阴影 -->
    <div class="shadow">
      <img src="../../assets/images/home/icon_section_head.png" alt="">
    </div>
    <!-- 实习课程 -->
    <div class="finance">
      <div class="freeTitle pd">实习课程</div>
      <div>
        <GoodItem :practice='false' v-for='(item,index) in actionCourseList' :key='index'
          @goodsDetail="goodsDetail(item.id)" :goodItemDetail='item'>
        </GoodItem>
      </div>
      <div class="more" @click="internshipBook">查看更多
        <img src="@/assets/images/icon/btn-close-green@2x.png" class="right" />
      </div>
    </div>
    <!-- 阴影 -->
    <div class="shadow">
      <img src="../../assets/images/home/icon_section_head.png" alt="">
    </div>
    <!-- 底部栏 -->
    <div class="searchMore">
      没有找到合适到课程？<span style="color: #00AB84;" @click='handleSearch'>去搜索吧</span>
    </div>
  </div>
</template>

<script>
  import SwipeCom from '@/components/SwipeCom'
  import SwiperC from '@/components/SwiperC'
  import FreeItem from '@/components/FreeItem'
  import GoodItem from '@/components/GoodItem'
  import special from '@/assets/images/home/course_icon_special.png'
  import tiku from '@/assets/images/home/course_icon_tiku.png'
  import news from '@/assets/images/home/course_icon_news.png'
  import school from '@/assets/images/home/course_icon_school.png'
  import { JsBridge } from '@/utils/bridge.js'
  import Vue from 'vue'
  export default {
    components: {
      SwipeCom,
      FreeItem,
      GoodItem,
      SwiperC
    },
    data() {
      return {
        bannerList: [],// 轮播图
        freeGoodsList: [],   // 免费专区
        categoryList: [], // 课程分栏
        actionCourseList: [], // 实习课程
        recommendList: [], // 推荐专区
        perTranList: [], // 人才培育专区
        clientType: '', // 机型
        titles: [
          {
            img: special,
            title: '实习',
            id: 1
          },
          {
            img: tiku,
            title: '题库',
            id: 2
          },
          {
            img: news,
            title: '资讯',
            id: 3
          },
          {
            img: school,
            title: '校区',
            id: 4
          }
        ]
      };
    },
    created() {
      this.clientType = this.$type
      JsBridge(null,
        {
          path: "navigation/needHide",
          data: {
            //0表示导航栏显示，如果要隐藏则设置为1
            needHide: 1
          }
        })
      this.$api.getHomePageMergeApi().then(res => {
        console.log(res);
        if (res && res.code == 200) {
          this.bannerList = res.data.bannerList
          this.freeGoodsList = res.data.freeGoodsList
          this.categoryList = res.data.categoryList
          this.actionCourseList = res.data.actionCourseList
          this.recommendList = res.data.recommendList
        }
      })
    },

    methods: {
      // 选课分栏查看更多
      accountBook(item) {
        JsBridge(null,
          {
            path: "home/jump/courseCenter",
            data: {
              //目录ID
              categoryId: item.categoryId
            }
          })
      },
      goodsDetail(courseId) {
        let goodsData = { path: "home/jump/courseInfo", data: { id: courseId } };
        JsBridge(null, goodsData);
      },
      // 实习课程查看更多
      internshipBook() {
        JsBridge(null, { path: "home/jump/shixi" })
      },
      vipPage(url) {
        JsBridge(null,
          {
            path: "jump/webview",
            data: {
              url: url,
              navigation: false
            }
          })
      },
      // 查找更多
      handleSearch() {
        JsBridge(null, {
          path: "jump/search/course"
        })
      },
      // 点击推荐商品
      clickGoodsItem(data) {
        JsBridge(null,
          {
            path: "home/jump/courseInfo",
            data: {
              //课程ID
              id: data.goodsId
            }
          })
      },
      handleGoTab(id) {
        let url = ''
        switch (id) {
          case 1:
            url = 'home/jump/shixi'
            break
          case 2:
            url = 'home/jump/tiku'
            break
          case 3:
            url = 'home/jump/news'
            break
          case 4:
            url = 'home/jump/schoolzone'
        }
        JsBridge(null, { path: url })
      }
    }
  };
</script>

<style lang="less" scoped>
  .home {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #fff;
    /* margin-bottom: 200px; */

    .topBar {
      width: 100%;
      height: 88px;
      line-height: 88px;
      text-align: center;
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #2E3033;
      background-color: #fff;
      z-index: 1000;
      position: fixed;
      top: 0;

      .searchIcon {
        height: 88px;
        /* display: inline; */
        position: absolute;
        right: 0;
        top: 0;
        padding: 24px 42px 24px 0;
      }

      img {
        width: 40px;
        height: 40px;
      }
    }

    .swipe {
      margin-top: 88px;
      width: 100%;
      height: 332px;
      /* padding: 14px 32px; */
      /* background-color: #cccccc; */
    }

    .titleBar {
      padding: 0 36px;
      display: flex;
      margin-bottom: 36px;

      .title {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

      .text {
        width: 84px;
        height: 84px;

        img {
          width: 100%;
          height: 100%;
        }
      }

    }

    .shadow {
      width: 100%;
      /* margin-top: 36px; */

      img {
        width: 100%;
      }
    }

    .subject {
      display: flex;
      justify-content: center;
      padding: 36px 36px 12px 36px;

      img {
        width: 213px;
        height: 120px;
        margin-right: 19px;
      }

      img:nth-last-child(1) {
        margin-right: 0;
      }
    }

    .freeZone {
      padding: 36px 0 24px 36px;
      margin-bottom: 36px;

      .freeList {
        margin-top: 36px;
        height: 400px;
        width: 100%;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
        overflow-y: hidden;
        /* padding: 0 18px; */
        margin-bottom: -.2rem;
        overflow: -moz-scrollbars-none;

        .item {
          margin-right: 18px;
        }
      }

      .freeList::-webkit-scrollbar {
        display: none;
      }
    }

    .recommendZone {
      padding: 36px 36px 24px 36px;
      margin-bottom: 36px;

      .recommendCon {
        margin-top: 36px;

        .cont1 {
          width: 100%;
          height: 186px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 6px;
          }
        }

        .cont2 {
          display: flex;
          margin-top: 18px;
          width: 100%;
          height: 186px;

          div {
            height: 186px;
            flex: 1;
            margin-right: 18px;
          }

          img {
            width: 100%;
            height: 100%;
            border-radius: 6px;
          }

          div:nth-last-child(1) {
            margin-right: 0;
          }
        }
      }
    }

    .searchMore {
      padding: 49px 0 87px 0;
      text-align: center;
      font-size: 28px;
      color: #A3ABB8;
    }

    .finance {
      background-color: #fff;
      margin-top: 36px;

      .pd {
        padding: 0 36px;
      }
    }

    .freeTitle {
      font-size: 40px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 38px;
      color: #3A3C42;

    }

    .more {
      width: 100%;
      height: 96px;
      line-height: 96px;
      text-align: center;
      color: #00AB84;
      font-size: 28px;
      display: flex;
      align-items: center;
      justify-content: center;

      .right {
        /* margin: 33px 12px 0 0; */
        width: 30px;
        height: 30px;
        transform: rotate(270deg)
      }

    }
  }
</style>