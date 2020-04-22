<template>
  <div class="swiper">
    <swiper :options='swiperOption' ref='mySwiper' class="swiper">
      <swiper-slide v-for='(item, index) in bannerList' :key='index' class="swiper_item">
        <img :src="item.pic" alt="轮播图" class="pic" @click='handleClickSwipe(item)'>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
  import { JsBridge } from '@/utils/bridge.js'
  export default {
    props: {
      bannerList: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        swiperOption: {
          direction: 'horizontal',
          loop: true,
          autoplay: true,
          spaceBetween: 9,
          slidesPerView: "auto",
          centeredSlides: true,
          pagination: {
            el: '.swiper-pagination'
          }
        }
      }
    },
    created() {

    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
      handleClickSwipe(data) {
        let detail = {
          path: 'home/banner',
          data: data
        }
        JsBridge(null, detail)
      }
    },
  }
</script>
<style lang='less'>
  .swiper {
    /* height: 150px; */
    /* width: 100%;
    min-height: 1px; */

    /* img {
      border: none;
      vertical-align: middle;
      width: 100%;
      height: 314px;
    } */
  }

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
    bottom: 12px !important;
    /* background-color: red; */
  }

  .swiper-pagination .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background: #ffffff;
    opacity: 0.5;
  }

  .swiper-pagination .swiper-pagination-bullet-active {
    /* width: 21px; */
    width: 12px;
    height: 12px;
    background: #ffffff;
    border-radius: 6px;
    opacity: 1;
  }
</style>