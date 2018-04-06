<template>
  <div class="carousel">
    <Slider loop>
      <img src="http://y.gtimg.cn/music/photo_new/T003R720x288M000003KDGoY4ZLWXR.jpg">
      <img src="http://y.gtimg.cn/music/photo_new/T003R720x288M000003gXZ394C6bbc.jpg">
      <img src="http://y.gtimg.cn/music/photo_new/T003R720x288M000002htFUh4X3Vbb.jpg">
      <img src="http://y.gtimg.cn/music/photo_new/T003R720x288M000000ZPAFz0OtHMY.jpg">
    </Slider>
    <!--<el-carousel height="150px">-->
    <!--<el-carousel-item v-for="item in 4" :key="item">-->
    <!--<h3>{{ item }}</h3>-->
    <!--</el-carousel-item>-->
    <!--</el-carousel>-->
  </div>
</template>

<script>
  import Slider from 'base/slider/slider'
  export default {
    name: "booking",
    components:{
      Slider
    }
  }
</script>

<style scoped>
  .carousel {
    position: absolute;
    width: 100%;
  }
</style>
