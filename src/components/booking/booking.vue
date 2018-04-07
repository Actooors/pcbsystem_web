<template>
  <div class="booking">
    <div class="slider-wrapper" v-if="recommends.length">
      <slider>
        <div v-for="item in recommends">
          <a :href="item.linkUrl">
            <img class="needsclick" :src="item.picUrl">
          </a>
        </div>
      </slider>

    </div>
  </div>

</template>

<script>
  import Slider from 'base/slider/slider'

  export default {
    name: "booking",
    components: {
      Slider
    },
    data() {
      return {
        recommends: [
          {
            "linkUrl": "https://y.qq.com/m/act/classic/index.html?ADTAG=jiaodiantu",
            "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000003gXZ394C6bbc.jpg",
            "id": 15017
          }, {
            "linkUrl": "https://y.qq.com/m/act/trumpcard3/index.html?ADTAG=jiaodiantu",
            "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000002S3pTc18lhON.jpg",
            "id": 15039
          }, {
            "linkUrl": "https://y.qq.com/m/act/sfhd/127.html?ADTAG=jdt",
            "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000003KDGoY4ZLWXR.jpg",
            "id": 15014
          }, {
            "linkUrl": "http://y.qq.com/w/album.html?albummid=0012os0a3bZBGC",
            "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000002htFUh4X3Vbb.jpg",
            "id": 15044
          }, {
            "linkUrl": "http://y.qq.com/w/album.html?albummid=000WkLHX0mikpL",
            "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000000ZPAFz0OtHMY.jpg",
            "id": 15046
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .booking{
    position: fixed;
    top: 44px;
    width:100%;
    bottom: 0;
  }
  .slider-wrapper {
    position: relative;
    left:50%;
    transform: translateX(-50%);
  }


  @media screen and (min-width:1025px) {
    .slider-wrapper {
      position: relative;
      width: 35%;
      overflow: hidden;
    }
  }
  @media screen and (max-width:1024px) {
    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
  }

</style>
