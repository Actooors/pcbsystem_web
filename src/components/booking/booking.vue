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
    <div class="information-wrapper">
      <div>
        <div class="item-block">
          <small>上车地点</small>
          {{where}}
        </div>
        <div class="item-block">
          <small>起约时间</small>
          <span>{{months}}月{{days}}日</span>{{hours}}时
        </div>
        <div class="item-block">
          <small>终约时间</small>
          <span>{{months}}月{{days}}日</span>{{hours}}时
        </div>
      </div>
      <el-button type="warning" class="btn-search" @click="search">搜索</el-button>
    </div>
    <datetime-range title="选择时间" :value="value" inline-desc="desc" placeholder="placeholder" start-date="2018-12-21"
                    end-date="2018-21-22" format="YYYY-MM-DD">
    </datetime-range>
  </div>

</template>

<script>
  import Vue from 'vue'
  import Slider from 'base/slider/slider'
  import store from 'store/store'
  import {mapState, mapMutations} from 'vuex'
  import DatetimeRange from "vux/src/components/datetime-range/index";

  var recommends = [
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
  export default {
    name: "booking",
    store,
    components: {
      DatetimeRange,
      Slider
    },
    data() {
      return {
        recommends: recommends,
        value: ['2017-01-15', '03', '05']
      }
    },
    computed: mapState(['where', 'months', 'days', 'hours']),
    methods: {
      ...mapMutations(['setTimeToNow']),
      search() {
        console.log("调用搜索")
      }
    },
    created() {
      this.setTimeToNow()
    }
  }
</script>
<style scoped>
  @import url('../../common/css/booking.css');
</style>
