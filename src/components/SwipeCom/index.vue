<!--
 * @Author: 尹伊
 * @Date: 2020-02-05 14:14:08
 * @LastEditTime: 2020-02-19 16:58:23
 * @LastEditors: 尹伊
 * @Description: 轮播图插件
 -->
<template>
  <!-- <div class="content">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
  </div> -->
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for='(item, index) in bannerList' :key='item.id' @click='handleClickSwipe(item)'><img
          :src="item.pic" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  import Swiper from "swiper"
  import goods1 from '@/assets/images/home/商品1.png'
  import goods2 from '@/assets/images/home/商品2.png'
  import { JsBridge } from '@/utils/bridge.js'
  export default {
    props: {
      bannerList: {
        type: Array,
        default: []
      }
    },
    watch: {
      bannerList() {
        this.$nextTick(() => {
          this.initSwiper()
        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initSwiper()
      })
    },
    data() {
      return {
        mySwiper: null,
        images: [
          goods1,
          goods2
        ]
      };
    },
    methods: {
      // 初始化轮播图
      initSwiper() {
        this.mySwiper = new Swiper('.swiper-container', {
          direction: 'horizontal',
          loop: true,
          autoplay: true,
          slidesPerView: "auto",
          centeredSlides: true,
          spaceBetween: 9,
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination'
          },
        })
      },
      handleClickSwipe(data) {
        let detail = {
          path: 'home/banner',
          data: data
        }
        JsBridge(null, detail)
      }
    }
  };
</script>

<style lang="less" scoped>
  .swiper-container {
    margin-top: 20px;
    width: 676px;
    height: 314px;
    margin-bottom: 53px;
    overflow: visible !important;
  }

  .swiper-container .swiper-wrapper .swiper-slide {
    width: 676px;
    border-radius: 20px;
  }

  .swiper-container .swiper-wrapper .swiper-slide img {
    width: 100%;
    height: 314px;
    border-radius: 20px;
  }

  .swiper-container .swiper-wrapper .swiper-slide-prev {
    margin-top: 18px;
    height: 280px !important;
  }

  .swiper-container .swiper-wrapper .swiper-slide-prev img {
    height: 280px !important;
  }

  .swiper-container .swiper-wrapper .swiper-slide-next {
    margin-top: 18px;
    height: 280px !important;
  }

  .swiper-container .swiper-wrapper .swiper-slide-next img {
    height: 280px !important;
  }

  .swiper-container .swiper-wrapper .swiper-slide-active {
    width: 676px;
  }

  .swiper-pagination {
    bottom: -30px !important;
  }

  .swiper-pagination .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background: #ff1e1e;
  }

  .swiper-pagination .swiper-pagination-bullet-active {
    width: 21px;
    height: 12px;
    background: #e75230;
    border-radius: 6px;
  }
</style>

<!-- <style lang="less" scoped>
  .content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 8px;

    img {
      width: 100%;
      height: 304px;
    }
  }
</style> -->